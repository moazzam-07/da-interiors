import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const dateFrom = searchParams.get('date_from') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const dateTo = searchParams.get('date_to') || new Date().toISOString().split('T')[0];

    const { data: bookings, error } = await supabase
      .from('service_bookings')
      .select('*')
      .gte('created_at', dateFrom)
      .lte('created_at', dateTo + 'T23:59:59');

    if (error) throw error;

    const totalOrders = bookings?.length ?? 0;
    const completedOrders = bookings?.filter(b => b.status === 'completed').length ?? 0;
    const cancelledOrders = bookings?.filter(b => b.status === 'cancelled').length ?? 0;
    const totalRevenue = bookings?.reduce((sum, b) => sum + (b.final_amount ?? 0), 0) ?? 0;

    const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;
    const cancellationRate = totalOrders > 0 ? Math.round((cancelledOrders / totalOrders) * 100) : 0;
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    const serviceLabels: Record<string, string> = {
      'ac-maintenance': 'AC Maintenance',
      'deep-cleaning': 'Deep Cleaning',
      plumbing: 'Plumbing',
      electrical: 'Electrical',
      'general-maintenance': 'General Maintenance',
      painting: 'Painting',
    };

    const ordersByService: Record<string, number> = {};
    for (const booking of bookings ?? []) {
      const services = booking.selected_services ?? [];
      for (const service of services) {
        const label = serviceLabels[service] ?? service;
        ordersByService[label] = (ordersByService[label] ?? 0) + 1;
      }
    }

    const ordersByServiceArray = Object.entries(ordersByService).map(([name, count]) => ({ name, count }));

    const ordersByStatus = [
      { name: 'New', count: bookings?.filter(b => b.status === 'new').length ?? 0 },
      { name: 'Needs Review', count: bookings?.filter(b => b.status === 'needs_review').length ?? 0 },
      { name: 'Confirmed', count: bookings?.filter(b => b.status === 'confirmed').length ?? 0 },
      { name: 'In Progress', count: bookings?.filter(b => b.status === 'in_progress').length ?? 0 },
      { name: 'Completed', count: bookings?.filter(b => b.status === 'completed').length ?? 0 },
      { name: 'Cancelled', count: bookings?.filter(b => b.status === 'cancelled').length ?? 0 },
    ];

    const customerRevenue = new Map<string, { name: string; email: string; revenue: number }>();
    for (const booking of bookings ?? []) {
      if (!booking.customer_email) continue;
      const existing = customerRevenue.get(booking.customer_email);
      const amount = booking.final_amount ?? 0;
      if (existing) {
        existing.revenue += amount;
      } else {
        customerRevenue.set(booking.customer_email, {
          name: booking.customer_name,
          email: booking.customer_email,
          revenue: amount,
        });
      }
    }

    const topCustomers = Array.from(customerRevenue.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    const revenueByDate = new Map<string, number>();
    for (const booking of bookings ?? []) {
      if (!booking.final_amount) continue;
      const date = booking.created_at.split('T')[0];
      revenueByDate.set(date, (revenueByDate.get(date) ?? 0) + booking.final_amount);
    }

    const revenueTimeline = Array.from(revenueByDate.entries())
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return Response.json({
      ok: true,
      kpis: {
        totalOrders,
        completionRate,
        cancellationRate,
        avgOrderValue,
        totalRevenue,
      },
      ordersByService: ordersByServiceArray,
      ordersByStatus,
      topCustomers,
      revenueTimeline,
      dateRange: { from: dateFrom, to: dateTo },
    });
  } catch (error) {
    console.error('Reports API error:', error);
    return Response.json({ ok: false, error: 'Failed to fetch reports' }, { status: 500 });
  }
}
