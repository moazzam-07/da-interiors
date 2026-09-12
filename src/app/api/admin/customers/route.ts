import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: bookings, error } = await supabase
      .from('service_bookings')
      .select('customer_name, customer_email, customer_phone, created_at, final_amount, status')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const customerMap = new Map<string, {
      email: string;
      name: string;
      phone: string | null;
      total_bookings: number;
      last_booking_date: string;
      total_spend: number;
    }>();

    for (const booking of bookings ?? []) {
      const email = booking.customer_email;
      if (!email) continue;

      const existing = customerMap.get(email);
      if (existing) {
        existing.total_bookings += 1;
        if (new Date(booking.created_at) > new Date(existing.last_booking_date)) {
          existing.last_booking_date = booking.created_at;
        }
        if (booking.final_amount) {
          existing.total_spend += booking.final_amount;
        }
      } else {
        customerMap.set(email, {
          email,
          name: booking.customer_name,
          phone: booking.customer_phone,
          total_bookings: 1,
          last_booking_date: booking.created_at,
          total_spend: booking.final_amount ?? 0,
        });
      }
    }

    const customers = Array.from(customerMap.values()).sort(
      (a, b) => new Date(b.last_booking_date).getTime() - new Date(a.last_booking_date).getTime()
    );

    return Response.json({ ok: true, customers });
  } catch (error) {
    console.error('Customers API error:', error);
    return Response.json({ ok: false, error: 'Failed to fetch customers' }, { status: 500 });
  }
}
