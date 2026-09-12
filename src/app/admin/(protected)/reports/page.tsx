import { createClient } from '@/lib/supabase/server';
import { format, subDays } from 'date-fns';
import { ReportsCharts } from '@/components/admin/ReportsCharts';

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ date_from?: string; date_to?: string }>;
}) {
  const params = await searchParams;
  const today = new Date();
  const dateTo = params.date_to || format(today, 'yyyy-MM-dd');
  const dateFrom = params.date_from || format(subDays(today, 30), 'yyyy-MM-dd');

  const supabase = await createClient();

  const { data: bookings } = await supabase
    .from('service_bookings')
    .select('*')
    .gte('created_at', dateFrom)
    .lte('created_at', dateTo + 'T23:59:59');

  const bookingsData = bookings ?? [];

  const totalOrders = bookingsData.length;
  const completedBookings = bookingsData.filter(b => b.status === 'completed');
  const completedOrders = completedBookings.length;
  const cancelledOrders = bookingsData.filter(b => b.status === 'cancelled').length;
  const totalRevenue = completedBookings.reduce((sum, b) => sum + (b.final_amount ?? 0), 0);

  const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;
  const cancellationRate = totalOrders > 0 ? Math.round((cancelledOrders / totalOrders) * 100) : 0;
  const avgOrderValue = completedOrders > 0 ? Math.round(totalRevenue / completedOrders) : 0;

  const serviceLabels: Record<string, string> = {
    'ac-maintenance': 'AC Maintenance',
    'deep-cleaning': 'Deep Cleaning',
    plumbing: 'Plumbing',
    electrical: 'Electrical',
    'general-maintenance': 'General Maint.',
    painting: 'Painting',
  };

  const ordersByService: Record<string, number> = {};
  for (const booking of bookingsData) {
    const services = booking.selected_services ?? [];
    for (const service of services) {
      const label = serviceLabels[service] ?? service;
      ordersByService[label] = (ordersByService[label] ?? 0) + 1;
    }
  }

  const ordersByServiceArray = Object.entries(ordersByService)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const ordersByStatus = [
    { name: 'New', value: bookingsData.filter(b => b.status === 'new').length, fill: '#e0f2fe' },
    { name: 'Review', value: bookingsData.filter(b => b.status === 'needs_review').length, fill: '#fef3c7' },
    { name: 'Confirmed', value: bookingsData.filter(b => b.status === 'confirmed').length, fill: '#dbeafe' },
    { name: 'In Progress', value: bookingsData.filter(b => b.status === 'in_progress').length, fill: '#e0e7ff' },
    { name: 'Completed', value: bookingsData.filter(b => b.status === 'completed').length, fill: '#d1fae5' },
    { name: 'Cancelled', value: bookingsData.filter(b => b.status === 'cancelled').length, fill: '#fee2e2' },
  ];

  const customerRevenue = new Map<string, { name: string; email: string; revenue: number }>();
  for (const booking of bookingsData) {
    if (!booking.customer_email) continue;
    const existing = customerRevenue.get(booking.customer_email);
    const amount = booking.status === 'completed' ? (booking.final_amount ?? 0) : 0;
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

  return (
    <>
      <form className="page-header">
        <div>
          <h1 className="page-title">Reports & Earnings</h1>
          <p className="page-subtitle">Performance overview</p>
        </div>
        <div className="date-filters">
          <input type="date" name="date_from" defaultValue={dateFrom} />
          <span>to</span>
          <input type="date" name="date_to" defaultValue={dateTo} />
          <button type="submit" className="btn-secondary">Apply</button>
        </div>
      </form>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Total Orders</span>
          <span className="kpi-value">{totalOrders}</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Completion Rate</span>
          <span className="kpi-value" style={{ color: '#047857' }}>{completionRate}%</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Cancellation Rate</span>
          <span className="kpi-value" style={{ color: '#b91c1c' }}>{cancellationRate}%</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Avg Order Value</span>
          <span className="kpi-value">${avgOrderValue}</span>
        </div>
        <div className="kpi-card kpi-card-wide">
          <span className="kpi-label">Total Revenue</span>
          <span className="kpi-value" style={{ color: 'var(--admin-primary)' }}>${totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2 className="chart-title">Orders by Service</h2>
          <ReportsCharts ordersByServiceArray={ordersByServiceArray} />
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Orders by Status</h2>
          <div className="status-chart">
            {ordersByStatus.map(s => (
              <div key={s.name} className="status-row">
                <div className="status-info">
                  <span className="status-dot" style={{ background: s.fill }} />
                  <span className="status-name">{s.name}</span>
                </div>
                <span className="status-count">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="top-customers-section">
        <h2 className="section-title">Top Customers by Revenue</h2>
        <div className="customers-table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer, i) => (
                <tr key={customer.email}>
                  <td>
                    <div className="customer-rank">#{i + 1}</div>
                    {customer.name}
                  </td>
                  <td>{customer.email}</td>
                  <td className="revenue">${customer.revenue.toFixed(2)}</td>
                </tr>
              ))}
              {topCustomers.length === 0 && (
                <tr>
                  <td colSpan={3} className="empty-state">No customer data for this period</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }
        .page-title {
          font-family: var(--font-manrope);
          font-size: 28px;
          font-weight: 800;
          color: var(--admin-on-surface);
          margin: 0 0 4px;
        }
        .page-subtitle {
          font-size: 14px;
          color: var(--admin-on-surface-variant);
          margin: 0;
        }
        .date-filters {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .date-filters input {
          padding: 8px 12px;
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 8px;
          font-size: 14px;
          color: var(--admin-on-surface);
        }
        .date-filters span {
          color: var(--admin-on-surface-variant);
          font-size: 14px;
        }
        .btn-secondary {
          padding: 8px 16px;
          background: var(--admin-surface-container-low);
          color: var(--admin-on-surface);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .kpi-card {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .kpi-card-wide {
          grid-column: span 1;
        }
        .kpi-label {
          font-size: 12px;
          color: var(--admin-on-surface-variant);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }
        .kpi-value {
          font-family: var(--font-manrope);
          font-size: 28px;
          font-weight: 800;
          color: var(--admin-on-surface);
        }
        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }
        .chart-card {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          padding: 24px;
        }
        .chart-title {
          font-family: var(--font-manrope);
          font-size: 16px;
          font-weight: 800;
          color: var(--admin-on-surface);
          margin: 0 0 20px;
        }
        .chart-container { height: 300px; }
        .no-data {
          text-align: center;
          padding: 64px;
          color: var(--admin-on-surface-variant);
        }
        .status-chart { display: flex; flex-direction: column; gap: 12px; }
        .status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .status-row:last-child { border-bottom: none; }
        .status-info { display: flex; align-items: center; gap: 10px; }
        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 4px;
        }
        .status-name { font-size: 13px; color: var(--admin-on-surface); }
        .status-count {
          font-family: var(--font-manrope);
          font-size: 16px;
          font-weight: 700;
          color: var(--admin-on-surface);
        }
        .section-title {
          font-family: var(--font-manrope);
          font-size: 18px;
          font-weight: 800;
          color: var(--admin-on-surface);
          margin: 0 0 16px;
        }
        .customers-table-container {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          overflow: hidden;
        }
        .customers-table {
          width: 100%;
          border-collapse: collapse;
        }
        .customers-table th {
          text-align: left;
          padding: 14px 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--admin-on-surface-variant);
          background: var(--admin-surface-container-low);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .customers-table td {
          padding: 14px 20px;
          font-size: 13px;
          color: var(--admin-on-surface);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .customers-table tbody tr:hover { background: var(--admin-surface-container-low); }
        .customers-table tbody tr:last-child td { border-bottom: none; }
        .customer-rank {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: var(--admin-gradient);
          color: white;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          margin-right: 10px;
        }
        .revenue {
          font-family: var(--font-manrope);
          font-weight: 700;
          color: var(--admin-primary);
        }
        .empty-state {
          text-align: center;
          padding: 48px;
          color: var(--admin-on-surface-variant);
        }
      `}</style>
    </>
  );
}
