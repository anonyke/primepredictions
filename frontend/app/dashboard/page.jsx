'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardCards from '../../components/DashboardCards';

const monthlyData = [
  { month: 'Aug', won: 42, lost: 8 },
  { month: 'Sep', won: 38, lost: 12 },
  { month: 'Oct', won: 45, lost: 5 },
  { month: 'Nov', won: 40, lost: 10 },
  { month: 'Dec', won: 48, lost: 4 },
  { month: 'Jan', won: 44, lost: 7 },
];

const recentPredictions = [
  { match: 'Man City vs Arsenal', type: '1X2', prediction: '1', result: 'won', date: 'Today' },
  { match: 'Liverpool vs Tottenham', type: 'Over/Under', prediction: 'Over 2.5', result: 'won', date: 'Today' },
  { match: 'PSG vs Marseille', type: 'BTTS', prediction: 'Yes', result: 'lost', date: 'Yesterday' },
  { match: 'Chelsea vs Man Utd', type: 'Double Chance', prediction: '1X', result: 'won', date: 'Yesterday' },
  { match: 'Bayern vs Leipzig', type: '1X2', prediction: '1', result: 'pending', date: 'Today' },
];

const quickLinks = [
  { label: 'View Predictions', href: '/predictions', icon: '📊' },
  { label: 'Subscription', href: '/dashboard/subscription', icon: '👑' },
  { label: 'Payment History', href: '/dashboard/payments', icon: '💳' },
  { label: 'Profile Settings', href: '/dashboard/profile', icon: '⚙️' },
];

export default function DashboardPage() {
  const [activeChart, setActiveChart] = useState('winRate');

  const maxVal = Math.max(...monthlyData.map(d => d.won));

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
              Welcome back, <span style={{
                background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>John</span>
            </h1>
            <p style={{ color: '#6B7394' }}>Here&apos;s your performance overview</p>
          </div>
          <a
            href="/pricing"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7C4DFF, #FFD700)',
              color: '#0A0E27',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            ⭐ Upgrade to Premium
          </a>
        </div>

        {/* Stats Cards */}
        <DashboardCards />

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: 24,
          marginTop: 32,
        }} className="dashboard-grid">
          {/* Monthly Performance Chart */}
          <div style={{
            background: '#131849',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            padding: 24,
          }}>
            <h3 style={{ color: '#fff', fontSize: 18, marginBottom: 20, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              📈 Monthly Performance
            </h3>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 200 }}>
              {monthlyData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 11, color: '#6B7394', fontWeight: 600 }}>{d.won}</span>
                  <div style={{
                    width: '100%',
                    maxWidth: 40,
                    height: `${(d.won / maxVal) * 160}px`,
                    borderRadius: '6px 6px 0 0',
                    background: 'linear-gradient(180deg, #00E5FF, #7C4DFF)',
                    opacity: 0.8,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'scaleY(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.transform = 'scaleY(1)';
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      height: 4,
                      borderRadius: 2,
                      background: '#FF5252',
                      width: `${(d.lost / d.won) * 100}%`,
                      minWidth: 4,
                    }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#6B7394' }}>{d.month}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: '#00E5FF', display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: '#6B7394' }}>Won</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: '#FF5252', display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: '#6B7394' }}>Lost</span>
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
                ⚡ Recent Predictions
              </h3>
              <a href="/predictions" style={{ color: '#00E5FF', fontSize: 13, textDecoration: 'none' }}>View All</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentPredictions.map((p, i) => {
                const resultColors = {
                  won: { bg: 'rgba(0,230,118,0.1)', text: '#00E676', icon: '✅' },
                  lost: { bg: 'rgba(255,82,82,0.1)', text: '#FF5252', icon: '❌' },
                  pending: { bg: 'rgba(255,145,0,0.1)', text: '#FF9100', icon: '⏳' },
                };
                const rc = resultColors[p.result];
                return (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'background 0.3s ease',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{p.match}</div>
                      <div style={{ fontSize: 11, color: '#6B7394' }}>{p.type} • {p.prediction} • {p.date}</div>
                    </div>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      background: rc.bg,
                      color: rc.text,
                    }}>
                      {rc.icon} {p.result.charAt(0).toUpperCase() + p.result.slice(1)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginTop: 24,
        }}>
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 20px',
                borderRadius: 14,
                background: '#131849',
                border: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                color: '#fff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)';
                e.currentTarget.style.background = '#1C2260';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.background = '#131849';
              }}
            >
              <span style={{ fontSize: 24 }}>{link.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{link.label}</span>
            </a>
          ))}
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .dashboard-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </div>
  );
}

