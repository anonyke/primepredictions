'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { useAuth } from '../../../context/AuthContext';

const usersData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  plan: ['Monthly', 'Yearly', 'Weekly', 'None'][i % 4],
  status: i % 5 === 0 ? 'inactive' : 'active',
  predictions: Math.floor(Math.random() * 50) + 10,
  joined: '2024-01-' + String(i + 1).padStart(2, '0'),
}));

export default function AdminUsersPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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

  const filtered = usersData.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === 'all' || u.plan === filterPlan;
    const matchStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchSearch && matchPlan && matchStatus;
  });

  const headerActions = (
    <button
      className="btn btn-primary btn-sm"
      style={{ cursor: 'pointer' }}
    >
      ⬇ Export Users
    </button>
  );

  return (
    <AdminLayout title="User Management" subtitle={`${usersData.length} total users`} actions={headerActions}>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{ minWidth: 250, width: 'auto' }}
        />
        <select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)} className="form-select" style={{ width: 'auto' }}>
          <option value="all">All Plans</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="Weekly">Weekly</option>
          <option value="None">None</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="form-select" style={{ width: 'auto' }}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="premium-table">
          <thead>
            <tr>
              {['User', 'Email', 'Plan', 'Predictions', 'Status', 'Joined', 'Actions'].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td className="font-semibold text-white">{u.name}</td>
                <td style={{ color: '#B0B8D1' }}>{u.email}</td>
                <td style={{ color: '#FFD700', fontWeight: 600 }}>{u.plan}</td>
                <td style={{ color: '#B0B8D1' }}>{u.predictions}</td>
                <td>
                  <span
                    className="px-2.5 py-1 rounded text-xs font-semibold"
                    style={{
                      background: u.status === 'active' ? 'rgba(0,230,118,0.1)' : 'rgba(255,255,255,0.05)',
                      color: u.status === 'active' ? '#00E676' : '#6B7394',
                    }}
                  >
                    {u.status}
                  </span>
                </td>
                <td style={{ color: '#6B7394' }}>{u.joined}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-sm"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#B0B8D1', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ border: '1px solid rgba(255,82,82,0.3)', background: 'rgba(255,82,82,0.1)', color: '#FF5252', cursor: 'pointer' }}
                    >
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#6B7394' }}>
            No users found matching your filters.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
