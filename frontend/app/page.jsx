'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import PredictionCard from '../components/PredictionCard';
import { predictionsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

// ============ CATEGORY NAV ============
const categoryTabs = [
  { id: 'all', label: 'All Picks', icon: '📋' },
  { id: 'free', label: 'FREE PICKS', icon: '⚽' },
  { id: 'banker', label: 'BANKER', icon: '🏦' },
  { id: 'double-chance', label: 'DOUBLE CHANCE', icon: '🛡️' },
  { id: 'over-1.5', label: 'OVER 1.5', icon: '⚽' },
  { id: 'over-2.5', label: 'OVER 2.5', icon: '⚽' },
  { id: 'btts', label: 'BTTS', icon: '🤝' },
  { id: 'vip', label: 'VIP PICKS', icon: '👑' },
];

// Map category tab id to backend category values (client-side filter)
const categoryValueMap = {
  'all': null,
  'free': null, // free picks = not premium
  'banker': ['Banker Tips', '1X2'],
  'double-chance': ['Double Chance'],
  'over-1.5': ['Over 1.5 Goals', 'Over/Under'],
  'over-2.5': ['Over 2.5 Goals', 'Over/Under'],
  'btts': ['BTTS'],
  'vip': null, // vip = premium only
};

const stats = [
  { value: '87%', label: 'Win Rate', icon: '🏆' },
  { value: '50+', label: 'Daily Picks', icon: '📊' },
  { value: '19', label: 'Categories', icon: '🎯' },
  { value: '10K+', label: 'Happy Bettors', icon: '👥' },
];

const vipFeatures = [
  { icon: '⭐', label: 'VIP Predictions' },
  { icon: '🎯', label: 'High-Confidence Selections' },
  { icon: '✅', label: 'Correct Score' },
  { icon: '📈', label: 'Accumulator' },
  { icon: '🏦', label: 'Banker' },
  { icon: '🔍', label: 'Premium Analysis' },
];

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
    time: p.kickoff ? new Date(p.kickoff) : (p.kickoffString || 'Today'),
  };
}

// Format date for display
function formatDateLabel(d) {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}

