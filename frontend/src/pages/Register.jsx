import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';
import { useApp } from '../context/AppContext';
import { destinations, packages } from '../utils/api';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [selectedPkg, setSelectedPkg] = useState(
    location.state?.package || ''
  );

  const [selectedDest, setSelectedDest] = useState(
    location.state?.destination || ''
  );

  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 7);
  const minDateString = minDate.toISOString().split('T')[0];

  const getTotalPrice = () => {
  const pkg = packages.find(
    p => selectedPkg.includes(p.title)
  );

  const dest = destinations.find(
    d => d.city === selectedDest
  );

  const packagePrice = pkg ? pkg.price : 0;
  const destinationPrice = dest ? dest.price : 0;

  return (packagePrice + destinationPrice) * travelers;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    delete data.terms;
    data.travelers = travelers;
    data.totalPrice = getTotalPrice();
    if (user) { data.email = data.email || user.email; }

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setBookingId(result.bookingId);
        setSuccess(true);
        showToast('🎉 Booking confirmed! Check your email.', 'success');
      } else {
        showToast(result.error || 'Booking failed. Please try again.', 'error');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)', fontFamily: "'Poppins', sans-serif", padding: 24,
      }}>
        <div style={{
          background: 'var(--bg-card)', borderRadius: 24, padding: '48px 40px',
          textAlign: 'center', maxWidth: 500, boxShadow: 'var(--shadow-hover)',
          animation: 'fadeUp 0.5s ease',
        }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
          <h1 style={{ color: 'var(--primary)', fontSize: 28, fontWeight: 800, margin: '0 0 12px' }}>
            Booking Confirmed!
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: 15, marginBottom: 24, lineHeight: 1.7 }}>
            Your adventure is booked! A confirmation email has been sent with your itinerary details.
          </p>
          <div style={{
            background: 'var(--bg)', borderRadius: 12, padding: '16px 24px',
            marginBottom: 28, display: 'inline-block',
          }}>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 4 }}>Booking ID</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)', letterSpacing: 1 }}>{bookingId}</div>
          </div>
          {getTotalPrice() > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, color: 'var(--text-light)' }}>Total Amount</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#16a34a' }}>
                ₹{getTotalPrice().toLocaleString()}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => {
                navigate('/');
                window.scrollTo(0,0);
              }} style={{
              padding: '12px 28px', background: 'var(--gradient)',
              border: 'none', borderRadius: 50, color: 'white',
              fontWeight: 700, fontSize: 15, cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
            }}>🏠 Go Home</button>
            <button onClick={() => { setSuccess(false); setBookingId(''); }}
              style={{
                padding: '12px 28px', background: 'var(--bg)',
                border: '2px solid var(--border)', borderRadius: 50,
                color: 'var(--text)', fontWeight: 700, fontSize: 15,
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
              }}>+ New Booking</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', paddingTop: 90, paddingBottom: 60,
      background: 'var(--bg)', fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h1 style={{ color: 'var(--primary)', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, margin: 0 }}>
            Register for Your Dream Trip
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: 15, marginTop: 8 }}>
            Fill in your details and we'll get your adventure started!
          </p>
        </div>

        {!isLoggedIn && (
          <div style={{
            background: 'rgba(249,211,66,0.1)', border: '1px solid rgba(249,211,66,0.3)',
            borderRadius: 12, padding: '12px 18px', marginBottom: 24,
            fontSize: 14, color: 'var(--text)', textAlign: 'center',
          }}>
            💡{' '}
<span
  onClick={() => navigate('/login')}
  style={{
    color: 'var(--primary)',
    fontWeight: 700,
    cursor: 'pointer'
  }}
>
  Login
</span>
{' '}to auto-fill your details and track your booking!
          </div>
        )}

        <div style={{ background: 'var(--bg-card)', borderRadius: 24, padding: '36px', boxShadow: 'var(--shadow)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Full Name */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Full Name *</label>
              <input
                name="name"
                className="input-field"
                placeholder="Your full name"
                defaultValue={user?.username || ""}
                required
              />
            </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
                  gap: 16
                }}
              >
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Email Address *</label>
                <input
                  name="email" type="email" className="input-field"
                  placeholder="your@email.com"
                  defaultValue={user?.email || ''}
                  required style={{ display: 'block' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Phone Number *</label>
                <input
                  name="phone"
                  type="tel"
                  className="input-field"
                  placeholder="+91 XXXXX XXXXX"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 10 }}>Gender *</label>
              <div style={{ display: 'flex', gap: 20 }}>
                {['Male', 'Female', 'Other'].map(g => (
                  <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: 'var(--text)' }}>
                    <input type="radio" name="gender" value={g} required style={{ accentColor: 'var(--primary)' }} />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
                gap: 16
              }}
            >
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Destination *</label>
                <select
                  name="destination" className="input-field" required
                  style={{ display: 'block', cursor: 'pointer' }}
                  value={selectedDest}
                  onChange={e => setSelectedDest(e.target.value)}
                >
                  <option value="">Select Destination</option>
                  {destinations.map(d => <option key={d.id}>{d.city}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Package *</label>
                <select
                  name="package" className="input-field" required
                  style={{ display: 'block', cursor: 'pointer' }}
                  value={selectedPkg}
                  onChange={e => setSelectedPkg(e.target.value)}
                >
                  <option value="">Select Package</option>
                  {packages.map(p => <option key={p.id}>{p.title} — ₹{p.price.toLocaleString()}/person</option>)}
                </select>
              </div>
            </div>

            {/* Travelers */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 8 }}>
                Number of Travelers
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button type="button" onClick={() => setTravelers(t => Math.max(1, t - 1))}
                  style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>−</button>
                <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)', minWidth: 30, textAlign: 'center' }}>{travelers}</span>
                <button type="button" onClick={() => setTravelers(t => Math.min(20, t + 1))}
                  style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>+</button>
                {getTotalPrice() > 0 && (
  <span
    style={{
      marginLeft: 12,
      fontSize: 16,
      fontWeight: 700,
      color: '#16a34a'
    }}
  >
    Total: ₹{getTotalPrice().toLocaleString()}
  </span>
)}
              </div>
            </div>

            {/* Date */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Travel Date *</label>
              <input type="date" name="date" className="input-field" required min={minDateString} style={{ display: 'block' }} />
            </div>

            {/* Notes */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', display: 'block', marginBottom: 6 }}>Special Requests</label>
              <textarea
                name="notes" className="input-field" rows={3}
                placeholder="Dietary requirements, accessibility needs, special occasions..."
                style={{ display: 'block', resize: 'vertical' }}
              />
            </div>

            {/* Terms */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text)', cursor: 'pointer' }}>
              <input type="checkbox" name="terms" required style={{ marginTop: 2, accentColor: 'var(--primary)', width: 16, height: 16, flexShrink: 0 }} />
              I agree to the
{' '}
<span
  onClick={() => navigate('/terms')}
  style={{
    color: 'var(--primary)',
    fontWeight: 600,
    cursor: 'pointer'
  }}
>
  Terms & Conditions
</span>
{' '}and{' '}
<span
  onClick={() => navigate('/privacy')}
  style={{
    color: 'var(--primary)',
    fontWeight: 600,
    cursor: 'pointer'
  }}
>
  Privacy Policy
</span>.
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '16px',
                background: loading ? 'var(--border)' : 'var(--gradient)',
                border: 'none', borderRadius: 50, color: 'white',
                fontWeight: 700, fontSize: 17, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Poppins', sans-serif",
                boxShadow: '0 6px 20px rgba(7,64,110,0.3)',
              }}
            >
              {loading ? '⏳ Booking...' : '🚀 Confirm My Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
