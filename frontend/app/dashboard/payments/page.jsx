'use client';

import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const payments = [
  { id: 1, date: '2024-01-01', plan: 'Monthly Premium', amount: 'KES 1,499', method: 'M-Pesa', ref: 'MPE123456', status: 'completed' },
  { id: 2, date: '2023-12-01', plan: 'Monthly Premium', amount: 'KES 1,499', method: 'Stripe', ref: 'STR789012', status: 'completed' },
  { id: 3, date: '2023-11-15', plan: 'Weekly Premium', amount: 'KES 499', method: 'M-Pesa', ref: 'MPE345678', status: 'completed' },
  { id: 4, date: '2023-11-01', plan: 'Monthly Premium', amount: 'KES 1,499', method: 'Flutterwave', ref: 'FLW901234', status: 'failed' },
];

export default function PaymentsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? payments : payments.filter(p => p.status === filter);

  const getStatusBadge = (status) => {
    if (status === 'completed') return { bg: 'rgba(0,230,118,0.1)', color: '#00E676', text: 'Completed' };
    if (status === 'pending') return { bg: 'rgba(255,145,0,0.1)', color: '#FF9100', text: 'Pending' };
    return { bg: 'rgba(255,82,82,0.1)', color: '#FF5252', text: 'Failed' };
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Payment <span style={{
              background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>History</span>
          </h1>
          <p style={{ color: '#6B7394' }}>View your payment history and subscription invoices</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          marginBottom: 28,
        }}>
          <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)' }}>
            <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 4 }}>Total Spent</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>KES 4,996</div>
          </div>
          <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.15)' }}>
            <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 4 }}>Successful</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#00E676', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>3</div>
          </div>
          <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,82,82,0.06)', border: '1px solid rgba(255,82,82,0.15)' }}>
            <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 4 }}>Failed</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#FF5252', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>1</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'completed', label: 'Completed' },
            { id: 'pending', label: 'Pending' },
            { id: 'failed', label: 'Failed' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                border: `1px solid ${filter === f.id ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                background: filter === f.id ? 'rgba(0,229,255,0.08)' : 'transparent',
                color: filter === f.id ? '#00E5FF' : '#B0B8D1',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

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
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Method</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Reference</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const badge = getStatusBadge(p.status);
                return (
                  <tr key={p.id}>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#6B7394', fontSize: 14 }}>{p.date}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontSize: 14, fontWeight: 600 }}>{p.plan}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#FFD700', fontSize: 14, fontWeight: 700 }}>{p.amount}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#B0B8D1', fontSize: 14 }}>{p.method}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#B0B8D1', fontSize: 13, fontFamily: 'monospace' }}>{p.ref}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: badge.bg, color: badge.color }}>
                        {badge.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: '#6B7394' }}>
              No payment records found.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

