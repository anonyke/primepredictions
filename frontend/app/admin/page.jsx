'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
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
  const [activeTab, setActiveTab] = useState('overview');
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
      <div>
        <Navbar />
        <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ padding: 60 }}>
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
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
              Admin <span style={{
                background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Dashboard</span>
            </h1>
            <p style={{ color: '#6B7394' }}>Platform management and analytics overview</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="/admin/users" style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid rgba(0,229,255,0.2)',
              color: '#00E5FF',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              Manage Users
            </a>
            <a href="/admin/predictions" style={{
              padding: '10px 20px',
              borderRadius: 8,
              background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              color: '#0A0E27',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}>
              + New Prediction
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}>
          {adminStats.map((stat) => (
            <div key={stat.label} style={{
              padding: '20px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03), transparent)',
              border: `1px solid rgba(255,255,255,0.06)`,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `${stat.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 12,
              }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: '#6B7394' }}>
                {stat.label} <span style={{ color: stat.color, fontWeight: 600 }}>{stat.change}</span>
              </div>
              <div style={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${stat.color}08 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: 24,
          marginBottom: 24,
        }} className="admin-grid">
          {/* Revenue Chart */}
          <div style={{
            background: '#131849',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            padding: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ color: '#fff', fontSize: 18, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                📈 Revenue Overview
              </h3>
              <span style={{ fontSize: 12, color: '#6B7394' }}>Last 5 months</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180 }}>
              {revenueData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 11, color: '#6B7394', fontWeight: 600 }}>
                    KES {(d.amount / 1000).toFixed(0)}k
                  </span>
                  <div style={{
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
                  <span style={{ fontSize: 11, color: '#6B7394' }}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div style={{
            background: '#131849',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            padding: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ color: '#fff', fontSize: 18, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                👥 Recent Users
              </h3>
              <a href="/admin/users" style={{ color: '#00E5FF', fontSize: 13, textDecoration: 'none' }}>View All</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentUsers.map((u, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{u.name}</div>
                    <div style={{ fontSize: 11, color: '#6B7394' }}>{u.email} • {u.plan}</div>
                  </div>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: u.status === 'active' ? '#00E676' : '#6B7394',
                    boxShadow: u.status === 'active' ? '0 0 8px rgba(0,230,118,0.5)' : 'none',
                    display: 'inline-block',
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Predictions */}
        <div style={{
          background: '#131849',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          padding: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ color: '#fff', fontSize: 18, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              📊 Recent Predictions
            </h3>
            <a href="/admin/predictions" style={{ color: '#00E5FF', fontSize: 13, textDecoration: 'none' }}>Manage</a>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Match</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Type</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Confidence</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((p, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontSize: 13, fontWeight: 600 }}>{p.match}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#00E5FF', fontSize: 13 }}>{p.type}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#FFD700', fontSize: 13, fontWeight: 600 }}>{p.confidence}%</td>
                  <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      background: p.status === 'won' ? 'rgba(0,230,118,0.1)' : p.status === 'lost' ? 'rgba(255,82,82,0.1)' : 'rgba(255,145,0,0.1)',
                      color: p.status === 'won' ? '#00E676' : p.status === 'lost' ? '#FF5252' : '#FF9100',
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#6B7394', fontSize: 13 }}>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .admin-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </div>
  );
}
