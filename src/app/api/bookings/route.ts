type BookingRequestBody = {
  selectedServices: string[];
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  notes?: string;
};

type SupabaseBooking = {
  id: string;
  booking_reference: string;
  customer_email: string;
};

type EmailEventStatus = "sent" | "failed" | "skipped";

type EmailDeliveryResult = {
  eventType: string;
  recipientEmail: string;
  status: EmailEventStatus;
  providerMessageId?: string;
  errorMessage?: string;
};

const SERVICE_LABELS: Record<string, string> = {
  "ac-maintenance": "AC Maintenance",
  "deep-cleaning": "Deep Cleaning",
  plumbing: "Plumbing",
  electrical: "Electrical",
  "general-maintenance": "General Maintenance",
  painting: "Painting & Decorating",
  "it-work": "IT & AI Solutions",
  cctv: "Security & Networking Solutions",
  "pest-control": "Pest Control",
  waterproofing: "Waterproofing",
  "fridge-freezer": "Fridge & Freezer Service",
  "washing-machine": "Washing Machine Service",
  "amc-work": "AMC Work",
  construction: "Construction Work",
};

const EMAIL_EVENT_TYPES = {
  customerReceived: "customer_booking_received",
  adminNewBooking: "admin_new_booking",
} as const;

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const bookingRequest = parseBookingRequest(body);
    const bookingReference = createBookingReference();
    const booking = await createSupabaseBooking(bookingRequest, bookingReference, request);
    const emailResults = await sendBookingEmails(booking, bookingRequest);
    await updateBookingEmailStatus(booking.id, emailResults);

    return Response.json(
      {
        ok: true,
        booking: {
          id: booking.id,
          reference: booking.booking_reference,
        },
        email: {
          status: summarizeEmailStatus(emailResults),
          results: emailResults,
        },
        warnings: emailResults
          .filter((event) => event.eventType === EMAIL_EVENT_TYPES.customerReceived && event.status !== "sent")
          .map((event) => event.errorMessage ?? `${event.eventType} was not sent`),
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof BookingValidationError
      ? error.message
      : "We could not create the booking right now. Please try again.";

    console.error("Booking submission failed", error);

    return Response.json(
      { ok: false, error: message },
      { status: error instanceof BookingValidationError ? 400 : 500 }
    );
  }
}

function parseBookingRequest(input: unknown): BookingRequestBody {
  if (!isRecord(input)) {
    throw new BookingValidationError("Invalid booking request.");
  }

  const selectedServices = Array.isArray(input.selectedServices)
    ? input.selectedServices.filter((service): service is string => typeof service === "string")
    : [];
  const allowedServices = selectedServices.filter((service) => service in SERVICE_LABELS);
  const date = readString(input.date);
  const time = readString(input.time);
  const name = readString(input.name);
  const phone = readString(input.phone);
  const email = readString(input.email).toLowerCase();
  const address = readString(input.address);
  const notes = readString(input.notes);

  if (allowedServices.length === 0) {
    throw new BookingValidationError("Please select at least one service.");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new BookingValidationError("Please select a valid preferred date.");
  }

  if (time.length < 4) {
    throw new BookingValidationError("Please select a valid time slot.");
  }

  if (name.length < 2) {
    throw new BookingValidationError("Please enter your full name.");
  }

  if (phone.length < 7) {
    throw new BookingValidationError("Please enter a valid phone number.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new BookingValidationError("Please enter a valid email address.");
  }

  return {
    selectedServices: allowedServices,
    date,
    time,
    name,
    phone,
    email,
    address,
    notes,
  };
}

async function createSupabaseBooking(
  bookingRequest: BookingRequestBody,
  bookingReference: string,
  request: Request
): Promise<SupabaseBooking> {
  const rows = await supabaseFetch<SupabaseBooking[]>("/rest/v1/service_bookings", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      booking_reference: bookingReference,
      selected_services: bookingRequest.selectedServices,
      preferred_date: bookingRequest.date,
      preferred_time: bookingRequest.time,
      customer_name: bookingRequest.name,
      customer_phone: bookingRequest.phone,
      customer_email: bookingRequest.email,
      service_address: bookingRequest.address || null,
      customer_notes: bookingRequest.notes || null,
      metadata: {
        userAgent: request.headers.get("user-agent"),
        referrer: request.headers.get("referer"),
      },
    }),
  });

  const booking = rows[0];
  if (!booking) {
    throw new Error("Supabase did not return the created booking.");
  }

  return booking;
}

