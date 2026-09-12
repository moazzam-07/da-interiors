'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight, Eye, X } from 'lucide-react';
import { StatusPill } from '@/components/admin/StatusPill';

type BookingStatus = 'new' | 'needs_review' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  booking_reference: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  selected_services: string[];
  preferred_date: string;
  preferred_time: string;
  status: BookingStatus;
  quoted_amount: number | null;
  final_amount: number | null;
  created_at: string;
}

interface OrdersResponse {
  orders: Booking[];
  total: number;
  page: number;
  totalPages: number;
}

const STATUS_TABS: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'needs_review', label: 'Needs Review' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });
      if (status !== 'all') params.set('status', status);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/orders?${params}`);
      const data: OrdersResponse = await res.json();
      setOrders(data.orders);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  }, [page, status, search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setPage(1);
  };

  return (
    <>
      <div className="orders-page">
        <div className="orders-header">
          <div>
            <h1 className="orders-title">Orders</h1>
            <p className="orders-subtitle">{total} total bookings</p>
          </div>
        </div>

        <div className="orders-filters">
          <div className="status-tabs">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`status-tab ${status === tab.key ? 'active' : ''}`}
                onClick={() => handleStatusChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrap">
              <Search className="w-4 h-4" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by ref or customer name..."
                className="search-input"
              />
              {searchInput && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => { setSearchInput(''); setSearch(''); setPage(1); }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>

        <div className="orders-table-wrap">
          <div className="orders-table-wrap-inner">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Customer</th>
                <th>Services</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="loading-cell">Loading...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-cell">No orders found</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className="booking-ref">{order.booking_reference}</span>
                    </td>
                    <td>
                      <div className="customer-info">
                        <span className="customer-name">{order.customer_name}</span>
                        <span className="customer-phone">{order.customer_phone}</span>
                      </div>
                    </td>
                    <td className="services-cell">
                      {order.selected_services?.slice(0, 2).join(', ')}
                      {order.selected_services?.length > 2 && (
                        <span className="services-more">+{order.selected_services.length - 2} more</span>
                      )}
                    </td>
                    <td>
                      <div className="datetime-cell">
                        <span>{order.preferred_date}</span>
                        <span className="time">{order.preferred_time}</span>
                      </div>
                    </td>
                    <td><StatusPill status={order.status} /></td>
                    <td className="amount-cell">
                      {order.final_amount
                        ? `$${order.final_amount.toFixed(2)}`
                        : order.quoted_amount
                          ? `$${order.quoted_amount.toFixed(2)} (quoted)`
                          : '-'}
                    </td>
                    <td>
                      <a href={`/admin/orders/${order.id}`} className="action-btn view-btn">
                        <Eye className="w-4 h-4" />
                        View
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>

        <div className="orders-cards">
          {loading ? (
            <div className="order-card-empty">Loading...</div>
          ) : orders.length === 0 ? (
            <div className="order-card-empty">No orders found</div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <span className="order-card-ref">{order.booking_reference}</span>
                  <StatusPill status={order.status} />
                </div>
                <div className="order-card-row">
                  <span className="order-card-label">Customer</span>
                  <span className="order-card-value">{order.customer_name}</span>
                </div>
                <div className="order-card-row">
                  <span className="order-card-label">Phone</span>
                  <span className="order-card-value">{order.customer_phone}</span>
                </div>
                <div className="order-card-row">
                  <span className="order-card-label">Services</span>
                  <span className="order-card-value">
                    {order.selected_services?.slice(0, 2).join(', ')}
                    {order.selected_services?.length > 2 && ` +${order.selected_services.length - 2}`}
                  </span>
                </div>
                <div className="order-card-row">
                  <span className="order-card-label">Date & Time</span>
                  <span className="order-card-value">{order.preferred_date} {order.preferred_time}</span>
                </div>
                <div className="order-card-row">
                  <span className="order-card-label">Amount</span>
                  <span className="order-card-value">
                    {order.final_amount
                      ? `$${order.final_amount.toFixed(2)}`
                      : order.quoted_amount
                        ? `$${order.quoted_amount.toFixed(2)}`
                        : '-'}
                  </span>
                </div>
                <div className="order-card-actions">
                  <a href={`/admin/orders/${order.id}`} className="action-btn view-btn">
                    <Eye className="w-4 h-4" />
                    View
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>
            <div className="pagination-controls">
              <button
                className="pagination-btn"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                className="pagination-btn"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .orders-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .orders-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .orders-title {
          font-family: var(--font-manrope);
          font-size: 28px;
          font-weight: 800;
          color: var(--admin-on-surface);
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .orders-subtitle {
          font-size: 14px;
          color: var(--admin-on-surface-variant);
        }
        .orders-filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .status-tabs {
          display: flex;
          gap: 4px;
          background: var(--admin-surface-container-low);
          padding: 4px;
          border-radius: 12px;
        }
        .status-tab {
          padding: 8px 16px;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--admin-on-surface-variant);
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .status-tab:hover {
          color: var(--admin-on-surface);
        }
        .status-tab.active {
          background: white;
          color: var(--admin-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .search-form {
          display: flex;
          gap: 8px;
        }
        .search-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          border: 1px solid var(--admin-outline-variant);
          border-radius: 10px;
          padding: 0 14px;
          height: 42px;
          min-width: 280px;
          color: var(--admin-outline);
          transition: all 0.15s;
        }
        .search-input-wrap:focus-within {
          border-color: var(--admin-primary);
          box-shadow: 0 0 0 3px rgba(0, 105, 113, 0.08);
        }
        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 14px;
          font-family: var(--font-jakarta);
          color: var(--admin-on-surface);
        }
        .search-input::placeholder {
          color: var(--admin-outline);
        }
        .search-clear {
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          color: var(--admin-outline);
          display: flex;
          align-items: center;
          border-radius: 4px;
        }
        .search-clear:hover {
          color: var(--admin-on-surface);
          background: var(--admin-surface-container-low);
        }
        .search-btn {
          padding: 0 20px;
          height: 42px;
          background: var(--admin-gradient);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }
        .search-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 105, 113, 0.2);
        }
        .orders-table-wrap {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }
        .orders-table-wrap::after {
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
        .orders-table-wrap.scroll-hint::after {
          opacity: 1;
        }
        .orders-table-wrap-inner {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .orders-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }
        .orders-table th {
          text-align: left;
          padding: 14px 16px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--admin-outline);
          background: var(--admin-surface-container-low);
          border-bottom: 1px solid var(--admin-outline-variant);
        }
        .orders-table td {
          padding: 16px;
          font-size: 13px;
          color: var(--admin-on-surface);
          border-bottom: 1px solid var(--admin-outline-variant);
          vertical-align: middle;
        }
        .orders-table tr:last-child td {
          border-bottom: none;
        }
        .orders-table tr:hover td {
          background: var(--admin-surface-container-low);
        }
        .booking-ref {
          font-family: var(--font-manrope);
          font-weight: 700;
          color: var(--admin-primary);
        }
        .customer-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .customer-name {
          font-weight: 600;
        }
        .customer-phone {
          font-size: 12px;
          color: var(--admin-outline);
        }
        .services-cell {
          max-width: 180px;
        }
        .services-more {
          display: inline-block;
          margin-left: 4px;
          font-size: 11px;
          color: var(--admin-outline);
        }
        .datetime-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .datetime-cell .time {
          font-size: 12px;
          color: var(--admin-outline);
        }
        .amount-cell {
          font-weight: 600;
          white-space: nowrap;
        }
        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.15s;
        }
        .view-btn {
          background: var(--admin-surface-container-low);
          color: var(--admin-on-surface);
          border: 1px solid var(--admin-outline-variant);
        }
        .view-btn:hover {
          background: var(--admin-surface-container);
          border-color: var(--admin-outline);
        }
        .loading-cell,
        .empty-cell {
          text-align: center;
          color: var(--admin-outline);
          padding: 60px 16px !important;
        }
        .pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .pagination-info {
          font-size: 13px;
          color: var(--admin-outline);
        }
        .pagination-controls {
          display: flex;
          gap: 8px;
        }
        .pagination-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: white;
          border: 1px solid var(--admin-outline-variant);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: var(--admin-on-surface);
          cursor: pointer;
          transition: all 0.15s;
        }
        .pagination-btn:hover:not(:disabled) {
          background: var(--admin-surface-container-low);
          border-color: var(--admin-outline);
        }
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 1024px) {
          .orders-filters {
            flex-direction: column;
            align-items: stretch;
          }
          .status-tabs {
            overflow-x: auto;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            position: relative;
          }
          .status-tabs::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            bottom: 4px;
            width: 40px;
            background: linear-gradient(to right, transparent, var(--admin-surface-container-low));
            pointer-events: none;
          }
          .search-form {
            flex-direction: column;
          }
          .search-input-wrap {
            min-width: unset;
          }
        }
        .status-tab:active,
        .search-btn:active,
        .pagination-btn:active,
        .search-clear:active {
          transform: scale(0.95);
        }
        @media (max-width: 640px) {
          .orders-table-wrap {
            background: transparent;
            border: none;
            border-radius: 0;
            margin: 0 -12px;
            padding: 0 12px;
          }
          .orders-table-wrap-inner {
            display: none;
          }
          .orders-cards {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .order-card {
            background: var(--admin-surface-container-lowest);
            border: 1px solid var(--admin-outline-variant);
            border-radius: 14px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .order-card-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 8px;
          }
          .order-card-ref {
            font-family: var(--font-manrope);
            font-weight: 700;
            color: var(--admin-primary);
            font-size: 14px;
          }
          .order-card-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
          }
          .order-card-label {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--admin-outline);
          }
          .order-card-value {
            font-size: 13px;
            font-weight: 600;
            color: var(--admin-on-surface);
            text-align: right;
          }
          .order-card-actions {
            display: flex;
            justify-content: flex-end;
            padding-top: 8px;
            border-top: 1px solid var(--admin-outline-variant);
          }
          .order-card-empty {
            display: block;
            text-align: center;
            padding: 32px 16px;
            color: var(--admin-outline);
            background: var(--admin-surface-container-lowest);
            border: 1px dashed var(--admin-outline-variant);
            border-radius: 14px;
            font-size: 14px;
            font-weight: 500;
          }
        }
        @media (min-width: 641px) {
          .orders-cards {
            display: none;
          }
          .order-card-empty {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
