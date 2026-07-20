'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useAuth } from '../../../context/AuthContext';

const initialPredictions = [
  { id: 1, match: 'Manchester City vs Arsenal', league: 'Premier League', type: '1X2', prediction: '1', odds: '1.85', confidence: 84, status: 'pending', date: '2024-01-20', premium: false },
  { id: 2, match: 'Barcelona vs Real Madrid', league: 'La Liga', type: '1X2', prediction: 'X', odds: '3.40', confidence: 72, status: 'pending', date: '2024-01-20', premium: true },
  { id: 3, match: 'Liverpool vs Tottenham', league: 'Premier League', type: 'Over/Under', prediction: 'Over 2.5', odds: '1.72', confidence: 86, status: 'won', date: '2024-01-19', premium: false },
  { id: 4, match: 'PSG vs Marseille', league: 'Ligue 1', type: 'BTTS', prediction: 'Yes', odds: '1.80', confidence: 81, status: 'lost', date: '2024-01-19', premium: false },
];

export default function AdminPredictionsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      window.location.href = '/login';
    }
  }, [user, isAdmin, authLoading]);

  if (authLoading || !user || !isAdmin) {
    return (
      <div>
        <Navbar />
        <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ padding: 60 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(0,229,255,0.2)', borderTopColor: '#00E5FF', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#6B7394' }}>Verifying access...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const [predictions, setPredictions] = useState(initialPredictions);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    match: '', league: 'Premier League', type: '1X2', prediction: '',
    odds: '', confidence: 70, premium: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setPredictions(predictions.map(p => p.id === editingId ? { ...p, ...form } : p));
    } else {
      setPredictions([...predictions, { ...form, id: Date.now(), status: 'pending', date: new Date().toISOString().split('T')[0] }]);
    }
    setShowForm(false);
    setEditingId(null);
    setForm({ match: '', league: 'Premier League', type: '1X2', prediction: '', odds: '', confidence: 70, premium: false });
  };

  const handleEdit = (prediction) => {
    setForm(prediction);
    setEditingId(prediction.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setPredictions(predictions.filter(p => p.id !== id));
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
              📊 Prediction Management
            </h1>
            <p style={{ color: '#6B7394' }}>{predictions.length} predictions total</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm({ match: '', league: 'Premier League', type: '1X2', prediction: '', odds: '', confidence: 70, premium: false }); }}
            style={{
              padding: '12px 24px',
              borderRadius: 10,
              border: 'none',
              background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              color: '#0A0E27',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            + Add Prediction
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div style={{
            background: '#131849',
            border: '1px solid rgba(0,229,255,0.2)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
          }}>
            <h3 style={{ color: '#fff', fontSize: 18, marginBottom: 20, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {editingId ? 'Edit Prediction' : 'New Prediction'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
                <div>
                  <label style={{ color: '#B0B8D1', fontSize: 13, marginBottom: 6, display: 'block' }}>Match</label>
                  <input type="text" value={form.match} onChange={(e) => setForm({ ...form, match: e.target.value })}
                    placeholder="e.g. Team A vs Team B" required
                    style={{ width: '100%', padding: '10px 14px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 14, fontFamily: 'Inter', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ color: '#B0B8D1', fontSize: 13, marginBottom: 6, display: 'block' }}>League</label>
                  <select value={form.league} onChange={(e) => setForm({ ...form, league: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 14, fontFamily: 'Inter', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                    <option>Premier League</option>
                    <option>La Liga</option>
                    <option>Bundesliga</option>
                    <option>Serie A</option>
                    <option>Ligue 1</option>
                    <option>Eredivisie</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: '#B0B8D1', fontSize: 13, marginBottom: 6, display: 'block' }}>Prediction Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 14, fontFamily: 'Inter', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                    <option>1X2</option>
                    <option>Over/Under</option>
                    <option>BTTS</option>
                    <option>Double Chance</option>
                    <option>HT/FT</option>
                    <option>Correct Score</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: '#B0B8D1', fontSize: 13, marginBottom: 6, display: 'block' }}>Prediction</label>
                  <input type="text" value={form.prediction} onChange={(e) => setForm({ ...form, prediction: e.target.value })}
                    placeholder="e.g. 1, Over 2.5, Yes" required
                    style={{ width: '100%', padding: '10px 14px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 14, fontFamily: 'Inter', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ color: '#B0B8D1', fontSize: 13, marginBottom: 6, display: 'block' }}>Odds</label>
                  <input type="text" value={form.odds} onChange={(e) => setForm({ ...form, odds: e.target.value })}
                    placeholder="e.g. 2.10" required
                    style={{ width: '100%', padding: '10px 14px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 14, fontFamily: 'Inter', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ color: '#B0B8D1', fontSize: 13, marginBottom: 6, display: 'block' }}>Confidence (%)</label>
                  <input type="number" min="0" max="100" value={form.confidence} onChange={(e) => setForm({ ...form, confidence: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 14, fontFamily: 'Inter', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.premium} onChange={(e) => setForm({ ...form, premium: e.target.checked })}
                  style={{ width: 16, height: 16, accentColor: '#7C4DFF' }} />
                <span style={{ color: '#B0B8D1', fontSize: 14 }}>Premium Prediction</span>
              </label>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button type="submit" style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)', color: '#0A0E27', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter' }}>
                  {editingId ? 'Update Prediction' : 'Add Prediction'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#B0B8D1', fontSize: 14, cursor: 'pointer', fontFamily: 'Inter' }}>
                  Cancel
                </button>
              </div>
            </form>
            <style jsx>{`@media (max-width: 600px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
          </div>
        )}

        {/* Predictions Table */}
        <div style={{ background: '#131849', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Match</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>League</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Type</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Prediction</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Odds</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Confidence</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p) => (
                <tr key={p.id}>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontSize: 14, fontWeight: 600 }}>{p.match}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#B0B8D1', fontSize: 13 }}>{p.league}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#00E5FF', fontSize: 14 }}>{p.type}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontSize: 14, fontWeight: 700 }}>{p.prediction}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#FFD700', fontSize: 14, fontWeight: 700 }}>{p.odds}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#B0B8D1', fontSize: 14 }}>{p.confidence}%</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                      background: p.status === 'won' ? 'rgba(0,230,118,0.1)' : p.status === 'lost' ? 'rgba(255,82,82,0.1)' : 'rgba(255,145,0,0.1)',
                      color: p.status === 'won' ? '#00E676' : p.status === 'lost' ? '#FF5252' : '#FF9100',
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleEdit(p)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(0,229,255,0.2)', background: 'transparent', color: '#00E5FF', fontSize: 12, cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => handleDelete(p.id)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(255,82,82,0.3)', background: 'rgba(255,82,82,0.1)', color: '#FF5252', fontSize: 12, cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
