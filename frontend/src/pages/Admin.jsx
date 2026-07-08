import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [keyError, setKeyError] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const adminHeaders = React.useMemo(
    () => ({ 'x-admin-key': ADMIN_KEY }),
    []
  );

  const authenticate = () => {
    if (keyInput.trim() === ADMIN_KEY) {
      localStorage.setItem("admin-auth","true");
      setAuthenticated(true);
      setKeyError('');
      fetchAll();
    } else {
      setKeyError('Invalid admin key. Please check your credentials.');
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, bookRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/stats`, { headers: adminHeaders }),
        fetch(`${API_BASE_URL}/admin/bookings`, { headers: adminHeaders }),
        fetch(`${API_BASE_URL}/admin/users`, { headers: adminHeaders }),
      ]);
      if (statsRes.ok) { const d = await statsRes.json(); setStats(d); }
      if (bookRes.ok) { const d = await bookRes.json(); setBookings(d.bookings || []); }
      if (usersRes.ok) { const d = await usersRes.json(); setUsers(d.users || []); }
    } catch (e) {
      console.error('Admin fetch error:', e);
    }
    finally {
    setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("admin-auth");

    if(saved === "true"){
        setAuthenticated(true);
        fetchAll();
    }
}, []);

  const updateBookingStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { ...adminHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setBookings(prev =>
          prev.map(b => b._id === id ? { ...b, status } : b)
        );
        fetchAll();
      }
    } catch {}
  };

  const deleteUser = async (id) => {
  if (!window.confirm('Delete this user? This cannot be undone.')) return;

  try {
    const res = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: adminHeaders,
    });

    if (res.ok) {
      setUsers(prev => prev.filter(u => u._id !== id));
      fetchAll();
    }
  } catch (err) {
    console.error(err);
  }
};

  const statusColor = (s) => ({ confirmed: '#16a34a', pending: '#d97706', cancelled: '#dc2626' }[s] || '#666');

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #071a2e 0%, #07406e 100%)',
        fontFamily: "'Poppins', sans-serif", padding: 24,
      }}>
        <div style={{
          background: 'white', borderRadius: 24, padding: '48px 40px',
          width: '100%', maxWidth: 420, textAlign: 'center',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🛡️</div>
          <h1 style={{ color: '#07406e', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Admin Panel</h1>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 28 }}>Enter your admin key to access the dashboard.</p>

          <input
            type="password"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && authenticate()}
            placeholder="Enter admin key..."
            style={{
              width: '100%', padding: '13px 18px', border: '2px solid #e2e8f0',
              borderRadius: 12, fontSize: 15, fontFamily: "'Poppins', sans-serif",
              marginBottom: 12, outline: 'none', boxSizing: 'border-box',
            }}
          />
          {keyError && (
            <div style={{
              background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
              borderRadius: 8, padding: '8px 14px', fontSize: 13, marginBottom: 12,
            }}>{keyError}</div>
          )}
          <button onClick={authenticate} style={{
            width: '100%', padding: '13px', background: 'linear-gradient(135deg,#07406e,#1a7fc1)',
            border: 'none', borderRadius: 50, color: 'white', fontWeight: 700, fontSize: 16,
            cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
          }}>🔐 Access Admin Panel</button>

        </div>
      </div>
    );
  }

  const TABS = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'bookings', icon: '✈️', label: 'Bookings' },
    { id: 'users', icon: '👥', label: 'Users' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0d1b2a', fontFamily: "'Poppins', sans-serif", display: 'flex' }}>

      {/* Sidebar */}
      <div style={{
        width: 240, background: '#071a2e', flexShrink: 0,
        display: 'flex', flexDirection: 'column', padding: '24px 0',
        borderRight: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: 22, color: 'white', fontWeight: 800 }}>
            🌍 Globe<span style={{ color: '#f9d342' }}>Trekker</span>
          </div>
          <div style={{ fontSize: 11, color: '#9db4cc', marginTop: 4 }}>Admin Console</div>
        </div>

        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              width: '100%', padding: '12px 16px', borderRadius: 12,
              background: tab === t.id ? 'rgba(249,211,66,0.15)' : 'none',
              border: tab === t.id ? '1px solid rgba(249,211,66,0.3)' : '1px solid transparent',
              color: tab === t.id ? '#f9d342' : '#9db4cc',
              fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 4, textAlign: 'left', transition: 'all 0.2s',
            }}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '12px' }}>
          <button
            onClick={() => {
              localStorage.removeItem("admin-auth");
              setAuthenticated(false);
              setStats(null);
              setBookings([]);
              setUsers([]);
              setKeyInput('');
            }}
            style={{
              width: '100%',
              padding: '10px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 10,
              color: '#f87171',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            🚪 Logout
          </button>
          <button onClick={fetchAll} disabled={loading} style={{
            width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, marginTop: 8,
            color: '#9db4cc', cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
            fontSize: 13,
          }}>🔄 {loading ? 'Loading...' : 'Refresh Data'}</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Dashboard Tab */}
          {tab === 'dashboard' && (
            <div>
              <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: '0 0 24px' }}>
                📊 Dashboard Overview
              </h1>
              {loading ? (
                <div style={{ textAlign: 'center', padding: 40, color: '#9db4cc' }}>Loading stats...</div>
              ) : stats ? (
                <>
                  {/* Stat Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 16, marginBottom: 32 }}>
                    {[
                      { icon: '👥', label: 'Total Users', value: stats.stats?.users ?? 0, color: '#3ba3e8' },
                      { icon: '✈️', label: 'Total Bookings', value: stats.stats?.bookings ?? 0, color: '#f9d342' },
                      { icon: '📧', label: 'Subscribers', value: stats.stats?.subscribers ?? 0, color: '#4ade80' },
                      { icon: '💬', label: 'Messages', value: stats.stats?.contacts ?? 0, color: '#f87171' },
                      { icon: '⭐', label: 'Reviews', value: stats.stats?.reviews ?? 0, color: '#a78bfa' },
                    ].map(s => (
                      <div key={s.label} style={{
                        background: '#1a2e42', borderRadius: 16, padding: '20px',
                        border: `1px solid ${s.color}30`,
                      }}>
                        <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                        <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: '#9db4cc', marginTop: 4 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Bookings */}
                  <div style={{ background: '#1a2e42', borderRadius: 16, padding: 24, marginBottom: 24 }}>
                    <h3 style={{ color: 'white', margin: '0 0 16px', fontSize: 16 }}>Recent Bookings</h3>
                    {(stats.recentBookings || []).slice(0, 5).map(b => (
                      <div key={b._id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                        flexWrap: 'wrap', gap: 8,
                      }}>
                        <div>
                          <div style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>{b.name}</div>
                          <div style={{ color: '#9db4cc', fontSize: 12 }}>📍 {b.destination} · {b.package}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            display: 'inline-block', padding: '2px 10px', borderRadius: 50, fontSize: 11,
                            background: `${statusColor(b.status)}20`, color: statusColor(b.status),
                            border: `1px solid ${statusColor(b.status)}40`, fontWeight: 600,
                            textTransform: 'capitalize',
                          }}>{b.status || 'confirmed'}</div>
                          <div style={{ color: '#9db4cc', fontSize: 11, marginTop: 2 }}>
                            {b.bookingId}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ color: '#9db4cc', textAlign: 'center', padding: 40 }}>
                  Could not load stats. Check your backend connection and ADMIN_KEY.
                </div>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {tab === 'bookings' && (
            <div>
              <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: '0 0 24px' }}>
                ✈️ All Bookings ({bookings.length})
              </h1>
              {bookings.length === 0 ? (
                <div style={{ color: '#9db4cc', textAlign: 'center', padding: 60 }}>No bookings yet.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {bookings.map(b => (
                    <div key={b._id} style={{
                      background: '#1a2e42', borderRadius: 14, padding: '16px 20px',
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', flexWrap: 'wrap', gap: 12,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div>
                        <div style={{ color: 'white', fontWeight: 700 }}>{b.name}</div>
                        <div style={{ color: '#9db4cc', fontSize: 12, marginTop: 2 }}>
                          {b.email} · {b.phone}
                        </div>
                        <div style={{ color: '#9db4cc', fontSize: 12 }}>
                          📍 {b.destination} · {b.package} · {b.travelers || 1} traveler(s) · {b.date ? new Date(b.date).toLocaleDateString('en-IN') : '—'}
                        </div>
                        <div style={{ color: '#6b8cae', fontSize: 11, marginTop: 2 }}>ID: {b.bookingId}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        {b.totalPrice > 0 && (
                          <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 14 }}>
                            ₹{Number(b.totalPrice).toLocaleString()}
                          </div>
                        )}
                        <select
                          value={b.status || 'confirmed'}
                          onChange={e => updateBookingStatus(b._id, e.target.value)}
                          style={{
                            padding: '6px 12px', borderRadius: 8, border: 'none',
                            background: `${statusColor(b.status)}20`, color: statusColor(b.status),
                            fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 12,
                            cursor: 'pointer',
                          }}
                        >
                          <option value="confirmed">✅ Confirmed</option>
                          <option value="pending">⏳ Pending</option>
                          <option value="cancelled">❌ Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Users Tab */}
          {tab === 'users' && (
            <div>
              <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, margin: '0 0 24px' }}>
                👥 Users ({users.length})
              </h1>
              {users.length === 0 ? (
                <div style={{ color: '#9db4cc', textAlign: 'center', padding: 60 }}>No users found.</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
                  {users.map(u => (
                    <div key={u._id} style={{
                      background: '#1a2e42', borderRadius: 14, padding: '16px 18px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%',
                          background: 'linear-gradient(135deg,#07406e,#1a7fc1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontWeight: 800, fontSize: 16, flexShrink: 0,
                        }}>{u.username?.[0]?.toUpperCase() || u.email?.[0]?.toUpperCase() || '?'}</div>
                        <div>
                          <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{u.username || '—'}</div>
                          <div style={{ color: '#9db4cc', fontSize: 12 }}>{u.email}</div>
                          <div style={{ color: '#6b8cae', fontSize: 11 }}>
                            Joined: {new Date(u.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteUser(u._id)}
                        style={{
                          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                          borderRadius: 8, color: '#f87171', cursor: 'pointer', padding: '6px 10px',
                          fontSize: 12, fontFamily: "'Poppins', sans-serif",
                        }}
                      >🗑️</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
