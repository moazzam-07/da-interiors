import { createClient } from '@/lib/supabase/server';
import { StatCard } from '@/components/admin/StatCard';
import { StatusPill } from '@/components/admin/StatusPill';
import { ShoppingCart, Clock, CheckCircle, DollarSign, Calendar } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const today = format(now, 'yyyy-MM-dd');

  const [
    { count: totalBookings },
    { count: pendingReview },
    { count: completedThisMonth },
    { data: revenueData },
    { data: recentBookings },
    { data: todaySchedule },
  ] = await Promise.all([
    supabase.from('service_bookings').select('*', { count: 'exact', head: true }),
    supabase.from('service_bookings').select('*', { count: 'exact', head: true }).eq('status', 'needs_review'),
    supabase.from('service_bookings').select('*', { count: 'exact', head: true }).eq('status', 'completed').gte('created_at', startOfMonth),
    supabase.from('service_bookings').select('final_amount').eq('status', 'completed').gte('created_at', startOfMonth),
    supabase.from('service_bookings').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('service_bookings').select('*').eq('preferred_date', today).order('preferred_time', { ascending: true }),
  ]);

  const totalRevenue = revenueData?.reduce((sum, r) => sum + (r.final_amount ?? 0), 0) ?? 0;

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back! Here&apos;s your operations overview.</p>
          </div>
          <div className="dashboard-date">
            <Calendar className="w-4 h-4" />
            <span>{format(now, 'EEEE, MMMM d, yyyy')}</span>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Total Bookings"
            value={totalBookings ?? 0}
            icon={ShoppingCart}
          />
          <StatCard
            title="Pending Review"
            value={pendingReview ?? 0}
            icon={Clock}
          />
          <StatCard
            title="Completed (This Month)"
            value={completedThisMonth ?? 0}
            icon={CheckCircle}
          />
          <StatCard
            title="Revenue (This Month)"
            value={`$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            icon={DollarSign}
          />
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Recent Bookings</h2>
              <Link href="/admin/orders" className="section-link">View all</Link>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Booking Ref</th>
                    <th>Customer</th>
                    <th>Services</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings?.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <Link href={`/admin/orders/${booking.id}`} className="booking-ref-link">
                          {booking.booking_reference}
                        </Link>
                      </td>
                      <td>{booking.customer_name}</td>
                      <td className="services-cell">
                        {booking.selected_services?.slice(0, 2).join(', ')}
                        {booking.selected_services?.length > 2 && ` +${booking.selected_services.length - 2}`}
                      </td>
                      <td>{format(new Date(booking.created_at), 'MMM d, h:mm a')}</td>
                      <td><StatusPill status={booking.status} /></td>
                    </tr>
                  ))}
                  {(!recentBookings || recentBookings.length === 0) && (
                    <tr>
                      <td colSpan={5} className="empty-cell">No bookings yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Today&apos;s Schedule</h2>
              <span className="section-count">{todaySchedule?.length ?? 0} bookings</span>
            </div>
            <div className="schedule-list">
              {todaySchedule?.map((booking) => (
                <div key={booking.id} className="schedule-item">
                  <div className="schedule-time">{booking.preferred_time}</div>
                  <div className="schedule-info">
                    <span className="schedule-customer">{booking.customer_name}</span>
                    <span className="schedule-services">
                      {booking.selected_services?.slice(0, 2).join(', ')}
                      {booking.selected_services?.length > 2 && ` +${booking.selected_services.length - 2}`}
                    </span>
                  </div>
                  <StatusPill status={booking.status} />
                </div>
              ))}
              {(!todaySchedule || todaySchedule.length === 0) && (
                <div className="schedule-empty">
                  <Clock className="w-8 h-8" />
                  <p>No bookings scheduled for today</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .dashboard-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .dashboard-title {
          font-family: var(--font-manrope);
          font-size: 28px;
          font-weight: 800;
          color: var(--admin-on-surface);
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .dashboard-subtitle {
          font-size: 14px;
          color: var(--admin-on-surface-variant);
        }
        .dashboard-date {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: var(--admin-on-surface-variant);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
        .dashboard-section {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          padding: 24px;
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .section-title {
          font-family: var(--font-manrope);
          font-size: 16px;
          font-weight: 700;
          color: var(--admin-on-surface);
        }
        .section-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--admin-primary);
          text-decoration: none;
        }
        .section-link:hover {
          text-decoration: underline;
        }
        .section-count {
          font-size: 13px;
          color: var(--admin-outline);
          font-weight: 500;
        }
        .table-container {
          overflow-x: auto;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        .data-table th {
          text-align: left;
          padding: 10px 12px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--admin-outline);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .data-table td {
          padding: 14px 12px;
          font-size: 13px;
          color: var(--admin-on-surface);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .data-table tr:last-child td {
          border-bottom: none;
        }
        .data-table tr:hover td {
          background: var(--admin-surface-container-low);
        }
        .booking-ref-link {
          font-family: var(--font-manrope);
          font-weight: 700;
          color: var(--admin-primary);
          text-decoration: none;
        }
        .booking-ref-link:hover {
          text-decoration: underline;
        }
        .services-cell {
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .empty-cell {
          text-align: center;
          color: var(--admin-outline);
          padding: 40px 12px !important;
        }
        .schedule-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .schedule-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px;
          background: var(--admin-surface-container-low);
          border-radius: 12px;
          transition: all 0.15s;
        }
        .schedule-item:hover {
          background: var(--admin-surface-container);
        }
        .schedule-time {
          font-family: var(--font-manrope);
          font-size: 13px;
          font-weight: 700;
          color: var(--admin-primary);
          min-width: 60px;
        }
        .schedule-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .schedule-customer {
          font-size: 13px;
          font-weight: 600;
          color: var(--admin-on-surface);
        }
        .schedule-services {
          font-size: 12px;
          color: var(--admin-on-surface-variant);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .schedule-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px 20px;
          color: var(--admin-outline);
          text-align: center;
        }
        .schedule-empty p {
          font-size: 13px;
        }
      `}</style>
    </>
  );
}
