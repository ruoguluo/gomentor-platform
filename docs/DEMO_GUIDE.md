# 🎬 PhxNorth Demo Guide

Quick reference for demoing the PhxNorth platform to friends, investors, or stakeholders.

---

## 📋 Prerequisites (Do This First)

### 1. Install Dependencies

```bash
cd /root/Projects/gomentor-platform

# Backend
cd backend
npm install

# Frontend  
cd ../frontend
npm install
```

### 2. Setup Database

```bash
cd /root/Projects/gomentor-platform/backend
cp .env.example .env
# Edit .env - set your PostgreSQL credentials
npx prisma migrate dev
npx prisma db seed  # (optional - for sample data)
```

### 3. Configure Environment

Edit `backend/.env`:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/gomentor"
JWT_SECRET="demo-secret-key"
# Leave other services (Stripe, Twilio) empty for demo mode
```

---

## 🚀 Start the Demo

Open **3 terminal windows**:

### Terminal 1 - Backend API
```bash
cd /root/Projects/gomentor-platform/backend
npm run dev
```
✅ Should show: `🚀 Server running on port 3000`

### Terminal 2 - Frontend
```bash
cd /root/Projects/gomentor-platform/frontend
npm run dev
```
✅ Should show: `Local: http://localhost:5173`

### Terminal 3 - (Optional) Logs
```bash
tail -f /root/Projects/gomentor-platform/backend/logs/*.log
```

---

## 🎯 Demo Flow (What to Show)

### 1. Landing Page (http://localhost:5173)
- Professional hero section
- Value propositions:
  - Top-tier mentors globally
  - AI-powered matching
  - Structured mentorship
  - Project-based tracking

### 2. Registration & Role Selection
- Create account
- Choose roles: Mentee / Mentor / Freelancer
- Show multi-role capability (can be all three!)

### 3. Mentee Journey
```
Dashboard → Question Planning → AI Matching → Book Session
```

**Key Features to Highlight:**
- **Question Guidance**: AI helps structure questions step-by-step
- **Mentor Search**: Filters by industry, expertise, personality
- **AI Tags**: Auto-generated mentor expertise tags
- **Booking**: Calendar, pricing transparency, instant confirmation

### 4. Mentor Portal
```
Profile Setup → Upload Resume → AI Tagging → Set Availability
```

**Key Features to Highlight:**
- Resume upload (LinkedIn or manual)
- AI analyzes and generates expertise tags
- Set rates for different service types
- Earnings dashboard
- Availability calendar

### 5. Live Session (Simulated)
- Video call interface
- Real-time chat sidebar
- AI transcription (mocked for demo)
- Post-session feedback form
- Task cards generated automatically

### 6. Project Management
- Create mentorship project
- Define phases (Discovery → Strategy → Execution → Review)
- Set KPIs and objectives
- Track progress with AI insights
- Risk flag detection

### 7. Admin Dashboard
```
Verification Queue → Compliance Alerts → Finance Overview
```

**Key Features to Highlight:**
- AI-powered resume verification
- Red flag detection (timeline gaps, suspicious patterns)
- Content monitoring for sessions
- Compliance scoring system
- Financial tracking & payouts

---

## 🛠️ Demo Preparation Checklist

Before showing to friends, ensure:

- [ ] Both backend and frontend are running
- [ ] Database is migrated and seeded (optional)
- [ ] Test login works
- [ ] Sample data is loaded (if created)
- [ ] Browser cache is cleared (for fresh experience)

---

## 💡 Pro Tips for Demo

| Tip | Why It Helps |
|-----|--------------|
| Use **incognito mode** | Shows fresh signup flow, no cached data |
| Have **2 browser windows** | Show mentor & mentee perspectives side-by-side |
| Pre-populate **some data** | Avoids empty states, instant gratification |
| Focus on **AI features** | The key differentiator vs competitors |
| Show **mobile responsive** | Prove it works on all devices |
| Have **speaker notes** | Know which features to emphasize |

---

## 🎭 Demo Script (Suggested Flow)

### Opening (30 seconds)
> "PhxNorth is an AI-powered global mentorship platform. Unlike other platforms with retired coaches, we connect you with active industry leaders who are still building companies and shaping industries today."

### The Problem (1 minute)
> "Most mentorship fails because:
> 1. Mentees don't know how to ask good questions
> 2. No structure or tracking
> 3. Hard to find the right mentor
> 
> We solve all three with AI."

### Live Demo (5-7 minutes)

**Mentee Perspective:**
1. Sign up as mentee
2. Show AI question guidance
3. Search mentors with filters
4. Book a session

**Mentor Perspective:**
1. Show mentor portal
2. Upload resume → AI generates tags
3. Set availability & rates
4. View earnings

**Admin Perspective:**
1. Show verification queue
2. AI red flags on resumes
3. Compliance monitoring

### Closing (30 seconds)
> "We've built the infrastructure for scalable, high-quality mentorship. The AI handles the matching, structuring, and tracking—so humans can focus on what they do best: mentoring."

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection error | Check PostgreSQL: `sudo service postgresql status` |
| Port 3000 in use | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| Frontend can't connect | Check `vite.config.ts` proxy settings |
| Missing dependencies | Run `npm install` in both folders |
| CORS errors | Ensure FRONTEND_URL in backend/.env matches your URL |

---

## 📊 Key Stats to Mention

- **6 Trading Strategies** (if showing trading bot integration)
- **AI-Powered Matching** using personality analysis (MBTI, DISC, 16 Personalities)
- **Real-time** video, chat, and transcription
- **Project-based** mentorship with KPI tracking
- **Compliance-first** with AI content monitoring

---

## 🎨 Branding Points

**Tagline Ideas:**
- "Learn from the world's top professionals. Not retired coaches."
- "AI-powered mentorship for the ambitious."
- "Structured guidance from industry leaders."

**Key Differentiators:**
1. Active professionals, not retired coaches
2. AI structures the mentorship (questions, tracking, insights)
3. Project-based with measurable outcomes
4. Global network, local mentorship
5. Compliance & quality guaranteed

---

## 📱 Post-Demo Actions

After showing the demo, consider:

1. **Get feedback**: What resonated most?
2. **Share roadmap**: What's coming next?
3. **Collect emails**: For beta access
4. **Schedule follow-up**: Deeper dive on specific features

---

*Last updated: 2026-02-06*
*Location: /root/Projects/gomentor-platform/docs/DEMO_GUIDE.md*
