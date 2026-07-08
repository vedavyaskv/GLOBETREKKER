# 🌍 GlobeTrekker — Premium Travel Platform v2.0

A production-quality full-stack travel website built with **React + Node.js + MongoDB**.

## ✨ Features

| Feature | Status |
|---|---|
| Modern Glassmorphism UI | ✅ |
| Dark / Light Mode | ✅ |
| JWT Authentication | ✅ |
| User Dashboard | ✅ |
| Wishlist System | ✅ |
| Reviews & Ratings | ✅ |
| Booking System | ✅ |
| Email Notifications | ✅ |
| AI Travel Chatbot (GlobeBot) | ✅ |
| AI Trip Planner | ✅ |
| Interactive World Map | ✅ |
| Live Weather Widget | ✅ |
| Currency Converter | ✅ |
| Admin Panel | ✅ |
| SEO Optimization | ✅ |
| Fully Responsive | ✅ |

---

## 🚀 Quick Setup

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values (see below)
npm run dev
```

### 2. Frontend Setup

cd frontend
npm install
cp .env.example .env
npm run dev

---

## 🔑 Required API Keys

### Backend (`backend/.env`)

| Variable | Where to Get | Required? |
|---|---|---|
| `MONGO_URI` | [MongoDB Atlas](https://cloud.mongodb.com) → Free cluster | ✅ YES |
| `JWT_SECRET` | Any random string (32+ chars) | ✅ YES |
| `ADMIN_KEY` | Any secret string you choose | ✅ YES |
| `RESEND_API_KEY` | [Resend.com](https://resend.com) → Free tier | For emails |
| `EMAIL_FROM` | Verified domain on Resend | For emails |
| `EMAIL_ADMIN` | Your email | For contact alerts |
| `OPENWEATHER_API_KEY` | [OpenWeatherMap](https://openweathermap.org/api) → Free | For live weather |
| `PORT` | Default: `5000` | Optional |

### Frontend (`frontend/.env`)

| Variable | Value | Required? |
|---|---|---|
| VITE_API_BASE_URL | Your backend URL | Optional |
| VITE_ADMIN_KEY | Same as backend ADMIN_KEY | Optional |

---

## 🌐 Deployment

### Backend → Render.com (Free)
1. Push `backend/` to GitHub
2. Create a new **Web Service** on [Render.com](https://render.com)
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables from `.env.example`

### Frontend → Vercel (Free)
1. Push `frontend/` to GitHub
2. Import project on [Vercel.com](https://vercel.com)
3. Set `REACT_APP_API_BASE_URL` to your Render backend URL
4. Set `REACT_APP_ADMIN_KEY` to match backend

---

## 📁 Project Structure

```
globetrekker-upgraded/
├── backend/
│   ├── server.js          # Express server (JWT, MongoDB, all routes)
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── public/            # Images, favicon, manifest
    └── src/
        ├── App.js         # Router + layout
        ├── index.js       # Entry point
        ├── index.css      # Design system + dark mode
        ├── context/
        │   └── AppContext.js   # Auth, theme, wishlist, toasts
        ├── utils/
        │   └── api.js         # API helpers + data
        ├── components/
        │   ├── Header.js
        │   ├── Hero.js
        │   ├── Destinations.js
        │   ├── Packages.js
        │   ├── Reviews.js
        │   ├── WeatherWidget.js
        │   ├── CurrencyConverter.js
        │   ├── InteractiveMap.js
        │   ├── AIChatBot.js
        │   ├── Footer.js
        │   └── Toast.js
        └── pages/
            ├── LoginSignup.js
            ├── Register.js
            ├── Dashboard.js
            ├── AITripPlanner.js
            ├── About.js
            ├── Contact.js
            ├── Faq.js
            ├── Privacy.js
            ├── Terms.js
            ├── Admin.js
            └── DestinationDetail.js
```

---

## 🤖 AI Features Setup

The AI Chatbot (GlobeBot) and AI Trip Planner run through backend API endpoints.

Backend endpoints:

- POST /api/chat
- POST /api/trip-planner

You can connect these endpoints to:

- Anthropic Claude API
- OpenAI API
- Google Gemini API
- Any LLM provider

The frontend communicates only with your backend API.

## 📧 Email Setup (Resend.com)

1. Go to [Resend.com](https://resend.com) and create a free account
2. Get your API key from the dashboard
3. For testing: use `onboarding@resend.dev` as `EMAIL_FROM`
4. For production: verify your domain and use your own email

---

## 🗺️ Interactive Map

Uses **Leaflet.js** with OpenStreetMap tiles — no API key required!

---

## 🌦️ Weather Widget

- Without API key: Shows mock data (still functional)
- With key: Shows live weather from OpenWeatherMap
- Get free key at [openweathermap.org/api](https://openweathermap.org/api)

---

## 💱 Currency Converter

Uses **Frankfurter.app** API — completely free, no API key needed!

---

## 📞 Support

Questions? Contact: support@globetrekker.in

Built with ❤️ for travelers everywhere.
