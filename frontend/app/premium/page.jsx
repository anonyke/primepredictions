'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PredictionCard from '../../components/PredictionCard';

const premiumPredictions = [
  { id: 1, match: 'Barcelona vs Real Madrid', league: 'La Liga', type: '1X2', prediction: 'X', odds: '3.40', confidence: 72, isPremium: true, time: 'Today, 21:00' },
  { id: 2, match: 'Inter Milan vs Juventus', league: 'Serie A', type: 'Over/Under', prediction: 'Under 2.5', odds: '2.10', confidence: 76, isPremium: true, time: 'Today, 19:45' },
  { id: 3, match: 'Ajax vs Feyenoord', league: 'Eredivisie', type: 'BTTS', prediction: 'No', odds: '2.25', confidence: 68, isPremium: true, time: 'Today, 16:30' },
  { id: 4, match: 'AC Milan vs Napoli', league: 'Serie A', type: 'Double Chance', prediction: '12', odds: '1.40', confidence: 83, isPremium: true, time: 'Today, 20:30' },
  { id: 5, match: 'Dortmund vs Leverkusen', league: 'Bundesliga', type: 'HT/FT', prediction: '1/1', odds: '3.00', confidence: 74, isPremium: true, time: 'Today, 17:30' },
  { id: 6, match: 'Atletico vs Sevilla', league: 'La Liga', type: 'HT/FT', prediction: 'X/1', odds: '4.50', confidence: 61, isPremium: true, time: 'Today, 22:00' },
  { id: 7, match: 'Real Betis vs Valencia', league: 'La Liga', type: 'Correct Score', prediction: '2-1', odds: '7.00', confidence: 52, isPremium: true, time: 'Today, 19:00' },
  { id: 8, match: 'Lyon vs Monaco', league: 'Ligue 1', type: 'Correct Score', prediction: '1-1', odds: '6.50', confidence: 48, isPremium: true, time: 'Today, 15:00' },
];

export default function PremiumPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  if (!isSubscribed) {
    return (
      <div>
        <Navbar />
        <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⭐</div>
            <h1 style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 800,
              marginBottom: 12,
            }}>
              Premium <span style={{
                background: 'linear-gradient(135deg, #7C4DFF, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Predictions</span>
            </h1>
            <p style={{ color: '#6B7394', fontSize: 16, maxWidth: 560, margin: '0 auto 32px' }}>
              Get access to exclusive premium predictions with expert analysis, correct score tips, 
              and high-confidence picks.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16,
            marginBottom: 40,
            filter: 'blur(8px)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            {premiumPredictions.slice(0, 4).map((p) => (
              <PredictionCard key={p.id} {...p} />
            ))}
          </div>

          <div style={{
            maxWidth: 500,
            margin: '0 auto',
            padding: '40px 32px',
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(124,77,255,0.08), rgba(255,215,0,0.05))',
            border: '1px solid rgba(124,77,255,0.2)',
            textAlign: 'center',
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C4DFF, #FFD700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: 28,
            }}>
              🔓
            </div>
            <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Subscribe to Unlock Premium
            </h3>
            <p style={{ color: '#B0B8D1', marginBottom: 24, lineHeight: 1.6 }}>
              Get access to all premium predictions including correct score tips, 
              HT/FT predictions, and expert analysis with 87% win rate.
            </p>
            <a
              href="/pricing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '16px 32px',
                borderRadius: 12,
                border: 'none',
                background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
                color: '#0A0E27',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)',
              }}
            >
              View Subscription Plans
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            <div style={{
              marginTop: 24,
              display: 'flex',
              justifyContent: 'center',
              gap: 32,
              flexWrap: 'wrap',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#00E676' }}>87%</div>
                <div style={{ fontSize: 12, color: '#6B7394' }}>Win Rate</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#FFD700' }}>50+</div>
                <div style={{ fontSize: 12, color: '#6B7394' }}>Daily Picks</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#00E5FF' }}>6</div>
                <div style={{ fontSize: 12, color: '#6B7394' }}>Categories</div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: 12,
          }}>
            ⭐ Premium Predictions
          </h1>
          <p style={{ color: '#6B7394' }}>All your premium picks in one place</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
        }}>
          {premiumPredictions.map((p) => (
            <PredictionCard key={p.id} {...p} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

