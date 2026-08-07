'use client';

import { useState, useEffect } from 'react';

const stats = [
  {
    label: 'Total Predictions',
    value: '128',
    change: '+12 this week',
    icon: '📊',
    color: '#00E5FF',
    trend: 'up',
  },
  {
    label: 'Prediction Accuracy',
    value: '87%',
    change: '+3.2% vs last month',
    icon: '🎯',
    color: '#00E676',
    trend: 'up',
  },
  {
    label: 'Active Days',
    value: '24',
    change: 'Streak: 6 days',
    icon: '⚡',
    color: '#FFD700',
    trend: 'up',
  },
  {
    label: 'Subscription',
    value: 'Monthly',
    change: 'Renews in 24 days',
    icon: '👑',
    color: '#7C4DFF',
    trend: 'neutral',
  },
];

// Township of small monthly performance bars
const monthlyPerformance = [
  { month: 'Jan', value: 68 },
  { month: 'Feb', value: 74 },
  { month: 'Mar', value: 71 },
  { month: 'Apr', value: 79 },
  { month: 'May', value: 83 },
  { month: 'Jun', value: 87 },
];

export default function DashboardCards() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-4">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="premium-card relative p-5 overflow-hidden"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${stat.color}55`;
              e.currentTarget.style.boxShadow = `0 0 24px ${stat.color}22`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)';
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3"
              style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
            >
              {stat.icon}
            </div>
            <div className="stat-value text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-[13px]" style={{ color: '#6B7394' }}>
              {stat.label}{' '}
              <span className="font-semibold" style={{ color: stat.color }}>{stat.change}</span>
            </div>
            <div
              className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${stat.color}0A 0%, transparent 70%)` }}
            />
          </div>
        ))}
      </div>

      {/* Monthly performance chart */}
      <div className="premium-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-bold text-base" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Monthly Performance
            </h3>
            <p className="text-xs" style={{ color: '#6B7394' }}>Win rate across the last 6 months</p>
          </div>
          <span className="premium-badge">Trending ↑</span>
        </div>
        <div className="flex items-end gap-3 h-32">
          {monthlyPerformance.map((m, i) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[11px] font-bold" style={{ color: '#00E5FF' }}>{m.value}%</div>
              <div
                className="w-full rounded-t-lg transition-all duration-700"
                style={{
                  height: animated ? `${m.value}%` : '0%',
                  maxHeight: 80,
                  background: `linear-gradient(180deg, ${i >= 4 ? '#00E676' : i >= 2 ? '#FFD700' : '#00E5FF'}, transparent)`,
                  boxShadow: animated ? '0 0 12px rgba(0,229,255,0.15)' : 'none',
                }}
              />
              <div className="text-[11px]" style={{ color: '#6B7394' }}>{m.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

