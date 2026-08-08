'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PredictionCard from '../../components/PredictionCard';
import { predictionsApi, userApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

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
    time: p.kickoff ? new Date(p.kickoff) : 'Today',
  };
}

export default function PremiumPage() {
  const { user } = useAuth();
  const [premiumPredictions, setPremiumPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check subscription status
  const checkSubscription = useCallback(async () => {
    if (!user) { setIsSubscribed(false); return; }
    try {
      const data = await userApi.getSubscription();
      setIsSubscribed(!!data.subscription && data.subscription.status === 'active');
    } catch (e) {
      setIsSubscribed(false);
    }
  }, [user]);

  // Load premium predictions
  const loadPremium = useCallback(() => {
    setLoading(true);
    setError('');
    predictionsApi.list({ isPremium: true, limit: 100 })
      .then((data) => setPremiumPredictions((data.predictions || []).map(mapPrediction)))
      .catch((err) => setError(err.message || 'Failed to load premium predictions'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    checkSubscription();
    loadPremium();
  }, [checkSubscription, loadPremium]);

  // Reload premium list when subscription status changes (after upgrade)
  const handleUpgraded = () => {
    checkSubscription().then(() => loadPremium());
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 16px 60px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: 12,
          }}>
            👑 Premium <span style={{ background: 'linear-gradient(135deg,#FFD700,#B8860B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Predictions</span>
          </h1>
          <p style={{ color: '#6B7394', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
            Get access to exclusive VIP predictions with expert analysis, correct score tips,
            and high-confidence picks.
          </p>
        </div>

        {isSubscribed ? (
          <>
            {loading ? (
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
            ) : error ? (
              <div style={{ textAlign: 'center', padding: 40, background: '#131849', borderRadius: 16 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                <h3 style={{ color: '#fff' }}>Failed to load VIP predictions</h3>
                <p style={{ color: '#6B7394', margin: '8px 0 20px' }}>{error}</p>
                <button onClick={loadPremium} className="btn btn-primary">Try Again</button>
              </div>
            ) : premiumPredictions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, background: '#131849', borderRadius: 16 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h3 style={{ color: '#fff' }}>No VIP predictions yet</h3>
                <p style={{ color: '#6B7394' }}>New VIP picks drop daily. Check back soon.</p>
              </div>
            ) : (
              <div className="pred-grid">
                {premiumPredictions.map((p) => (
                  <PredictionCard key={p.id} {...p} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Blurred preview */}
            {!loading && premiumPredictions.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 40, filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none' }}>
                {premiumPredictions.slice(0, 4).map((p) => (
                  <PredictionCard key={p.id} {...p} />
                ))}
              </div>
            )}

            {/* Unlock card */}
            <div style={{
              maxWidth: 520,
              margin: '0 auto',
              padding: '40px 28px',
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(184,134,11,0.1), rgba(255,215,0,0.04))',
              border: '1px solid rgba(255,215,0,0.25)',
              textAlign: 'center',
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#FFD700,#B8860B)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: 28,
              }}>
                🔓
              </div>
              <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Subscribe to Unlock VIP
              </h3>
              <p style={{ color: '#B0B8D1', marginBottom: 24, lineHeight: 1.6 }}>
                Get access to all premium predictions including correct score tips,
                accumulators, banker selections, and expert analysis.
              </p>
              <a
                href="/pricing"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 32px',
                  borderRadius: 999,
                  border: 'none',
                  background: 'linear-gradient(135deg,#FFD700,#B8860B)',
                  color: '#0A0E27',
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 30px rgba(255,215,0,0.25)',
                }}
              >
                View VIP Plans
              </a>

              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#00E676' }}>87%</div>
                  <div style={{ fontSize: 12, color: '#6B7394' }}>Win Rate</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#FFD700' }}>50+</div>
                  <div style={{ fontSize: 12, color: '#6B7394' }}>Daily Picks</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#00E5FF' }}>19</div>
                  <div style={{ fontSize: 12, color: '#6B7394' }}>Categories</div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
