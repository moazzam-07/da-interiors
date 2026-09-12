import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { StatusPill } from '@/components/admin/StatusPill';
import { format } from 'date-fns';
import { Calendar, Clock, User, Phone, Mail, MapPin, FileText, Users, History, DollarSign } from 'lucide-react';
import { OrderActions } from './OrderActions';
import { AdminNotesForm } from './AdminNotesForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from('service_bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !order) {
    notFound();
  }

  const [{ data: assignments }, { data: statusHistory }, { data: staff }] = await Promise.all([
    supabase
      .from('booking_assignments')
      .select('*, staff:staff(*)')
      .eq('booking_id', id),
    supabase
      .from('booking_status_history')
      .select('*')
      .eq('booking_id', id)
      .order('created_at', { ascending: true }),
    supabase
      .from('staff')
      .select('*')
      .eq('status', 'active'),
  ]);

  const assignedStaff = assignments?.map((a: any) => a.staff).filter(Boolean) ?? [];

  return (
    <>
      <div className="order-detail">
        <div className="order-header">
          <div className="order-header-left">
            <a href="/admin/orders" className="back-link">← Back to Orders</a>
            <div className="order-title-row">
              <h1 className="order-title">{order.booking_reference}</h1>
              <StatusPill status={order.status} />
            </div>
            <p className="order-date">
              Created {format(new Date(order.created_at), 'MMMM d, yyyy \'at\' h:mm a')}
            </p>
          </div>
          <div className="order-header-right">
            <OrderActions orderId={order.id} currentStatus={order.status} />
          </div>
        </div>

        <div className="order-grid">
          <div className="order-main">
            <div className="detail-card">
              <div className="detail-card-header">
                <h2 className="detail-card-title">
                  <FileText className="w-5 h-5" />
                  Service Details
                </h2>
              </div>
              <div className="detail-card-body">
                <div className="detail-row">
                  <span className="detail-label">Services</span>
                  <div className="services-list">
                    {order.selected_services?.map((service: string, i: number) => (
                      <span key={i} className="service-tag">{service}</span>
                    ))}
                  </div>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <Calendar className="w-4 h-4" /> Preferred Date
                  </span>
                  <span className="detail-value">{order.preferred_date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <Clock className="w-4 h-4" /> Preferred Time
                  </span>
                  <span className="detail-value">{order.preferred_time}</span>
                </div>
                {order.customer_notes && (
                  <div className="detail-row">
                    <span className="detail-label">Customer Notes</span>
                    <span className="detail-value notes">{order.customer_notes}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-card-header">
                <h2 className="detail-card-title">
                  <History className="w-5 h-5" />
                  Status History
                </h2>
              </div>
              <div className="detail-card-body">
                {statusHistory && statusHistory.length > 0 ? (
                  <div className="timeline">
                    {statusHistory.map((entry: any) => (
                      <div key={entry.id} className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                          <div className="timeline-status">
                            <StatusPill status={entry.to_status} />
                          </div>
                          <span className="timeline-date">
                            {format(new Date(entry.created_at), 'MMM d, yyyy \'at\' h:mm a')}
                          </span>
                          {entry.notes && (
                            <p className="timeline-notes">{entry.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-message">No status history yet</p>
                )}
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-card-header">
                <h2 className="detail-card-title">
                  <Users className="w-5 h-5" />
                  Assigned Staff
                </h2>
              </div>
              <div className="detail-card-body">
                {assignedStaff.length > 0 ? (
                  <div className="staff-list">
                    {assignedStaff.map((member: any) => (
                      <div key={member.id} className="staff-item">
                        <div className="staff-avatar">
                          {member.name?.charAt(0).toUpperCase() ?? 'S'}
                        </div>
                        <div className="staff-info">
                          <span className="staff-name">{member.name}</span>
                          <span className="staff-role">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-message">No staff assigned yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="order-sidebar">
            <div className="detail-card">
              <div className="detail-card-header">
                <h2 className="detail-card-title">
                  <User className="w-5 h-5" />
                  Customer Info
                </h2>
              </div>
              <div className="detail-card-body">
                <div className="detail-row">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">{order.customer_name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <Phone className="w-4 h-4" /> Phone
                  </span>
                  <a href={`tel:${order.customer_phone}`} className="detail-link">
                    {order.customer_phone}
                  </a>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <Mail className="w-4 h-4" /> Email
                  </span>
                  <a href={`mailto:${order.customer_email}`} className="detail-link">
                    {order.customer_email}
                  </a>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <MapPin className="w-4 h-4" /> Address
                  </span>
                  <span className="detail-value">{order.service_address}</span>
                </div>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-card-header">
                <h2 className="detail-card-title">
                  <DollarSign className="w-5 h-5" />
                  Pricing
                </h2>
              </div>
              <div className="detail-card-body">
                <div className="detail-row">
                  <span className="detail-label">Quoted Amount</span>
                  <span className="detail-value">
                    {order.quoted_amount ? `$${order.quoted_amount.toFixed(2)}` : '-'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Final Amount</span>
                  <span className="detail-value final-amount">
                    {order.final_amount ? `$${order.final_amount.toFixed(2)}` : '-'}
                  </span>
                </div>
                {order.lead_source && (
                  <div className="detail-row">
                    <span className="detail-label">Lead Source</span>
                    <span className="detail-value">{order.lead_source}</span>
                  </div>
                )}
              </div>
            </div>

            <AdminNotesForm
              orderId={order.id}
              initialNotes={order.admin_notes ?? ''}
              initialQuoted={order.quoted_amount}
              initialFinal={order.final_amount}
              initialLeadSource={order.lead_source ?? ''}
            />
          </div>
        </div>
      </div>

      <style>{`
        .order-detail {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .order-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .back-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--admin-outline);
          text-decoration: none;
          margin-bottom: 12px;
          display: inline-block;
        }
        .back-link:hover {
          color: var(--admin-primary);
        }
        .order-title-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 8px;
        }
        .order-title {
          font-family: var(--font-manrope);
          font-size: 28px;
          font-weight: 800;
          color: var(--admin-on-surface);
          letter-spacing: -0.02em;
        }
        .order-date {
          font-size: 13px;
          color: var(--admin-on-surface-variant);
        }
        .order-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .order-grid {
            grid-template-columns: 1fr;
          }
        }
        .order-main {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .order-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .detail-card {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          overflow: hidden;
        }
        .detail-card-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--admin-outline-variant);
          background: var(--admin-surface-container-low);
        }
        .detail-card-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-manrope);
          font-size: 14px;
          font-weight: 700;
          color: var(--admin-on-surface);
        }
        .detail-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .detail-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .detail-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--admin-outline);
        }
        .detail-value {
          font-size: 14px;
          color: var(--admin-on-surface);
          font-weight: 500;
        }
        .detail-value.notes {
          font-style: italic;
          color: var(--admin-on-surface-variant);
        }
        .detail-value.final-amount {
          font-family: var(--font-manrope);
          font-size: 18px;
          font-weight: 800;
          color: var(--admin-primary);
        }
        .detail-link {
          font-size: 14px;
          color: var(--admin-primary);
          text-decoration: none;
          font-weight: 500;
        }
        .detail-link:hover {
          text-decoration: underline;
        }
        .services-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .service-tag {
          padding: 6px 12px;
          background: var(--admin-surface-container-low);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          color: var(--admin-on-surface);
        }
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: var(--admin-outline-variant);
        }
        .timeline-item {
          display: flex;
          gap: 16px;
          padding-bottom: 20px;
          position: relative;
        }
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        .timeline-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--admin-gradient);
          border: 3px solid var(--admin-surface-container-lowest);
          flex-shrink: 0;
          z-index: 1;
        }
        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: -2px;
        }
        .timeline-date {
          font-size: 12px;
          color: var(--admin-outline);
        }
        .timeline-notes {
          font-size: 13px;
          color: var(--admin-on-surface-variant);
          margin-top: 4px;
        }
        .staff-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .staff-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: var(--admin-surface-container-low);
          border-radius: 12px;
        }
        .staff-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--admin-gradient);
          color: white;
          font-family: var(--font-manrope);
          font-weight: 800;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .staff-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .staff-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--admin-on-surface);
        }
        .staff-role {
          font-size: 12px;
          color: var(--admin-outline);
          text-transform: capitalize;
        }
        .empty-message {
          font-size: 13px;
          color: var(--admin-outline);
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </>
  );
}
