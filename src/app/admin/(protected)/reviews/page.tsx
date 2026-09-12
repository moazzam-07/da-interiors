'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Star, Send, Mail, MousePointer, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewStats {
  total: number;
  sent: number;
  clicked: number;
  reviewed: number;
}

interface ReviewRequest {
  id: string;
  booking_id: string;
  customer_email: string;
  customer_name: string;
  review_url: string | null;
  status: 'sent' | 'clicked' | 'reviewed' | 'pending';
  sent_at: string | null;
  clicked_at: string | null;
  created_at: string;
}

interface Booking {
  id: string;
  booking_reference: string;
  customer_name: string;
  customer_email: string;
  status: string;
  created_at: string;
}

export default function ReviewsPage() {
  const [stats, setStats] = useState<ReviewStats>({ total: 0, sent: 0, clicked: 0, reviewed: 0 });
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [sending, setSending] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const [requestsRes, bookingsRes] = await Promise.all([
        supabase.from('review_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('service_bookings').select('id, booking_reference, customer_name, customer_email, status, created_at')
          .eq('status', 'completed')
          .order('created_at', { ascending: false })
      ]);

      const reqData = requestsRes.data ?? [];
      setRequests(reqData);
      setBookings(bookingsRes.data ?? []);
      setStats({
        total: reqData.length,
        sent: reqData.filter(r => r.status === 'sent').length,
        clicked: reqData.filter(r => r.status === 'clicked').length,
        reviewed: reqData.filter(r => r.status === 'reviewed').length,
      });
      setLoading(false);
    }
    loadData();
  }, [supabase, refreshTrigger]);

  async function sendReviewRequest() {
    if (!selectedBooking) return;
    setSending(true);

    const { error } = await supabase.from('review_requests').insert({
      booking_id: selectedBooking.id,
      customer_email: selectedBooking.customer_email,
      customer_name: selectedBooking.customer_name,
      review_url: 'https://g.page/r/kydmah/review',
      status: 'sent',
      sent_at: new Date().toISOString(),
    });

    setSending(false);
    if (!error) {
      setShowSendModal(false);
      setSelectedBooking(null);
      setRefreshTrigger(t => t + 1);
    }
  }

  function getStatusConfig(status: string) {
    switch (status) {
      case 'sent': return { bg: '#e0f2fe', color: '#0369a1', icon: Mail };
      case 'clicked': return { bg: '#fef3c7', color: '#b45309', icon: MousePointer };
      case 'reviewed': return { bg: '#d1fae5', color: '#047857', icon: CheckCircle };
      default: return { bg: '#f3f4f6', color: '#374151', icon: Clock };
    }
  }

  const completedBookingsWithoutReview = bookings.filter(
    b => !requests.some(r => r.booking_id === b.id)
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reviews & Reputation</h1>
          <p className="page-subtitle">Manage customer review requests</p>
        </div>
        <button className="btn-primary" onClick={() => setShowSendModal(true)}>
          <Send className="w-4 h-4" />
          Send Review Request
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0369a1' }}>
            <Mail className="w-5 h-5" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.sent}</span>
            <span className="stat-label">Requests Sent</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
            <MousePointer className="w-5 h-5" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.clicked}</span>
            <span className="stat-label">Links Clicked</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#d1fae5', color: '#047857' }}>
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.reviewed}</span>
            <span className="stat-label">Reviews Received</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f3f4f6', color: '#374151' }}>
            <Clock className="w-5 h-5" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{completedBookingsWithoutReview.length}</span>
            <span className="stat-label">Pending Requests</span>
          </div>
        </div>
      </div>

      <div className="conversion-bar">
        <div className="conversion-segment" style={{ width: `${stats.total > 0 ? (stats.sent / stats.total) * 100 : 0}%`, background: '#0369a1' }} />
        <div className="conversion-segment" style={{ width: `${stats.total > 0 ? (stats.clicked / stats.total) * 100 : 0}%`, background: '#b45309' }} />
        <div className="conversion-segment" style={{ width: `${stats.total > 0 ? (stats.reviewed / stats.total) * 100 : 0}%`, background: '#047857' }} />
      </div>
      <div className="conversion-legend">
        <span><i style={{ background: '#0369a1' }} />Sent</span>
        <span><i style={{ background: '#b45309' }} />Clicked</span>
        <span><i style={{ background: '#047857' }} />Reviewed</span>
      </div>

      <div className="requests-section">
        <h2 className="section-title">Review Requests</h2>
        <div className="requests-table-container">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Status</th>
                <th>Sent Date</th>
                <th>Review Link</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => {
                const config = getStatusConfig(req.status);
                const Icon = config.icon;
                return (
                  <tr key={req.id}>
                    <td className="customer-name">{req.customer_name}</td>
                    <td>{req.customer_email}</td>
                    <td>
                      <span className="status-pill" style={{ background: config.bg, color: config.color }}>
                        <Icon className="w-3 h-3" />
                        {req.status}
                      </span>
                    </td>
                    <td>{req.sent_at ? format(new Date(req.sent_at), 'MMM d, yyyy') : '—'}</td>
                    <td>
                      {req.review_url ? (
                        <a href={req.review_url} target="_blank" rel="noopener noreferrer" className="review-link">
                          <Star className="w-3 h-3" />
                          Leave Review
                        </a>
                      ) : '—'}
                    </td>
                  </tr>
                );
              })}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-state">No review requests sent yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showSendModal && (
        <div className="modal-overlay" onClick={() => setShowSendModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Send Review Request</h2>
            <p className="modal-subtitle">Select a completed booking to send a review request.</p>
            <div className="bookings-list">
              {completedBookingsWithoutReview.length === 0 ? (
                <p className="no-bookings">All completed bookings have review requests.</p>
              ) : (
                completedBookingsWithoutReview.map(booking => (
                  <div
                    key={booking.id}
                    className={`booking-item ${selectedBooking?.id === booking.id ? 'selected' : ''}`}
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <div className="booking-info">
                      <span className="booking-name">{booking.customer_name}</span>
                      <span className="booking-email">{booking.customer_email}</span>
                    </div>
                    <span className="booking-ref">{booking.booking_reference}</span>
                  </div>
                ))
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowSendModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={sendReviewRequest} disabled={!selectedBooking || sending}>
                {sending ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}

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
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--admin-gradient);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-primary:hover { opacity: 0.9; }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--admin-surface-container-low);
          color: var(--admin-on-surface);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-content { display: flex; flex-direction: column; }
        .stat-value {
          font-family: var(--font-manrope);
          font-size: 24px;
          font-weight: 800;
          color: var(--admin-on-surface);
        }
        .stat-label {
          font-size: 12px;
          color: var(--admin-on-surface-variant);
          margin-top: 2px;
        }
        .conversion-bar {
          display: flex;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          background: var(--admin-surface-container-low);
          margin-bottom: 8px;
        }
        .conversion-segment { height: 100%; }
        .conversion-legend {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
          font-size: 12px;
          color: var(--admin-on-surface-variant);
        }
        .conversion-legend i {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 3px;
          margin-right: 6px;
        }
        .section-title {
          font-family: var(--font-manrope);
          font-size: 18px;
          font-weight: 800;
          color: var(--admin-on-surface);
          margin: 0 0 16px;
        }
        .requests-table-container {
          background: var(--admin-surface-container-lowest);
          border-radius: 16px;
          border: 1px solid var(--admin-outline-variant);
          overflow: hidden;
        }
        .requests-table {
          width: 100%;
          border-collapse: collapse;
        }
        .requests-table th {
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
        .requests-table td {
          padding: 14px 20px;
          font-size: 13px;
          color: var(--admin-on-surface);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .requests-table tbody tr:hover { background: var(--admin-surface-container-low); }
        .requests-table tbody tr:last-child td { border-bottom: none; }
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          text-transform: capitalize;
        }
        .customer-name { font-weight: 600; }
        .review-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--admin-primary);
          text-decoration: none;
          font-weight: 600;
        }
        .review-link:hover { text-decoration: underline; }
        .empty-state {
          text-align: center;
          padding: 48px;
          color: var(--admin-on-surface-variant);
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }
        .modal {
          background: var(--admin-surface-container-lowest);
          border-radius: 20px;
          width: 100%;
          max-width: 500px;
          padding: 24px;
        }
        .modal h2 {
          font-family: var(--font-manrope);
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 8px;
        }
        .modal-subtitle {
          font-size: 14px;
          color: var(--admin-on-surface-variant);
          margin: 0 0 20px;
        }
        .bookings-list {
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid var(--admin-outline-variant);
          border-radius: 12px;
        }
        .booking-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid var(--admin-outline-variant);
          cursor: pointer;
          transition: background 0.15s;
        }
        .booking-item:last-child { border-bottom: none; }
        .booking-item:hover { background: var(--admin-surface-container-low); }
        .booking-item.selected { background: var(--admin-primary-container); }
        .booking-info { display: flex; flex-direction: column; gap: 2px; }
        .booking-name { font-weight: 600; font-size: 14px; }
        .booking-email { font-size: 12px; color: var(--admin-on-surface-variant); }
        .booking-ref { font-family: monospace; font-size: 12px; color: var(--admin-primary); }
        .no-bookings { text-align: center; padding: 32px; color: var(--admin-on-surface-variant); }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
        }
        .loading { padding: 64px; text-align: center; color: var(--admin-on-surface-variant); }
      `}</style>
    </>
  );
}
