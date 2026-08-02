'use client';

import { useEffect, useState } from 'react';
import MatchCard from '../components/MatchCard';
import PredictionCard from '../components/PredictionCard';
import { predictionsApi } from '../services/api';

function mapPrediction(p) {
  return {
    id: p._id,
    match: `${p.matchName?.home || ''} vs ${p.matchName?.away || ''}`,
    league: p.league || '',
    type: p.category || '1X2',
    prediction: p.prediction || '',
    odds: p.odds || '',
    confidence: p.confidence || 0,
    isPremium: p.isPremium || false,
    time: p.kickoff ? new Date(p.kickoff).toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Today',
  };
}

const stats = [
  { value: '87%', label: 'Win Rate', icon: '🏆' },
  { value: '50+', label: 'Daily Picks', icon: '📊' },
  { value: '6', label: 'Categories', icon: '🎯' },
  { value: '10K+', label: 'Happy Bettors', icon: '👥' },
];

const features = [
  {
    icon: '📊',
    title: 'Data-Driven Analysis',
    desc: 'Our models analyze form, head-to-head, xG, and market trends to deliver high-confidence picks.',
  },
  {
    icon: '🎯',
    title: '6 Prediction Categories',
    desc: 'From 1X2 and Over/Under to Correct Score and HT/FT — we cover every major betting market.',
  },
  {
    icon: '⚡',
    title: 'Instant Alerts',
    desc: 'Get notified the moment new predictions drop so you never miss a high-value opportunity.',
  },
  {
    icon: '🔒',
    title: 'Secure Payments',
    desc: 'Pay seamlessly with M-Pesa, Stripe, Flutterwave, PesaPal, or crypto — fully encrypted.',
  },
  {
    icon: '👑',
    title: 'Premium Picks',
    desc: 'Unlock exclusive correct-score tips and expert analysis with a proven track record.',
  },
  {
    icon: '📈',
    title: 'Track Performance',
    desc: 'Follow your betting performance with an intuitive dashboard and transparent results.',
  },
];

const steps = [
  { num: '01', icon: '👤', title: 'Create Account', desc: 'Sign up for free in under a minute.' },
  { num: '02', icon: '💎', title: 'Choose a Plan', desc: 'Pick Weekly, Monthly, or Yearly premium.' },
  { num: '03', icon: '📊', title: 'Get Predictions', desc: 'Receive daily high-confidence picks.' },
  { num: '04', icon: '🏆', title: 'Win Smarter', desc: 'Bet with data, not guesswork.' },
];

const testimonials = [
  {
    name: 'John Kamau',
    role: 'Monthly Member · Nairobi',
    quote: 'PrimePredict has completely changed how I bet. The 87% win rate is real — I\'ve been profitable for 3 straight months.',
    initials: 'JK',
  },
  {
    name: 'Mary Wanjiku',
    role: 'Yearly Member · Mombasa',
    quote: 'The correct score tips are worth every shilling. The dashboard makes it easy to track everything.',
    initials: 'MW',
  },
  {
    name: 'Peter Ochieng',
    role: 'Weekly Member · Kisumu',
    quote: 'I\'ve tried other prediction sites, but none come close. The analysis quality is on another level.',
    initials: 'PO',
  },
];

