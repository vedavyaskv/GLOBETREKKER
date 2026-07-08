import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const HERO_TEXTS = [
  'WANDER SOLO, DREAM BIG',
  'EXPLORE THE UNEXPLORED',
  'YOUR ADVENTURE AWAITS',
  'JOURNEY BEYOND LIMITS',
];

const STATS = [
  { icon: '✈️', value: '10,000+', label: 'Happy Travelers' },
  { icon: '🌍', value: '120+', label: 'Destinations' },
  { icon: '⭐', value: '4.9★', label: 'Average Rating' },
  { icon: '🏆', value: '8+', label: 'Years Experience' },
];

export default function Hero() {
  const navigate = useNavigate();
  const { isLoggedIn, showToast } = useApp();
  const [heroIdx, setHeroIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setHeroIdx(i => (i + 1) % HERO_TEXTS.length);
        setFadeIn(true);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleRegister = () => {
  if (isLoggedIn) {
    navigate('/register');
  } else {
    showToast('Please login first to book a trip!', 'error');
    navigate('/login');
  }
};

  const handleExplore = () => {
  const el = document.getElementById('destinations');

  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" style={{
      minHeight: '100vh',
      backgroundImage: `url('/travel.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      overflow: 'hidden',
    }}>
      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(7,64,110,0.85) 0%, rgba(0,0,0,0.5) 100%)',
        zIndex: 1,
      }} />

      {/* Animated Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 4, height: 4,
            borderRadius: '50%',
            background: 'rgba(249,211,66,0.6)',
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', maxWidth: 900,
        padding: '0 24px', marginTop: 70,
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(249,211,66,0.15)',
          border: '1px solid rgba(249,211,66,0.4)',
          borderRadius: 50, padding: '6px 18px',
          fontSize: 13, fontWeight: 600, color: '#f9d342',
          marginBottom: 24, letterSpacing: 1,
          animation: 'fadeUp 0.8s ease forwards',
        }}>
          ✨ Premium Travel Experiences
        </div>

        {/* Animated Headline */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          margin: '0 0 16px',
          lineHeight: 1.1,
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.5s ease',
          textShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}>
          {HERO_TEXTS[heroIdx]}
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: '#f9d342',
          marginBottom: 12,
          fontWeight: 600,
          animation: 'fadeUp 1s ease 0.2s forwards',
          opacity: 0,
        }}>
          Experience unforgettable adventures with tailor-made travel plans.
        </p>

        <p style={{
          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
          color: 'rgba(255,255,255,0.85)',
          marginBottom: 36,
          lineHeight: 1.7,
          maxWidth: 600, margin: '0 auto 36px',
          animation: 'fadeUp 1s ease 0.4s forwards',
          opacity: 0,
        }}>
          From hidden gems to serene escapes — we craft solo adventures that match your pace, passion, and dreams.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{
          display: 'flex', gap: 0, maxWidth: 560,
          margin: '0 auto 32px',
          borderRadius: 50, overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          animation: 'fadeUp 1s ease 0.6s forwards',
          opacity: 0,
        }}>
          <input
            type="text"
            placeholder="🔍  Search destinations... (Paris, Bali, Maldives)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, padding: '16px 24px',
              border: 'none', outline: 'none',
              fontSize: 15, fontFamily: "'Poppins', sans-serif",
              background: 'rgba(255,255,255,0.95)',
            }}
          />
          <button type="submit" style={{
            padding: '16px 28px',
            background: 'linear-gradient(135deg,#f9d342,#ff6b35)',
            border: 'none', cursor: 'pointer',
            fontWeight: 700, fontSize: 15,
            fontFamily: "'Poppins', sans-serif",
            color: '#07406e', whiteSpace: 'nowrap',
          }}>
            Explore →
          </button>
        </form>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeUp 1s ease 0.8s forwards',
          opacity: 0,
        }}>
          <button
            onClick={handleRegister}
            style={{
              background: 'linear-gradient(135deg,#f9d342,#ff6b35)',
              border: 'none', borderRadius: 50,
              padding: '14px 36px', fontSize: 16, fontWeight: 700,
              color: '#07406e', cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              boxShadow: '0 8px 24px rgba(249,211,66,0.4)',
              transition: 'all 0.3s',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'}
            onMouseOut={e => e.currentTarget.style.transform = 'none'}
          >
            🚀 Book Your Trip
          </button>
          <button
          onClick={handleExplore}
            style={{
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.7)',
              borderRadius: 50, padding: '14px 36px',
              fontSize: 16, fontWeight: 600, color: 'white',
              cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
              transition: 'all 0.3s',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            🗺️ Explore Destinations
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        zIndex: 2,
        background: 'rgba(7,64,110,0.85)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(249,211,66,0.3)',
      }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          padding: '20px 24px', gap: 16,
        }}>
          {STATS.map(({ icon, value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#f9d342' }}>{value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute', bottom: 110, right: 40, zIndex: 2,
        animation: 'float 2s ease-in-out infinite',
        fontSize: 24, cursor: 'pointer',
        opacity: 0.7,
      }}
      onClick={handleExplore}
      >↓</div>
    </section>
  );
}
