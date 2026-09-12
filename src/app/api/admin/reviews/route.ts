import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: requests, error } = await supabase
      .from('review_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const stats = {
      total: requests?.length ?? 0,
      sent: requests?.filter(r => r.status === 'sent').length ?? 0,
      clicked: requests?.filter(r => r.status === 'clicked').length ?? 0,
      reviewed: requests?.filter(r => r.status === 'reviewed').length ?? 0,
    };

    return Response.json({ ok: true, requests, stats });
  } catch (error) {
    console.error('Reviews API error:', error);
    return Response.json({ ok: false, error: 'Failed to fetch review requests' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    if (!body.booking_id || !body.customer_email || !body.customer_name) {
      return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const reviewUrl = `https://g.page/r/kydmah/review?撰写评论`;

    const { data: reviewRequest, error } = await supabase
      .from('review_requests')
      .insert({
        booking_id: body.booking_id,
        customer_email: body.customer_email,
        customer_name: body.customer_name,
        review_url: reviewUrl,
        status: 'sent',
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    const emailResult = await sendReviewEmail({
      to: body.customer_email,
      customerName: body.customer_name,
      reviewUrl,
      bookingReference: body.booking_reference,
    });

    return Response.json({ ok: true, reviewRequest, email: emailResult }, { status: 201 });
  } catch (error) {
    console.error('Create review request error:', error);
    return Response.json({ ok: false, error: 'Failed to send review request' }, { status: 500 });
  }
}

async function sendReviewEmail({
  to,
  customerName,
  reviewUrl,
  bookingReference,
}: {
  to: string;
  customerName: string;
  reviewUrl: string;
  bookingReference?: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return { status: 'skipped', error: 'RESEND_API_KEY not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Kydmah <onboarding@resend.dev>',
        to: [to],
        subject: `We'd love your feedback${bookingReference ? ` - ${bookingReference}` : ''}`,
        html: buildReviewEmailHtml({ customerName, reviewUrl }),
        text: `Hi ${customerName},\n\nThank you for choosing Kydmah! We'd love to hear about your experience. Please take a moment to leave a review: ${reviewUrl}\n\nThank you!\nKydmah Team`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.status}`);
    }

    return { status: 'sent' };
  } catch (error) {
    console.error('Failed to send review email:', error);
    return { status: 'failed', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

function buildReviewEmailHtml({ customerName, reviewUrl }: { customerName: string; reviewUrl: string }) {
  return `
    <div style="margin:0;padding:32px;background:#f5faf9;font-family:Arial,sans-serif;color:#11302f;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dfeceb;border-radius:24px;overflow:hidden;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#00696b,#00ced1);color:white;">
          <p style="margin:0 0 8px;text-transform:uppercase;letter-spacing:0.18em;font-size:12px;font-weight:700;">We value your feedback</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">Hi ${escapeHtml(customerName)},</h1>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#45615f;">
            Thank you for choosing Kydmah! We hope you had a great experience with our service. 
            We'd love to hear your feedback — it only takes a minute.
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${escapeHtml(reviewUrl)}" style="display:inline-block;padding:16px 32px;background:linear-gradient(135deg,#00696b,#00ced1);color:white;text-decoration:none;border-radius:12px;font-weight:700;font-size:16px;">
              Leave a Review
            </a>
          </div>
          <p style="margin:0;font-size:14px;color:#6d8582;text-align:center;">
            Click the button above or copy this link: ${reviewUrl}
          </p>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
