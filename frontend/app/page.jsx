'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const styles = {
  // Hero Section
  hero: {
    position: 'relative',
    minHeight: '92vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '120px 20px 80px',
  },
  heroBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0,229,255,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(124,77,255,0.12) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(255,215,0,0.08) 0%, transparent 50%)',
    zIndex: 0,
  },
  heroGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    zIndex: 0,
    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 70%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 70%)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    maxWidth: 820,
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 16px 6px 8px',
    borderRadius: 20,
    background: 'rgba(0, 229, 255, 0.1)',
    border: '1px solid rgba(0, 229, 255, 0.2)',
    marginBottom: 24,
    fontSize: 13,
    fontWeight: 600,
    color: '#00E5FF',
  },
  heroBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#00E676',
    boxShadow: '0 0 12px #00E676',
    animation: 'pulse 2s infinite',
  },
  heroTitle: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  heroTitleGradient: {
    background: 'linear-gradient(135deg, #00E5FF 0%, #7C4DFF 50%, #FFD700 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 4s ease infinite',
  },
  heroDesc: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#B0B8D1',
    lineHeight: 1.7,
    maxWidth: 640,
    margin: '0 auto 36px',
  },
  heroBtns: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  heroPrimaryBtn: {
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
  },
  heroSecondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '16px 32px',
    borderRadius: 12,
    border: '1px solid rgba(0, 229, 255, 0.2)',
    background: 'rgba(0, 229, 255, 0.05)',
    color: '#00E5FF',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  // Stats Bar
  statsBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
    padding: '24px 0',
    flexWrap: 'wrap',
    marginTop: 48,
  },
  statItem: {
    textAlign: 'center',
    opacity: 0,
    transform: 'translateY(20px)',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 800,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    marginBottom: 4,
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7394',
    fontWeight: 500,
  },

  // Featured Match
  featuredSection: {
    padding: '60px 20px',
    maxWidth: 1200,
    margin: '0 auto',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    fontWeight: 800,
    marginBottom: 12,
  },
  sectionTitleGradient: {
    background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  sectionDesc: {
    color: '#6B7394',
    fontSize: 16,
    maxWidth: 560,
    margin: '0 auto',
  },
  featuredCard: {
    background: 'linear-gradient(135deg, rgba(19, 24, 73, 0.9) 0%, rgba(28, 34, 96, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 229, 255, 0.15)',
    borderRadius: 20,
    padding: 32,
    maxWidth: 900,
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
  },
  featuredGlow: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
    animation: 'floatSlow 6s ease-in-out infinite',
  },
  featuredTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  featuredLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  featuredBadge: {
    padding: '4px 12px',
    borderRadius: 6,
    background: 'rgba(255, 215, 0, 0.15)',
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  featuredDate: {
    color: '#6B7394',
    fontSize: 13,
    fontWeight: 500,
  },
  matchTeams: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  teamBox: {
    textAlign: 'center',
  },
  teamLogoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 16,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
    fontSize: 28,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 4,
  },
  teamLeague: {
    fontSize: 12,
    color: '#6B7394',
  },
  matchVSEmblem: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 800,
    color: '#0A0E27',
    flexShrink: 0,
    animation: 'glow 3s ease-in-out infinite',
  },
  featuredPrediction: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  predictionBox: {
    textAlign: 'center',
    padding: '16px 12px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  predictionBoxLabel: {
    fontSize: 12,
    color: '#6B7394',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 500,
  },
  predictionBoxValue: {
    fontSize: 20,
    fontWeight: 800,
    color: '#fff',
  },
  predictionBoxValueGold: {
    color: '#FFD700',
  },
  confidenceContainer: {
    marginBottom: 24,
  },
  confidenceLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 13,
    color: '#B0B8D1',
  },
  confidenceBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    background: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 4,
    background: 'linear-gradient(90deg, #00E676, #00E5FF)',
    width: '87%',
    transition: 'width 1.5s ease',
    animation: 'progressPulse 2s ease-in-out infinite',
  },
  featuredCTA: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },

  // Predictions Table
  tableSection: {
    padding: '60px 20px',
    maxWidth: 1200,
    margin: '0 auto',
  },
  tableFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '8px 20px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'transparent',
    color: '#B0B8D1',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Inter, sans-serif',
  },
  filterBtnActive: {
    background: 'rgba(0, 229, 255, 0.1)',
    borderColor: 'rgba(0, 229, 255, 0.3)',
    color: '#00E5FF',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(19, 24, 73, 0.6)',
    backdropFilter: 'blur(10px)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#6B7394',
    fontWeight: 600,
    background: 'rgba(15, 21, 53, 0.8)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  td: {
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    fontSize: 14,
    color: '#B0B8D1',
  },
  matchCell: {
    fontWeight: 600,
    color: '#fff',
  },
  leagueBadge: {
    padding: '3px 10px',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
    background: 'rgba(255,255,255,0.06)',
    color: '#6B7394',
  },
  predType: {
    fontWeight: 600,
    color: '#00E5FF',
  },
  odds: {
    fontWeight: 700,
    color: '#FFD700',
  },
  confidenceSmall: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  confidenceSmallBar: {
    width: 60,
    height: 4,
    borderRadius: 2,
    background: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  confidenceSmallFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 0.5s ease',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
  },
  premiumBadge: {
    background: 'linear-gradient(135deg, #7C4DFF, #FFD700)',
    color: '#0A0E27',
    fontWeight: 700,
  },
  freeBadge: {
    background: 'rgba(0, 229, 255, 0.1)',
    color: '#00E5FF',
    border: '1px solid rgba(0, 229, 255, 0.2)',
  },

  // CTA Section
  ctaSection: {
    padding: '80px 20px',
    textAlign: 'center',
    maxWidth: 700,
    margin: '0 auto',
  },
  ctaCard: {
    background: 'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(124,77,255,0.08) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 229, 255, 0.15)',
    borderRadius: 24,
    padding: '48px 32px',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 50%)',
    pointerEvents: 'none',
    animation: 'floatSlow 6s ease-in-out infinite',
  },
  ctaTitle: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
    fontWeight: 800,
    color: '#fff',
    marginBottom: 16,
    position: 'relative',
  },
  ctaText: {
    color: '#B0B8D1',
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 1.7,
    position: 'relative',
  },

  // Floating Orbs
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 0,
  },
};

