'use client';

import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const payments = [
  { id: 1, user: 'John Kamau', email: 'john@example.com', plan: 'Monthly', amount: 1499, method: 'M-Pesa', ref: 'MPE123456', status: 'completed', date: '2024-01-20' },
  { id: 2, user: 'Mary Wanjiku', email: 'mary@example.com', plan: 'Yearly', amount: 9999, method: 'Stripe', ref: 'STR789012', status: 'completed', date: '2024-01-19' },
  { id: 3, user: 'Peter Ochieng', email: 'peter@example.com', plan: 'Weekly', amount: 499, method: 'M-Pesa', ref: 'MPE345678', status: 'pending', date: '2024-01-18' },
  { id: 4, user: 'Grace Muthoni', email: 'grace@example.com', plan: 'Monthly', amount: 1499, method: 'Flutterwave', ref: 'FLW901234', status: 'failed', date: '2024-01-17' },
  { id: 5, user: 'David Kimani', email: 'david@example.com', plan: 'Monthly', amount: 1499, method: 'PesaPal', ref: 'PSP567890', status: 'completed', date: '2024-01-16' },
  { id: 6, user: 'Sarah Akinyi', email: 'sarah@example.com', plan: 'Yearly', amount: 9999, method: 'Crypto', ref: 'BTC123456', status: 'completed', date: '2024-01-15' },
];

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = payments.filter(p => {
    const matchStatus = filter === 'all' || p.status === filter;
    const matchSearch = p.user.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()) || p.ref.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status) => {
    const styles = {
      completed: { bg: 'rgba(0,230,118,0.1)', color: '#00E676', text: 'Completed' },
      pending: { bg: 'rgba(255,145,0,0.1)', color: '#FF9100', text: 'Pending' },
      failed: { bg: 'rgba(255,82,82,0.1)', color: '#FF5252', text: 'Failed' },
    };
    return styles[status] || styles.pending;
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
            💳 Payment Tracking
          </h1>
          <p style={{ color: '#6B7394' }}>Monitor and manage all platform payments</p>
        </div>

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          <div style={{ padding: '20px', borderRadius: 14, background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)' }}>
            <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 4 }}>Total Revenue</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>KES {totalRevenue.toLocaleString()}</div>
          </div>
          <div style={{ padding: '20px', borderRadius: 14, background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.15)' }}>
            <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 4 }}>Completed</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#00E676', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{payments.filter(p => p.status === 'completed').length}</div>
          </div>
          <div style={{ padding: '20px', borderRadius: 14, background: 'rgba(255,145,0,0.06)', border: '1px solid rgba(255,145,0,0.15)' }}>
            <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 4 }}>Pending</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#FF9100', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{payments.filter(p => p.status === 'pending').length}</div>
          </div>
          <div style={{ padding: '20px', borderRadius: 14, background: 'rgba(255,82,82,0.06)', border: '1px solid rgba(255,82,82,0.15)' }}>
            <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 4 }}>Failed</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#FF5252', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{payments.filter(p => p.status === 'failed').length}</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by user, email, or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '10px 16px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 14, fontFamily: 'Inter', outline: 'none', minWidth: 280 }}
          />
          {['all', 'completed', 'pending', 'failed'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: 8,
                border: `1px solid ${filter === f ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                background: filter === f ? 'rgba(0,229,255,0.08)' : 'transparent',
                color: filter === f ? '#00E5FF' : '#B0B8D1',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter',
                textTransform: 'capitalize',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Payments Table */}
        <div style={{ background: '#131849', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>User</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Plan</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Amount</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Method</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Reference</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const badge = getStatusBadge(p.status);
                return (
                  <tr key={p.id}>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{p.user}</div>
                      <div style={{ color: '#6B7394', fontSize: 12 }}>{p.email}</div>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#FFD700', fontSize: 14, fontWeight: 600 }}>{p.plan}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontSize: 14, fontWeight: 700 }}>KES {p.amount.toLocaleString()}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#B0B8D1', fontSize: 14 }}>{p.method}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#B0B8D1', fontSize: 13, fontFamily: 'monospace' }}>{p.ref}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: badge.bg, color: badge.color }}>
                        {badge.text}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#6B7394', fontSize: 14 }}>{p.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
