'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useAuth } from '../../../context/AuthContext';
import { predictionsApi, adminApi } from '../../../services/api';

const emptyForm = {
  match: '', league: 'Premier League', type: '1X2', prediction: '',
  odds: '', confidence: 70, premium: false, featured: false,
};

export default function AdminPredictionsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadPredictions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await predictionsApi.list({ limit: 100 });
      setPredictions(data.predictions || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load predictions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      window.location.href = '/login';
    }
  }, [user, isAdmin, authLoading]);

  useEffect(() => {
    if (user && isAdmin) {
      loadPredictions();
    }
  }, [user, isAdmin, loadPredictions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const [home, away] = form.match.split(' vs ').map(s => s?.trim()) || ['', ''];
    const payload = {
      matchName: { home: home || form.match, away: away || 'TBD' },
      league: form.league,
      category: form.type,
      prediction: form.prediction,
      odds: form.odds,
      confidence: parseInt(form.confidence) || 70,
      kickoff: new Date().toISOString(),
      isPremium: form.premium,
      isFeatured: form.featured,
    };

    try {
      if (editingId) {
        await adminApi.updatePrediction(editingId, payload);
      } else {
        await adminApi.createPrediction(payload);
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await loadPredictions();
    } catch (err) {
      setError(err.message || 'Failed to save prediction');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (prediction) => {
    setForm({
      match: `${prediction.matchName?.home || ''} vs ${prediction.matchName?.away || ''}`,
      league: prediction.league || 'Premier League',
      type: prediction.category || '1X2',
      prediction: prediction.prediction || '',
      odds: prediction.odds || '',
      confidence: prediction.confidence || 70,
      premium: prediction.isPremium || false,
      featured: prediction.isFeatured || false,
    });
    setEditingId(prediction._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this prediction?')) return;
    try {
      await adminApi.deletePrediction(id);
      await loadPredictions();
    } catch (err) {
      setError(err.message || 'Failed to delete prediction');
    }
  };

  const handleResult = async (prediction, status) => {
    try {
      await adminApi.updatePredictionResult(prediction._id, { status });
      await loadPredictions();
    } catch (err) {
      setError(err.message || 'Failed to update result');
    }
  };

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

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';

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
            onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
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

        {error && (
          <div style={{
            padding: '12px 16px',
            borderRadius: 10,
            background: 'rgba(255,82,82,0.1)',
            border: '1px solid rgba(255,82,82,0.2)',
            color: '#FF5252',
            fontSize: 13,
            marginBottom: 20,
          }}>
            {error}
          </div>
        )}

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
                    <option>Champions League</option>
                    <option>Europa League</option>
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
              <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.premium} onChange={(e) => setForm({ ...form, premium: e.target.checked })}
                    style={{ width: 16, height: 16, accentColor: '#7C4DFF' }} />
                  <span style={{ color: '#B0B8D1', fontSize: 14 }}>Premium Prediction</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    style={{ width: 16, height: 16, accentColor: '#00E5FF' }} />
                  <span style={{ color: '#B0B8D1', fontSize: 14 }}>Featured Match</span>
                </label>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button type="submit" disabled={saving} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)', color: '#0A0E27', fontSize: 14, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter' }}>
                  {saving ? 'Saving...' : (editingId ? 'Update Prediction' : 'Add Prediction')}
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
          {loading ? (
            <div style={{ padding: 60, textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(0,229,255,0.2)', borderTopColor: '#00E5FF', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
              <p style={{ color: '#6B7394' }}>Loading predictions...</p>
            </div>
          ) : predictions.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center' }}>
              <p style={{ color: '#6B7394', marginBottom: 8 }}>No predictions yet.</p>
              <p style={{ color: '#4A5173', fontSize: 14 }}>Click "+ Add Prediction" to create today's predictions.</p>
            </div>
          ) : (
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
                <tr key={p._id}>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontSize: 14, fontWeight: 600 }}>
                    {p.matchName?.home} vs {p.matchName?.away}
                    {p.isPremium && <span style={{ marginLeft: 8, fontSize: 11, padding: '2px 6px', borderRadius: 4, background: 'rgba(124,77,255,0.2)', color: '#B388FF' }}>PREMIUM</span>}
                    {p.isFeatured && <span style={{ marginLeft: 4, fontSize: 11, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,229,255,0.15)', color: '#00E5FF' }}>FEATURED</span>}
                  </td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#B0B8D1', fontSize: 13 }}>{p.league}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#00E5FF', fontSize: 14 }}>{p.category}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff', fontSize: 14, fontWeight: 700 }}>{p.prediction}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#FFD700', fontSize: 14, fontWeight: 700 }}>{p.odds}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#B0B8D1', fontSize: 14 }}>{p.confidence}%</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                      background: p.status === 'won' ? 'rgba(0,230,118,0.1)' : p.status === 'lost' ? 'rgba(255,82,82,0.1)' : 'rgba(255,145,0,0.1)',
                      color: p.status === 'won' ? '#00E676' : p.status === 'lost' ? '#FF5252' : '#FF9100',
                    }}>
                      {p.status || 'pending'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button onClick={() => handleEdit(p)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(0,229,255,0.2)', background: 'transparent', color: '#00E5FF', fontSize: 12, cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => handleResult(p, 'won')} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(0,230,118,0.3)', background: 'rgba(0,230,118,0.1)', color: '#00E676', fontSize: 12, cursor: 'pointer' }}>Won</button>
                      <button onClick={() => handleResult(p, 'lost')} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(255,82,82,0.3)', background: 'rgba(255,82,82,0.1)', color: '#FF5252', fontSize: 12, cursor: 'pointer' }}>Lost</button>
                      <button onClick={() => handleDelete(p._id)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(255,82,82,0.3)', background: 'rgba(255,82,82,0.1)', color: '#FF5252', fontSize: 12, cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

