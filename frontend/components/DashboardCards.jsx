'use client';

import { useState } from 'react';

const paymentProviders = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    icon: '📱',
    bg: 'rgba(0, 150, 50, 0.1)',
    border: 'rgba(0, 150, 50, 0.3)',
    color: '#00E676',
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    icon: '💳',
    bg: 'rgba(255, 100, 50, 0.1)',
    border: 'rgba(255, 100, 50, 0.3)',
    color: '#FF6B35',
  },
  {
    id: 'pesapal',
    name: 'PesaPal',
    icon: '🏦',
    bg: 'rgba(0, 120, 255, 0.1)',
    border: 'rgba(0, 120, 255, 0.3)',
    color: '#0078FF',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: '💎',
    bg: 'rgba(124, 77, 255, 0.1)',
    border: 'rgba(124, 77, 255, 0.3)',
    color: '#7C4DFF',
  },
  {
    id: 'coinbase',
    name: 'Crypto',
    icon: '₿',
    bg: 'rgba(255, 215, 0, 0.1)',
    border: 'rgba(255, 215, 0, 0.3)',
    color: '#FFD700',
  },
];

const plans = [
  { name: 'Weekly', price: '499', period: 'week', popular: false },
  { name: 'Monthly', price: '1,499', period: 'month', popular: true },
  { name: 'Yearly', price: '9,999', period: 'year', popular: false },
];

