'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import PredictionCard from '../../components/PredictionCard';
import { predictionsApi } from '../../services/api';

const categories = [
  { id: 'all', label: 'All Predictions', icon: '📋' },
  { id: '1x2', label: '1X2', icon: '🎯' },
  { id: 'over-under', label: 'Over/Under', icon: '📊' },
  { id: 'btts', label: 'Both Teams to Score', icon: '🤝' },
  { id: 'double-chance', label: 'Double Chance', icon: '🛡️' },
  { id: 'ht-ft', label: 'HT/FT', icon: '🔄' },
  { id: 'correct-score', label: 'Correct Score', icon: '✅' },
];

const catValueMap = {
  '1x2': '1X2',
  'over-under': ['Over 1.5 Goals', 'Over 2.5 Goals', 'Over 3.5 Goals', 'Under 2.5 Goals', 'Under 3.5 Goals', 'Over/Under'],
  'btts': 'BTTS',
  'double-chance': 'Double Chance',
  'ht-ft': 'HT/FT',
  'correct-score': 'Correct Score',
};

function mapPrediction(p) {
  const home = p.matchName?.home || '';
  const away = p.matchName?.away || '';
  return {
    id: p._id,
    home,
    away,
    match: `${home} vs ${away}`,
    league: p.league || '',
    type: p.category || '1X2',
    prediction: p.prediction || '',
    odds: p.odds || '',
    confidence: p.confidence || 0,
    isPremium: p.isPremium || false,
    status: p.status || 'pending',
    kickoff: p.kickoff,
    time: p.kickoff ? new Date(p.kickoff) : 'Today',
  };
}

export default function PredictionsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [allPredictions, setAllPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) {
      const found = categories.find(c => c.id === cat) || categories.find(c => c.id === 'all');
      if (found) setActiveCategory(found.id);
    }
  }, []);

  const loadPredictions = useCallback(() => {
    setLoading(true);
    setError('');
    predictionsApi.list({ limit: 200 })
      .then((data) => setAllPredictions((data.predictions || []).map(mapPrediction)))
      .catch((err) => setError(err.message || 'Failed to load predictions'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadPredictions();
  }, [loadPredictions]);

  const filtered = useMemo(() => {
    return allPredictions.filter(p => {
      const matchCategory = activeCategory === 'all' || (() => {
        const vals = catValueMap[activeCategory];
        if (Array.isArray(vals)) return vals.some(v => p.type?.toLowerCase() === v.toLowerCase());
        return p.type?.toLowerCase() === vals?.toLowerCase();
      })();
      const matchPremium = !showPremiumOnly || p.isPremium;
      return matchCategory && matchPremium;
    });
  }, [allPredictions, activeCategory, showPremiumOnly]);

  return (
    <div className="w-full overflow-x-hidden">
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 bg-white/5 border border-white/10 text-sm font-medium text-cyan-300">
            🎯 Expert Picks
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            Football <span className="text-gradient">Predictions</span>
          </h1>
          <p className="text-[#B0B8D1] max-w-xl mx-auto text-base">
            Expert analysis across all prediction categories. Filter by type to find your perfect bet.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="cat-scroll mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <span className="text-sm text-[#B0B8D1]">
            Showing <strong className="text-white">{filtered.length}</strong> predictions
          </span>
          <button
            onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              showPremiumOnly
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                : 'bg-white/5 border border-white/10 text-[#B0B8D1] hover:border-yellow-400/40'
            }`}
          >
            👑 VIP Only
          </button>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="pred-grid">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div key={i} className="pred-skeleton">
                <div className="skeleton h-4 w-1/3 mb-3" />
                <div className="skeleton h-10 w-3/4 mx-auto mb-3" />
                <div className="skeleton h-8 w-full mb-2" />
                <div className="skeleton h-2 w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-16 bg-white rounded-2xl border border-red-200">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-[#0F1535] mb-2">Something went wrong</h3>
            <p className="text-[#6B7394] mb-5">{error}</p>
            <button onClick={loadPredictions} className="btn btn-primary">Try Again</button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-[#0F1535] mb-2">No Predictions Found</h3>
            <p className="text-[#6B7394] mb-5">
              Try a different category or check back later for new predictions.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setShowPremiumOnly(false); }}
              className="btn btn-primary"
            >
              View All Predictions
            </button>
          </div>
        )}

        {/* Predictions Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="pred-grid">
            {filtered.map((p) => (
              <PredictionCard key={p.id} {...p} />
            ))}
          </div>
        )}

        {/* Premium CTA */}
        {!showPremiumOnly && (
          <div className="mt-12 rounded-2xl p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, rgba(124,77,255,0.08), rgba(255,215,0,0.05))', border: '1px solid rgba(124,77,255,0.2)' }}>
            <div className="text-4xl mb-3">👑</div>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Unlock VIP Predictions
            </h3>
            <p className="text-[#B0B8D1] max-w-md mx-auto mb-6">
              Get higher-confidence picks, correct score tips, and exclusive analysis with a proven track record.
            </p>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold no-underline transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#FFD700,#B8860B)', color: '#0A0E27', boxShadow: '0 0 20px rgba(255,215,0,0.3)' }}
            >
              View Premium Plans →
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
