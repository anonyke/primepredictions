'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PaymentForm from '../../components/PaymentForm';

const plans = [
  {
    name: 'Weekly',
    price: '499',
    period: 'week',
    description: 'Perfect for trying out premium predictions',
    features: [
      'Access to all premium picks',
      '6 prediction categories',
      'Daily predictions',
      'Email support',
      'Basic analytics',
    ],
    popular: false,
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))',
  },
  {
    name: 'Monthly',
    price: '1,499',
    period: 'month',
    description: 'Most popular plan for serious bettors',
    features: [
      'Everything in Weekly',
      '87% average win rate',
      'Correct score predictions',
      'Expert analysis & insights',
      'Priority support',
      'Performance dashboard',
    ],
    popular: true,
    color: '#7C4DFF',
    gradient: 'linear-gradient(135deg, rgba(124,77,255,0.1), rgba(255,215,0,0.03))',
  },
  {
    name: 'Yearly',
    price: '9,999',
    period: 'year',
    description: 'Best value for dedicated members',
    features: [
      'Everything in Monthly',
      'Save 44% vs monthly',
      'VIP Telegram group access',
      'Personal betting consultant',
      'Early access to predictions',
      'Custom analysis requests',
    ],
    popular: false,
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,215,0,0.02))',
  },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [billing, setBilling] = useState('monthly');

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💎</div>
          <h1 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 800,
            marginBottom: 16,
          }}>
            Premium <span style={{
              background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Subscription Plans</span>
          </h1>
          <p style={{ color: '#6B7394', fontSize: 16, maxWidth: 560, margin: '0 auto 32px' }}>
            Choose the plan that fits your betting style. All plans include access to our premium prediction engine.
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 48,
        }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                position: 'relative',
                background: plan.popular
                  ? 'linear-gradient(135deg, rgba(124,77,255,0.08), rgba(255,215,0,0.04))'
                  : plan.gradient,
                border: `1px solid ${plan.popular ? 'rgba(124,77,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 20,
                padding: '32px 24px',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = plan.popular
                  ? '0 0 40px rgba(124,77,255,0.2)'
                  : '0 16px 48px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  padding: '4px 12px',
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, #7C4DFF, #FFD700)',
                  color: '#0A0E27',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Most Popular
                </div>
              )}

              {/* Plan Icon */}
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${plan.color}22, transparent)`,
                border: `1px solid ${plan.color}33`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                marginBottom: 16,
              }}>
                {plan.name === 'Weekly' ? '⚡' : plan.name === 'Monthly' ? '⭐' : '👑'}
              </div>

              {/* Plan Name & Price */}
              <h3 style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 22,
                fontWeight: 800,
                color: '#fff',
                marginBottom: 4,
              }}>
                {plan.name}
              </h3>
              <p style={{ color: '#6B7394', fontSize: 14, marginBottom: 20, minHeight: 40 }}>
                {plan.description}
              </p>

              <div style={{ marginBottom: 24 }}>
                <span style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: '#fff',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}>
                  KES {plan.price}
                </span>
                <span style={{ color: '#6B7394', fontSize: 16, marginLeft: 4 }}>
                  /{plan.period}
                </span>
              </div>

              {/* Features */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: '#B0B8D1',
                    fontSize: 14,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan(plan)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 12,
                  border: 'none',
                  background: plan.popular
                    ? 'linear-gradient(135deg, #7C4DFF, #FFD700)'
                    : 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
                  color: '#0A0E27',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease',
                  boxShadow: plan.popular ? '0 0 30px rgba(124,77,255,0.3)' : 'none',
                }}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        {showPayment && selectedPlan && (
          <div style={{ marginTop: 24 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h2 style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 24,
                fontWeight: 800,
                color: '#fff',
                marginBottom: 8,
              }}>
                Complete Your Purchase
              </h2>
              <p style={{ color: '#6B7394' }}>
                You selected the <strong style={{ color: '#00E5FF' }}>{selectedPlan.name}</strong> plan - KES {selectedPlan.price}/{selectedPlan.period}
              </p>
            </div>
            <PaymentForm />
          </div>
        )}

        {/* Trust Section */}
        <div style={{
          marginTop: 48,
          padding: '32px',
          borderRadius: 16,
          background: '#131849',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
            textAlign: 'center',
          }}>
            <div>
              <div style={{ fontSize: 14, color: '#6B7394', marginBottom: 8 }}>🔒</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Secure Payments</div>
              <div style={{ fontSize: 13, color: '#6B7394' }}>256-bit SSL encrypted</div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: '#6B7394', marginBottom: 8 }}>✅</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Money-Back Guarantee</div>
              <div style={{ fontSize: 13, color: '#6B7394' }}>7-day satisfaction guarantee</div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: '#6B7394', marginBottom: 8 }}>⚡</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Instant Access</div>
              <div style={{ fontSize: 13, color: '#6B7394' }}>Access immediately after payment</div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: '#6B7394', marginBottom: 8 }}>💬</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }}>24/7 Support</div>
              <div style={{ fontSize: 13, color: '#6B7394' }}>Dedicated support team</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

