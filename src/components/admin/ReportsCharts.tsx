'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ServiceData {
  name: string;
  count: number;
}

interface ReportsChartsProps {
  ordersByServiceArray: ServiceData[];
}

export function ReportsCharts({ ordersByServiceArray }: ReportsChartsProps) {
  return (
    <div className="chart-container">
      {ordersByServiceArray.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ordersByServiceArray} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-outline-variant)" />
            <XAxis type="number" tick={{ fontSize: 12, fill: 'var(--admin-on-surface-variant)' }} />
            <YAxis
              dataKey="name"
              type="category"
              width={120}
              tick={{ fontSize: 12, fill: 'var(--admin-on-surface-variant)' }}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--admin-surface-container-lowest)',
                border: '1px solid var(--admin-outline-variant)',
                borderRadius: '8px',
                fontSize: '13px',
              }}
            />
            <Bar dataKey="count" fill="var(--admin-primary)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="no-data">No data for this period</p>
      )}
    </div>
  );
}
