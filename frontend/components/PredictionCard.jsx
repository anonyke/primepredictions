'use client';

import { useState } from 'react';

const categoryIcons = {
  '1X2': '🎯',
  'Over/Under': '📊',
  'BTTS': '⚽',
  'Double Chance': '🛡️',
  'HT/FT': '🔄',
  'Correct Score': '✅',
};

export default function PredictionCard({
  match = 'Team A vs Team B',
  league = 'Premier League',
  type = '1X2',
  prediction = '1',
  odds = '2.10',
  confidence = 82,
  isPremium = false,
  time = 'Today, 20:00',
  result = null,
}) {
  const [expanded, setExpanded] = useState(false);

  const getConfidenceColor = (val) => {
    if (val >= 80) return '#00E676';
    if (val >= 60) return '#FF9100';
    return '#FF5252';
  };

  const getResultColor = (res) => {
    if (res === 'won') return { bg: 'rgba(0,230,118,0.1)', color: '#00E676', text: 'Won' };
    if (res === 'lost') return { bg: 'rgba(255,82,82,0.1)', color: '#FF5252', text: 'Lost' };
    return { bg: 'rgba(255,145,0,0.1)', color: '#FF9100', text: 'Pending' };
  };

  const resultStyle = getResultColor(result);

  return (
    <div
      style={{
        background: 'rgba(19, 24, 73, 0.8)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${isPremium ? 'rgba(124, 77, 255, 0.3)' : result === 'won' ? 'rgba(0,230,118,0.2)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 16,
        padding: 20,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = isPremium
          ? '0 0 30px rgba(124,77,255,0.2), 0 8px 32px rgba(0,0,0,0.4)'
          : '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,229,255,0.05)';
        e.currentTarget.style.borderColor = isPremium ? 'rgba(124,77,255,0.5)' : 'rgba(0,229,255,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = isPremium ? 'rgba(124, 77, 255, 0.3)' : result === 'won' ? 'rgba(0,230,118,0.2)' : 'rgba(255,255,255,0.06)';
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ fontSize: 18 }}>{categoryIcons[type] || '📋'}</span>
          <span style={{
            padding: '3px 10px',
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
            background: 'rgba(255,255,255,0.06)',
            color: '#6B7394',
          }}>
            {type}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isPremium && (
            <span style={{
              padding: '2px 8px',
              borderRadius: 4,
              background: 'linear-gradient(135deg, #7C4DFF, #FFD700)',
              color: '#0A0E27',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Premium
            </span>
          )}
          {result && (
            <span style={{
              padding: '2px 8px',
              borderRadius: 4,
              background: resultStyle.bg,
              color: resultStyle.color,
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              {resultStyle.text}
            </span>
          )}
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
          {match}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6B7394' }}>
          <span>{league}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.03)',
      }}>
        <div>
          <div style={{ fontSize: 11, color: '#6B7394', marginBottom: 2 }}>Prediction</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#00E5FF' }}>{prediction}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#6B7394', marginBottom: 2 }}>Odds</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#FFD700' }}>{odds}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#6B7394', marginBottom: 2 }}>Confidence</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: getConfidenceColor(confidence) }}>
            {confidence}%
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 10,
        width: '100%',
        height: 4,
        borderRadius: 2,
        background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          borderRadius: 2,
          width: `${confidence}%`,
          background: `linear-gradient(90deg, ${getConfidenceColor(confidence)}, #00E5FF)`,
          transition: 'width 1s ease',
        }} />
      </div>

      {expanded && (
        <div style={{
          marginTop: 14,
          paddingTop: 14,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: 13, color: '#B0B8D1', lineHeight: 1.6, marginBottom: 12 }}>
            <strong style={{ color: '#fff' }}>Analysis:</strong> Statistical models indicate 
            strong probability based on recent form, head-to-head history, and current team news.
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = isPremium ? '/premium' : '/predictions';
            }}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 8,
              border: 'none',
              background: isPremium
                ? 'linear-gradient(135deg, #7C4DFF, #FFD700)'
                : 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              color: '#0A0E27',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {isPremium ? '🔒 Unlock Premium Pick' : 'View Full Analysis'}
          </button>
        </div>
      )}
    </div>
  );
}

