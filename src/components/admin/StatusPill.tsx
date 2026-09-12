interface StatusPillProps {
  status: string;
}

const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
  new: { bg: '#e0f2fe', color: '#0369a1', label: 'New' },
  needs_review: { bg: '#fef3c7', color: '#b45309', label: 'Needs Review' },
  confirmed: { bg: '#d1fae5', color: '#047857', label: 'Confirmed' },
  in_progress: { bg: '#e0e7ff', color: '#4338ca', label: 'In Progress' },
  completed: { bg: '#d1fae5', color: '#047857', label: 'Completed' },
  cancelled: { bg: '#fee2e2', color: '#b91c1c', label: 'Cancelled' },
};

export function StatusPill({ status }: StatusPillProps) {
  const config = statusConfig[status] ?? { bg: '#f3f4f6', color: '#374151', label: status };

  return (
    <>
      <span className="status-pill" style={{ background: config.bg, color: config.color }}>
        {config.label}
      </span>
      <style>{`
        .status-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          text-transform: capitalize;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
}
