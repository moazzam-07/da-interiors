import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { StatusPill } from '@/components/admin/StatusPill';
import { ArrowLeft } from 'lucide-react';

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customerEmail = decodeURIComponent(id);
  const supabase = await createClient();

  const { data: bookings } = await supabase
    .from('service_bookings')
    .select('*')
    .eq('customer_email', customerEmail)
    .order('created_at', { ascending: false });

  if (!bookings || bookings.length === 0) {
    notFound();
  }

  const customer = {
    name: bookings[0].customer_name,
    email: customerEmail,
    phone: bookings[0].customer_phone,
  };

  const totalSpend = bookings.reduce((sum, b) => sum + (b.final_amount ?? 0), 0);
  const avgSpend = bookings.length > 0 ? totalSpend / bookings.length : 0;

  return (
    <>
      <div className="page-header">
        <Link href="/admin/customers" className="back-link">
          <ArrowLeft className="w-4 h-4" />
          Back to Customers
        </Link>
      </div>

      <div className="customer-profile-card">
        <div className="profile-avatar">
          {customer.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{customer.name}</h1>
          <p className="profile-email">{customer.email}</p>
          {customer.phone && <p className="profile-phone">{customer.phone}</p>}
        </div>
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">{bookings.length}</span>
            <span className="stat-label">Bookings</span>
          </div>
          <div className="stat">
            <span className="stat-value">${totalSpend.toFixed(2)}</span>
            <span className="stat-label">Total Spend</span>
          </div>
          <div className="stat">
            <span className="stat-value">${avgSpend.toFixed(2)}</span>
            <span className="stat-label">Avg Order</span>
          </div>
        </div>
      </div>

      <div className="bookings-section">
        <h2 className="section-title">Booking History</h2>
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Services</th>
                <th>Date</th>
                <th>Status</th>
                <th>Quoted</th>
                <th>Final</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="booking-ref">{booking.booking_reference}</td>
                  <td>{(booking.selected_services ?? []).join(', ')}</td>
                  <td>{format(new Date(booking.preferred_date), 'MMM d, yyyy')}</td>
                  <td><StatusPill status={booking.status} /></td>
                  <td>${(booking.quoted_amount ?? 0).toFixed(2)}</td>
                  <td>${(booking.final_amount ?? 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .page-header {
          margin-bottom: 24px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          color: var(--admin-on-surface-variant);
          text-decoration: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.15s;
        }
        .back-link:hover {
          background: var(--admin-surface-container-low);
          color: var(--admin-on-surface);
        }
        .customer-profile-card {
          background: var(--admin-surface-container-lowest);
          border-radius: 16px;
          border: 1px solid var(--admin-outline-variant);
          padding: 28px;
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
        }
        .profile-avatar {
          width: 64px;
          height: 64px;
          background: var(--admin-gradient);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: var(--font-manrope);
          font-size: 24px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .profile-info {
          flex: 1;
        }
        .profile-name {
          font-family: var(--font-manrope);
          font-size: 22px;
          font-weight: 800;
          color: var(--admin-on-surface);
          margin: 0 0 4px;
        }
        .profile-email {
          font-size: 14px;
          color: var(--admin-on-surface-variant);
          margin: 0 0 2px;
        }
        .profile-phone {
          font-size: 14px;
          color: var(--admin-on-surface-variant);
          margin: 0;
        }
        .profile-stats {
          display: flex;
          gap: 32px;
        }
        .stat {
          text-align: center;
        }
        .stat-value {
          display: block;
          font-family: var(--font-manrope);
          font-size: 20px;
          font-weight: 800;
          color: var(--admin-primary);
        }
        .stat-label {
          display: block;
          font-size: 11px;
          color: var(--admin-on-surface-variant);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 4px;
        }
        .section-title {
          font-family: var(--font-manrope);
          font-size: 18px;
          font-weight: 800;
          color: var(--admin-on-surface);
          margin: 0 0 16px;
        }
        .bookings-table-container {
          background: var(--admin-surface-container-lowest);
          border-radius: 16px;
          border: 1px solid var(--admin-outline-variant);
          overflow: hidden;
        }
        .bookings-table {
          width: 100%;
          border-collapse: collapse;
        }
        .bookings-table th {
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
        .bookings-table td {
          padding: 14px 20px;
          font-size: 13px;
          color: var(--admin-on-surface);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .bookings-table tbody tr:last-child td {
          border-bottom: none;
        }
        .bookings-table tbody tr:hover {
          background: var(--admin-surface-container-low);
        }
        .booking-ref {
          font-weight: 600;
          font-family: monospace;
        }
      `}</style>
    </>
  );
}