async function sendBookingEmails(booking: SupabaseBooking, bookingRequest: BookingRequestBody) {
  const events = [
    await sendAndRecordEmail({
      booking,
      eventType: EMAIL_EVENT_TYPES.customerReceived,
      to: bookingRequest.email,
      subject: `Kydmah booking received - ${booking.booking_reference}`,
      ...buildCustomerEmail(booking, bookingRequest),
    }),
    await sendAndRecordEmail({
      booking,
      eventType: EMAIL_EVENT_TYPES.adminNewBooking,
      to: process.env.ADMIN_NOTIFICATION_EMAIL?.trim() || null,
      subject: `New Kydmah booking - ${booking.booking_reference}`,
      ...buildAdminEmail(booking, bookingRequest),
    }),
  ];

  return events;
}

async function sendAndRecordEmail({
  booking,
  eventType,
  to,
  subject,
  html,
  text,
}: {
  booking: SupabaseBooking;
  eventType: string;
  to: string | null;
  subject: string;
  html: string;
  text: string;
}): Promise<EmailDeliveryResult> {
  if (!to) {
    const skipped = {
      eventType,
      recipientEmail: "not-configured",
      status: "skipped" as const,
      errorMessage: "ADMIN_NOTIFICATION_EMAIL is not configured.",
    };
    await recordEmailEvent(booking.id, skipped);
    return skipped;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${requireEnv("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Kydmah <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
        text,
      }),
    });

    const payload = await safeJson(response);
    if (!response.ok) {
      throw new Error(readResendError(payload));
    }

    const providerMessageId = isRecord(payload) && typeof payload.id === "string" ? payload.id : undefined;
    const sent = {
      eventType,
      recipientEmail: to,
      status: "sent" as const,
      providerMessageId,
    };
    await recordEmailEvent(booking.id, sent);
    return sent;
  } catch (error) {
    const failed = {
      eventType,
      recipientEmail: to,
      status: "failed" as const,
      errorMessage: error instanceof Error ? error.message : "Email delivery failed.",
    };
    await recordEmailEvent(booking.id, failed);
    return failed;
  }
}

async function recordEmailEvent(
  bookingId: string,
  event: EmailDeliveryResult
) {
  try {
    await supabaseFetch("/rest/v1/booking_email_events", {
      method: "POST",
      body: JSON.stringify({
        booking_id: bookingId,
        event_type: event.eventType,
        recipient_email: event.recipientEmail,
        provider_message_id: event.providerMessageId ?? null,
        status: event.status,
        error_message: event.errorMessage ?? null,
        payload: {},
      }),
    });
  } catch (error) {
    console.error("Failed to record booking email event", error);
  }
}

async function updateBookingEmailStatus(
  bookingId: string,
  events: Awaited<ReturnType<typeof sendBookingEmails>>
) {
  const emailStatus = summarizeEmailStatus(events);
  const failureReason = events
    .filter((event) => event.status !== "sent")
    .map((event) => event.errorMessage)
    .filter(Boolean)
    .join(" | ");

  await supabaseFetch(`/rest/v1/service_bookings?id=eq.${bookingId}`, {
    method: "PATCH",
    body: JSON.stringify({
      email_status: emailStatus,
      email_failure_reason: failureReason || null,
    }),
  });
}

function summarizeEmailStatus(events: Array<{ status: EmailEventStatus }>) {
  const requiredEvents = events.filter((event) => event.status !== "skipped");
  const sentCount = requiredEvents.filter((event) => event.status === "sent").length;

  if (requiredEvents.length === 0) return "skipped";
  if (sentCount === requiredEvents.length) return "sent";
  if (sentCount > 0) return "partial";
  return "failed";
}