const predictionsData = [
  { id: 1, match: 'Manchester United vs Liverpool', league: 'Premier League', type: '1X2', pick: '1 (Home)', odds: '2.10', confidence: 87, status: 'Today', premium: false },
  { id: 2, match: 'Real Madrid vs Barcelona', league: 'La Liga', type: 'Over/Under', pick: 'Over 2.5', odds: '1.85', confidence: 82, status: 'Today', premium: false },
  { id: 3, match: 'Bayern Munich vs Dortmund', league: 'Bundesliga', type: 'BTTS', pick: 'Yes', odds: '1.72', confidence: 79, status: 'Today', premium: true },
  { id: 4, match: 'PSG vs Marseille', league: 'Ligue 1', type: 'Double Chance', pick: '1X', odds: '1.30', confidence: 93, status: 'Today', premium: true },
  { id: 5, match: 'AC Milan vs Inter Milan', league: 'Serie A', type: 'HT/FT', pick: '1/1', odds: '3.40', confidence: 71, status: 'Today', premium: true },
  { id: 6, match: 'Arsenal vs Chelsea', league: 'Premier League', type: 'Correct Score', pick: '2-1', odds: '7.50', confidence: 45, status: 'Today', premium: true },
];

const categories = ['All', '1X2', 'Over/Under', 'BTTS', 'Double Chance', 'HT/FT', 'Correct Score'];

