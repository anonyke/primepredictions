'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const resultsData = [
  { id: 1, match: 'Manchester City vs Arsenal', league: 'Premier League', type: '1X2', prediction: '1', odds: '1.85', result: 'won', date: '2024-01-20' },
  { id: 2, match: 'Liverpool vs Tottenham', league: 'Premier League', type: 'Over/Under', prediction: 'Over 2.5', odds: '1.72', result: 'won', date: '2024-01-20' },
  { id: 3, match: 'PSG vs Marseille', league: 'Ligue 1', type: 'BTTS', prediction: 'Yes', odds: '1.80', result: 'lost', date: '2024-01-19' },
  { id: 4, match: 'Chelsea vs Manchester Utd', league: 'Premier League', type: 'Double Chance', prediction: '1X', odds: '1.25', result: 'won', date: '2024-01-19' },
  { id: 5, match: 'Bayern Munich vs Leipzig', league: 'Bundesliga', type: '1X2', prediction: '1', odds: '1.65', result: 'won', date: '2024-01-18' },
  { id: 6, match: 'Inter Milan vs Juventus', league: 'Serie A', type: 'Over/Under', prediction: 'Under 2.5', odds: '2.10', result: 'lost', date: '2024-01-18' },
  { id: 7, match: 'Barcelona vs Real Madrid', league: 'La Liga', type: '1X2', prediction: 'X', odds: '3.40', result: 'pending', date: '2024-01-17' },
  { id: 8, match: 'AC Milan vs Napoli', league: 'Serie A', type: 'Double Chance', prediction: '12', odds: '1.40', result: 'won', date: '2024-01-17' },
  { id: 9, match: 'Ajax vs Feyenoord', league: 'Eredivisie', type: 'BTTS', prediction: 'No', odds: '2.25', result: 'won', date: '2024-01-16' },
  { id: 10, match: 'Dortmund vs Leverkusen', league: 'Bundesliga', type: 'HT/FT', prediction: '1/1', odds: '3.00', result: 'lost', date: '2024-01-16' },
];

export default function ResultsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? resultsData : resultsData.filter(r => r.result === filter);

  const stats = {
    total: resultsData.length,
    won: resultsData.filter(r => r.result === 'won').length,
    lost: resultsData.filter(r => r.result === 'lost').length,
    pending: resultsData.filter(r => r.result === 'pending').length,
    winRate: Math.round((resultsData.filter(r => r.result === 'won').length / (resultsData.filter(r => r.result !== 'pending').length || 1)) * 100),
  };

  const getResultBadge = (result) => {
    if (result === 'won') return { bg: 'rgba(0,230,118,0.15)', color: '#00E676', text: 'Won' };
    if (result === 'lost') return { bg: 'rgba(255,82,82,0.15)', color: '#FF5252', text: 'Lost' };
    return { bg: 'rgba(255,145,0,0.15)', color: '#FF9100', text: 'Pending' };
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: 12,
          }}>
            Prediction <span style={{
              background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Results</span>
          </h1>
          <p style={{ color: '#6B7394', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
            Track our prediction performance with transparent win/loss records
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}>
          <div style={{
            padding: '20px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))',
            border: '1px solid rgba(0,229,255,0.15)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, color: '#6B7394', marginBottom: 4 }}>Total Predictions</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {stats.total}
            </div>
          </div>
          <div style={{
            padding: '20px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(0,230,118,0.08), rgba(0,230,118,0.02))',
            border: '1px solid rgba(0,230,118,0.15)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, color: '#6B7394', marginBottom: 4 }}>Won</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#00E676', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {stats.won}
            </div>
          </div>
          <div style={{
            padding: '20px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(255,82,82,0.08), rgba(255,82,82,0.02))',
            border: '1px solid rgba(255,82,82,0.15)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, color: '#6B7394', marginBottom: 4 }}>Lost</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#FF5252', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {stats.lost}
            </div>
          </div>
          <div style={{
            padding: '20px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,215,0,0.02))',
            border: '1px solid rgba(255,215,0,0.15)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, color: '#6B7394', marginBottom: 4 }}>Win Rate</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#FFD700', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              {stats.winRate}%
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20,
          flexWrap: 'wrap',
        }}>
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
                borderRadius: 8,
                border: `1px solid ${filter === f.id ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                background: filter === f.id ? 'rgba(0,229,255,0.08)' : 'transparent',
                color: filter === f.id ? '#00E5FF' : '#B0B8D1',
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

        <div style={{
          background: '#131849',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Date</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Match</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Type</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Prediction</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Odds</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7394', fontWeight: 600, background: '#0F1535', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Result</th>
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
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 14, color: '#6B7394' }}>{r.date}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 14, color: '#fff', fontWeight: 600 }}>{r.match}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 14, color: '#00E5FF' }}>{r.type}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 14, color: '#fff', fontWeight: 700 }}>{r.prediction}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 14, color: '#FFD700', fontWeight: 700 }}>{r.odds}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        background: badge.bg,
                        color: badge.color,
                        fontSize: 13,
                        fontWeight: 600,
                      }}>
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
              No results found for this filter.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