async function supabaseFetch<T = unknown>(path: string, init: RequestInit): Promise<T> {
  const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL").replace(/\/$/, "");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const response = await fetch(`${supabaseUrl}${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}

function buildCustomerEmail(booking: SupabaseBooking, bookingRequest: BookingRequestBody) {
  const serviceList = formatServices(bookingRequest.selectedServices);
  const text = [
    `Hi ${bookingRequest.name},`,
    "",
    `We received your Kydmah booking request ${booking.booking_reference}.`,
    `Services: ${serviceList}`,
    `Preferred time: ${bookingRequest.date} at ${bookingRequest.time}`,
    bookingRequest.address ? `Location: ${bookingRequest.address}` : "",
    "",
    "Our team will review the request and contact you shortly to confirm the appointment.",
    "",
    "Thank you,",
    "Kydmah",
  ].filter(Boolean).join("\n");

  return {
    text,
    html: emailShell({
      eyebrow: "Booking request received",
      title: `Thank you, ${escapeHtml(bookingRequest.name)}.`,
      body: "We received your service request. Our team will review the details and contact you shortly to confirm the appointment.",
      rows: [
        ["Reference", booking.booking_reference],
        ["Services", serviceList],
        ["Preferred time", `${bookingRequest.date} at ${bookingRequest.time}`],
        ["Location", bookingRequest.address || "To be confirmed"],
      ],
    }),
  };
}

function buildAdminEmail(booking: SupabaseBooking, bookingRequest: BookingRequestBody) {
  const serviceList = formatServices(bookingRequest.selectedServices);
  const text = [
    `New Kydmah booking: ${booking.booking_reference}`,
    `Customer: ${bookingRequest.name}`,
    `Phone: ${bookingRequest.phone}`,
    `Email: ${bookingRequest.email}`,
    `Services: ${serviceList}`,
    `Preferred time: ${bookingRequest.date} at ${bookingRequest.time}`,
    bookingRequest.address ? `Location: ${bookingRequest.address}` : "",
    bookingRequest.notes ? `Notes: ${bookingRequest.notes}` : "",
  ].filter(Boolean).join("\n");

  return {
    text,
    html: emailShell({
      eyebrow: "New website booking",
      title: booking.booking_reference,
      body: "A new customer submitted a service booking from the website.",
      rows: [
        ["Customer", bookingRequest.name],
        ["Phone", bookingRequest.phone],
        ["Email", bookingRequest.email],
        ["Services", serviceList],
        ["Preferred time", `${bookingRequest.date} at ${bookingRequest.time}`],
        ["Location", bookingRequest.address || "Not provided"],
        ["Notes", bookingRequest.notes || "None"],
      ],
    }),
  };
}

function emailShell({
  eyebrow,
  title,
  body,
  rows,
}: {
  eyebrow: string;
  title: string;
  body: string;
  rows: Array<[string, string]>;
}) {
  return `
    <div style="margin:0;padding:32px;background:#f5faf9;font-family:Arial,sans-serif;color:#11302f;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dfeceb;border-radius:24px;overflow:hidden;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#00696b,#00ced1);color:white;">
          <p style="margin:0 0 8px;text-transform:uppercase;letter-spacing:0.18em;font-size:12px;font-weight:700;">${escapeHtml(eyebrow)}</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">${escapeHtml(title)}</h1>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#45615f;">${escapeHtml(body)}</p>
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              ${rows.map(([label, value]) => `
                <tr>
                  <td style="padding:14px 0;border-top:1px solid #edf3f2;color:#6d8582;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;">${escapeHtml(label)}</td>
                  <td style="padding:14px 0;border-top:1px solid #edf3f2;text-align:right;font-weight:700;color:#11302f;">${escapeHtml(value)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function formatServices(services: string[]) {
  return services.map((service) => SERVICE_LABELS[service] ?? service).join(", ");
}

function createBookingReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const random = crypto.randomUUID().slice(0, 8).toUpperCase();
  return `KDM-${date}-${random}`;
}

function requireEnv(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not configured.`);
  return value;
}

async function safeJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function readResendError(payload: unknown) {
  if (isRecord(payload) && typeof payload.message === "string") {
    return payload.message;
  }

  if (typeof payload === "string") {
    return payload;
  }

  return "Resend could not send the email.";
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

class BookingValidationError extends Error {}
