import { createClient } from "@/lib/supabase/server";
import {
  buildBookingConfirmedEmail,
  buildBookingCancelledEmail,
  buildWorkStartedEmail,
  buildWorkCompletedEmail,
  type EmailDetails,
} from "@/lib/email/templates";
import { sendLifecycleEmail } from "@/lib/email/sender";

const VALID_TRANSITIONS: Record<string, string[]> = {
  new: ["needs_review", "confirmed", "cancelled"],
  needs_review: ["confirmed", "cancelled"],
  confirmed: ["assigned", "in_progress", "cancelled"],
  assigned: ["in_progress", "cancelled"],
  in_progress: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

const SERVICE_LABELS: Record<string, string> = {
  "ac-maintenance": "AC Maintenance",
  "deep-cleaning": "Deep Cleaning",
  plumbing: "Plumbing",
  electrical: "Electrical",
  "general-maintenance": "General Maintenance",
  painting: "Painting & Decorating",
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { newStatus, notes } = body as { newStatus: string; notes?: string };

    if (!newStatus) {
      return Response.json(
        { ok: false, error: "newStatus is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: booking, error: fetchError } = await supabase
      .from("service_bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !booking) {
      return Response.json(
        { ok: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    const currentStatus = booking.status;
    const allowedTransitions = VALID_TRANSITIONS[currentStatus] || [];
    if (!allowedTransitions.includes(newStatus)) {
      return Response.json(
        {
          ok: false,
          error: `Invalid status transition from '${currentStatus}' to '${newStatus}'. Allowed: ${allowedTransitions.join(", ") || "none"}`,
        },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      status: newStatus,
      updated_at: new Date().toISOString(),
    };

    if (newStatus === "completed") {
      updateData.completed_at = new Date().toISOString();
    } else if (newStatus === "cancelled") {
      updateData.cancelled_at = new Date().toISOString();
      if (notes) {
        updateData.cancelled_reason = notes;
      }
    }

    const { data: updatedBooking, error: updateError } = await supabase
      .from("service_bookings")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    await supabase.from("booking_status_history").insert({
      booking_id: id,
      from_status: currentStatus,
      to_status: newStatus,
      notes: notes || null,
    });

    const emailEventType = `status_change_${newStatus}`;

    try {
      const services = Array.isArray(booking.selected_services)
        ? booking.selected_services.map((s: string) => SERVICE_LABELS[s] ?? s)
        : [];

      const emailDetails: EmailDetails = {
        customerName: booking.customer_name || "Customer",
        customerEmail: booking.customer_email || "",
        bookingReference: booking.booking_reference || id,
        services,
        date: booking.preferred_date
          ? new Date(booking.preferred_date).toLocaleDateString("en-GB")
          : undefined,
        time: booking.preferred_time,
        address: booking.service_address || undefined,
        reason: newStatus === "cancelled" ? (notes || booking.cancelled_reason) : undefined,
        finalAmount: updatedBooking.final_amount
          ? Number(updatedBooking.final_amount)
          : undefined,
      };

      let emailTemplate: { html: string; text: string } | null = null;
      let subject = "";

      switch (newStatus) {
        case "confirmed":
          emailTemplate = buildBookingConfirmedEmail(emailDetails);
          subject = `Booking Confirmed - ${booking.booking_reference}`;
          break;
        case "cancelled":
          emailTemplate = buildBookingCancelledEmail(emailDetails);
          subject = `Booking Cancelled - ${booking.booking_reference}`;
          break;
        case "in_progress":
          emailTemplate = buildWorkStartedEmail(emailDetails);
          subject = `Work Started - ${booking.booking_reference}`;
          break;
        case "completed":
          emailTemplate = buildWorkCompletedEmail(emailDetails);
          subject = `Work Completed - ${booking.booking_reference}`;
          break;
      }

      if (emailTemplate && booking.customer_email) {
        await sendLifecycleEmail({
          to: booking.customer_email,
          subject,
          html: emailTemplate.html,
          text: emailTemplate.text,
          eventType: emailEventType,
          bookingId: id,
        });
      }
    } catch (emailError) {
      console.error("Failed to send lifecycle email:", emailError);
    }

    return Response.json({
      ok: true,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Status update error:", error);
    return Response.json(
      { ok: false, error: "Failed to update booking status" },
      { status: 500 }
    );
  }
}