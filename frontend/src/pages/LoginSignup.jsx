import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';
import { useApp } from '../context/AppContext';
import { useEffect } from 'react';

export default function LoginSignup() {
  const navigate = useNavigate();
  const { login, showToast } = useApp();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ username: '', emailOrUsername: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  useEffect(() => {
    if (!isSignup) {
      localStorage.removeItem('gt_admin');
    }
  }, [isSignup]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isSignup && form.password !== form.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);

    const url = isSignup ? `${API_BASE_URL}/signup` : `${API_BASE_URL}/login`;
    const payload = isSignup
      ? { username: form.username, email: form.emailOrUsername, password: form.password }
      : { identifier: form.emailOrUsername, password: form.password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        if (!isSignup) {
          login({ username: data.username, email: data.email, userId: data.userId }, data.token);
          showToast('🎉 Welcome back, ' + (data.username || 'traveler') + '!', 'success');
          navigate('/');
        } else {
          showToast('✅ Account created! Please log in.', 'success');
          setIsSignup(false);
          setForm({
            username: '',
            emailOrUsername: '',
            password: '',
            confirmPassword: '',
          });
        }
      }
    } catch {
      setError('Network error. Please try again.');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #071a2e 0%, #07406e 50%, #1a7fc1 100%)',
      fontFamily: "'Poppins', sans-serif", padding: '20px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '10%', left: '5%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(249,211,66,0.06)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: 200, height: 200, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: 440,
        background: 'var(--bg-card)',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        animation: 'fadeUp 0.5s ease',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
          padding: '32px 40px 28px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌍</div>
          <h1 style={{ color: 'white', margin: 0, fontSize: 24, fontWeight: 800 }}>
            {isSignup ? 'Join GlobeTrekker' : 'Welcome Back!'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '8px 0 0', fontSize: 14 }}>
            {isSignup ? 'Start your travel journey today' : 'Log in to your travel account'}
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '32px 40px' }}>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>
                  Username *
                </label>
                <input
                  name="username"
                  className="input-field"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  minLength={3}
                  style={{ display: 'block' }}
                />
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>
                {isSignup ? 'Email Address *' : 'Email or Username *'}
              </label>
              <input
                name="emailOrUsername"
                className="input-field"
                type={isSignup ? 'email' : 'text'}
                placeholder={isSignup ? 'your@email.com' : 'Email or username'}
                value={form.emailOrUsername}
                onChange={handleChange}
                required
                style={{ display: 'block' }}
              />
            </div>

            <div style={{ marginBottom: isSignup ? 16 : 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>
                Password *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  name="password"
                  className="input-field"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  style={{ display: 'block', paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(p => !p)}
                  style={{
                    position: 'absolute', right: 14, top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', fontSize: 18,
                  }}
                >{showPwd ? '🙈' : '👁️'}</button>
              </div>
            </div>

            {isSignup && (
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>
                  Confirm Password *
                </label>
                <input
                  name="confirmPassword"
                  className="input-field"
                  type="password"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{ display: 'block' }}
                />
              </div>
            )}

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', color: '#dc2626',
                border: '1px solid rgba(239,68,68,0.2)',
                padding: '10px 14px', borderRadius: 8, fontSize: 13,
                marginBottom: 16,
              }}>❌ {error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? 'var(--border)' : 'var(--gradient)',
                border: 'none', borderRadius: 50, color: 'white',
                fontWeight: 700, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Poppins', sans-serif",
                boxShadow: '0 4px 16px rgba(7,64,110,0.3)',
                transition: 'all 0.3s',
              }}
              onMouseOver={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              {loading ? '⏳ Please wait...' : isSignup ? '🚀 Create Account' : '🔑 Log In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--text-light)' }}>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => { setIsSignup(s => !s); setError(''); setForm({ username: '', emailOrUsername: '', password: '', confirmPassword: '' }); }}
              style={{
                background: 'none', border: 'none', color: 'var(--primary)',
                fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
              }}
            >
              {isSignup ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
