export interface EmailDetails {
  customerName: string;
  customerEmail: string;
  bookingReference: string;
  services: string[];
  date?: string;
  time?: string;
  address?: string;
  reason?: string;
  staffName?: string;
  staffRole?: string;
  finalAmount?: number;
  [key: string]: unknown;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
}): string {
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

export function buildCustomerBookingReceivedEmail(details: EmailDetails): { html: string; text: string } {
  const serviceList = details.services.join(", ");
  const text = [
    `Hi ${details.customerName},`,
    "",
    `We received your Kydmah booking request ${details.bookingReference}.`,
    `Services: ${serviceList}`,
    details.date && details.time ? `Preferred time: ${details.date} at ${details.time}` : "",
    details.address ? `Location: ${details.address}` : "",
    "",
    "Our team will review the request and contact you shortly to confirm the appointment.",
    "",
    "Thank you,",
    "Kydmah",
  ].filter(Boolean).join("\n");

  const rows: [string, string][] = [
    ["Reference", details.bookingReference],
    ["Services", serviceList],
  ];
  if (details.date && details.time) {
    rows.push(["Preferred time", `${details.date} at ${details.time}`]);
  }
  rows.push(["Location", details.address || "To be confirmed"]);

  return {
    text,
    html: emailShell({
      eyebrow: "Booking request received",
      title: `Thank you, ${details.customerName}.`,
      body: "We received your service request. Our team will review the details and contact you shortly to confirm the appointment.",
      rows,
    }),
  };
}

export function buildBookingConfirmedEmail(details: EmailDetails): { html: string; text: string } {
  const serviceList = details.services.join(", ");
  const text = [
    `Hi ${details.customerName},`,
    "",
    `Great news! Your Kydmah booking ${details.bookingReference} has been confirmed.`,
    `Services: ${serviceList}`,
    details.date && details.time ? `Scheduled for: ${details.date} at ${details.time}` : "",
    details.address ? `Location: ${details.address}` : "",
    "",
    "Our team is ready to serve you. Please ensure someone is available at the location at the scheduled time.",
    "",
    "Thank you for choosing Kydmah.",
    "Kydmah",
  ].filter(Boolean).join("\n");

  const rows: [string, string][] = [
    ["Reference", details.bookingReference],
    ["Services", serviceList],
  ];
  if (details.date && details.time) {
    rows.push(["Scheduled for", `${details.date} at ${details.time}`]);
  }
  rows.push(["Location", details.address || "To be confirmed"]);

  return {
    text,
    html: emailShell({
      eyebrow: "Booking confirmed",
      title: `You're all set, ${details.customerName}!`,
      body: "Great news! Your booking has been confirmed. Our team is ready to serve you at the scheduled time.",
      rows,
    }),
  };
}

export function buildBookingCancelledEmail(details: EmailDetails): { html: string; text: string } {
  const serviceList = details.services.join(", ");
  const cancellationNote = details.reason
    ? `Reason: ${details.reason}`
    : "No reason provided.";

  const text = [
    `Hi ${details.customerName},`,
    "",
    `Your Kydmah booking ${details.bookingReference} has been cancelled.`,
    `Services: ${serviceList}`,
    "",
    cancellationNote,
    "",
    "We're sorry this didn't work out. If you have any questions or would like to rebook, please don't hesitate to contact us.",
    "",
    "Best regards,",
    "Kydmah",
  ].filter(Boolean).join("\n");

  return {
    text,
    html: emailShell({
      eyebrow: "Booking cancelled",
      title: `Booking Cancelled - ${details.bookingReference}`,
      body: `Your booking has been cancelled. ${details.reason ? `Reason: ${details.reason}` : "If you have any questions, please contact us."}`,
      rows: [
        ["Reference", details.bookingReference],
        ["Services", serviceList],
        ["Cancellation reason", details.reason || "Not specified"],
      ],
    }),
  };
}

export function buildStaffAssignedEmail(details: EmailDetails): { html: string; text: string } {
  const serviceList = details.services.join(", ");
  const staffInfo = details.staffName
    ? `${details.staffName}${details.staffRole ? ` (${details.staffRole})` : ""}`
    : "A team member";

  const text = [
    `Hi ${details.customerName},`,
    "",
    `Your Kydmah booking ${details.bookingReference} has been assigned to a team member.`,
    `Assigned to: ${staffInfo}`,
    `Services: ${serviceList}`,
    details.date && details.time ? `Scheduled for: ${details.date} at ${details.time}` : "",
    details.address ? `Location: ${details.address}` : "",
    "",
    "Please ensure someone is available at the location to receive our team.",
    "",
    "Thank you,",
    "Kydmah",
  ].filter(Boolean).join("\n");

  const rows: [string, string][] = [
    ["Reference", details.bookingReference],
    ["Assigned to", staffInfo],
    ["Services", serviceList],
  ];
  if (details.date && details.time) {
    rows.push(["Scheduled for", `${details.date} at ${details.time}`]);
  }
  rows.push(["Location", details.address || "To be confirmed"]);

  return {
    text,
    html: emailShell({
      eyebrow: "Team member assigned",
      title: `${details.staffName || "A team member"} is on the way!`,
      body: `Your booking has been assigned to ${staffInfo}. Please ensure someone is available at the location at the scheduled time.`,
      rows,
    }),
  };
}

export function buildWorkStartedEmail(details: EmailDetails): { html: string; text: string } {
  const serviceList = details.services.join(", ");

  const text = [
    `Hi ${details.customerName},`,
    "",
    `Good news! Work has started on your Kydmah booking ${details.bookingReference}.`,
    `Services: ${serviceList}`,
    details.date && details.time ? `Started: ${details.date} at ${details.time}` : "",
    details.address ? `Location: ${details.address}` : "",
    "",
    "Our team is on-site and working diligently to complete your service. We'll notify you when the work is finished.",
    "",
    "Thank you for your patience.",
    "Kydmah",
  ].filter(Boolean).join("\n");

  const rows: [string, string][] = [
    ["Reference", details.bookingReference],
    ["Services", serviceList],
  ];
  if (details.date && details.time) {
    rows.push(["Started on", `${details.date} at ${details.time}`]);
  }
  rows.push(["Location", details.address || "To be confirmed"]);

  return {
    text,
    html: emailShell({
      eyebrow: "Work has started",
      title: `Work is underway, ${details.customerName}!`,
      body: "Our team has arrived and started work on your booking. We'll notify you once the work is complete.",
      rows,
    }),
  };
}

export function buildWorkCompletedEmail(details: EmailDetails): { html: string; text: string } {
  const serviceList = details.services.join(", ");
  const amountStr = details.finalAmount != null ? `${details.finalAmount} OMR` : "To be determined";

  const text = [
    `Hi ${details.customerName},`,
    "",
    `Great news! Work on your Kydmah booking ${details.bookingReference} has been completed.`,
    `Services completed: ${serviceList}`,
    details.date ? `Completed on: ${details.date}` : "",
    details.address ? `Location: ${details.address}` : "",
    "",
    `Final amount: ${amountStr}`,
    "",
    "We hope you're satisfied with the work. If you have any feedback or concerns, please let us know.",
    "",
    "Thank you for choosing Kydmah!",
    "Kydmah",
  ].filter(Boolean).join("\n");

  const rows: [string, string][] = [
    ["Reference", details.bookingReference],
    ["Services completed", serviceList],
  ];
  if (details.date) {
    rows.push(["Completed on", details.date]);
  }
  rows.push(["Final amount", amountStr]);

  return {
    text,
    html: emailShell({
      eyebrow: "Work completed",
      title: `All done, ${details.customerName}!`,
      body: "Great news! Your service has been completed. We hope you're satisfied with the work.",
      rows,
    }),
  };
}

export function buildReviewRequestEmail(details: EmailDetails): { html: string; text: string } {
  const serviceList = details.services.join(", ");

  const text = [
    `Hi ${details.customerName},`,
    "",
    `Thank you for choosing Kydmah! We hope you enjoyed your service experience.`,
    `Booking: ${details.bookingReference}`,
    `Services: ${serviceList}`,
    "",
    "We'd love to hear your feedback! Please take a moment to share your experience:",
    "",
    "Leave a Google Review: https://g.page/r/kydmah/review",
    "",
    "Your feedback helps us improve and assists other customers in making informed decisions.",
    "",
    "Thank you!",
    "Kydmah",
  ].filter(Boolean).join("\n");

  return {
    text,
    html: `
    <div style="margin:0;padding:32px;background:#f5faf9;font-family:Arial,sans-serif;color:#11302f;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dfeceb;border-radius:24px;overflow:hidden;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#00696b,#00ced1);color:white;">
          <p style="margin:0 0 8px;text-transform:uppercase;letter-spacing:0.18em;font-size:12px;font-weight:700;">We value your feedback</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">How was your experience?</h1>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#45615f;">Thank you for choosing Kydmah! We hope you enjoyed your service experience. Your feedback helps us improve and assists other customers in making informed decisions.</p>
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #edf3f2;color:#6d8582;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;">Reference</td>
                <td style="padding:14px 0;border-top:1px solid #edf3f2;text-align:right;font-weight:700;color:#11302f;">${escapeHtml(details.bookingReference)}</td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-top:1px solid #edf3f2;color:#6d8582;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;">Services</td>
                <td style="padding:14px 0;border-top:1px solid #edf3f2;text-align:right;font-weight:700;color:#11302f;">${escapeHtml(serviceList)}</td>
              </tr>
            </tbody>
          </table>
          <div style="margin-top:32px;text-align:center;">
            <a href="https://g.page/r/kydmah/review" style="display:inline-block;padding:16px 32px;background:linear-gradient(135deg,#00696b,#00ced1);color:white;text-decoration:none;border-radius:12px;font-weight:700;font-size:16px;">Leave a Google Review</a>
          </div>
        </div>
      </div>
    </div>
  `,
  };
}