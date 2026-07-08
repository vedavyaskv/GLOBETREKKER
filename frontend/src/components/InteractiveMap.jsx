import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { destinations } from '../utils/api';

const coords = {
  1: [46.6863, 7.8632],   // Interlaken, Switzerland
  2: [4.1755, 73.5093],   // Malé, Maldives
  3: [41.9028, 12.4964],  // Rome, Italy
  4: [25.2048, 55.2708],  // Dubai, UAE
  5: [7.8804, 98.3923],   // Phuket, Thailand
  6: [-45.0312, 168.6626],// Queenstown, NZ
  7: [48.8566, 2.3522],   // Paris, France
  8: [35.0116, 135.7681], // Kyoto, Japan
  9: [-33.8688, 151.2093],// Sydney, Australia
};

export default function InteractiveMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstance.current) return;
    const L = window.L;

    mapInstance.current = L.map(mapRef.current, {
      center: [25, 25],
      zoom: 2,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(mapInstance.current);

    destinations.forEach(dest => {
      const coord = coords[dest.id];
      if (!coord) return;

      const icon = L.divIcon({
        className: '',
        html: `<div style="
          background: linear-gradient(135deg,#07406e,#1a7fc1);
          color:white; border-radius:50%; width:38px; height:38px;
          display:flex; align-items:center; justify-content:center;
          font-size:18px; box-shadow:0 4px 12px rgba(7,64,110,0.5);
          border:2px solid white; cursor:pointer;
          transition: transform 0.2s;
        ">${dest.flag}</div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      const marker = L.marker(coord, { icon }).addTo(mapInstance.current);
      marker.bindPopup(`
        <div style="font-family:'Poppins',sans-serif; min-width:200px; padding:4px">
          <img src="${dest.img}" alt="${dest.city}" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px"/>
          <div style="font-size:14px;font-weight:700;color:#07406e">${dest.flag} ${dest.city}, ${dest.country}</div>
          <div style="font-size:12px;color:#666;margin:4px 0">⭐ ${dest.rating} · ${dest.duration}</div>
          <div style="font-size:15px;font-weight:800;color:#07406e">₹${dest.price.toLocaleString()}</div>
          <button onclick="document.dispatchEvent(new CustomEvent('gt-map-book', {detail:'${dest.id}'}))"
            style="width:100%;padding:8px;background:linear-gradient(135deg,#07406e,#1a7fc1);
            color:white;border:none;border-radius:20px;font-weight:700;cursor:pointer;margin-top:8px;font-family:'Poppins',sans-serif">
            Book Now →
          </button>
        </div>
      `, { maxWidth: 220 });

      marker.on('click', () => setSelected(dest));
    });

    const handleBook = () => navigate('/login');

    document.addEventListener(
  'gt-map-book',
  () => {
    const token = localStorage.getItem('gt_token');

    if (token) {
      navigate('/register');
    } else {
      navigate('/login');
    }
  }
);

    return () => {
      document.removeEventListener('gt-map-book', handleBook);

      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [leafletLoaded, navigate]);

  return (
    <section style={{
      padding: '60px 24px',
      background: 'var(--bg)',
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="section-heading">
          <h2>Explore Destinations on the Map</h2>
          <p>Click any pin to discover destinations and book your next adventure</p>
          <div className="underline" />
        </div>

        <div style={{
          borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(7,64,110,0.2)',
          border: '3px solid var(--border)',
          position: 'relative',
        }}>
          {!leafletLoaded && (
            <div style={{
              height: 500, display: 'flex', alignItems: 'center',
              justifyContent: 'center', background: 'var(--bg-card)',
            }}>
              <div className="spinner" />
            </div>
          )}
          <div
            ref={mapRef}
            style={{ height: 500, width: '100%', display: leafletLoaded ? 'block' : 'none' }}
          />

          <div style={{
            position: 'absolute', bottom: 16, left: 16, zIndex: 1000,
            background: 'rgba(7,64,110,0.9)', backdropFilter: 'blur(8px)',
            borderRadius: 12, padding: '10px 16px',
            color: 'white', fontSize: 12,
          }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>📍 Destinations</div>
            {destinations.slice(0, 4).map(d => (
              <div key={d.id} style={{ opacity: 0.85, marginBottom: 2 }}>
                {d.flag} {d.city}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12, marginTop: 24,
        }}>
          {destinations.map(dest => (
            <div
              key={dest.id}
              onClick={() => {
                if (mapInstance.current) {
                  mapInstance.current.setView(coords[dest.id], 5, { animate: true });
                }
                setSelected(dest);
              }}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 12, padding: '12px',
                cursor: 'pointer', textAlign: 'center',
                border: selected?.id === dest.id ? '2px solid var(--primary)' : '2px solid var(--border)',
                transition: 'all 0.2s',
                boxShadow: 'var(--shadow)',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ fontSize: 24 }}>{dest.flag}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>{dest.city}</div>
              <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600 }}>₹{(dest.price / 1000).toFixed(0)}k+</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
