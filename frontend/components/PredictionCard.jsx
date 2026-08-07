'use client';

import { useState } from 'react';
import { getCategoryByValue } from '../lib/predictionCategories';

export default function PredictionCard({
  event,
  match,
  league = 'Premier League',
  type = '1X2',
  prediction,
  odds,
  confidence = 75,
  isPremium = false,
  time = 'Today',
  home,
  away,
}) {
  const [expanded, setExpanded] = useState(false);

  const title = match || event || `${home || 'Home'} vs ${away || 'Away'}`;

  // Resolve category metadata (icon + color) from the shared category system
  const cat = getCategoryByValue(type);
  const catIcon = cat?.icon || '⚽';
  const catColor = cat?.color || '#00E5FF';

  const getConfidenceColor = (val) => {
    if (val >= 80) return '#00E676';
    if (val >= 60) return '#FF9100';
    return '#FF5252';
  };

  return (
    <div
      className="premium-card relative p-5 cursor-pointer overflow-hidden"
      style={{
        border: `1px solid ${isPremium ? 'rgba(124,77,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = isPremium
          ? '0 0 30px rgba(124,77,255,0.25), 0 12px 40px rgba(0,0,0,0.45)'
          : `0 0 24px ${catColor}22, 0 12px 40px rgba(0,0,0,0.45)`;
        e.currentTarget.style.borderColor = isPremium ? 'rgba(124,77,255,0.6)' : `${catColor}55`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)';
        e.currentTarget.style.borderColor = isPremium ? 'rgba(124,77,255,0.35)' : 'rgba(255,255,255,0.07)';
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Glow orb */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${isPremium ? 'rgba(124,77,255,0.12)' : `${catColor}14`} 0%, transparent 70%)`,
        }}
      />

      {isPremium && (
        <div className="premium-badge absolute top-3 right-3">
          ⭐ Premium
        </div>
      )}

      {/* Header: league + time */}
      <div className="flex items-center justify-between mb-4">
        <span className="category-chip">
          <span>{catIcon}</span>
          {league}
        </span>
        <span className="text-xs font-medium" style={{ color: '#6B7394' }}>🕒 {time}</span>
      </div>

      {/* Match title */}
      <h3 className="text-base font-bold text-white leading-snug mb-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
        {title}
      </h3>

      {/* Prediction & odds */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="text-center py-2.5 px-2 rounded-lg" style={{ background: `${catColor}10`, border: `1px solid ${catColor}30` }}>
          <div className="text-[11px] mb-1" style={{ color: '#6B7394' }}>Prediction</div>
          <div className="text-lg font-extrabold" style={{ color: '#00E5FF' }}>{prediction}</div>
        </div>
        <div className="text-center py-2.5 px-2 rounded-lg" style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.12)' }}>
          <div className="text-[11px] mb-1" style={{ color: '#6B7394' }}>Odds</div>
          <div className="text-lg font-extrabold" style={{ color: '#FFD700' }}>{odds}</div>
        </div>
      </div>

      {/* Type chip */}
      <div className="text-center mb-3 py-1 px-2 rounded-md text-xs font-medium" style={{ background: 'rgba(255,255,255,0.03)', color: '#B0B8D1' }}>
        <span className="mr-1">{catIcon}</span>
        {type}
      </div>

      {/* Confidence ring + bar */}
      <div className="flex items-center gap-3">
        <div
          className="confidence-ring"
          style={{ background: `conic-gradient(${getConfidenceColor(confidence)} ${confidence}%, rgba(255,255,255,0.08) 0%)` }}
        >
          <span style={{ color: getConfidenceColor(confidence) }}>{confidence}%</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-1.5 text-xs" style={{ color: '#B0B8D1' }}>
            <span>Confidence</span>
            <span className="font-bold" style={{ color: getConfidenceColor(confidence) }}>{confidence}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${confidence}%`,
                background: `linear-gradient(90deg, ${getConfidenceColor(confidence)}, #00E5FF)`,
              }}
            />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/5 animate-fadeIn">
          <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#B0B8D1' }}>
            <strong className="text-white">Analysis:</strong> Based on recent form, head-to-head
            records, and our statistical models, this selection has strong potential.
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = isPremium ? '/premium' : '/predictions';
            }}
            className="w-full py-2.5 rounded-lg border-none text-[13px] font-bold cursor-pointer transition-all"
            style={{
              background: isPremium ? 'linear-gradient(135deg, #7C4DFF, #FFD700)' : 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              color: '#0A0E27',
            }}
          >
            {isPremium ? 'Unlock Premium Pick' : 'View Details'}
          </button>
        </div>
      )}
    </div>
  );
}

