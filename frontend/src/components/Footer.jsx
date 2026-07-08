import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);
    try {
      const res = await fetch(`${API_BASE_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('🎉 ' + (data.message || 'Subscribed successfully!'), 'success');
        setEmail('');
      } else {
        showToast(data.message || data.error || 'Already subscribed!', 'info');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    }
    setSubscribing(false);
  };

  const links = {
    Explore: [
      { label: 'Destinations', path: '/#destinations' },
      { label: 'Packages', path: '/#packages' },
      { label: 'AI Trip Planner', path: '/trip-planner' },
      { label: 'Book a Trip', path: '/register' },
    ],
    Company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Admin Panel', path: '/admin' },
    ],
    Legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms & Conditions', path: '/terms' },
    ],
  };

  const socials = [
    { icon: '📘', href: 'https://facebook.com', label: 'Facebook' },
    { icon: '📸', href: 'https://instagram.com', label: 'Instagram' },
    { icon: '🐦', href: 'https://twitter.com', label: 'Twitter' },
    { icon: '▶️', href: 'https://youtube.com', label: 'YouTube' },
    { icon: '💼', href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #071a2e 0%, #07406e 100%)',
      color: '#e8f0fe',
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{
        maxWidth: 1300, margin: '0 auto',
        padding: '60px 32px 0',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: 40,
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: 'linear-gradient(135deg,#1a7fc1,#f9d342)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>🌍</div>
            <span style={{ fontWeight: 800, fontSize: 22 }}>
              Globe<span style={{ color: '#f9d342' }}>Trekker</span>
            </span>
          </div>
          <p style={{ color: '#9db4cc', lineHeight: 1.8, fontSize: 14, marginBottom: 20 }}>
            GlobeTrekker brings your travel dreams to life with curated destinations,
            seamless planning, and unforgettable experiences across 120+ destinations worldwide.
          </p>

          {/* Newsletter */}
          <p style={{ fontWeight: 600, marginBottom: 10, color: '#e8f0fe' }}>
            📧 Subscribe for exclusive deals
          </p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 8 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                flex: 1, padding: '10px 16px',
                borderRadius: 50, border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: 'white', fontSize: 13,
                fontFamily: "'Poppins', sans-serif",
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={subscribing}
              style={{
                padding: '10px 18px', borderRadius: 50,
                background: '#f9d342', color: '#07406e',
                border: 'none', fontWeight: 700, fontSize: 13,
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >{subscribing ? '...' : 'Subscribe'}</button>
          </form>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(249,211,66,0.3)'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 style={{ color: '#f9d342', fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: 0.5 }}>
              {title}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {items.map(item => (
                <li key={item.label} style={{ marginBottom: 10 }}>
                  <Link
                    to={item.path}
                    style={{
                      color: '#9db4cc', textDecoration: 'none',
                      fontSize: 14, transition: 'color 0.2s',
                    }}
                    onMouseOver={e => e.target.style.color = '#f9d342'}
                    onMouseOut={e => e.target.style.color = '#9db4cc'}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div style={{
        maxWidth: 1300, margin: '0 auto',
        padding: '24px 32px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <p style={{ color: '#9db4cc', fontSize: 13, margin: 0 }}>
          © 2025 GlobeTrekker. All rights reserved. Made with ❤️ for travelers.
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy Policy', 'Terms & Conditions', 'FAQ'].map((label, i) => (
            <Link
              key={label}
              to={['/privacy', '/terms', '/faq'][i]}
              style={{ color: '#9db4cc', fontSize: 13, textDecoration: 'none' }}
              onMouseOver={e => e.target.style.color = '#f9d342'}
              onMouseOut={e => e.target.style.color = '#9db4cc'}
            >{label}</Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 580px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
