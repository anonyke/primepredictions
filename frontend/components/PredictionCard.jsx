'use client';

import Link from 'next/link';

export default function PredictionCard({ prediction, onAddToAccumulator, isVipUser = false }) {
  const isVipLocked = prediction.isPremium && !isVipUser;
  const home = prediction.matchName?.home || 'Home Team';
  const away = prediction.matchName?.away || 'Away Team';
  const formattedDate = prediction.kickoff
    ? new Date(prediction.kickoff).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Upcoming';

  const statusColors = {
    pending: 'bg-slate-800 text-slate-300 border-slate-700',
    won: 'bg-emerald-950/60 text-emerald-400 border-emerald-800',
    lost: 'bg-rose-950/60 text-rose-400 border-rose-800',
    void: 'bg-amber-950/60 text-amber-400 border-amber-800',
  };

  return (
    <div className="bg-[#1e293b] rounded-xl border border-slate-800 p-5 hover:border-slate-700 transition-all shadow-sm">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
        <span className="font-medium text-slate-300">{prediction.league || 'International'}</span>
        <span>{formattedDate}</span>
      </div>

      <div className="flex items-center justify-between py-2 border-y border-slate-800/80 mb-3">
        <span className="font-bold text-slate-100 text-base">{home}</span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">VS</span>
        <span className="font-bold text-slate-100 text-base">{away}</span>
      </div>

      <div className="bg-[#0f172a] rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-400 font-medium">Market:</span>
          <span className="text-emerald-400 font-semibold">{prediction.category || '1X2'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Prediction:</span>
          {isVipLocked ? (
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              🔒 VIP Locked
            </span>
          ) : (
            <span className="text-slate-100 font-bold">{prediction.prediction}</span>
          )}
        </div>
        {!isVipLocked && prediction.odds && (
          <div className="flex items-center justify-between text-xs mt-1.5 pt-1.5 border-t border-slate-800/60">
            <span className="text-slate-400 font-medium">Odds:</span>
            <span className="text-slate-200 font-mono font-bold">{prediction.odds}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs pt-1">
        <span className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wider ${statusColors[prediction.status] || statusColors.pending}`}>
          {prediction.status || 'PENDING'}
        </span>

        {isVipLocked ? (
          <Link
            href="/pricing"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
          >
            Unlock VIP
          </Link>
        ) : onAddToAccumulator ? (
          <button
            onClick={() => onAddToAccumulator(prediction)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition-colors"
          >
            + Add to Slip
          </button>
        ) : null}
      </div>
    </div>
  );
}
