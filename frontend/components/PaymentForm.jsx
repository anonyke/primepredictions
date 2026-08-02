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
  const [step, setStep] = useState('plan'); // plan, provider, details, processing, success
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
      <div
        className="rounded-3xl p-10 text-center max-w-lg mx-auto animate-scaleIn"
        style={{ background: '#131849', border: '1px solid rgba(0,230,118,0.25)', boxShadow: '0 0 40px rgba(0,230,118,0.1)' }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl"
          style={{ background: 'rgba(0,230,118,0.1)' }}
        >
          ✅
        </div>
        <h3 className="text-white text-2xl font-extrabold mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          Payment Successful!
        </h3>
        <p className="text-[#B0B8D1] mb-6">
          Your <strong className="text-white">{selectedPlan?.name}</strong> plan is now active.
          Welcome to PrimePredict Premium!
        </p>
        <a
          href="/dashboard"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-bold no-underline transition-transform hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)', color: '#0A0E27' }}
        >
          Go to Dashboard →
        </a>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div
        className="rounded-3xl p-10 text-center max-w-lg mx-auto"
        style={{ background: '#131849', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div
          className="w-20 h-20 rounded-full border-4 mx-auto mb-5"
          style={{ borderColor: 'rgba(0,229,255,0.2)', borderTopColor: '#00E5FF', animation: 'spin 1s linear infinite' }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <h3 className="text-white text-xl font-bold mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          Processing Payment
        </h3>
        <p style={{ color: '#6B7394' }}>
          Please wait while we process your payment via {selectedProvider?.name}...
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-8 max-w-xl mx-auto"
      style={{ background: '#131849', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h3 className="text-white text-2xl font-extrabold mb-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            {step === 'plan' ? 'Choose Your Plan' : step === 'provider' ? 'Select Payment Method' : 'Payment Details'}
          </h3>
          <p className="text-[#6B7394] text-sm m-0">
            {step === 'plan' ? 'Pick the plan that works for you' : step === 'provider' ? 'Choose your preferred payment provider' : 'Enter your payment information'}
          </p>
        </div>
        {step !== 'plan' && (
          <button
            onClick={handleBack}
            className="px-4 py-2 rounded-lg text-[13px] cursor-pointer transition-colors hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#B0B8D1' }}
          >
            ← Back
          </button>
        )}
      </div>

      {/* Step 1: Plan Selection */}
      {step === 'plan' && (
        <div className="flex flex-col gap-3">
          {plans.map((plan) => (
            <button
              key={plan.name}
              onClick={() => handleSelectPlan(plan)}
              className="flex items-center justify-between w-full p-5 rounded-2xl cursor-pointer text-left transition-all hover:border-cyan-400/30 hover:bg-white/[0.04]"
              style={{
                border: `1px solid ${plan.popular ? 'rgba(0,229,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                background: plan.popular ? 'rgba(0,229,255,0.06)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-white">{plan.name}</span>
                  {plan.popular && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide"
                      style={{ background: 'rgba(255,215,0,0.15)', color: '#FFD700' }}
                    >
                      Best Value
                    </span>
                  )}
                </div>
                <span className="text-[13px]" style={{ color: '#6B7394' }}>
                  KES {plan.price}/{plan.period}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold" style={{ color: '#00E5FF', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  KES {plan.price}
                </div>
                <div className="text-xs" style={{ color: '#6B7394' }}>per {plan.period}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Provider Selection */}
      {step === 'provider' && selectedPlan && (
        <div className="flex flex-col gap-3">
          <div className="px-4 py-3 rounded-xl mb-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="text-xs mb-1" style={{ color: '#6B7394' }}>Selected Plan</div>
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">{selectedPlan.name} Plan</span>
              <span className="text-lg font-bold" style={{ color: '#FFD700' }}>KES {selectedPlan.price}</span>
            </div>
          </div>

          {paymentProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleSelectProvider(provider)}
              className="flex items-center gap-4 w-full p-4 rounded-2xl cursor-pointer text-left transition-all hover:bg-white/[0.03]"
              style={{
                border: `1px solid ${selectedProvider?.id === provider.id ? provider.border : 'rgba(255,255,255,0.07)'}`,
                background: selectedProvider?.id === provider.id ? provider.bg : 'rgba(255,255,255,0.02)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: provider.bg, border: `1px solid ${provider.border}` }}
              >
                {provider.icon}
              </div>
              <div>
                <div className="text-base font-semibold text-white mb-0.5">{provider.name}</div>
                <div className="text-xs" style={{ color: '#6B7394' }}>
                  {provider.id === 'mpesa' ? 'Pay with M-Pesa' :
                   provider.id === 'flutterwave' ? 'Card, Mobile Money, Bank' :
                   provider.id === 'pesapal' ? 'Card, Mobile Money' :
                   provider.id === 'stripe' ? 'Credit/Debit Card' :
                   'Bitcoin, Ethereum, USDT'}
                </div>
              </div>
              {selectedProvider?.id === provider.id && (
                <div className="ml-auto text-xl" style={{ color: provider.color }}>✓</div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Payment Details */}
      {step === 'details' && selectedProvider && selectedPlan && (
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-3 rounded-xl mb-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="text-xs mb-1" style={{ color: '#6B7394' }}>Payment Summary</div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-white font-semibold">{selectedPlan.name} Plan</span>
                <span className="text-[13px] ml-2" style={{ color: '#6B7394' }}>via {selectedProvider.name}</span>
              </div>
              <span className="text-xl font-bold" style={{ color: '#FFD700' }}>KES {selectedPlan.price}</span>
            </div>
          </div>

          {selectedProvider.id === 'mpesa' && (
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>
                M-Pesa Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold" style={{ color: '#6B7394' }}>
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
                  className="w-full py-3.5 pl-14 pr-3.5 rounded-xl text-base outline-none transition-colors"
                  style={{
                    background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', color: '#fff',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0,229,255,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              <div className="text-xs mt-1.5" style={{ color: '#6B7394' }}>
                You will receive an STK push prompt on your phone
              </div>
            </div>
          )}

          {(selectedProvider.id === 'stripe' || selectedProvider.id === 'flutterwave') && (
            <>
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>Card Number</label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="w-full py-3.5 px-3.5 rounded-xl text-[15px] outline-none"
                  style={{ background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full py-3.5 px-3.5 rounded-xl text-[15px] outline-none"
                    style={{ background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full py-3.5 px-3.5 rounded-xl text-[15px] outline-none"
                    style={{ background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                  />
                </div>
              </div>
            </>
          )}

          {selectedProvider.id === 'pesapal' && (
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full py-3.5 px-3.5 rounded-xl text-[15px] outline-none"
                style={{ background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
              />
            </div>
          )}

          {selectedProvider.id === 'coinbase' && (
            <div
              className="p-5 rounded-xl text-center mb-5"
              style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.15)' }}
            >
              <div className="text-3xl mb-3">₿</div>
              <div className="text-sm mb-2" style={{ color: '#B0B8D1' }}>
                Pay with Bitcoin, Ethereum, USDT, or other supported cryptocurrencies
              </div>
              <div className="text-[13px]" style={{ color: '#6B7394' }}>
                You will be redirected to Coinbase Commerce to complete payment
              </div>
            </div>
          )}

          {error && (
            <div
              className="px-4 py-3 rounded-xl text-[13px] font-medium mb-4 animate-slideDown"
              style={{ background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.2)', color: '#FF5252' }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-xl text-base font-bold cursor-pointer border-none mt-4 transition-transform hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)', color: '#0A0E27' }}
          >
            Pay KES {selectedPlan.price}
          </button>
        </form>
      )}
    </div>
  );
}