export default function PaymentForm({ onSuccess, onError }) {
  const [step, setStep] = useState('plan'); // plan, provider, processing, success
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setStep('provider');
    setError('');
  };

  const handleSelectProvider = (provider) => {
    setSelectedProvider(provider);
    setStep('details');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedProvider.id === 'mpesa' && !phone) {
      setError('Please enter your M-Pesa phone number');
      return;
    }

    setStep('processing');

    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
      if (onSuccess) onSuccess();
    }, 2000);
  };

  const handleBack = () => {
    if (step === 'provider') { setStep('plan'); setSelectedPlan(null); }
    else if (step === 'details') { setStep('provider'); setSelectedProvider(null); }
  };

  if (step === 'success') {
    return (
      <div style={{
        background: '#131849',
        border: '1px solid rgba(0,230,118,0.2)',
        borderRadius: 20,
        padding: 40,
        textAlign: 'center',
        maxWidth: 480,
        margin: '0 auto',
      }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(0,230,118,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: 36,
        }}>
          ✅
        </div>
        <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          Payment Successful!
        </h3>
        <p style={{ color: '#B0B8D1', marginBottom: 24 }}>
          Your {selectedPlan?.name} plan is now active. Welcome to PrimePredict Premium!
        </p>
        <a
          href="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '14px 28px',
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
            color: '#0A0E27',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          Go to Dashboard
        </a>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div style={{
        background: '#131849',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 20,
        padding: 40,
        textAlign: 'center',
        maxWidth: 480,
        margin: '0 auto',
      }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: '3px solid rgba(0,229,255,0.2)',
          borderTopColor: '#00E5FF',
          margin: '0 auto 20px',
          animation: 'spin 1s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          Processing Payment
        </h3>
        <p style={{ color: '#6B7394' }}>
          Please wait while we process your payment via {selectedProvider?.name}...
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: '#131849',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 20,
      padding: 32,
      maxWidth: 560,
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 28,
      }}>
        <div>
          <h3 style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: '#fff',
            marginBottom: 4,
          }}>
            {step === 'plan' ? 'Choose Your Plan' : step === 'provider' ? 'Select Payment Method' : 'Payment Details'}
          </h3>
          <p style={{ color: '#6B7394', fontSize: 14, margin: 0 }}>
            {step === 'plan' ? 'Pick the plan that works for you' : step === 'provider' ? 'Choose your preferred payment provider' : 'Enter your payment information'}
          </p>
        </div>
        {step !== 'plan' && (
          <button
            onClick={handleBack}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent',
              color: '#B0B8D1',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Back
          </button>
        )}
      </div>

      {/* Step 1: Plan Selection */}
      {step === 'plan' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {plans.map((plan) => (
            <button
              key={plan.name}
              onClick={() => handleSelectPlan(plan)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 20px',
                borderRadius: 14,
                border: `1px solid ${plan.popular ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                background: plan.popular ? 'rgba(0,229,255,0.06)' : 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%',
                textAlign: 'left',
                fontFamily: 'Inter, sans-serif',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{plan.name}</span>
                  {plan.popular && (
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'rgba(255,215,0,0.15)',
                      color: '#FFD700',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      Best Value
                    </span>
                  )}
                </div>
                <span style={{ color: '#6B7394', fontSize: 13 }}>
                  KES {plan.price}/{plan.period}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#00E5FF', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  KES {plan.price}
                </div>
                <div style={{ fontSize: 12, color: '#6B7394' }}>per {plan.period}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Provider Selection */}
      {step === 'provider' && selectedPlan && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            padding: '12px 16px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.03)',
            marginBottom: 8,
          }}>
            <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 4 }}>Selected Plan</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>{selectedPlan.name} Plan</span>
              <span style={{ color: '#FFD700', fontWeight: 700, fontSize: 18 }}>KES {selectedPlan.price}</span>
            </div>
          </div>

          {paymentProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleSelectProvider(provider)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 20px',
                borderRadius: 14,
                border: `1px solid ${selectedProvider?.id === provider.id ? provider.border : 'rgba(255,255,255,0.06)'}`,
                background: selectedProvider?.id === provider.id ? provider.bg : 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%',
                textAlign: 'left',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: provider.bg,
                border: `1px solid ${provider.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}>
                {provider.icon}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{provider.name}</div>
                <div style={{ fontSize: 12, color: '#6B7394' }}>
                  {provider.id === 'mpesa' ? 'Pay with M-Pesa' :
                   provider.id === 'flutterwave' ? 'Card, Mobile Money, Bank' :
                   provider.id === 'pesapal' ? 'Card, Mobile Money' :
                   provider.id === 'stripe' ? 'Credit/Debit Card' :
                   'Bitcoin, Ethereum, USDT'}
                </div>
              </div>
              {selectedProvider?.id === provider.id && (
                <div style={{ marginLeft: 'auto', color: provider.color, fontSize: 20 }}>✓</div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Payment Details */}
      {step === 'details' && selectedProvider && selectedPlan && (
        <form onSubmit={handleSubmit}>
          <div style={{
            padding: '12px 16px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.03)',
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 12, color: '#6B7394', marginBottom: 4 }}>Payment Summary</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedPlan.name} Plan</span>
                <span style={{ color: '#6B7394', fontSize: 13, marginLeft: 8 }}>via {selectedProvider.name}</span>
              </div>
              <span style={{ color: '#FFD700', fontWeight: 700, fontSize: 20 }}>KES {selectedPlan.price}</span>
            </div>
          </div>

          {selectedProvider.id === 'mpesa' && (
            <div className="form-group">
              <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>
                M-Pesa Phone Number
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6B7394',
                  fontSize: 14,
                  fontWeight: 600,
                }}>
                  +254
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 9) setPhone(val);
                  }}
                  placeholder="712345678"
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 60px',
                    background: '#0F1535',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    transition: 'border 0.3s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0,229,255,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              <div style={{ fontSize: 12, color: '#6B7394', marginTop: 6 }}>
                You will receive an STK push prompt on your phone
              </div>
            </div>
          )}

          {(selectedProvider.id === 'stripe' || selectedProvider.id === 'flutterwave') && (
            <>
              <div className="form-group">
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#0F1535',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: '#0F1535',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10,
                      color: '#fff',
                      fontSize: 15,
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: '#0F1535',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10,
                      color: '#fff',
                      fontSize: 15,
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {selectedProvider.id === 'pesapal' && (
            <div className="form-group">
              <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: '#0F1535',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  color: '#fff',
                  fontSize: 15,
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          {selectedProvider.id === 'coinbase' && (
            <div style={{
              padding: 20,
              borderRadius: 12,
              background: 'rgba(255,215,0,0.05)',
              border: '1px solid rgba(255,215,0,0.15)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>₿</div>
              <div style={{ color: '#B0B8D1', fontSize: 14, marginBottom: 8 }}>
                Pay with Bitcoin, Ethereum, USDT, or other supported cryptocurrencies
              </div>
              <div style={{ color: '#6B7394', fontSize: 13 }}>
                You will be redirected to Coinbase Commerce to complete payment
              </div>
            </div>
          )}

          {error && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 10,
              background: 'rgba(255,82,82,0.1)',
              border: '1px solid rgba(255,82,82,0.2)',
              color: '#FF5252',
              fontSize: 13,
              marginTop: 16,
              fontWeight: 500,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
              color: '#0A0E27',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 20,
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s ease',
            }}
          >
            Pay KES {selectedPlan.price}
          </button>
        </form>
      )}
    </div>
  );
}

