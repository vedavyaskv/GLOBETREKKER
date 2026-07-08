import React, { useState } from 'react';
import { API_BASE_URL } from '../utils/api';

const POPULAR_CITIES = ['Dubai', 'Paris', 'Bali', 'Tokyo', 'Sydney', 'Maldives'];

export default function WeatherWidget() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName) => {
    const target = cityName || city;
    if (!target.trim()) return;
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const res = await fetch(`${API_BASE_URL}/weather/${encodeURIComponent(target)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'City not found');
      setWeather({ ...data, city: target });
      setCity(target);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather');
    }
    setLoading(false);
  };

  const getWeatherIcon = (desc = '') => {
    desc = desc.toLowerCase();
    if (desc.includes('sun') || desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '⛅';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('storm')) return '⛈️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const getBestTimeAdvice = (temp) => {
    if (temp < 15) return '🧥 Pack warm clothes!';
    if (temp < 25) return '👕 Perfect weather for sightseeing!';
    if (temp < 32) return '😎 Great beach weather!';
    return '💧 Stay hydrated — it\'s hot!';
  };

  return (
    <section style={{
      padding: '60px 24px',
      background: 'var(--bg-card)',
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="section-heading">
          <h2>Live Destination Weather</h2>
          <p>Check current weather before you pack your bags</p>
          <div className="underline" />
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #07406e, #1a7fc1)',
          borderRadius: 24, padding: '32px',
          color: 'white', maxWidth: 620, margin: '0 auto',
          boxShadow: '0 16px 48px rgba(7,64,110,0.3)',
        }}>
          {/* Search */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchWeather()}
              placeholder="Enter city name..."
              style={{
                flex: 1, padding: '12px 18px',
                borderRadius: 50, border: 'none',
                background: 'rgba(255,255,255,0.15)',
                color: 'white', fontSize: 14,
                fontFamily: "'Poppins', sans-serif",
                outline: 'none',
              }}
            />
            <button
              onClick={() => fetchWeather()}
              style={{
                padding: '12px 22px', borderRadius: 50,
                background: '#f9d342', color: '#07406e',
                border: 'none', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {loading ? '...' : '🔍'}
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {POPULAR_CITIES.map(c => (
              <button
                key={c}
                onClick={() => fetchWeather(c)}
                style={{
                  padding: '4px 14px', borderRadius: 50,
                  background: weather?.city === c ? '#f9d342' : 'rgba(255,255,255,0.15)',
                  color: weather?.city === c ? '#07406e' : 'white',
                  border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'all 0.2s',
                }}
              >{c}</button>
            ))}
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.2)', borderRadius: 12,
              padding: '14px 18px', color: '#fca5a5', fontSize: 14,
            }}>❌ {error}</div>
          )}

          {weather && (
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 16, animation: 'fadeIn 0.3s ease',
            }}>
              <div style={{
                gridColumn: '1/-1',
                display: 'flex', alignItems: 'center', gap: 16,
                background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 20,
              }}>
                <div style={{ fontSize: 64 }}>{getWeatherIcon(weather.description)}</div>
                <div>
                  <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>📍 {weather.city}</div>
                  <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1 }}>{weather.temp}°C</div>
                  <div style={{ fontSize: 15, opacity: 0.9, marginTop: 4, textTransform: 'capitalize' }}>
                    {weather.description}
                  </div>
                </div>
              </div>
              {[
                { icon: '💧', label: 'Humidity', value: `${weather.humidity}%` },
                { icon: '💨', label: 'Wind Speed', value: `${weather.wind} km/h` },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 16px',
                }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
                  <div style={{ fontSize: 13, opacity: 0.75 }}>{stat.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{stat.value}</div>
                </div>
              ))}
              <div style={{
                gridColumn: '1/-1',
                background: 'rgba(249,211,66,0.2)', borderRadius: 12,
                padding: '12px 16px', fontSize: 14, color: '#f9d342', fontWeight: 600,
              }}>
                {getBestTimeAdvice(weather.temp)}
              </div>
            </div>
          )}

          {!weather && !loading && !error && (
            <div style={{ textAlign: 'center', opacity: 0.6, padding: '20px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🌍</div>
              <p>Search a city to see live weather</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
