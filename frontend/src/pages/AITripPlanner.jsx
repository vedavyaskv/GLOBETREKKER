import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";
import { API_BASE_URL } from '../utils/api';

const INTERESTS = ['🏖️ Beaches', '🏔️ Adventure', '🍜 Food', '🏛️ Culture', '🛍️ Shopping', '🌿 Nature', '📸 Photography', '🎭 Nightlife'];

export default function AITripPlanner() {
  const [form, setForm] = useState({ destination: '', budget: '', days: '5', interests: [] });
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleInterest = (interest) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter(i => i !== interest)
        : [...f.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    if (!form.destination || !form.budget || !form.days) {
      setError('Please fill in destination, budget, and duration!');
      return;
    }

    setError('');
    setLoading(true);
    setItinerary('');

    try {
      const response = await fetch(
  `${API_BASE_URL}/api/trip-planner`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            destination: form.destination,
            budget: form.budget,
            days: form.days,
            interests: form.interests
          })
        }
      );

      let data;

        try {
          data = await response.json();
        } catch {
          throw new Error("Invalid server response");
        }

        console.log("TRIP PLANNER RESPONSE:", data);

        setItinerary(
          data?.itinerary ||
          data?.reply ||
          "Failed to generate itinerary."
        );
    } catch (error) {
      console.error(error);
      setError('Failed to connect to AI. Please try again later.');
    }
    finally {
    setLoading(false);
  }
  };

  return (
    <div style={{
      minHeight: '100vh', paddingTop: 100, paddingBottom: 60,
      background: 'var(--bg)', fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', fontSize: 48, marginBottom: 16,
            animation: 'float 3s ease-in-out infinite',
          }}>🗺️</div>
          <h1 style={{ color: 'var(--primary)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, margin: 0 }}>
            AI Trip Planner
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: 16, marginTop: 8 }}>
            Tell us your dream trip details — our AI will craft the perfect itinerary!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32, alignItems: 'start' }}>
          {/* Form */}
          <div style={{
            background: 'var(--bg-card)', borderRadius: 20,
            padding: 28, boxShadow: 'var(--shadow)',
          }}>
            <h2 style={{ color: 'var(--primary)', margin: '0 0 20px', fontSize: 18 }}>Trip Details</h2>

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-light)', marginBottom: 6 }}>
              Destination *
            </label>
            <input
              className="input-field"
              placeholder="e.g. Bali, Paris, Goa"
              value={form.destination}
              onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
              style={{ marginBottom: 16, display: 'block' }}
            />

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-light)', marginBottom: 6 }}>
              Total Budget (₹) *
            </label>
            <input
              className="input-field"
              type="number"
              placeholder="e.g. 50000"
              value={form.budget}
              onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
              style={{ marginBottom: 16, display: 'block' }}
            />

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-light)', marginBottom: 6 }}>
              Duration (Days) *
            </label>
            <select
              className="input-field"
              value={form.days}
              onChange={e => setForm(f => ({ ...f, days: e.target.value }))}
              style={{ marginBottom: 16, display: 'block', cursor: 'pointer' }}
            >
              {[3, 4, 5, 7, 10, 14].map(d => (
                <option key={d} value={d}>{d} Days</option>
              ))}
            </select>

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-light)', marginBottom: 10 }}>
              Interests
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {INTERESTS.map(interest => {
                const active = form.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    style={{
                      padding: '6px 12px', borderRadius: 50, fontSize: 12,
                      border: `2px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                      background: active ? 'var(--primary)' : 'var(--bg)',
                      color: active ? 'white' : 'var(--text)',
                      cursor: 'pointer', fontFamily: "'Poppins', sans-serif", fontWeight: 600,
                      transition: 'all 0.2s',
                    }}
                  >{interest}</button>
                );
              })}
            </div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', color: '#dc2626',
                padding: '10px 14px', borderRadius: 8, fontSize: 13,
                marginBottom: 16, border: '1px solid rgba(239,68,68,0.2)',
              }}>{error}</div>
            )}

            <button
              onClick={generateItinerary}
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? 'var(--border)' : 'var(--gradient)',
                border: 'none', borderRadius: 50, color: 'white',
                fontWeight: 700, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Poppins', sans-serif", transition: 'all 0.3s',
              }}
            >
              {loading ? '🔄 Generating...' : '✨ Generate My Itinerary'}
            </button>
          </div>

          {/* Output */}
          <div style={{
            background: 'var(--bg-card)', borderRadius: 20,
            padding: 28, boxShadow: 'var(--shadow)',
            minHeight: 400,
          }}>
            {!itinerary && !loading && (
              <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--text-light)' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>✈️</div>
                <p style={{ fontSize: 16 }}>Your personalized itinerary will appear here!</p>
                <p style={{ fontSize: 13 }}>Fill in your trip details and click Generate.</p>
              </div>
            )}

            {loading && (
              <div style={{ textAlign: 'center', paddingTop: 80 }}>
                <div className="spinner" />
                <p style={{ color: 'var(--primary)', fontWeight: 600, marginTop: 16 }}>
                  🤖 AI is crafting your perfect itinerary...
                </p>
                <p style={{ color: 'var(--text-light)', fontSize: 13 }}>This may take 10-15 seconds</p>
              </div>
            )}

            {itinerary && (
              <div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 20,
                }}>
                  <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: 18 }}>
                    🗓️ Your {form.days}-Day {form.destination} Plan
                  </h2>
                  <button
                    onClick={() => { setItinerary(''); setForm({ destination: '', budget: '', days: '5', interests: [] }); }}
                    style={{
                      background: 'var(--bg)', border: '1px solid var(--border)',
                      borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
                      fontSize: 12, color: 'var(--text-light)',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >Reset</button>
                </div>
                <div style={{
                  background: 'var(--bg)',
                  borderRadius: 12,
                  padding: 20,
                  maxHeight: 500,
                  overflowY: 'auto',
                }}>
                  <ReactMarkdown>
                    {itinerary}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
