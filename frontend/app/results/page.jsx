'use client';

import { useState, useEffect } from 'react';
import PredictionCard from '../../components/PredictionCard';

export default function ResultsArchivePage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchResults() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${apiUrl}/api/predictions?limit=50`);
        if (res.ok) {
          const data = await res.json();
          // Filter predictions that are settled or finished
          setResults(data.predictions || []);
        }
      } catch (err) {
        console.error('Failed to load results:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, []);

  const settled = results.filter((p) => p.status === 'won' || p.status === 'lost' || p.status === 'void');
  const wins = settled.filter((p) => p.status === 'won').length;
  const losses = settled.filter((p) => p.status === 'lost').length;
  const winRate = settled.length > 0 ? ((wins / settled.length) * 100).toFixed(1) : 0;

  const filteredItems = filter === 'all' ? settled : settled.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-[#0b1329] text-slate-100 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Verified Results Archive</h1>
          <p className="text-slate-400 text-sm mt-1">
            Historical outcomes recorded transparently. No deleted or altered past predictions.
          </p>
        </div>

        {/* Transparent Statistics Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 font-medium">Settled Predictions</p>
            <p className="text-2xl font-bold text-white mt-1">{settled.length}</p>
          </div>
          <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 font-medium">Won Predictions</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{wins}</p>
          </div>
          <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 font-medium">Lost Predictions</p>
            <p className="text-2xl font-bold text-rose-400 mt-1">{losses}</p>
          </div>
          <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 font-medium">Verified Win Rate</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{winRate}%</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-3">
          {['all', 'won', 'lost', 'void'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filter === f ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading historical results...</div>
        ) : filteredItems.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-[#1e293b] rounded-xl border border-slate-800">
            No settled predictions match this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((p) => (
              <PredictionCard key={p._id || p.id} prediction={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
