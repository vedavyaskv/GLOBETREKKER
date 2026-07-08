import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { packages } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function Packages() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const { isLoggedIn } = useApp();

  return (
    <section id="packages" style={{
      padding: '80px 24px',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-card) 100%)',
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div className="section-heading">
          <h2>Choose Your Perfect Package</h2>
          <p>From budget adventures to luxury escapes — find your ideal travel plan</p>
          <div className="underline" />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 28,
        }}>
          {packages.map(pkg => {
            const isHovered = hovered === pkg.id;
            return (
              <div
                key={pkg.id}
                onMouseEnter={() => setHovered(pkg.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: isHovered
                    ? '0 24px 60px rgba(7,64,110,0.25)'
                    : 'var(--shadow)',
                  transform: isHovered ? 'translateY(-8px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  position: 'relative',
                  border: pkg.popular ? '2px solid var(--accent)' : '2px solid transparent',
                }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div style={{
                    position: 'absolute', top: 16, right: 16, zIndex: 3,
                    background: 'linear-gradient(135deg,#f9d342,#ff6b35)',
                    color: '#07406e', padding: '4px 14px',
                    borderRadius: 50, fontSize: 11, fontWeight: 800,
                    letterSpacing: 0.5, boxShadow: '0 4px 12px rgba(249,211,66,0.5)',
                  }}>⭐ MOST POPULAR</div>
                )}

                {/* Image */}
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <img
                    src={pkg.img}
                    alt={pkg.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.4s',
                    }}
                  />
                  {/* Price Badge */}
                  <div style={{
                    position: 'absolute', bottom: 14, left: 14,
                    background: 'var(--primary)',
                    color: 'white', padding: '6px 16px',
                    borderRadius: 50, fontWeight: 800, fontSize: 16,
                    boxShadow: '0 4px 12px rgba(7,64,110,0.4)',
                  }}>
                    ₹{pkg.price.toLocaleString()}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px 22px 24px' }}>
                  {/* Stars */}
                  <div style={{ marginBottom: 8 }}>
                    {'⭐'.repeat(pkg.stars)}
                    <span style={{ fontSize: 12, color: 'var(--text-light)', marginLeft: 6 }}>
                      {pkg.stars}-Star Hotel • {pkg.nights} Nights
                    </span>
                  </div>

                  <h3 style={{
                    color: 'var(--primary)', fontSize: 20, fontWeight: 800,
                    margin: '0 0 14px',
                  }}>{pkg.title}</h3>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 8,
                        fontSize: 13, color: 'var(--text)',
                        padding: '5px 0',
                        borderBottom: idx < pkg.features.length - 1 ? '1px solid var(--border)' : 'none',
                      }}>
                        <span style={{ color: '#22c55e', flexShrink: 0, marginTop: 1 }}>✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
  if (isLoggedIn) {
    navigate('/register', {
      state: {
        package: pkg.title
      }
    });
  } else {
    navigate('/login');
  }
}}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: pkg.popular
                        ? 'linear-gradient(135deg,#f9d342,#ff6b35)'
                        : 'var(--gradient)',
                      border: 'none', borderRadius: 50,
                      color: pkg.popular ? '#07406e' : 'white',
                      fontWeight: 700, fontSize: 15, cursor: 'pointer',
                      fontFamily: "'Poppins', sans-serif",
                      transition: 'all 0.2s',
                    }}
                  >
                    Choose {pkg.title.split(' ')[0]} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