const todaysPicks = [
  { id: 1, match: 'Manchester City vs Arsenal', league: 'Premier League', type: '1X2', prediction: '1', odds: '1.85', confidence: 84, isPremium: false, time: 'Today, 17:00' },
  { id: 2, match: 'Bayern Munich vs Leipzig', league: 'Bundesliga', type: '1X2', prediction: '1', odds: '1.65', confidence: 88, isPremium: false, time: 'Today, 18:30' },
  { id: 3, match: 'Liverpool vs Tottenham', league: 'Premier League', type: 'Over/Under', prediction: 'Over 2.5', odds: '1.72', confidence: 86, isPremium: false, time: 'Today, 20:00' },
  { id: 4, match: 'Chelsea vs Man Utd', league: 'Premier League', type: 'Double Chance', prediction: '1X', odds: '1.25', confidence: 91, isPremium: true, time: 'Today, 18:00' },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function HomePage() {
  useScrollReveal();
  const [picks, setPicks] = useState(todaysPicks);

  useEffect(() => {
    predictionsApi.list({ limit: 4 })
      .then((data) => {
        const list = (data.predictions || []).map(mapPrediction);
        if (list.length > 0) setPicks(list.slice(0, 4));
      })
      .catch(() => { /* keep static fallback */ });
  }, []);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-24 -left-24 w-96 h-96 rounded-full pointer-events-none animate-floatSlow"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.12), transparent 70%)' }} />
        <div className="absolute bottom-0 -right-24 w-[28rem] h-[28rem] rounded-full pointer-events-none animate-floatSlow"
          style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.14), transparent 70%)', animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full pointer-events-none animate-glow"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.06), transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 glass text-sm font-medium text-cyan-300 animate-fadeInUp">
            🇰🇪 Kenya&apos;s Most Trusted Prediction Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fadeInUp delay-100" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            Win Smarter with
            <span className="block text-gradient">Data-Driven Predictions</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#B0B8D1] mb-8 animate-fadeInUp delay-200">
            Join 10,000+ bettors who rely on PrimePredict for expert football analysis,
            premium tips, and a proven <strong className="text-white">87% win rate</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fadeInUp delay-300">
            <a href="/pricing" className="btn btn-premium btn-lg">
              ⭐ Get Premium Access
            </a>
            <a href="/predictions" className="btn btn-secondary btn-lg">
              View Free Predictions
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeInUp delay-400">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl lg:text-3xl font-extrabold text-white mb-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {s.value}
                </div>
                <div className="text-xs text-[#6B7394] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED MATCH ============ */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10 scroll-reveal">
            <h2 className="text-3xl font-extrabold mb-3">
              Featured <span className="text-gradient">Match</span>
            </h2>
            <p className="text-[#B0B8D1] max-w-xl mx-auto">
              Our highest-conviction pick of the day — backed by deep statistical analysis.
            </p>
          </div>
          <div className="max-w-lg mx-auto scroll-reveal">
            <MatchCard
              home="Manchester City"
              away="Arsenal"
              league="Premier League"
              kickoff="Today, 17:00"
              prediction="1"
              odds="1.85"
              confidence={91}
              type="1X2"
            />
          </div>
        </div>
      </section>

      {/* ============ TODAY'S PICKS ============ */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, transparent, rgba(19,24,73,0.4))' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10 scroll-reveal">
            <h2 className="text-3xl font-extrabold mb-3">
              Today&apos;s Top <span className="text-gradient">Predictions</span>
            </h2>
            <p className="text-[#B0B8D1] max-w-xl mx-auto">
              Fresh picks updated daily across all major leagues.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {picks.map((p, i) => (
              <div key={p.id} className={`scroll-reveal delay-${(i % 4) * 100}`}>
                <PredictionCard {...p} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10 scroll-reveal">
            <a href="/predictions" className="btn btn-primary">
              View All Predictions →
            </a>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl font-extrabold mb-3">
              Why Choose <span className="text-gradient">PrimePredict</span>
            </h2>
            <p className="text-[#B0B8D1] max-w-xl mx-auto">
              Everything you need to bet with confidence, in one platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={f.title} className={`card scroll-reveal delay-${(i % 3) * 100}`}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(124,77,255,0.12))', border: '1px solid rgba(0,229,255,0.2)' }}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[#B0B8D1] leading-relaxed m-0">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, transparent, rgba(124,77,255,0.05))' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl font-extrabold mb-3">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-[#B0B8D1] max-w-xl mx-auto">
              Get started in four simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center p-6 scroll-reveal delay-100">
                <div className="text-5xl font-extrabold mb-4 text-gradient opacity-20" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {s.num}
                </div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-[#B0B8D1] m-0">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PREMIUM CTA ============ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="relative rounded-3xl p-10 lg:p-14 text-center overflow-hidden scroll-reveal"
            style={{ background: 'linear-gradient(135deg, rgba(124,77,255,0.12), rgba(255,215,0,0.06))', border: '1px solid rgba(124,77,255,0.25)' }}
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.18), transparent 70%)' }} />
            <div className="text-5xl mb-4">👑</div>
            <h2 className="text-3xl font-extrabold mb-3">
              Unlock Your Winning <span className="text-gradient">Edge</span>
            </h2>
            <p className="text-[#B0B8D1] max-w-lg mx-auto mb-8">
              Go premium for correct score tips, HT/FT predictions, expert analysis, and a
              personal betting consultant. Plans start at just <strong className="text-white">KES 499/week</strong>.
            </p>
            <a href="/pricing" className="btn btn-premium btn-lg">
              View Subscription Plans →
            </a>
            <div className="flex justify-center gap-8 mt-8 flex-wrap">
              <div>
                <div className="text-2xl font-extrabold text-white">7-Day</div>
                <div className="text-xs text-[#6B7394]">Money-Back Guarantee</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">24/7</div>
                <div className="text-xs text-[#6B7394]">Dedicated Support</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">Instant</div>
                <div className="text-xs text-[#6B7394]">Access After Payment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, transparent, rgba(19,24,73,0.4))' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl font-extrabold mb-3">
              What Our <span className="text-gradient">Members Say</span>
            </h2>
            <p className="text-[#B0B8D1] max-w-xl mx-auto">
              Real results from real members across Kenya.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`card scroll-reveal delay-${(i % 3) * 100}`}>
                <div className="flex items-center gap-2 text-yellow-400 text-sm mb-4">
                  {'★★★★★'}
                </div>
                <p className="text-sm text-[#B0B8D1] leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)', color: '#0A0E27' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-[#6B7394]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

