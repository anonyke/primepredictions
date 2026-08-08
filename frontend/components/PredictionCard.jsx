'use client';

import { useState } from 'react';
import { getCategoryByValue } from '../lib/predictionCategories';

/**
 * Professional football prediction card.
 * Layout: time + league header, Home vs Away with VS badge,
 * prediction badge, separated odds box, confidence bar, premium badge.
 */
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

  const homeName = home || (typeof match === 'string' ? match?.split(' vs ')[0]?.trim() : '');
  const awayName = away || (typeof match === 'string' ? match?.split(' vs ')[1]?.trim() : '');
  const title = match || event || `${home || 'Home'} vs ${away || 'Away'}`;

  // Resolve category metadata (icon + color) from the shared category system
  const cat = getCategoryByValue(type);
  const catIcon = cat?.icon || '⚽';
  const catColor = cat?.color || '#00E5FF';

  // Map "1X2 store categories" to a display label
  const displayType =
    type === 'Over/Under'
      ? prediction
      : cat?.label?.split(' (')[0] || type;

  const getConfidenceColor = (val) => {
    if (val >= 80) return '#00B74F';
    if (val >= 60) return '#FF9F1C';
    return '#E23636';
  };

  // Format time nicely
  const formattedTime = (() => {
    try {
      const d = new Date(time);
      if (!isNaN(d.getTime())) {
        return d.toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    } catch (e) { /* fall through */ }
    return time;
  })();

  return (
    <div
      className="group relative bg-white rounded-2xl border p-4 sm:p-5 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{
        borderColor: isPremium ? 'rgba(184,134,11,0.4)' : 'rgba(15,21,53,0.08)',
        boxShadow: '0 4px 20px rgba(15,21,53,0.06)',
      }}
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(!expanded); }}
      aria-expanded={expanded}
    >
      {/* Premium top accent bar */}
      {isPremium && (
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg,#FFD700,#B8860B)' }}
        />
      )}

      {isPremium && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide"
          style={{ background: 'linear-gradient(135deg,#FFD700,#B8860B)', color: '#0A0E27' }}
        >
          ⭐ VIP
        </div>
      )}

      {/* Header: time + league */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${catColor}14`, color: `${catColor}` }}>
          {catIcon} {league}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          {formattedTime}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
        <div className="flex-1 min-w-0 text-center">
          <div className="w-10 h-10 mx-auto mb-1.5 rounded-xl flex items-center justify-center text-lg" style={{ background: '#F1F5F9' }}>
            ⚽
          </div>
          <div className="text-sm font-bold text-[#0F1535] truncate">{homeName || 'Home'}</div>
        </div>

        <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white" style={{ background: 'linear-gradient(135deg,#00B8CC,#6C43E0)' }}>
          VS
        </div>

        <div className="flex-1 min-w-0 text-center">
          <div className="w-10 h-10 mx-auto mb-1.5 rounded-xl flex items-center justify-center text-lg" style={{ background: '#F1F5F9' }}>
            ⚽
          </div>
          <div className="text-sm font-bold text-[#0F1535] truncate">{awayName || 'Away'}</div>
        </div>
      </div>

      {/* Prediction & odds */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="text-center py-2.5 px-2 rounded-xl" style={{ background: `${catColor}10`, border: `1px solid ${catColor}30` }}>
          <div className="text-[11px] mb-0.5 font-semibold text-slate-400">PREDICTION</div>
          <div className="text-base font-extrabold text-[#0F1535] leading-tight">{prediction}</div>
        </div>
        <div className="text-center py-2.5 px-2 rounded-xl" style={{ background: 'rgba(255,159,28,0.08)', border: '1px solid rgba(255,159,28,0.22)' }}>
          <div className="text-[11px] mb-0.5 font-semibold text-slate-400">ODDS</div>
          <div className="text-base font-extrabold" style={{ color: '#E08500' }}>{odds}</div>
        </div>
      </div>

      {/* Type chip */}
      <div className="text-center mb-2 py-1 px-2 rounded-md text-[11px] font-semibold text-slate-500" style={{ background: '#F8FAFC' }}>
        {catIcon} {displayType}
      </div>

      {/* Confidence */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-400 shrink-0">CL</span>
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#EEF2F7' }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${confidence}%`, background: getConfidenceColor(confidence) }}
          />
        </div>
        <span className="text-[12px] font-bold shrink-0" style={{ color: getConfidenceColor(confidence) }}>{confidence}%</span>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-100 animate-fadeIn">
          <p className="text-[13px] leading-relaxed mb-3 text-slate-500">
            Based on recent form, head-to-head records, and our statistical models, this selection has strong potential.
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = isPremium ? '/premium' : '/predictions';
            }}
            className="w-full py-2.5 rounded-xl border-none text-[13px] font-bold cursor-pointer transition-all hover:opacity-90"
            style={{ background: isPremium ? 'linear-gradient(135deg,#FFD700,#B8860B)' : 'linear-gradient(135deg,#00B8CC,#6C43E0)', color: '#fff' }}
          >
            {isPremium ? 'Unlock VIP Pick' : 'View Details'}
          </button>
        </div>
      )}
    </div>
  );
}

