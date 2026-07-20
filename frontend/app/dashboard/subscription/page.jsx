'use client';

import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 8,
          }}>
            My <span style={{
              background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Subscription</span>
          </h1>
          <p style={{ color: '#6B7394' }}>Manage your premium subscription plan</p>
        </div>

        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 28,
        }}>
          {['current', 'plans', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                border: `1px solid ${activeTab === tab ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                background: activeTab === tab ? 'rgba(0,229,255,0.08)' : 'transparent',
                color: activeTab === tab ? '#00E5FF' : '#B0B8D1',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'capitalize',
              }}
            >
              {tab === 'current' ? '👑 Current Plan' : tab === 'plans' ? '📋 Available Plans' : '📜 History'}
            </button>
          ))}
        </div>

        {activeTab === 'current' && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(124,77,255,0.06), rgba(255,215,0,0.03))',
            border: '1px solid rgba(124,77,255,0.2)',
            borderRadius: 20,
            padding: 32,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 8,
                  background: 'rgba(0,230,118,0.1)',
                  border: '1px solid rgba(0,230,118,0.2)',
                  marginBottom: 16,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E676', display: 'inline-block' }} />
                  <span style={{ color: '#00E676', fontSize: 13, fontWeight: 600 }}>Active</span>
                </div>
                <h2 style={{ color: '#fff', fontSize: 24, marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Monthly Premium Plan
                </h2>
                <p style={{ color: '#B0B8D1', marginBottom: 16 }}>
                  Renews on January 20, 2024
                </p>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 2 }}>Plan Price</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#FFD700' }}>KES 1,499/mo</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 2 }}>Days Remaining</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#00E5FF' }}>24 days</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent',
                  color: '#B0B8D1',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  Upgrade Plan
                </button>
                <button style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,82,82,0.3)',
                  background: 'rgba(255,82,82,0.1)',
                  color: '#FF5252',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div style={{ textAlign: 'center', padding: 40, color: '#6B7394' }}>
            <a href="/pricing" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              color: '#0A0E27',
              fontSize: 15,
              fontWeight: 700,
              textDecoration: 'none',
            }}>
              View Available Plans
            </a>
          </div>
        )}

        {activeTab === 'history' && (
          <div style={{
            background: '#131849',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Plan</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Amount</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-01-01', plan: 'Monthly Premium', amount: 'KES 1,499', status: 'Active' },
                  { date: '2023-12-01', plan: 'Monthly Premium', amount: 'KES 1,499', status: 'Expired' },
                  { date: '2023-11-01', plan: 'Weekly Premium', amount: 'KES 499', status: 'Expired' },
                ].map((item, i) => (
                  <tr key={i}>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#6B7394', fontSize: 14 }}>{item.date}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontSize: 14, fontWeight: 600 }}>{item.plan}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#FFD700', fontSize: 14, fontWeight: 700 }}>{item.amount}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        background: item.status === 'Active' ? 'rgba(0,230,118,0.1)' : 'rgba(255,255,255,0.06)',
                        color: item.status === 'Active' ? '#00E676' : '#6B7394',
                      }}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

