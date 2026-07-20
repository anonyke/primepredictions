'use client';

import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

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
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = usersData.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === 'all' || u.plan === filterPlan;
    const matchStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchSearch && matchPlan && matchStatus;
  });

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
              👥 User Management
            </h1>
            <p style={{ color: '#6B7394' }}>{usersData.length} total users</p>
          </div>
          <button style={{
            padding: '12px 24px',
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
            color: '#0A0E27',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}>
            Export Users
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '10px 16px',
              background: '#0F1535',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              minWidth: 250,
            }}
          />
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            style={{
              padding: '10px 16px',
              background: '#0F1535',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Plans</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
            <option value="Weekly">Weekly</option>
            <option value="None">None</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '10px 16px',
              background: '#0F1535',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              color: '#fff',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Users Table */}
        <div style={{
          background: '#131849',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>User</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Email</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Plan</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Predictions</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Joined</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontSize: 14, fontWeight: 600 }}>{u.name}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#B0B8D1', fontSize: 14 }}>{u.email}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#FFD700', fontSize: 14, fontWeight: 600 }}>{u.plan}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#B0B8D1', fontSize: 14 }}>{u.predictions}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      background: u.status === 'active' ? 'rgba(0,230,118,0.1)' : 'rgba(255,255,255,0.05)',
                      color: u.status === 'active' ? '#00E676' : '#6B7394',
                    }}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#6B7394', fontSize: 14 }}>{u.joined}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#B0B8D1', fontSize: 12, cursor: 'pointer' }}>Edit</button>
                      <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(255,82,82,0.3)', background: 'rgba(255,82,82,0.1)', color: '#FF5252', fontSize: 12, cursor: 'pointer' }}>Suspend</button>
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
      </main>
      <Footer />
    </div>
  );
}
