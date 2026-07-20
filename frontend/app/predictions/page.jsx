'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PredictionCard from '../../components/PredictionCard';

const categories = [
  { id: 'all', label: 'All Predictions', icon: '📋' },
  { id: '1x2', label: '1X2', icon: '🎯' },
  { id: 'over-under', label: 'Over/Under', icon: '📊' },
  { id: 'btts', label: 'Both Teams to Score', icon: '⚽' },
  { id: 'double-chance', label: 'Double Chance', icon: '🛡️' },
  { id: 'ht-ft', label: 'HT/FT', icon: '🔄' },
  { id: 'correct-score', label: 'Correct Score', icon: '✅' },
];

const allPredictions = [
  // 1X2
  { id: 1, match: 'Manchester City vs Arsenal', league: 'Premier League', type: '1X2', prediction: '1', odds: '1.85', confidence: 84, isPremium: false, time: 'Today, 17:00' },
  { id: 2, match: 'Barcelona vs Real Madrid', league: 'La Liga', type: '1X2', prediction: 'X', odds: '3.40', confidence: 72, isPremium: true, time: 'Today, 21:00' },
  { id: 3, match: 'Bayern Munich vs Leipzig', league: 'Bundesliga', type: '1X2', prediction: '1', odds: '1.65', confidence: 88, isPremium: false, time: 'Today, 18:30' },
  // Over/Under
  { id: 4, match: 'Liverpool vs Tottenham', league: 'Premier League', type: 'Over/Under', prediction: 'Over 2.5', odds: '1.72', confidence: 86, isPremium: false, time: 'Today, 20:00' },
  { id: 5, match: 'Inter Milan vs Juventus', league: 'Serie A', type: 'Over/Under', prediction: 'Under 2.5', odds: '2.10', confidence: 76, isPremium: true, time: 'Today, 19:45' },
  // BTTS
  { id: 6, match: 'PSG vs Marseille', league: 'Ligue 1', type: 'BTTS', prediction: 'Yes', odds: '1.80', confidence: 81, isPremium: false, time: 'Today, 21:00' },
  { id: 7, match: 'Ajax vs Feyenoord', league: 'Eredivisie', type: 'BTTS', prediction: 'No', odds: '2.25', confidence: 68, isPremium: true, time: 'Today, 16:30' },
  // Double Chance
  { id: 8, match: 'Chelsea vs Manchester Utd', league: 'Premier League', type: 'Double Chance', prediction: '1X', odds: '1.25', confidence: 91, isPremium: false, time: 'Today, 18:00' },
  { id: 9, match: 'AC Milan vs Napoli', league: 'Serie A', type: 'Double Chance', prediction: '12', odds: '1.40', confidence: 83, isPremium: true, time: 'Today, 20:30' },
  // HT/FT
  { id: 10, match: 'Dortmund vs Leverkusen', league: 'Bundesliga', type: 'HT/FT', prediction: '1/1', odds: '3.00', confidence: 74, isPremium: true, time: 'Today, 17:30' },
  { id: 11, match: 'Atletico vs Sevilla', league: 'La Liga', type: 'HT/FT', prediction: 'X/1', odds: '4.50', confidence: 61, isPremium: true, time: 'Today, 22:00' },
  // Correct Score
  { id: 12, match: 'Real Betis vs Valencia', league: 'La Liga', type: 'Correct Score', prediction: '2-1', odds: '7.00', confidence: 52, isPremium: true, time: 'Today, 19:00' },
  { id: 13, match: 'Lyon vs Monaco', league: 'Ligue 1', type: 'Correct Score', prediction: '1-1', odds: '6.50', confidence: 48, isPremium: true, time: 'Today, 15:00' },
];

export default function PredictionsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) {
      const found = categories.find(c => c.id === cat);
      if (found) setActiveCategory(cat);
    }
  }, []);

  const filtered = allPredictions.filter(p => {
    const matchCategory = activeCategory === 'all' || p.type.toLowerCase() === categories.find(c => c.id === activeCategory)?.label.toLowerCase();
    const matchPremium = !showPremiumOnly || p.isPremium;
    return matchCategory && matchPremium;
  });

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: 12,
          }}>
            Football <span style={{
              background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Predictions</span>
          </h1>
          <p style={{ color: '#6B7394', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
            Expert analysis across all prediction categories. Filter by type to find your perfect bet.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 28,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 18px',
                borderRadius: 10,
                border: `1px solid ${activeCategory === cat.id ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                background: activeCategory === cat.id ? 'rgba(0,229,255,0.08)' : 'transparent',
                color: activeCategory === cat.id ? '#00E5FF' : '#B0B8D1',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Filter Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span style={{ color: '#6B7394', fontSize: 14 }}>
            Showing <strong style={{ color: '#fff' }}>{filtered.length}</strong> predictions
          </span>
          <button
            onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 10,
              border: `1px solid ${showPremiumOnly ? 'rgba(124,77,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
              background: showPremiumOnly ? 'rgba(124,77,255,0.1)' : 'transparent',
              color: showPremiumOnly ? '#B388FF' : '#B0B8D1',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s ease',
            }}
          >
            {showPremiumOnly ? '⭐' : '⭐'} Premium Only
          </button>
        </div>

        {/* Predictions Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 16,
          }}>
            {filtered.map((p) => (
              <div key={p.id} className="animate-fadeIn" style={{ animationDelay: `${p.id * 50}ms` }}>
                <PredictionCard {...p} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#131849',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 8 }}>No Predictions Found</h3>
            <p style={{ color: '#6B7394', marginBottom: 20 }}>
              Try selecting a different category or check back later for new predictions.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                border: 'none',
                background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
                color: '#0A0E27',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              View All Predictions
            </button>
          </div>
        )}

        {/* Premium CTA */}
        {!showPremiumOnly && (
          <div style={{
            marginTop: 48,
            padding: '32px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(124,77,255,0.08), rgba(255,215,0,0.05))',
            border: '1px solid rgba(124,77,255,0.15)',
            textAlign: 'center',
          }}>
            <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              ⭐ Get Premium Access
            </h3>
            <p style={{ color: '#B0B8D1', marginBottom: 20, maxWidth: 480, margin: '0 auto 20px' }}>
              Unlock premium predictions with higher confidence, correct score tips, and exclusive analysis.
            </p>
            <a
              href="/pricing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 28px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #7C4DFF, #FFD700)',
                color: '#0A0E27',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              View Premium Plans
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

