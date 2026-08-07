'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { useAuth } from '../../../context/AuthContext';

const payments = [
  { id: 1, user: 'John Kamau', email: 'john@example.com', plan: 'Monthly', amount: 1499, method: 'M-Pesa', ref: 'MPE123456', status: 'completed', date: '2024-01-20' },
  { id: 2, user: 'Mary Wanjiku', email: 'mary@example.com', plan: 'Yearly', amount: 9999, method: 'Stripe', ref: 'STR789012', status: 'completed', date: '2024-01-19' },
  { id: 3, user: 'Peter Ochieng', email: 'peter@example.com', plan: 'Weekly', amount: 499, method: 'M-Pesa', ref: 'MPE345678', status: 'pending', date: '2024-01-18' },
  { id: 4, user: 'Grace Muthoni', email: 'grace@example.com', plan: 'Monthly', amount: 1499, method: 'Flutterwave', ref: 'FLW901234', status: 'failed', date: '2024-01-17' },
  { id: 5, user: 'David Kimani', email: 'david@example.com', plan: 'Monthly', amount: 1499, method: 'PesaPal', ref: 'PSP567890', status: 'completed', date: '2024-01-16' },
  { id: 6, user: 'Sarah Akinyi', email: 'sarah@example.com', plan: 'Yearly', amount: 9999, method: 'Crypto', ref: 'BTC123456', status: 'completed', date: '2024-01-15' },
];

export default function AdminPaymentsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      window.location.href = '/login';
    }
  }, [user, isAdmin, authLoading]);

  if (authLoading || !user || !isAdmin) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(0,229,255,0.2)', borderTopColor: '#00E5FF', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#6B7394' }}>Verifying access...</p>
        </div>
      </div>
    );
  }

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

  const summaryCards = [
    { label: 'Total Revenue', value: `KES ${totalRevenue.toLocaleString()}`, color: '#00E5FF', bg: 'rgba(0,229,255,0.06)', border: 'rgba(0,229,255,0.15)' },
    { label: 'Completed', value: payments.filter(p => p.status === 'completed').length, color: '#00E676', bg: 'rgba(0,230,118,0.06)', border: 'rgba(0,230,118,0.15)' },
    { label: 'Pending', value: payments.filter(p => p.status === 'pending').length, color: '#FF9100', bg: 'rgba(255,145,0,0.06)', border: 'rgba(255,145,0,0.15)' },
    { label: 'Failed', value: payments.filter(p => p.status === 'failed').length, color: '#FF5252', bg: 'rgba(255,82,82,0.06)', border: 'rgba(255,82,82,0.15)' },
  ];

  return (
    <AdminLayout title="Payments" subtitle="Monitor and manage all platform payments">
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
        {summaryCards.map((c) => (
          <div key={c.label} style={{ padding: '20px', borderRadius: 14, background: c.bg, border: `1px solid ${c.border}` }}>
            <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: c.color, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by user, email, or reference..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{ minWidth: 280, width: 'auto' }}
        />
        {['all', 'completed', 'pending', 'failed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="btn btn-sm"
            style={{
              border: `1px solid ${filter === f ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
              background: filter === f ? 'rgba(0,229,255,0.08)' : 'transparent',
              color: filter === f ? '#00E5FF' : '#B0B8D1',
              textTransform: 'capitalize',
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Payments Table */}
      <div className="table-container">
        <table className="premium-table">
          <thead>
            <tr>
              {['User', 'Plan', 'Amount', 'Method', 'Reference', 'Status', 'Date'].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const badge = getStatusBadge(p.status);
              return (
                <tr key={p.id}>
                  <td>
                    <div className="font-semibold text-white">{p.user}</div>
                    <div style={{ color: '#6B7394', fontSize: 12 }}>{p.email}</div>
                  </td>
                  <td style={{ color: '#FFD700', fontWeight: 600 }}>{p.plan}</td>
                  <td className="font-bold text-white">KES {p.amount.toLocaleString()}</td>
                  <td style={{ color: '#B0B8D1' }}>{p.method}</td>
                  <td style={{ color: '#B0B8D1', fontSize: 13, fontFamily: 'monospace' }}>{p.ref}</td>
                  <td>
                    <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: badge.bg, color: badge.color }}>
                      {badge.text}
                    </span>
                  </td>
                  <td style={{ color: '#6B7394' }}>{p.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
