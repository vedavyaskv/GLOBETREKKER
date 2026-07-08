import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { theme, toggleTheme, user, logout, isLoggedIn } = useApp();
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    } else {
      const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
    }
  };

  const navLinks = [
    { label: 'Home', action: () => navigate('/') },
    { label: 'Destinations', action: () => scrollTo('destinations') },
    { label: 'Packages', action: () => scrollTo('packages') },
    { label: 'About', action: () => navigate('/about') },
    { label: 'Contact', action: () => navigate('/contact') },
  ];

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    background: scrolled
      ? 'var(--bg-nav)'
      : 'linear-gradient(180deg, rgba(7,64,110,0.9) 0%, transparent 100%)',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.2)' : 'none',
    fontFamily: "'Poppins', sans-serif",
  };
  if (isAdminPage) return null;
  return (
    <header style={headerStyle}>
      <div style={{
        maxWidth: 1300,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
      }}>

        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg,#1a7fc1,#f9d342)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 900,
          }}>🌍</div>
          <span style={{
            color: 'white', fontWeight: 800, fontSize: 20,
            letterSpacing: 0.5, textShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}>
            Globe<span style={{ color: '#f9d342' }}>Trekker</span>
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              style={{
                background: 'none', border: 'none', color: 'white',
                fontFamily: "'Poppins', sans-serif", fontWeight: 500,
                fontSize: 15, cursor: 'pointer', padding: '8px 14px',
                borderRadius: 8, transition: 'all 0.2s',
              }}
              onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
              onMouseOut={e => e.target.style.background = 'none'}
            >{label}</button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            style={{
              background: 'rgba(255,255,255,0.15)', border: 'none',
              borderRadius: 8, width: 38, height: 38, cursor: 'pointer',
              fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'linear-gradient(135deg,#f9d342,#ff6b35)',
                  borderRadius: 20, padding: '6px 14px',
                  color: '#07406e', fontWeight: 700, fontSize: 13,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}>
                  👤 {user?.username || 'Account'}
                </div>
              </Link>
              <button
                onClick={() => {
                  logout();
                  localStorage.removeItem('gt_token');
                  navigate('/');
                }}
                style={{
                  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 8, color: 'white', padding: '6px 12px',
                  fontSize: 13, cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                }}
              >Logout</button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg,#f9d342,#ff6b35)',
                border: 'none', borderRadius: 20, padding: '8px 20px',
                color: '#07406e', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                boxShadow: '0 4px 12px rgba(249,211,66,0.3)',
              }}>Login / Sign Up</button>
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{
              display: 'none', background: 'rgba(255,255,255,0.15)',
              border: 'none', borderRadius: 8, width: 38, height: 38,
              cursor: 'pointer', fontSize: 18, color: 'white',
            }}
            className="mobile-menu-btn"
          >☰</button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{
          background: 'var(--bg-nav)', backdropFilter: 'blur(20px)',
          padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          {navLinks.map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              style={{
                display: 'block', width: '100%', background: 'none', border: 'none',
                color: 'white', fontFamily: "'Poppins', sans-serif", fontWeight: 500,
                fontSize: 16, cursor: 'pointer', padding: '12px 0', textAlign: 'left',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >{label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
