'use client';

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
    label: 'Win Rate',
    value: '87%',
    change: '+3.2% vs last month',
    icon: '🏆',
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

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, rgba(19,24,73,0.9), rgba(28,34,96,0.85))',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${stat.color}55`;
            e.currentTarget.style.boxShadow = `0 0 24px ${stat.color}22`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3"
            style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
          >
            {stat.icon}
          </div>
          <div className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            {stat.value}
          </div>
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
  );
}

