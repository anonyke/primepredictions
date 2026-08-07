'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';

const adminStats = [
  { label: 'Total Users', value: '3,842', change: '+12%', icon: '👥', color: '#00E5FF' },
  { label: 'Active Subscribers', value: '1,247', change: '+8%', icon: '💎', color: '#7C4DFF' },
  { label: 'Total Predictions', value: '15,382', change: '+23%', icon: '📊', color: '#00E676' },
  { label: 'Revenue (KES)', value: '2.4M', change: '+15%', icon: '💰', color: '#FFD700' },
];

const recentUsers = [
  { name: 'John Kamau', email: 'john@example.com', plan: 'Monthly', status: 'active', date: 'Today' },
  { name: 'Mary Wanjiku', email: 'mary@example.com', plan: 'Yearly', status: 'active', date: 'Yesterday' },
  { name: 'Peter Ochieng', email: 'peter@example.com', plan: 'Weekly', status: 'active', date: '2 days ago' },
  { name: 'Grace Muthoni', email: 'grace@example.com', plan: 'None', status: 'inactive', date: '3 days ago' },
];

const recentPredictions = [
  { match: 'Man City vs Arsenal', type: '1X2', status: 'pending', confidence: 84, date: 'Today' },
  { match: 'Liverpool vs Tottenham', type: 'Over/Under', status: 'won', confidence: 86, date: 'Today' },
  { match: 'PSG vs Marseille', type: 'BTTS', status: 'lost', confidence: 81, date: 'Yesterday' },
];

const revenueData = [
  { month: 'Sep', amount: 180000 },
  { month: 'Oct', amount: 210000 },
  { month: 'Nov', amount: 195000 },
  { month: 'Dec', amount: 240000 },
  { month: 'Jan', amount: 285000 },
];

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || !isAdmin) {
        window.location.href = '/login';
      } else {
        setAuthorized(true);
      }
    }
  }, [user, isAdmin, loading]);

  const maxRevenue = Math.max(...revenueData.map(d => d.amount));

  if (loading || !authorized) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '3px solid rgba(0,229,255,0.2)',
            borderTopColor: '#00E5FF',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px',
          }} />
          <p style={{ color: '#6B7394' }}>Verifying access...</p>
        </div>
      </div>
    );
  }

  const headerActions = (
    <>
      <a
        href="/admin/users"
        className="btn btn-secondary btn-sm no-underline"
        style={{ textDecoration: 'none' }}
      >
        Manage Users
      </a>
      <a
        href="/admin/predictions"
        className="btn btn-primary btn-sm no-underline"
        style={{ textDecoration: 'none' }}
      >
        + New Prediction
      </a>
    </>
  );

  return (
    <AdminLayout title="Dashboard" subtitle="Platform management and analytics" actions={headerActions}>
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
        {adminStats.map((stat) => (
          <div
            key={stat.label}
            className="premium-card p-5 relative overflow-hidden"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
              style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
            >
              {stat.icon}
            </div>
            <div className="stat-value text-2xl text-white mb-1">{stat.value}</div>
            <div className="text-[13px]" style={{ color: '#6B7394' }}>
              {stat.label} <span style={{ color: stat.color, fontWeight: 600 }}>{stat.change}</span>
            </div>
            <div
              className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${stat.color}0A, transparent 70%)` }}
            />
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginBottom: 24 }} className="admin-grid">
        {/* Revenue Chart */}
        <div className="premium-card p-6">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 className="text-white font-bold text-lg m-0" style={{ fontFamily: 'var(--font-display)' }}>
              📈 Revenue Overview
            </h3>
            <span className="text-xs" style={{ color: '#6B7394' }}>Last 5 months</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180 }}>
            {revenueData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span className="text-[11px] font-semibold" style={{ color: '#6B7394' }}>KES {(d.amount / 1000).toFixed(0)}k</span>
                <div
                  style={{
                    width: '100%',
                    maxWidth: 48,
                    height: `${(d.amount / maxRevenue) * 150}px`,
                    borderRadius: '6px 6px 0 0',
                    background: 'linear-gradient(180deg, #FFD700, #7C4DFF)',
                    opacity: 0.7,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scaleY(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.transform = 'scaleY(1)'; }}
                />
                <span className="text-[11px]" style={{ color: '#6B7394' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="premium-card p-6">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 className="text-white font-bold text-lg m-0" style={{ fontFamily: 'var(--font-display)' }}>👥 Recent Users</h3>
            <a href="/admin/users" className="text-sm no-underline" style={{ color: 'var(--primary)' }}>View All</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentUsers.map((u, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <div className="text-[13px] font-semibold text-white mb-0.5">{u.name}</div>
                  <div className="text-[11px]" style={{ color: '#6B7394' }}>{u.email} • {u.plan}</div>
                </div>
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{
                    background: u.status === 'active' ? '#00E676' : '#6B7394',
                    boxShadow: u.status === 'active' ? '0 0 8px rgba(0,230,118,0.5)' : 'none',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Predictions */}
      <div className="premium-card p-6">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 className="text-white font-bold text-lg m-0" style={{ fontFamily: 'var(--font-display)' }}>📊 Recent Predictions</h3>
          <a href="/admin/predictions" className="text-sm no-underline" style={{ color: 'var(--primary)' }}>Manage</a>
        </div>
        <div className="table-container">
          <table className="premium-table">
            <thead>
              <tr>
                {['Match', 'Type', 'Confidence', 'Status', 'Date'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((p, i) => (
                <tr key={i}>
                  <td className="font-semibold text-white">{p.match}</td>
                  <td style={{ color: '#00E5FF' }}>{p.type}</td>
                  <td style={{ color: '#FFD700', fontWeight: 600 }}>{p.confidence}%</td>
                  <td>
                    <span
                      className="px-2.5 py-1 rounded text-[11px] font-semibold"
                      style={{
                        background: p.status === 'won' ? 'rgba(0,230,118,0.1)' : p.status === 'lost' ? 'rgba(255,82,82,0.1)' : 'rgba(255,145,0,0.1)',
                        color: p.status === 'won' ? '#00E676' : p.status === 'lost' ? '#FF5252' : '#FF9100',
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={{ color: '#6B7394' }}>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .admin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminLayout>
  );
}
