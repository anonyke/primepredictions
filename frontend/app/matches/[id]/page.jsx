'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function MatchDetailPage() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatch() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${apiUrl}/api/matches/${id}`);
        if (res.ok) {
          const data = await res.json();
          setMatch(data.match);
        }
      } catch (err) {
        console.error('Failed to load match:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchMatch();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-[#0b1329] text-slate-400 p-8 text-center">Loading match analytics...</div>;
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-[#0b1329] text-slate-400 p-8 text-center">
        Fixture not found or data currently unavailable.
      </div>
    );
  }

  const { homeTeam, awayTeam, league, kickoff, stats = {} } = match;

  return (
    <div className="min-h-screen bg-[#0b1329] text-slate-100 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 text-center space-y-3">
          <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">{league}</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            {homeTeam} <span className="text-slate-500 font-light mx-2">VS</span> {awayTeam}
          </h1>
          <p className="text-xs text-slate-400">
            Kickoff: {new Date(kickoff).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
          </p>
        </div>

        {/* Statistical Form Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-base text-slate-100">{homeTeam} Form & Metrics</h3>
            <div className="flex gap-1.5 items-center">
              <span className="text-xs text-slate-400 mr-2">Last 5:</span>
              {(stats.homeForm || ['W', 'D', 'W', 'L', 'W']).map((f, i) => (
                <span
                  key={i}
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                    f === 'W' ? 'bg-emerald-600 text-white' : f === 'D' ? 'bg-amber-600 text-white' : 'bg-rose-600 text-white'
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="text-xs space-y-1.5 text-slate-300 pt-2 border-t border-slate-800">
              <p>Avg Goals Scored: <span className="font-bold text-white">{stats.homeAvgGoals ?? '1.8'}</span></p>
              <p>Clean Sheet %: <span className="font-bold text-white">{stats.homeCleanSheetPct ?? '40'}%</span></p>
            </div>
          </div>

          <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-base text-slate-100">{awayTeam} Form & Metrics</h3>
            <div className="flex gap-1.5 items-center">
              <span className="text-xs text-slate-400 mr-2">Last 5:</span>
              {(stats.awayForm || ['L', 'W', 'W', 'D', 'W']).map((f, i) => (
                <span
                  key={i}
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                    f === 'W' ? 'bg-emerald-600 text-white' : f === 'D' ? 'bg-amber-600 text-white' : 'bg-rose-600 text-white'
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="text-xs space-y-1.5 text-slate-300 pt-2 border-t border-slate-800">
              <p>Avg Goals Scored: <span className="font-bold text-white">{stats.awayAvgGoals ?? '1.3'}</span></p>
              <p>Clean Sheet %: <span className="font-bold text-white">{stats.awayCleanSheetPct ?? '30'}%</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
