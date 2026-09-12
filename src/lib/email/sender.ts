type EmailEventStatus = "sent" | "failed" | "skipped";

type EmailDeliveryResult = {
  eventType: string;
  recipientEmail: string;
  status: EmailEventStatus;
  providerMessageId?: string;
  errorMessage?: string;
};

interface SendLifecycleEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
  eventType: string;
  bookingId: string;
}

interface SupabaseBooking {
  id: string;
  booking_reference: string;
  customer_email: string;
}

async function supabaseFetch<T = unknown>(path: string, init: RequestInit): Promise<T> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase environment variables are not configured.");
  }
  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}${path}`, {
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
  events: EmailDeliveryResult[]
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

function summarizeEmailStatus(events: EmailDeliveryResult[]) {
  const requiredEvents = events.filter((event) => event.status !== "skipped");
  if (requiredEvents.length === 0) return "skipped";
  const sentCount = requiredEvents.filter((event) => event.status === "sent").length;
  if (sentCount === requiredEvents.length) return "sent";
  if (sentCount > 0) return "partial";
  return "failed";
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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

export async function sendLifecycleEmail(params: SendLifecycleEmailParams): Promise<{
  status: "sent" | "failed" | "skipped";
  messageId?: string;
  error?: string;
}> {
  const { to, subject, html, text, eventType, bookingId } = params;

  let providerMessageId: string | undefined;
  let errorMessage: string | undefined;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
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

    providerMessageId = isRecord(payload) && typeof payload.id === "string" ? payload.id : undefined;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Email delivery failed.";
  }

  const event: EmailDeliveryResult = {
    eventType,
    recipientEmail: to,
    status: providerMessageId ? "sent" : "failed",
    providerMessageId,
    errorMessage,
  };

  await recordEmailEvent(bookingId, event);
  await updateBookingEmailStatus(bookingId, [event]);

  if (providerMessageId) {
    return { status: "sent", messageId: providerMessageId };
  } else {
    return { status: "failed", error: errorMessage };
  }
}