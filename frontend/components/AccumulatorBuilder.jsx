'use client';

import { useState } from 'react';

export default function AccumulatorBuilder({ selections = [], onRemoveSelection, onClearAll }) {
  const [stake, setStake] = useState(100);

  const totalOdds = selections
    .reduce((acc, item) => acc * (parseFloat(item.odds) || 1.0), 1.0)
    .toFixed(2);

  const potentialReturn = (stake * totalOdds).toFixed(2);

  return (
    <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <h3 className="font-bold text-slate-100 text-base">Accumulator Slip</h3>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-semibold">
            {selections.length}
          </span>
        </div>
        {selections.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {selections.length === 0 ? (
        <div className="py-8 text-center text-slate-500 text-xs">
          Your slip is empty. Add predictions using the &quot;+ Add to Slip&quot; button.
        </div>
      ) : (
        <div className="divide-y divide-slate-800/80 my-3 max-h-60 overflow-y-auto">
          {selections.map((sel) => (
            <div key={sel._id || sel.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-slate-200">
                  {sel.matchName?.home || 'Home'} vs {sel.matchName?.away || 'Away'}
                </p>
                <p className="text-slate-400 text-[11px]">
                  Pick: <span className="text-emerald-400 font-medium">{sel.prediction}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-200">{sel.odds || '1.00'}</span>
                <button
                  onClick={() => onRemoveSelection(sel._id || sel.id)}
                  className="text-slate-500 hover:text-rose-400 transition-colors"
                  aria-label="Remove pick"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selections.length > 0 && (
        <div className="pt-3 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Total Multiplier:</span>
            <span className="text-emerald-400 font-mono font-bold text-sm">{totalOdds}x</span>
          </div>

          <div className="flex items-center justify-between gap-3 text-xs">
            <label htmlFor="acc-stake" className="text-slate-400 font-medium">Stake (KES):</label>
            <input
              id="acc-stake"
              type="number"
              min="10"
              value={stake}
              onChange={(e) => setStake(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-24 bg-[#0f172a] border border-slate-700 rounded px-2 py-1 text-right text-slate-100 font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
            <span className="text-slate-300 font-bold">Est. Return:</span>
            <span className="text-emerald-400 font-mono font-bold text-sm">
              KES {Number(potentialReturn).toLocaleString()}
            </span>
          </div>

          <p className="text-[10px] text-slate-500 italic text-center pt-1">
            *Odds and calculations are for statistical estimation only. Predictions are not guaranteed.
          </p>
        </div>
      )}
    </div>
  );
}
