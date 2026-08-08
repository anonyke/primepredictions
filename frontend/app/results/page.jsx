'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { predictionsApi } from '../../services/api';

function mapResult(p) {
  const home = p.matchName?.home || '';
  const away = p.matchName?.away || '';
  return {
    id: p._id,
    match: `${home} vs ${away}`,
    league: p.league || '',
    type: p.category || '1X2',
    prediction: p.prediction || '',
    odds: p.odds || '',
    result: p.status || 'pending',
    date: p.kickoff ? new Date(p.kickoff).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'TBD',
  };
}

export default function ResultsPage() {
  const [filter, setFilter] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadResults = useCallback(() => {
    setLoading(true);
    setError('');
    predictionsApi.list({ limit: 200 })
      .then((data) => setResults((data.predictions || []).map(mapResult)))
      .catch((err) => setError(err.message || 'Failed to load results'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadResults();
  }, [loadResults]);

  const filtered = filter === 'all' ? results : results.filter(r => r.result === filter);

  const stats = useMemo(() => {
    const won = results.filter(r => r.result === 'won').length;
    const lost = results.filter(r => r.result === 'lost').length;
    const pending = results.filter(r => r.result === 'pending').length;
    const decided = won + lost;
    return {
      total: results.length,
      won,
      lost,
      pending,
      winRate: decided > 0 ? Math.round((won / decided) * 100) : 0,
    };
  }, [results]);

  const getResultBadge = (result) => {
    if (result === 'won') return { bg: 'rgba(0,230,118,0.15)', color: '#00E676', text: 'Won' };
    if (result === 'lost') return { bg: 'rgba(255,82,82,0.15)', color: '#FF5252', text: 'Lost' };
    return { bg: 'rgba(255,145,0,0.15)', color: '#FF9100', text: 'Pending' };
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 16px 60px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: 12,
          }}>
            Prediction <span style={{ background: 'linear-gradient(135deg,#00B8CC,#6C43E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Results</span>
          </h1>
          <p style={{ color: '#6B7394', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
            Track our prediction performance with transparent win/loss records
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Predictions', value: stats.total, color: '#fff', bg: 'rgba(0,184,204,0.08)', border: 'rgba(0,184,204,0.15)' },
            { label: 'Won', value: stats.won, color: '#00E676', bg: 'rgba(0,230,118,0.08)', border: 'rgba(0,230,118,0.15)' },
            { label: 'Lost', value: stats.lost, color: '#FF5252', bg: 'rgba(255,82,82,0.08)', border: 'rgba(255,82,82,0.15)' },
            { label: 'Win Rate', value: `${stats.winRate}%`, color: '#FFD700', bg: 'rgba(255,215,0,0.08)', border: 'rgba(255,215,0,0.15)' },
          ].map((s) => (
            <div key={s.label} style={{ padding: '20px', borderRadius: 14, background: s.bg, border: `1px solid ${s.border}`, textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#6B7394', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                {loading ? '…' : s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Results' },
            { id: 'won', label: 'Won' },
            { id: 'lost', label: 'Lost' },
            { id: 'pending', label: 'Pending' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '8px 20px',
                borderRadius: 999,
                border: `1px solid ${filter === f.id ? 'rgba(0,184,204,0.4)' : 'rgba(255,255,255,0.06)'}`,
                background: filter === f.id ? 'rgba(0,184,204,0.1)' : 'transparent',
                color: filter === f.id ? '#00B8CC' : '#B0B8D1',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.3s ease',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ background: '#131849', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4 items-center mb-4">
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-4 flex-1" />
                <div className="skeleton h-4 w-20" />
                <div className="skeleton h-4 w-16" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: 40, background: '#131849', borderRadius: 16 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ color: '#fff' }}>Failed to load results</h3>
            <p style={{ color: '#6B7394', margin: '8px 0 20px' }}>{error}</p>
            <button onClick={loadResults} className="btn btn-primary">Try Again</button>
          </div>
        ) : (
          <div style={{ background: '#131849', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Date', 'Match', 'Type', 'Prediction', 'Odds', 'Result'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const badge = getResultBadge(r.result);
                  return (
                    <tr key={r.id} style={{ transition: 'background 0.3s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13, color: '#6B7394', whiteSpace: 'nowrap' }}>{r.date}</td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 14, color: '#fff', fontWeight: 600 }}>{r.match}</td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13, color: '#00B8CC' }}>{r.type}</td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 14, color: '#fff', fontWeight: 700 }}>{r.prediction}</td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 14, color: '#FFD700', fontWeight: 700 }}>{r.odds}</td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ padding: '4px 12px', borderRadius: 999, background: badge.bg, color: badge.color, fontSize: 13, fontWeight: 600 }}>
                          {badge.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: 40, textAlign: 'center', color: '#6B7394' }}>
                      No results found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