export default function HomePage() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [allPredictions, setAllPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [leagueFilter, setLeagueFilter] = useState('all');

  // Load all predictions from API (limit high enough for filtering)
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

  // Move date by +/- days
  const shiftDate = (days) => {
    setSelectedDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + days);
      return d;
    });
  };

  // Filter predictions by selected date, category, and league
  const filteredPredictions = useMemo(() => {
    return allPredictions.filter(p => {
      // Date filter
      const kick = p.kickoff ? new Date(p.kickoff) : null;
      if (kick) {
        const kd = new Date(kick);
        kd.setHours(0, 0, 0, 0);
        if (kd.getTime() !== selectedDate.getTime()) return false;
      }

      // League filter
      if (leagueFilter !== 'all' && p.league?.toLowerCase() !== leagueFilter.toLowerCase()) return false;

      // Category filter
      if (activeCategory === 'vip') {
        return p.isPremium;
      }
      if (activeCategory === 'free') {
        return !p.isPremium;
      }
      const values = categoryValueMap[activeCategory];
      if (values) {
        return values.some(v => p.type?.toLowerCase() === v.toLowerCase());
      }
      return true; // all
    });
  }, [allPredictions, activeCategory, selectedDate, leagueFilter]);

  // League options derived from data
  const leagueOptions = useMemo(() => {
    const set = new Set(allPredictions.map(p => p.league).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [allPredictions]);

  const isToday = new Date().toDateString() === selectedDate.toDateString();

  return (
    <div className="w-full overflow-x-hidden">
      {/* ============ HERO ============ */}
      <section className="hero-football relative pt-28 pb-16 px-4 sm:px-6">
        <div className="relative max-w-[1300px] mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 bg-white/10 border border-white/15 text-sm font-medium text-cyan-300">
            🇰🇪 Kenya&apos;s Most Trusted Prediction Platform
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight mb-5 text-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            Smart Football Predictions.
            <span className="block text-gradient">Better Decisions.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#B0B8D1] mb-8">
            Get carefully analyzed football predictions, daily picks, banker selections and
            premium tips from our prediction platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {user ? (
              <a href="/dashboard" className="btn btn-round btn-primary text-base">
                📊 Go to Dashboard
              </a>
            ) : (
              <a href="/register" className="btn btn-round btn-primary text-base">
                Register / Login
              </a>
            )}
            <a href="/premium" className="btn btn-round text-base" style={{ background: 'linear-gradient(135deg,#FFD700,#B8860B)', color: '#0A0E27', boxShadow: '0 0 24px rgba(255,215,0,0.35)' }}>
              👑 Join VIP
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl p-4 sm:p-5 bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl lg:text-2xl font-extrabold text-white mb-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {s.value}
                </div>
                <div className="text-[11px] sm:text-xs text-[#6B7394] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORY NAVIGATION ============ */}
      <section className="py-8 bg-[#0A0E27] border-t border-white/5">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="cat-scroll">
            {categoryTabs.map((cat) => (
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
        </div>
      </section>

      {/* ============ FREE PREDICTIONS ============ */}
      <section className="py-10 sm:py-14 px-4 sm:px-6" style={{ background: '#F4F6FB' }}>
        <div className="max-w-[1300px] mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1535] mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                FREE PREDICTIONS
              </h2>
              <p className="text-sm font-semibold text-[#6B7394]">
                {isToday ? 'TODAY' : 'SHOWING'} - {formatDateLabel(selectedDate).toUpperCase()}
              </p>
            </div>

            {/* Date nav + league filter */}
            <div className="flex flex-wrap items-center gap-2">
              <button className="date-nav-btn" onClick={() => shiftDate(-1)} aria-label="Previous day">
                ← Prev
              </button>
              <button className="date-nav-btn" onClick={() => shiftDate(1)} aria-label="Next day" disabled={isToday}>
                Next →
              </button>
              <select
                className="filter-select"
                value={leagueFilter}
                onChange={(e) => setLeagueFilter(e.target.value)}
                aria-label="Filter by league"
              >
                <option value="all">All Leagues</option>
                {leagueOptions.filter(l => l !== 'all').map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="pred-grid">
              {[0, 1, 2, 3].map(i => (
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
          {!loading && !error && filteredPredictions.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#0F1535] mb-2">No Predictions Found</h3>
              <p className="text-[#6B7394] mb-5">
                No {activeCategory === 'vip' ? 'VIP' : 'predictions'} available for this date and filter.
                Try a different date or category.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button onClick={() => setSelectedDate(new Date(new Date().setHours(0,0,0,0)))} className="btn btn-primary">Go to Today</button>
                <button onClick={() => { setActiveCategory('all'); setLeagueFilter('all'); }} className="btn btn-secondary">Clear Filters</button>
              </div>
            </div>
          )}

          {/* Predictions grid */}
          {!loading && !error && filteredPredictions.length > 0 && (
            <div className="pred-grid">
              {filteredPredictions.map((p) => (
                <PredictionCard key={p.id} {...p} />
              ))}
            </div>
          )}

          {/* View all link */}
          <div className="text-center mt-8">
            <a href="/predictions" className="btn btn-round btn-primary">View All Predictions →</a>
          </div>
        </div>
      </section>

      {/* ============ VIP SECTION ============ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className="vip-card rounded-3xl p-8 sm:p-12 lg:p-14 text-center overflow-hidden">
            <div className="text-5xl mb-4">👑</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 text-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Unlock <span className="vip-gold-text">VIP Predictions</span>
            </h2>
            <p className="text-[#B0B8D1] max-w-xl mx-auto mb-8">
              Get exclusive VIP picks with the highest confidence, correct score tips, accumulators,
              banker selections, and premium analysis — all backed by expert research.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-3xl mx-auto">
              {vipFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-sm font-semibold text-white text-left">{f.label}</span>
                </div>
              ))}
            </div>

            <a
              href="/premium"
              className="btn btn-round text-base"
              style={{ background: 'linear-gradient(135deg,#FFD700,#B8860B)', color: '#0A0E27', boxShadow: '0 0 30px rgba(255,215,0,0.3)' }}
            >
              Join VIP →
            </a>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: '#0A0E27' }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Why Choose <span className="text-gradient">PrimePredict</span>
            </h2>
            <p className="text-[#B0B8D1] max-w-xl mx-auto">
              Everything you need to bet with confidence, in one professional platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '📊', title: 'Data-Driven Analysis', desc: 'Our models analyze form, head-to-head, xG, and market trends to deliver high-confidence picks.' },
              { icon: '🎯', title: 'Multiple Categories', desc: 'From 1X2 and Over/Under to Correct Score and BTTS — we cover every major market.' },
              { icon: '⚡', title: 'Instant Updates', desc: 'Get notified the moment new predictions drop so you never miss an opportunity.' },
              { icon: '🔒', title: 'Secure Payments', desc: 'Pay seamlessly with M-Pesa, Stripe, PesaPal, or crypto — fully encrypted.' },
              { icon: '👑', title: 'VIP Picks', desc: 'Unlock exclusive correct-score tips and expert analysis with a proven track record.' },
              { icon: '📈', title: 'Track Performance', desc: 'Follow your betting performance with an intuitive dashboard and transparent results.' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(124,77,255,0.12))' }}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[#B0B8D1] leading-relaxed m-0">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
