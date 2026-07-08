import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { API_BASE_URL, authHeaders } from '../utils/api';
import { destinations } from '../utils/api';

const TABS = ['Overview', 'Bookings', 'Wishlist', 'Profile'];

export default function Dashboard() {
  const { user, isLoggedIn, logout, wishlist, toggleWishlist } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Overview');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (!isLoggedIn) {
          navigate('/login');
          return;
      }

      fetchProfile();
  }, [isLoggedIn, navigate, fetchProfile]);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch {}
    setLoading(false);
  });

  const wishlistDests = destinations.filter(d => wishlist.includes(d.city));

  const statusColor = (status) => ({
    confirmed: '#16a34a', pending: '#d97706', cancelled: '#dc2626'
  }[status] || '#666');

  if (!isLoggedIn) return null;

  return (
    <div style={{
      minHeight: '100vh', paddingTop: 90, paddingBottom: 60,
      background: 'var(--bg)', fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
          borderRadius: 24, padding: '32px 36px', marginBottom: 32,
          color: 'white', display: 'flex', alignItems: 'center', gap: 24,
          flexWrap: 'wrap',
          boxShadow: '0 16px 48px rgba(7,64,110,0.3)',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(249,211,66,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, fontWeight: 800,
            border: '3px solid rgba(249,211,66,0.5)',
          }}>
            {user?.username?.[0]?.toUpperCase() || '?'}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>
              Welcome back, {user?.username || 'Traveler'}! 👋
            </h1>
            <p style={{ margin: '6px 0 0', opacity: 0.8, fontSize: 14 }}>{user?.email}</p>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Bookings', value: bookings.length },
              { label: 'Wishlist', value: wishlist.length },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#f9d342' }}>{stat.value}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '10px 22px', borderRadius: 50,
                border: `2px solid ${tab === t ? 'var(--primary)' : 'var(--border)'}`,
                background: tab === t ? 'var(--primary)' : 'var(--bg-card)',
                color: tab === t ? 'white' : 'var(--text)',
                fontFamily: "'Poppins', sans-serif", fontWeight: 600,
                fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
              }}
            >{t}</button>
          ))}
        </div>

        {tab === 'Overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: '✈️', title: 'Total Trips', value: bookings.length, color: '#07406e', action: () => setTab('Bookings') },
              { icon: '❤️', title: 'Saved Places', value: wishlist.length, color: '#dc2626', action: () => setTab('Wishlist') },
              {
                icon: '🌟',
                title: 'Member Since',
                value: user?.createdAt
                  ? new Date(user.createdAt).getFullYear()
                  : '—',
                color: '#d97706',
                action: null
              },
              { icon: '🗺️', title: 'Plan a Trip', value: 'AI Planner', color: '#16a34a', action: () => navigate('/trip-planner') },
            ].map(stat => (
              <div
                key={stat.title}
                onClick={stat.action}
                style={{
                  background: 'var(--bg-card)', borderRadius: 20, padding: '24px',
                  boxShadow: 'var(--shadow)', cursor: stat.action ? 'pointer' : 'default',
                  transition: 'all 0.2s', border: '2px solid var(--border)',
                }}
                onMouseOver={e => stat.action && (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseOut={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{stat.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 14, color: 'var(--text-light)', marginTop: 4 }}>{stat.title}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'Bookings' && (
          <div>
            {loading ? (
              <div className="spinner" />
            ) : bookings.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '60px 24px',
                background: 'var(--bg-card)', borderRadius: 20,
              }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>✈️</div>
                <h3 style={{ color: 'var(--primary)', margin: 0 }}>No bookings yet!</h3>
                <p style={{ color: 'var(--text-light)', marginTop: 8 }}>Ready to start your journey?</p>
                <button
                  onClick={() => navigate('/')}
                  style={{
                    marginTop: 16, padding: '12px 28px',
                    background: 'var(--gradient)', color: 'white',
                    border: 'none', borderRadius: 50, fontWeight: 700,
                    cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                  }}
                >Book a Trip →</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {bookings.map(b => (
                  <div key={b._id} style={{
                    background: 'var(--bg-card)', borderRadius: 16, padding: '20px 24px',
                    boxShadow: 'var(--shadow)', border: '1px solid var(--border)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap', gap: 12,
                  }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)' }}>
                        📍 {b.destination}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 4 }}>
                        {b.package} · {b.travelers || 1} traveler(s) · {new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 2 }}>
                        ID: {b.bookingId}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        display: 'inline-block', padding: '4px 14px', borderRadius: 50,
                        background: `${statusColor(b.status)}20`,
                        color: statusColor(b.status), fontWeight: 700, fontSize: 13,
                        border: `1px solid ${statusColor(b.status)}40`,
                        textTransform: 'capitalize',
                      }}>{b.status || 'confirmed'}</div>
                      {b.totalPrice > 0 && (
                        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginTop: 6 }}>
                          ₹{Number(b.totalPrice).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'Wishlist' && (
          <div>
            {wishlistDests.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '60px 24px',
                background: 'var(--bg-card)', borderRadius: 20,
              }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🤍</div>
                <h3 style={{ color: 'var(--primary)', margin: 0 }}>Your wishlist is empty</h3>
                <p style={{ color: 'var(--text-light)', marginTop: 8 }}>Browse destinations and heart the ones you love!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {wishlistDests.map(dest => (
                  <div key={dest.id} style={{
                    background: 'var(--bg-card)', borderRadius: 16, overflow: 'hidden',
                    boxShadow: 'var(--shadow)', border: '1px solid var(--border)',
                  }}>
                    <img src={dest.img} alt={dest.city} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text)' }}>{dest.flag} {dest.city}, {dest.country}</div>
                      <div style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, marginTop: 4 }}>
                        ₹{dest.price.toLocaleString()} · {dest.duration}
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <button
                          onClick={() => navigate('/')}
                          style={{
                            flex: 1, padding: '8px', background: 'var(--gradient)',
                            border: 'none', borderRadius: 50, color: 'white',
                            fontWeight: 600, fontSize: 12, cursor: 'pointer',
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >Book Now</button>
                        <button
                          onClick={() => toggleWishlist(dest.city)}
                          style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: 'rgba(239,68,68,0.1)', border: 'none',
                            cursor: 'pointer', fontSize: 16,
                          }}
                        >❤️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'Profile' && (
          <div style={{ background: 'var(--bg-card)', borderRadius: 20, padding: 32, boxShadow: 'var(--shadow)', maxWidth: 500 }}>
            <h3 style={{ color: 'var(--primary)', margin: '0 0 24px', fontSize: 18 }}>Account Details</h3>
            {[
              { label: 'Username', value: user?.username },
              { label: 'Email', value: user?.email },
              {
                label: 'Member Since',
                value: user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-IN')
                  : '—'
              },
            ].map(item => (
              <div key={item.label} style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 12, color: 'var(--text-light)', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 15, color: 'var(--text)', marginTop: 4, fontWeight: 500 }}>{item.value || '—'}</div>
              </div>
            ))}
            <button
              onClick={() => {
                logout();
                navigate('/');
            }}
              style={{
                marginTop: 24, width: '100%', padding: '12px',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 50, color: '#dc2626', fontWeight: 700,
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif", fontSize: 15,
              }}
            >🚪 Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
