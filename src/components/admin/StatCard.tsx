import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <>
      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-icon">
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <span className={`stat-card-trend ${trend.value >= 0 ? 'positive' : 'negative'}`}>
              {trend.value >= 0 ? '+' : ''}{trend.value}%
            </span>
          )}
        </div>
        <div className="stat-card-body">
          <span className="stat-card-value">{value}</span>
          <span className="stat-card-title">{title}</span>
        </div>
        {trend && (
          <span className="stat-card-trend-label">{trend.label}</span>
        )}
      </div>
      <style>{`
        .stat-card {
          background: var(--admin-surface-container-lowest);
          border: 1px solid var(--admin-outline-variant);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .stat-card:hover {
          box-shadow: var(--admin-shadow);
          transform: translateY(-1px);
        }
        .stat-card:active {
          transform: scale(0.97);
        }
        .stat-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .stat-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--admin-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .stat-card-trend {
          font-size: 12px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 100px;
        }
        .stat-card-trend.positive {
          background: #d1fae5;
          color: #047857;
        }
        .stat-card-trend.negative {
          background: #fee2e2;
          color: #b91c1c;
        }
        .stat-card-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .stat-card-value {
          font-family: var(--font-manrope);
          font-size: 28px;
          font-weight: 800;
          color: var(--admin-on-surface);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .stat-card-title {
          font-size: 13px;
          color: var(--admin-on-surface-variant);
          font-weight: 500;
        }
        .stat-card-trend-label {
          font-size: 11px;
          color: var(--admin-outline);
          margin-top: -4px;
        }
      `}</style>
    </>
  );
}
