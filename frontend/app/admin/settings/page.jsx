'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useAuth } from '../../../context/AuthContext';

export default function AdminSettingsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      window.location.href = '/login';
    }
  }, [user, isAdmin, authLoading]);

  if (authLoading || !user || !isAdmin) {
    return (
      <div>
        <Navbar />
        <main style={{ padding: '100px 20px 60px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ padding: 60 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(0,229,255,0.2)', borderTopColor: '#00E5FF', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#6B7394' }}>Verifying access...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const [siteName, setSiteName] = useState('PrimePredict.co.ke');
  const [siteDesc, setSiteDesc] = useState('Premium Football Predictions Platform');
  const [currency, setCurrency] = useState('KES');
  const [timezone, setTimezone] = useState('Africa/Nairobi');
  const [minConfidence, setMinConfidence] = useState('50');
  const [maxPredictions, setMaxPredictions] = useState('20');
  const [enableRegistration, setEnableRegistration] = useState(true);
  const [requireVerification, setRequireVerification] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
            Admin Settings
          </h1>
          <p style={{ color: '#6B7394' }}>Configure platform settings and preferences</p>
        </div>

        <form onSubmit={handleSave}>
          {/* General Settings */}
          <div style={{ background: '#131849', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
            <h3 style={{ color: '#fff', fontSize: 18, marginBottom: 24, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>General Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="settings-grid">
              <div>
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>Site Name</label>
                <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>Site Description</label>
                <input type="text" value={siteDesc} onChange={(e) => setSiteDesc(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>Default Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                  <option>KES</option>
                  <option>USD</option>
                  <option>NGN</option>
                  <option>GHS</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>Timezone</label>
                <select value={timezone} onChange={(e) => setTimezone(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                  <option>Africa/Nairobi</option>
                  <option>Africa/Lagos</option>
                  <option>Africa/Accra</option>
                  <option>Africa/Johannesburg</option>
                </select>
              </div>
            </div>
          </div>

          {/* Prediction Settings */}
          <div style={{ background: '#131849', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
            <h3 style={{ color: '#fff', fontSize: 18, marginBottom: 24, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Prediction Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="settings-grid">
              <div>
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>Min Confidence (%)</label>
                <input type="number" value={minConfidence} onChange={(e) => setMinConfidence(e.target.value)} min="0" max="100"
                  style={{ width: '100%', padding: '12px 16px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>Max Daily Predictions</label>
                <input type="number" value={maxPredictions} onChange={(e) => setMaxPredictions(e.target.value)} min="1" max="100"
                  style={{ width: '100%', padding: '12px 16px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>

          {/* User Settings */}
          <div style={{ background: '#131849', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
            <h3 style={{ color: '#fff', fontSize: 18, marginBottom: 24, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>User Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Enable Registration</div>
                  <div style={{ color: '#6B7394', fontSize: 12 }}>Allow new users to create accounts</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
                  <input type="checkbox" checked={enableRegistration} onChange={(e) => setEnableRegistration(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{
                    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                    background: enableRegistration ? 'rgba(0,229,255,0.4)' : 'rgba(255,255,255,0.1)',
                    borderRadius: 12, transition: '0.3s',
                  }}>
                    <span style={{
                      position: 'absolute', height: 20, width: 20, left: enableRegistration ? 22 : 2, bottom: 2,
                      background: enableRegistration ? '#00E5FF' : '#6B7394',
                      borderRadius: '50%', transition: '0.3s',
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Require Email Verification</div>
                  <div style={{ color: '#6B7394', fontSize: 12 }}>Users must verify their email before accessing premium</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
                  <input type="checkbox" checked={requireVerification} onChange={(e) => setRequireVerification(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{
                    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                    background: requireVerification ? 'rgba(0,229,255,0.4)' : 'rgba(255,255,255,0.1)',
                    borderRadius: 12, transition: '0.3s',
                  }}>
                    <span style={{
                      position: 'absolute', height: 20, width: 20, left: requireVerification ? 22 : 2, bottom: 2,
                      background: requireVerification ? '#00E5FF' : '#6B7394',
                      borderRadius: '50%', transition: '0.3s',
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </div>

          {saved && (
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', color: '#00E676', fontSize: 13, marginBottom: 16, fontWeight: 500 }}>
              Settings saved successfully!
            </div>
          )}

          <button type="submit" style={{
            padding: '14px 36px', borderRadius: 10, border: 'none',
            background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)', color: '#0A0E27',
            fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          }}>
            Save All Settings
          </button>
        </form>

        <style jsx>{`
          @media (max-width: 600px) {
            .settings-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </div>
  );
}
