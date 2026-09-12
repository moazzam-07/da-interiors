import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function CustomersPage() {
  const supabase = await createClient();

  const { data: bookings } = await supabase
    .from('service_bookings')
    .select('customer_name, customer_email, customer_phone, created_at, final_amount, status')
    .order('created_at', { ascending: false });

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
      if (booking.status === 'completed' && booking.final_amount) {
        existing.total_spend += booking.final_amount;
      }
    } else {
      customerMap.set(email, {
        email,
        name: booking.customer_name,
        phone: booking.customer_phone,
        total_bookings: 1,
        last_booking_date: booking.created_at,
        total_spend: booking.status === 'completed' ? (booking.final_amount ?? 0) : 0,
      });
    }
  }

  const customers = Array.from(customerMap.values()).sort(
    (a, b) => new Date(b.last_booking_date).getTime() - new Date(a.last_booking_date).getTime()
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">{customers.length} unique customers</p>
        </div>
      </div>

      <div className="customers-table-container">
        <div className="customers-table-wrap">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Bookings</th>
              <th>Total Spend</th>
              <th>Last Booking</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.email}>
                <td className="customer-name">{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone || '—'}</td>
                <td>{customer.total_bookings}</td>
                <td>${customer.total_spend.toFixed(2)}</td>
                <td>{format(new Date(customer.last_booking_date), 'MMM d, yyyy')}</td>
                <td>
                  <Link href={`/admin/customers/${encodeURIComponent(customer.email)}`} className="view-link">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={7} className="empty-state">No customers found</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      <div className="customer-cards">
        {customers.map((customer) => (
          <div key={customer.email} className="customer-card">
            <div className="customer-card-header">
              <span className="customer-card-name">{customer.name}</span>
              <Link href={`/admin/customers/${encodeURIComponent(customer.email)}`} className="view-link">
                View
              </Link>
            </div>
            <div className="customer-card-row">
              <span className="customer-card-label">Email</span>
              <span className="customer-card-value">{customer.email}</span>
            </div>
            <div className="customer-card-row">
              <span className="customer-card-label">Phone</span>
              <span className="customer-card-value">{customer.phone || '—'}</span>
            </div>
            <div className="customer-card-row">
              <span className="customer-card-label">Bookings</span>
              <span className="customer-card-value">{customer.total_bookings}</span>
            </div>
            <div className="customer-card-row">
              <span className="customer-card-label">Total Spend</span>
              <span className="customer-card-value">${customer.total_spend.toFixed(2)}</span>
            </div>
            <div className="customer-card-row">
              <span className="customer-card-label">Last Booking</span>
              <span className="customer-card-value">{format(new Date(customer.last_booking_date), 'MMM d, yyyy')}</span>
            </div>
          </div>
        ))}
        {customers.length === 0 && (
          <div className="empty-state">No customers found</div>
        )}
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
        .customers-table-container {
          background: var(--admin-surface-container-lowest);
          border-radius: 16px;
          border: 1px solid var(--admin-outline-variant);
          overflow: hidden;
          position: relative;
        }
        .customers-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .customers-table-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to right, transparent, var(--admin-surface-container-lowest));
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .customers-table-wrap.scroll-hint::after {
          opacity: 1;
        }
        .customers-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
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
          padding: 16px 20px;
          font-size: 14px;
          color: var(--admin-on-surface);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .customers-table tbody tr:last-child td {
          border-bottom: none;
        }
        .customers-table tbody tr:hover {
          background: var(--admin-surface-container-low);
        }
        .customer-name {
          font-weight: 600;
        }
        .view-link {
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          background: var(--admin-gradient);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          transition: opacity 0.15s;
          cursor: pointer;
        }
        .view-link:hover {
          opacity: 0.9;
        }
        .view-link:active {
          transform: scale(0.95);
        }
        .empty-state {
          text-align: center;
          padding: 48px 20px;
          color: var(--admin-on-surface-variant);
        }
        @media (max-width: 640px) {
          .customers-table-container {
            background: transparent;
            border: none;
            border-radius: 0;
            margin: 0 -12px;
            padding: 0 12px;
          }
          .customers-table-wrap {
            display: none;
          }
          .customer-cards {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .customer-card {
            background: var(--admin-surface-container-lowest);
            border: 1px solid var(--admin-outline-variant);
            border-radius: 14px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .customer-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
          }
          .customer-card-name {
            font-weight: 700;
            font-size: 15px;
            color: var(--admin-on-surface);
          }
          .customer-card-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
          }
          .customer-card-label {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--admin-outline);
          }
          .customer-card-value {
            font-size: 13px;
            font-weight: 600;
            color: var(--admin-on-surface);
            text-align: right;
          }
          .customer-card-actions {
            display: flex;
            justify-content: flex-end;
            padding-top: 8px;
            border-top: 1px solid var(--admin-outline-variant);
          }
        }
        @media (min-width: 641px) {
          .customer-cards {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
