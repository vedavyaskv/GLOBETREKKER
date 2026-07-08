import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinations, packages, API_BASE_URL } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, isLoggedIn } = useApp();
  const [weather, setWeather] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  const dest = destinations.find(d => d.id === parseInt(id));

  useEffect(() => {
  if (!dest) return;

  let mounted = true;

  fetch(`${API_BASE_URL}/weather/${dest.city}`)
    .then(r => r.json())
    .then(d => {
      if (mounted) setWeather(d);
    })
    .catch(() => {});

  fetch(`${API_BASE_URL}/reviews/${dest.city}`)
    .then(r => r.json())
    .then(d => {
      if (mounted) setReviews(d.reviews || []);
    })
    .catch(() => {});

  return () => {
    mounted = false;
  };
}, [dest]);

  if (!dest) return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', fontFamily: "'Poppins', sans-serif", textAlign: 'center',
    }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🗺️</div>
      <h2 style={{ color: 'var(--primary)' }}>Destination not found</h2>
      <button onClick={() => navigate('/')} style={{
        marginTop: 20, padding: '12px 28px', background: 'var(--gradient)',
        border: 'none', borderRadius: 50, color: 'white', cursor: 'pointer',
        fontFamily: "'Poppins', sans-serif", fontWeight: 700,
      }}>← Back to Home</button>
    </div>
  );

  const isWishlisted = Array.isArray(wishlist) && wishlist.includes(dest.city);
  const TABS = ['overview', 'highlights', 'packages', 'reviews'];

  const getWeatherIcon = (desc = '') => {
    desc = desc.toLowerCase();
    if (desc.includes('sun') || desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '⛅';
    if (desc.includes('rain')) return '🌧️';
    return '🌤️';
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: 'var(--bg)', minHeight: '100vh' }}>

      <div style={{
        height: '60vh', minHeight: 400, position: 'relative',
        backgroundImage: `url(${dest.img})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, rgba(7,64,110,0.95) 0%, rgba(7,64,110,0.3) 60%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 32px 36px', maxWidth: 1200, margin: '0 auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ color: 'white' }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{dest.flag}</div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, margin: '0 0 8px', fontFamily: "'Playfair Display', serif" }}>
                {dest.city}
              </h1>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 14, opacity: 0.9 }}>
                <span>📍 {dest.country}</span>
                <span>⭐ {dest.rating} Rating</span>
                <span>🕒 {dest.duration}</span>
                <span className="badge" style={{ background: 'rgba(249,211,66,0.2)', color: '#f9d342', border: '1px solid rgba(249,211,66,0.4)', padding: '2px 12px', borderRadius: 50, fontSize: 11, fontWeight: 700 }}>
                  {dest.category}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => toggleWishlist(dest.city)}
                style={{
                  background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)',
                  borderRadius: 50, padding: '10px 20px', color: 'white',
                  fontWeight: 700, cursor: 'pointer', fontSize: 15,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >{isWishlisted ? '❤️ Saved' : '🤍 Save'}</button>
              <button
                onClick={() => navigate('/register', {
                            state: {
                              destination: dest.city,
                              package: dest.category,
                              price: dest.price
                            }
                          })}
                style={{
                  background: 'linear-gradient(135deg,#f9d342,#ff6b35)', border: 'none',
                  borderRadius: 50, padding: '10px 24px', color: '#07406e',
                  fontWeight: 800, cursor: 'pointer', fontSize: 15,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >🚀 Book Now — ₹{dest.price.toLocaleString()}</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'var(--bg-card)', borderBottom: '2px solid var(--border)',
        position: 'sticky', top: 70, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 4 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '16px 22px', background: 'none', border: 'none',
              borderBottom: `3px solid ${activeTab === tab ? 'var(--primary)' : 'transparent'}`,
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-light)',
              fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14,
              cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s',
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>

          <div>
            {activeTab === 'overview' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h2 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>
                  About {dest.city}
                </h2>
                <p style={{ color: 'var(--text-light)', lineHeight: 1.9, fontSize: 15, marginBottom: 24 }}>
                  {dest.description} Travelers from all over the world flock to {dest.city} for its unique blend of culture, natural beauty, and unforgettable experiences. Whether you're seeking adventure, relaxation, or cultural immersion, {dest.city} has something extraordinary to offer every type of traveler.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
                  {[
                    { icon: '🌡️', label: 'Best Season', value: 'Oct – Mar' },
                    { icon: '💰', label: 'Starting From', value: `₹${dest.price.toLocaleString()}` },
                    { icon: '⏱️', label: 'Duration', value: dest.duration },
                  ].map(stat => (
                    <div key={stat.label} style={{
                      background: 'var(--bg-card)', borderRadius: 14, padding: '16px',
                      textAlign: 'center', boxShadow: 'var(--shadow)',
                    }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>{stat.icon}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{stat.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'highlights' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h2 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>
                  Top Highlights
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 16 }}>
                  {dest.highlights.map((h, i) => (
                    <div key={h} style={{
                      background: 'var(--bg-card)', borderRadius: 16, padding: '20px',
                      boxShadow: 'var(--shadow)', textAlign: 'center',
                      border: '2px solid var(--border)', transition: 'all 0.2s',
                    }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 10 }}>
                        {['🏛️','🌊','🎭','🍜','🏔️','🌿','🛍️','📸'][i % 8]}
                      </div>
                      <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{h}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h2 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>
                  Available Packages for {dest.city}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {packages.map(pkg => (
                    <div key={pkg.id} style={{
                      background: 'var(--bg-card)', borderRadius: 16, padding: '20px 24px',
                      boxShadow: 'var(--shadow)', display: 'flex',
                      justifyContent: 'space-between', alignItems: 'center',
                      border: pkg.popular ? '2px solid var(--accent)' : '2px solid var(--border)',
                      flexWrap: 'wrap', gap: 12,
                    }}>
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 16 }}>
                          {'⭐'.repeat(pkg.stars)} {pkg.title}
                        </div>
                        <div style={{ color: 'var(--text-light)', fontSize: 13, marginTop: 4 }}>
                          {pkg.nights} nights · {pkg.features[0]} · {pkg.features[2]}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--primary)' }}>₹{pkg.price.toLocaleString()}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-light)' }}>per person</div>
                        </div>
                        <button onClick={() => navigate('/register', {
  state: {
    destination: dest.city,
    package: dest.category,
    price: dest.price
  }
})} style={{
                          padding: '10px 20px', background: pkg.popular ? 'linear-gradient(135deg,#f9d342,#ff6b35)' : 'var(--gradient)',
                          border: 'none', borderRadius: 50, color: pkg.popular ? '#07406e' : 'white',
                          fontWeight: 700, cursor: 'pointer', fontSize: 13,
                          fontFamily: "'Poppins', sans-serif",
                        }}>Book →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h2 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>
                  Traveler Reviews
                </h2>
                {reviews.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>⭐</div>
                    <p>No reviews yet. Be the first to share your experience!</p>
                    {isLoggedIn && (
                      <button onClick={() => navigate('/#reviews')} style={{
                        marginTop: 16, padding: '10px 24px', background: 'var(--gradient)',
                        border: 'none', borderRadius: 50, color: 'white', cursor: 'pointer',
                        fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                      }}>Write a Review</button>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {reviews.map((r, i) => (
                      <div key={i} style={{
                        background: 'var(--bg-card)', borderRadius: 16, padding: '18px 20px',
                        boxShadow: 'var(--shadow)', border: '1px solid var(--border)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 36, height: 36, borderRadius: '50%',
                              background: 'var(--gradient)', display: 'flex',
                              alignItems: 'center', justifyContent: 'center',
                              color: 'white', fontWeight: 800,
                            }}>{r.username?.[0]?.toUpperCase()}</div>
                            <strong style={{ color: 'var(--text)' }}>{r.username}</strong>
                          </div>
                          <span style={{ color: '#f9d342' }}>{'★'.repeat(r.rating)}</span>
                        </div>
                        <p style={{ color: 'var(--text-light)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{
              background: 'var(--bg-card)', borderRadius: 20, padding: 24,
              boxShadow: 'var(--shadow)', border: '2px solid var(--border)',
            }}>
              <div style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 4 }}>Starting from</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--primary)', marginBottom: 4 }}>
                ₹{dest.price.toLocaleString()}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 20 }}>per person · {dest.duration}</div>
              <button onClick={() => navigate('/register', {
  state: {
    destination: dest.city,
    package: dest.category,
    price: dest.price
  }
})} style={{
                width: '100%', padding: '14px', background: 'var(--gradient)',
                border: 'none', borderRadius: 50, color: 'white', fontWeight: 800,
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif", fontSize: 15,
                marginBottom: 10,
              }}>🚀 Book This Trip</button>
              <button onClick={() => navigate('/trip-planner')} style={{
                width: '100%', padding: '12px', background: 'var(--bg)',
                border: '2px solid var(--border)', borderRadius: 50, color: 'var(--primary)',
                fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", fontSize: 14,
              }}>🗺️ Plan with AI</button>
            </div>

            {weather && (
              <div style={{
                background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
                borderRadius: 20, padding: 20, color: 'white',
              }}>
                <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>Current Weather in {dest.city}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 40 }}>{getWeatherIcon(weather.description)}</span>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 800 }}>{weather.temp}°C</div>
                    <div style={{ fontSize: 13, opacity: 0.85, textTransform: 'capitalize' }}>{weather.description}</div>
                  </div>
                </div>
              </div>
            )}

            <div style={{
              background: 'var(--bg-card)', borderRadius: 20, padding: 20,
              boxShadow: 'var(--shadow)',
            }}>
              <h4 style={{ color: 'var(--primary)', margin: '0 0 14px', fontSize: 15 }}>Quick Info</h4>
              {[
                { label: 'Category', value: dest.category },
                { label: 'Rating', value: `⭐ ${dest.rating}/5` },
                { label: 'Duration', value: dest.duration },
                { label: 'Country', value: `${dest.flag} ${dest.country}` },
              ].map(info => (
                <div key={info.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13,
                }}>
                  <span style={{ color: 'var(--text-light)' }}>{info.label}</span>
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>{info.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
