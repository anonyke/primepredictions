'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { useAuth } from '../../../context/AuthContext';

export default function AdminSettingsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();

  const [siteName, setSiteName] = useState('PrimePredict.co.ke');
  const [siteDesc, setSiteDesc] = useState('Premium Football Predictions Platform');
  const [currency, setCurrency] = useState('KES');
  const [timezone, setTimezone] = useState('Africa/Nairobi');
  const [minConfidence, setMinConfidence] = useState('50');
  const [maxPredictions, setMaxPredictions] = useState('20');
  const [enableRegistration, setEnableRegistration] = useState(true);
  const [requireVerification, setRequireVerification] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      window.location.href = '/login';
    }
  }, [user, isAdmin, authLoading]);

  if (authLoading || !user || !isAdmin) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(0,229,255,0.2)', borderTopColor: '#00E5FF', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#6B7394' }}>Verifying access...</p>
        </div>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = { fontFamily: 'var(--font-sans)' };

  return (
    <AdminLayout title="Settings" subtitle="Configure platform settings and preferences">
      <form onSubmit={handleSave}>
        {/* General Settings */}
        <div className="premium-card p-7 mb-6">
          <h3 className="text-white font-bold text-lg mb-6" style={{ fontFamily: 'var(--font-display)' }}>General Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="settings-grid">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>Site Name</label>
              <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="form-input" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>Site Description</label>
              <input type="text" value={siteDesc} onChange={(e) => setSiteDesc(e.target.value)} className="form-input" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>Default Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="form-select" style={inputStyle}>
                <option>KES</option>
                <option>USD</option>
                <option>NGN</option>
                <option>GHS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>Timezone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="form-select" style={inputStyle}>
                <option>Africa/Nairobi</option>
                <option>Africa/Lagos</option>
                <option>Africa/Accra</option>
                <option>Africa/Johannesburg</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prediction Settings */}
        <div className="premium-card p-7 mb-6">
          <h3 className="text-white font-bold text-lg mb-6" style={{ fontFamily: 'var(--font-display)' }}>Prediction Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="settings-grid">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>Min Confidence (%)</label>
              <input type="number" value={minConfidence} onChange={(e) => setMinConfidence(e.target.value)} min="0" max="100" className="form-input" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>Max Daily Predictions</label>
              <input type="number" value={maxPredictions} onChange={(e) => setMaxPredictions(e.target.value)} min="1" max="100" className="form-input" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* User Settings */}
        <div className="premium-card p-7 mb-6">
          <h3 className="text-white font-bold text-lg mb-6" style={{ fontFamily: 'var(--font-display)' }}>User Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Enable Registration', desc: 'Allow new users to create accounts', value: enableRegistration, setter: setEnableRegistration },
              { label: 'Require Email Verification', desc: 'Users must verify their email before accessing premium', value: requireVerification, setter: setRequireVerification },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">{item.label}</div>
                  <div style={{ color: '#6B7394', fontSize: 12 }}>{item.desc}</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
                  <input type="checkbox" checked={item.value} onChange={(e) => item.setter(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{
                    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                    background: item.value ? 'rgba(0,229,255,0.4)' : 'rgba(255,255,255,0.1)',
                    borderRadius: 12, transition: '0.3s',
                  }}>
                    <span style={{
                      position: 'absolute', height: 20, width: 20, left: item.value ? 22 : 2, bottom: 2,
                      background: item.value ? '#00E5FF' : '#6B7394',
                      borderRadius: '50%', transition: '0.3s',
                    }} />
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {saved && (
          <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', color: '#00E676', fontSize: 13, marginBottom: 16, fontWeight: 500 }}>
            Settings saved successfully!
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg" style={{ cursor: 'pointer' }}>
          Save All Settings
        </button>
      </form>

      <style jsx>{`
        @media (max-width: 600px) {
          .settings-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminLayout>
  );
}