function CountUpAnimation({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${revealed ? 'revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPredictions = activeFilter === 'All'
    ? predictionsData
    : predictionsData.filter(p => p.type === activeFilter);

  const getConfidenceColor = (val) => {
    if (val >= 80) return '#00E676';
    if (val >= 60) return '#FF9100';
    return '#FF5252';
  };

  const getStatusStyle = (status, premium) => {
    if (premium) return { ...styles.statusBadge, ...styles.premiumBadge };
    return { ...styles.statusBadge, ...styles.freeBadge };
  };

  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroBg} />
          <div style={styles.heroGrid} />
          
          {/* Floating Orbs */}
          <div style={{ ...styles.orb, width: 300, height: 300, top: '10%', left: '-5%', background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)', animation: 'floatSlow 8s ease-in-out infinite' }} />
          <div style={{ ...styles.orb, width: 200, height: 200, bottom: '15%', right: '5%', background: 'radial-gradient(circle, rgba(124,77,255,0.06) 0%, transparent 70%)', animation: 'floatSlow 6s ease-in-out infinite 2s' }} />
          <div style={{ ...styles.orb, width: 150, height: 150, top: '40%', right: '15%', background: 'radial-gradient(circle, rgba(255,215,0,0.04) 0%, transparent 70%)', animation: 'floatSlow 7s ease-in-out infinite 1s' }} />

          <div style={styles.heroContent}>
            <div style={{ ...styles.heroBadge, animation: mounted ? 'fadeInDown 0.6s ease' : 'none' }}>
              <span style={styles.heroBadgeDot} />
              <span>87% Win Rate • Trusted by 10,000+ Bettors</span>
            </div>
            <h1 style={{ ...styles.heroTitle, animation: mounted ? 'fadeInUp 0.8s ease 0.2s both' : 'none' }}>
              Premium Football<br />
              <span style={styles.heroTitleGradient}>Predictions That Win</span>
            </h1>
            <p style={{ ...styles.heroDesc, animation: mounted ? 'fadeInUp 0.8s ease 0.4s both' : 'none' }}>
              Kenya&apos;s most accurate football prediction platform. Data-driven analysis, 
              expert insights, and premium tips to maximize your betting success.
            </p>
            <div style={{ ...styles.heroBtns, animation: mounted ? 'fadeInUp 0.8s ease 0.6s both' : 'none' }}>
              <a href="/predictions" style={styles.heroPrimaryBtn}>
                View Predictions
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="/pricing" style={styles.heroSecondaryBtn}>
                Join Premium
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </a>
            </div>
            <div style={styles.statsBar}>
              <div style={{ ...styles.statItem, animation: mounted ? 'fadeInUp 0.6s ease 0.8s forwards' : 'none' }}>
                <div style={styles.statValue}><CountUpAnimation end={10000} suffix="+" /></div>
                <div style={styles.statLabel}>Active Users</div>
              </div>
              <div style={{ ...styles.statItem, animation: mounted ? 'fadeInUp 0.6s ease 1s forwards' : 'none' }}>
                <div style={{ ...styles.statValue, color: '#00E676' }}><CountUpAnimation end={87} suffix="%" /></div>
                <div style={styles.statLabel}>Win Rate</div>
              </div>
              <div style={{ ...styles.statItem, animation: mounted ? 'fadeInUp 0.6s ease 1.2s forwards' : 'none' }}>
                <div style={styles.statValue}><CountUpAnimation end={15000} suffix="+" /></div>
                <div style={styles.statLabel}>Predictions</div>
              </div>
              <div style={{ ...styles.statItem, animation: mounted ? 'fadeInUp 0.6s ease 1.4s forwards' : 'none' }}>
                <div style={{ ...styles.statValue, color: '#FFD700' }}><CountUpAnimation end={49} suffix=".9★" /></div>
                <div style={styles.statLabel}>User Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Match */}
        <ScrollReveal delay={200}>
          <section style={styles.featuredSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <span style={styles.sectionTitleGradient}>Featured Match</span>
              </h2>
              <p style={styles.sectionDesc}>
                Today&apos;s top prediction with the highest confidence rating
              </p>
            </div>
            <div style={styles.featuredCard}>
              <div style={styles.featuredGlow} />
              <div style={styles.featuredTop}>
                <div style={styles.featuredLabel}>
                  <span style={styles.featuredBadge}>⭐ Featured</span>
                  <span style={{ color: '#6B7394', fontSize: 13 }}>•</span>
                  <span style={styles.featuredDate}>Today, 18:00 EAT</span>
                </div>
                <span style={{ ...styles.statusBadge, ...styles.premiumBadge }}>Premium Pick</span>
              </div>
              <div style={styles.matchTeams}>
                <div style={styles.teamBox}>
                  <div style={styles.teamLogoPlaceholder}>🔴</div>
                  <div style={styles.teamName}>Manchester Utd</div>
                  <div style={styles.teamLeague}>Old Trafford</div>
                </div>
                <div style={styles.matchVSEmblem}>VS</div>
                <div style={styles.teamBox}>
                  <div style={styles.teamLogoPlaceholder}>🔵</div>
                  <div style={styles.teamName}>Liverpool</div>
                  <div style={styles.teamLeague}>Premier League</div>
                </div>
              </div>
              <div style={styles.featuredPrediction}>
                <div style={styles.predictionBox}>
                  <div style={styles.predictionBoxLabel}>Prediction</div>
                  <div style={styles.predictionBoxValue}>1 (Home)</div>
                </div>
                <div style={styles.predictionBox}>
                  <div style={styles.predictionBoxLabel}>Odds</div>
                  <div style={{ ...styles.predictionBoxValue, ...styles.predictionBoxValueGold }}>2.10</div>
                </div>
                <div style={styles.predictionBox}>
                  <div style={styles.predictionBoxLabel}>Category</div>
                  <div style={styles.predictionBoxValue}>1X2</div>
                </div>
                <div style={styles.predictionBox}>
                  <div style={styles.predictionBoxLabel}>League</div>
                  <div style={{ ...styles.predictionBoxValue, fontSize: 16 }}>Premier League</div>
                </div>
              </div>
              <div style={styles.confidenceContainer}>
                <div style={styles.confidenceLabel}>
                  <span>Confidence Level</span>
                  <span style={{ color: '#00E676', fontWeight: 700 }}>87%</span>
                </div>
                <div style={styles.confidenceBar}>
                  <div style={{ ...styles.confidenceFill, width: mounted ? '87%' : '0%' }} />
                </div>
              </div>
              <div style={styles.featuredCTA}>
                <a href="/predictions" style={styles.heroPrimaryBtn}>
                  View Full Analysis
                </a>
                <a href="/pricing" style={styles.heroSecondaryBtn}>
                  Get Premium Access
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Today's Predictions Table */}
        <ScrollReveal delay={200}>
          <section style={styles.tableSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                Today&apos;s <span style={styles.sectionTitleGradient}>Predictions</span>
              </h2>
              <p style={styles.sectionDesc}>
                Expert analysis for today&apos;s biggest matches across top leagues
              </p>
            </div>

            <div style={styles.tableFilter}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  style={{
                    ...styles.filterBtn,
                    ...(activeFilter === cat ? styles.filterBtnActive : {}),
                  }}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Match</th>
                    <th style={styles.th}>League</th>
                    <th style={styles.th}>Prediction</th>
                    <th style={styles.th}>Pick</th>
                    <th style={styles.th}>Odds</th>
                    <th style={styles.th}>Confidence</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPredictions.map((p, index) => (
                    <tr
                      key={p.id}
                      style={{
                        transition: 'background 0.3s ease, transform 0.2s ease',
                        cursor: 'pointer',
                        animation: mounted ? `fadeIn 0.5s ease ${index * 0.1}s both` : 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.transform = 'scale(1.005)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <td style={styles.td}>
                        <span style={styles.matchCell}>{p.match}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.leagueBadge}>{p.league}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.predType}>{p.type}</span>
                      </td>
                      <td style={styles.td}>{p.pick}</td>
                      <td style={styles.td}>
                        <span style={styles.odds}>{p.odds}</span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.confidenceSmall}>
                          <div style={styles.confidenceSmallBar}>
                            <div style={{
                              ...styles.confidenceSmallFill,
                              width: `${p.confidence}%`,
                              background: getConfidenceColor(p.confidence),
                              animation: mounted ? 'progressPulse 2s ease-in-out infinite' : 'none',
                            }} />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: getConfidenceColor(p.confidence) }}>
                            {p.confidence}%
                          </span>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={getStatusStyle(p.status, p.premium)}>
                          {p.premium ? '⭐ Premium' : 'Free'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <a href="/predictions" style={styles.heroSecondaryBtn}>
                View All Predictions
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </section>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal delay={200}>
          <section style={styles.ctaSection}>
            <div style={styles.ctaCard}>
              <div style={styles.ctaGlow} />
              <h2 style={styles.ctaTitle}>
                Ready to Start Winning?
              </h2>
              <p style={styles.ctaText}>
                Join thousands of successful bettors. Get access to premium predictions, 
                expert analysis, and data-driven insights.
              </p>
              <div style={styles.heroBtns}>
                <a href="/register" style={styles.heroPrimaryBtn}>
                  Get Started Free
                </a>
                <a href="/pricing" style={styles.heroSecondaryBtn}>
                  View Premium Plans
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}

