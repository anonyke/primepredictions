'use client';

import { useState } from 'react';

export default function MatchCard({ 
  home = 'Home Team', 
  away = 'Away Team', 
  league = 'Premier League',
  kickoff = 'Today, 20:00',
  prediction = '1',
  odds = '2.10',
  confidence = 85,
  isPremium = false,
  type = '1X2'
}) {
  const [expanded, setExpanded] = useState(false);

  const getConfidenceColor = (val) => {
    if (val >= 80) return '#00E676';
    if (val >= 60) return '#FF9100';
    return '#FF5252';
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #131849 0%, #1C2260 100%)',
        border: `1px solid ${isPremium ? 'rgba(124, 77, 255, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
        borderRadius: 16,
        padding: 20,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = isPremium
          ? '0 0 30px rgba(124, 77, 255, 0.2)'
          : '0 8px 32px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {isPremium && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          padding: '3px 10px',
          borderRadius: 6,
          background: 'linear-gradient(135deg, #7C4DFF, #FFD700)',
          color: '#0A0E27',
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Premium
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <span style={{
          padding: '3px 10px',
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 600,
          background: 'rgba(255,255,255,0.06)',
          color: '#6B7394',
        }}>
          {league}
        </span>
        <span style={{ fontSize: 12, color: '#6B7394', fontWeight: 500 }}>
          {kickoff}
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 16,
      }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 8px',
            fontSize: 20,
          }}>
            ⚽
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
            {home}
          </div>
        </div>

        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 800,
          color: '#0A0E27',
          flexShrink: 0,
        }}>
          VS
        </div>

        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 8px',
            fontSize: 20,
          }}>
            ⚽
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
            {away}
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        marginBottom: 12,
      }}>
        <div style={{
          textAlign: 'center',
          padding: '8px 4px',
          borderRadius: 8,
          background: 'rgba(0,229,255,0.06)',
          border: '1px solid rgba(0,229,255,0.1)',
        }}>
          <div style={{ fontSize: 11, color: '#6B7394', marginBottom: 2 }}>Prediction</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#00E5FF' }}>{prediction}</div>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '8px 4px',
          borderRadius: 8,
          background: 'rgba(255,215,0,0.06)',
          border: '1px solid rgba(255,215,0,0.1)',
        }}>
          <div style={{ fontSize: 11, color: '#6B7394', marginBottom: 2 }}>Odds</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#FFD700' }}>{odds}</div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginBottom: 12,
        padding: '4px 8px',
        borderRadius: 6,
        background: 'rgba(255,255,255,0.03)',
        fontSize: 12,
        color: '#B0B8D1',
        fontWeight: 500,
      }}>
        {type}
      </div>

      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6,
          fontSize: 12,
          color: '#B0B8D1',
        }}>
          <span>Confidence</span>
          <span style={{ fontWeight: 700, color: getConfidenceColor(confidence) }}>
            {confidence}%
          </span>
        </div>
        <div style={{
          width: '100%',
          height: 5,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            borderRadius: 3,
            width: `${confidence}%`,
            background: `linear-gradient(90deg, ${getConfidenceColor(confidence)}, #00E5FF)`,
            transition: 'width 1s ease',
          }} />
        </div>
      </div>

      {expanded && (
        <div style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{ fontSize: 13, color: '#B0B8D1', lineHeight: 1.6 }}>
            <strong style={{ color: '#fff' }}>Analysis:</strong> Based on recent form, 
            head-to-head records, and statistical models, this prediction has strong potential.
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = isPremium ? '/premium' : '/predictions';
            }}
            style={{
              marginTop: 12,
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
              transition: 'all 0.3s ease',
            }}
          >
            {isPremium ? 'Unlock Premium Pick' : 'View Details'}
          </button>
        </div>
      )}
    </div>
  );
}

