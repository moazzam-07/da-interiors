'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, UserPlus, Play, CircleCheck, XCircle, Loader2 } from 'lucide-react';

interface OrderActionsProps {
  orderId: string;
  currentStatus: string;
}

const statusFlow: Record<string, { nextStatus: string; label: string; icon: any; color: string }[]> = {
  new: [
    { nextStatus: 'confirmed', label: 'Confirm', icon: CheckCircle, color: 'confirm' },
    { nextStatus: 'cancelled', label: 'Cancel', icon: XCircle, color: 'cancel' },
  ],
  needs_review: [
    { nextStatus: 'confirmed', label: 'Confirm', icon: CheckCircle, color: 'confirm' },
    { nextStatus: 'cancelled', label: 'Cancel', icon: XCircle, color: 'cancel' },
  ],
  confirmed: [
    { nextStatus: 'in_progress', label: 'Mark In Progress', icon: Play, color: 'progress' },
    { nextStatus: 'cancelled', label: 'Cancel', icon: XCircle, color: 'cancel' },
  ],
  in_progress: [
    { nextStatus: 'completed', label: 'Mark Completed', icon: CircleCheck, color: 'complete' },
    { nextStatus: 'cancelled', label: 'Cancel', icon: XCircle, color: 'cancel' },
  ],
};

export function OrderActions({ orderId, currentStatus }: OrderActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [showAssign, setShowAssign] = useState(false);

  const actions = statusFlow[currentStatus] ?? [];

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === 'in_progress' && currentStatus === 'confirmed') {
      setShowAssign(true);
      return;
    }

    setLoading(newStatus);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newStatus }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setLoading(null);
    }
  };

  const handleAssignAndProgress = async (staffId: string) => {
    setLoading('assign');
    try {
      await fetch(`/api/admin/orders/${orderId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId, role: 'technician' }),
      });

      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newStatus: 'in_progress' }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error('Failed to assign and start:', err);
    } finally {
      setLoading(null);
      setShowAssign(false);
    }
  };

  if (showAssign) {
    return <AssignStaffModal orderId={orderId} onConfirm={handleAssignAndProgress} onCancel={() => setShowAssign(false)} loading={loading === 'assign'} />;
  }

  return (
    <>
      <div className="order-actions">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.nextStatus}
              className={`action-btn action-btn--${action.color}`}
              onClick={() => handleStatusChange(action.nextStatus)}
              disabled={loading !== null}
            >
              {loading === action.nextStatus ? (
                <Loader2 className="w-4 h-4 spin" />
              ) : (
                <Icon className="w-4 h-4" />
              )}
              {action.label}
            </button>
          );
        })}
      </div>

      <style>{`
        .order-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }
        .action-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .action-btn--confirm {
          background: var(--admin-gradient);
          color: white;
        }
        .action-btn--confirm:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 105, 113, 0.25);
        }
        .action-btn--progress {
          background: var(--admin-secondary-container);
          color: var(--admin-secondary);
        }
        .action-btn--progress:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 64, 224, 0.2);
        }
        .action-btn--complete {
          background: #059669;
          color: white;
        }
        .action-btn--complete:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25);
        }
        .action-btn--cancel {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }
        .action-btn--cancel:hover:not(:disabled) {
          background: #fee2e2;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

function AssignStaffModal({ orderId, onConfirm, onCancel, loading }: { orderId: string; onConfirm: (staffId: string) => void; onCancel: () => void; loading: boolean }) {
  const [staff, setStaff] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loadingStaff, setLoadingStaff] = useState(true);

  useState(() => {
    fetch('/api/admin/staff')
      .then(r => r.json())
      .then(data => {
        setStaff(data.staff ?? []);
        setLoadingStaff(false);
      });
  });

  return (
    <>
      <div className="modal-overlay" onClick={onCancel}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h3 className="modal-title">Assign Staff to Start Job</h3>
          <p className="modal-subtitle">Select a staff member to assign before marking as in progress.</p>

          {loadingStaff ? (
            <div className="modal-loading">Loading staff...</div>
          ) : staff.length === 0 ? (
            <div className="modal-empty">No active staff found. <a href="/admin/staff">Add staff</a></div>
          ) : (
            <div className="staff-select-list">
              {staff.map((member: any) => (
                <label key={member.id} className={`staff-select-item ${selected === member.id ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="staff"
                    value={member.id}
                    checked={selected === member.id}
                    onChange={() => setSelected(member.id)}
                    className="staff-select-radio"
                  />
                  <div className="staff-select-avatar">
                    {member.name?.charAt(0).toUpperCase() ?? 'S'}
                  </div>
                  <div className="staff-select-info">
                    <span className="staff-select-name">{member.name}</span>
                    <span className="staff-select-role">{member.role}</span>
                  </div>
                </label>
              ))}
            </div>
          )}

          <div className="modal-actions">
            <button className="modal-btn modal-btn--secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
            <button
              className="modal-btn modal-btn--primary"
              onClick={() => selected && onConfirm(selected)}
              disabled={!selected || loading}
            >
              {loading ? 'Assigning...' : 'Assign & Start'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 24px;
        }
        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 28px;
          max-width: 420px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
        }
        .modal-title {
          font-family: var(--font-manrope);
          font-size: 18px;
          font-weight: 800;
          color: var(--admin-on-surface);
          margin-bottom: 8px;
        }
        .modal-subtitle {
          font-size: 13px;
          color: var(--admin-on-surface-variant);
          margin-bottom: 24px;
        }
        .modal-loading,
        .modal-empty {
          text-align: center;
          padding: 32px;
          color: var(--admin-outline);
          font-size: 14px;
        }
        .modal-empty a {
          color: var(--admin-primary);
        }
        .staff-select-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
        }
        .staff-select-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border: 2px solid var(--admin-outline-variant);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .staff-select-item:hover {
          border-color: var(--admin-primary);
          background: var(--admin-surface-container-low);
        }
        .staff-select-item.selected {
          border-color: var(--admin-primary);
          background: rgba(0, 105, 113, 0.05);
        }
        .staff-select-radio {
          display: none;
        }
        .staff-select-avatar {
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
        .staff-select-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .staff-select-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--admin-on-surface);
        }
        .staff-select-role {
          font-size: 12px;
          color: var(--admin-outline);
          text-transform: capitalize;
        }
        .modal-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        .modal-btn {
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }
        .modal-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .modal-btn--secondary {
          background: var(--admin-surface-container-low);
          border: 1px solid var(--admin-outline-variant);
          color: var(--admin-on-surface);
        }
        .modal-btn--secondary:hover:not(:disabled) {
          background: var(--admin-surface-container);
        }
        .modal-btn--primary {
          background: var(--admin-gradient);
          border: none;
          color: white;
        }
        .modal-btn--primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 105, 113, 0.25);
        }
      `}</style>
    </>
  );
}
