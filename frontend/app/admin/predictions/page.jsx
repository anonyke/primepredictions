'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../../components/AdminLayout';
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(0,229,255,0.2)', borderTopColor: '#00E5FF', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#6B7394' }}>Verifying access...</p>
        </div>
      </div>
    );
  }

  const headerActions = (
    <button
      onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
      className="btn btn-primary btn-sm"
      style={{ cursor: 'pointer' }}
    >
      + Add Prediction
    </button>
  );

  return (
    <AdminLayout title="Predictions" subtitle={`${predictions.length} predictions total`} actions={headerActions}>
      {error && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 10,
            background: 'rgba(255,82,82,0.1)',
            border: '1px solid rgba(255,82,82,0.2)',
            color: '#FF5252',
            fontSize: 13,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="premium-card p-6 mb-6" style={{ borderColor: 'rgba(0,229,255,0.2)' }}>
          <h3 className="text-white font-bold text-lg mb-5" style={{ fontFamily: 'var(--font-display)' }}>
            {editingId ? 'Edit Prediction' : 'New Prediction'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
              <div>
                <label className="block text-[13px] mb-1.5" style={{ color: '#B0B8D1' }}>Match</label>
                <input type="text" value={form.match} onChange={(e) => setForm({ ...form, match: e.target.value })} placeholder="e.g. Team A vs Team B" required className="form-input" />
              </div>
              <div>
                <label className="block text-[13px] mb-1.5" style={{ color: '#B0B8D1' }}>League</label>
                <select value={form.league} onChange={(e) => setForm({ ...form, league: e.target.value })} className="form-select">
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
                <label className="block text-[13px] mb-1.5" style={{ color: '#B0B8D1' }}>Prediction Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="form-select">
                  <option>1X2</option>
                  <option>Over/Under</option>
                  <option>BTTS</option>
                  <option>Double Chance</option>
                  <option>HT/FT</option>
                  <option>Correct Score</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] mb-1.5" style={{ color: '#B0B8D1' }}>Prediction</label>
                <input type="text" value={form.prediction} onChange={(e) => setForm({ ...form, prediction: e.target.value })} placeholder="e.g. 1, Over 2.5, Yes" required className="form-input" />
              </div>
              <div>
                <label className="block text-[13px] mb-1.5" style={{ color: '#B0B8D1' }}>Odds</label>
                <input type="text" value={form.odds} onChange={(e) => setForm({ ...form, odds: e.target.value })} placeholder="e.g. 2.10" required className="form-input" />
              </div>
              <div>
                <label className="block text-[13px] mb-1.5" style={{ color: '#B0B8D1' }}>Confidence (%)</label>
                <input type="number" min="0" max="100" value={form.confidence} onChange={(e) => setForm({ ...form, confidence: parseInt(e.target.value) })} className="form-input" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
              <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#B0B8D1' }}>
                <input type="checkbox" checked={form.premium} onChange={(e) => setForm({ ...form, premium: e.target.checked })} style={{ width: 16, height: 16, accentColor: '#7C4DFF' }} />
                Premium Prediction
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#B0B8D1' }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} style={{ width: 16, height: 16, accentColor: '#00E5FF' }} />
                Featured Match
              </label>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? 'Saving...' : (editingId ? 'Update Prediction' : 'Add Prediction')}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#B0B8D1', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
          <style jsx>{`@media (max-width: 600px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      )}

      {/* Predictions Table */}
      <div className="table-container">
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
          <table className="premium-table">
            <thead>
              <tr>
                {['Match', 'League', 'Type', 'Prediction', 'Odds', 'Confidence', 'Status', 'Actions'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {predictions.map((p) => (
                <tr key={p._id}>
                  <td className="font-semibold text-white">
                    {p.matchName?.home} vs {p.matchName?.away}
                    {p.isPremium && <span className="ml-2 px-1.5 py-0.5 rounded text-[11px]" style={{ background: 'rgba(124,77,255,0.2)', color: '#B388FF' }}>PREMIUM</span>}
                    {p.isFeatured && <span className="ml-1 px-1.5 py-0.5 rounded text-[11px]" style={{ background: 'rgba(0,229,255,0.15)', color: '#00E5FF' }}>FEATURED</span>}
                  </td>
                  <td style={{ color: '#B0B8D1' }}>{p.league}</td>
                  <td style={{ color: '#00E5FF' }}>{p.category}</td>
                  <td className="font-bold text-white">{p.prediction}</td>
                  <td style={{ color: '#FFD700', fontWeight: 700 }}>{p.odds}</td>
                  <td style={{ color: '#B0B8D1' }}>{p.confidence}%</td>
                  <td>
                    <span
                      className="px-2.5 py-1 rounded text-xs font-semibold"
                      style={{
                        background: p.status === 'won' ? 'rgba(0,230,118,0.1)' : p.status === 'lost' ? 'rgba(255,82,82,0.1)' : 'rgba(255,145,0,0.1)',
                        color: p.status === 'won' ? '#00E676' : p.status === 'lost' ? '#FF5252' : '#FF9100',
                      }}
                    >
                      {p.status || 'pending'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button onClick={() => handleEdit(p)} className="btn btn-sm" style={{ border: '1px solid rgba(0,229,255,0.2)', background: 'transparent', color: '#00E5FF', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => handleResult(p, 'won')} className="btn btn-sm" style={{ border: '1px solid rgba(0,230,118,0.3)', background: 'rgba(0,230,118,0.1)', color: '#00E676', cursor: 'pointer' }}>Won</button>
                      <button onClick={() => handleResult(p, 'lost')} className="btn btn-sm" style={{ border: '1px solid rgba(255,82,82,0.3)', background: 'rgba(255,82,82,0.1)', color: '#FF5252', cursor: 'pointer' }}>Lost</button>
                      <button onClick={() => handleDelete(p._id)} className="btn btn-sm" style={{ border: '1px solid rgba(255,82,82,0.3)', background: 'rgba(255,82,82,0.1)', color: '#FF5252', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
