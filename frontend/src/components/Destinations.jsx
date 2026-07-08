import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { destinations } from '../utils/api';

const CATEGORIES = ['All', 'Beach', 'Adventure', 'Culture', 'Luxury', 'City'];

export default function Destinations() {
  const { wishlist, toggleWishlist, isLoggedIn } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter(d => d.category === activeCategory);

  return (
    <section id="destinations" style={{
      padding: '80px 24px',
      background: 'var(--bg)',
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div className="section-heading">
          <h2>Explore Our Top Destinations</h2>
          <p>Discover breathtaking places curated for every kind of traveler</p>
          <div className="underline" />
        </div>

        <div style={{
          display: 'flex', gap: 10, justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: 48,
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px', borderRadius: 50,
                border: `2px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border)'}`,
                background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
                color: activeCategory === cat ? 'white' : 'var(--text)',
                fontFamily: "'Poppins', sans-serif", fontWeight: 600,
                fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
              }}
            >{cat}</button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {filtered.map(dest => {
            const isWishlisted = wishlist.includes(dest.city);
            const isHovered = hoveredId === dest.id;

            return (
              <div
                key={dest.id}
                className="card"
                onMouseEnter={() => setHoveredId(dest.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  borderRadius: 20, overflow: 'hidden',
                  cursor: 'pointer', position: 'relative',
                  height: 380,
                }}
              >
                <img
                  src={dest.img}
                  alt={dest.city}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', transition: 'transform 0.4s ease',
                    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                  }}
                />

                <div style={{
                  position: 'absolute', inset: 0,
                  background: isHovered
                    ? 'linear-gradient(0deg, rgba(7,64,110,0.95) 0%, rgba(7,64,110,0.4) 100%)'
                    : 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 55%)',
                  transition: 'all 0.4s',
                }} />

                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(dest.city); }}
                  style={{
                    position: 'absolute', top: 14, right: 14,
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none', borderRadius: '50%',
                    width: 38, height: 38, cursor: 'pointer',
                    fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s', zIndex: 2,
                  }}
                >
                  {isWishlisted ? '❤️' : '🤍'}
                </button>

                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  background: 'var(--primary)',
                  color: 'white', padding: '4px 12px',
                  borderRadius: 50, fontSize: 11, fontWeight: 700,
                  letterSpacing: 0.5, zIndex: 2,
                }}>
                  {dest.category}
                </div>

                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: 20, zIndex: 2, color: 'white',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 24, marginBottom: 2 }}>{dest.flag}</div>
                      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{dest.city}</h3>
                      <p style={{ margin: '2px 0 8px', fontSize: 13, opacity: 0.85 }}>{dest.country}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#f9d342' }}>
                        ⭐ {dest.rating}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#f9d342', marginTop: 4 }}>
                        ₹{dest.price.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 11, opacity: 0.8 }}>{dest.duration}</div>
                    </div>
                  </div>

                  {isHovered && (
                    <div style={{ animation: 'fadeUp 0.3s ease' }}>
                      <p style={{ fontSize: 13, opacity: 0.9, margin: '8px 0', lineHeight: 1.5 }}>
                        {dest.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                        {dest.highlights.slice(0, 3).map(h => (
                          <span key={h} style={{
                            background: 'rgba(249,211,66,0.2)',
                            border: '1px solid rgba(249,211,66,0.4)',
                            color: '#f9d342', padding: '2px 8px',
                            borderRadius: 20, fontSize: 11, fontWeight: 600,
                          }}>• {h}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
  onClick={() => {
    if (isLoggedIn) {
      navigate('/register', {
        state: {
          destination: dest.city
        }
      });
    } else {
      navigate('/login');
    }
  }}
  style={{
                            flex: 1, background: 'linear-gradient(135deg,#f9d342,#ff6b35)',
                            border: 'none', borderRadius: 50, padding: '10px',
                            fontWeight: 700, fontSize: 13, cursor: 'pointer',
                            fontFamily: "'Poppins', sans-serif", color: '#07406e',
                          }}
                        >Book Now →</button>
                        <button
                          onClick={() => navigate(`/destination/${dest.id}`)}
                          style={{
                            flex: 1, background: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: 50, padding: '10px',
                            fontWeight: 600, fontSize: 13, cursor: 'pointer',
                            color: 'white', fontFamily: "'Poppins', sans-serif",
                          }}
                        >Details</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
