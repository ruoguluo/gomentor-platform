# GoMentor Platform

A comprehensive AI-powered global mentorship platform connecting mentees with top-tier mentors worldwide.

## 🌟 Key Features

### Core Platform
- **Multi-Role System**: Mentee, Mentor, Freelancer-Consultant, Admin, Compliance Staff
- **Membership Tiers**: Free and Paid members with differentiated access
- **AI-Powered Matching**: Smart mentor-mentee pairing based on personality, expertise, and goals
- **Real-time Communication**: Video/audio calls, chat, and AI transcription

### 🆕 New Features
- **Advanced Mentor Profile**:
    - **Resume Auto-Fill**: Upload PDF resumes to automatically extract expertise, skills, and industry tags.
    - **Smart Tagging**: AI-generated tags for better searchability.
    - **Public Profile**: Rich profile view with education, experience, and verified badges.
- **Search & Discovery**: Filter mentors by expertise, industry, rating, and rate.

### Service Types
1. **Instant Mentorship** - On-demand video/audio calls
2. **Scheduled Mentorship** - Booked sessions with structured agendas
3. **Mentor Courses** - Structured learning programs
4. **Workshops** - Group learning events
5. **Freelancer Consulting** - Project-based consulting

### AI Capabilities
- **Profile Analysis**: Education, experience, personality assessment (MBTI, DISC, 16 Personalities)
- **Question Guidance**: Structured mentee questioning flow
- **Compliance Monitoring**: Real-time PII detection, content scanning
- **Session Summarization**: Automated notes and action items
- **Smart Tagging**: Auto-categorization of mentor expertise

### Project Management
- **Project-Based Mentorship**: Structured engagements with phases and KPIs
- **Task Cards**: Trackable action items and follow-ups
- **Progress Tracking**: Milestone monitoring with AI insights
- **Outcome Measurement**: Quantified mentorship effectiveness

### Compliance & Security
- **AI Verification**: Resume/CV validation, timeline consistency checks
- **Content Monitoring**: Speech-to-text scanning for prohibited content
- **Compliance Scoring**: User behavior tracking and penalties
- **Data Protection**: Encrypted communications, audit trails

## 🏗️ Architecture

### Tech Stack
- **Backend**: Node.js + Express + TypeScript
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **AI Services**: Python + FastAPI + OpenAI + PDF Parsing (pdf-parse)
- **Real-time**: Socket.io
- **Video Calls**: Twilio / Daily.co
- **File Storage**: AWS S3 / Local Uploads (Dev)
- **Queue**: Redis + Bull

### Project Structure
```
gomentor-platform/
├── backend/                 # Main API server
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── services/        # Business logic (AI, Auth)
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Auth, validation, uploads
│   │   ├── routes/          # API routes
│   │   └── utils/           # Helpers
│   ├── prisma/              # Database schema
│   └── tests/
├── frontend/                # React web app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API clients
│   │   └── store/           # State management
├── ai-services/             # Python AI microservices
├── database/                # Migrations & seeds
├── docs/                    # Documentation
└── docker/                  # Deployment configs
```

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or SQLite for dev)
- Redis 7+

### 1. Clone & Install
```bash
git clone https://github.com/ruoguluo/gomentor-platform.git
cd gomentor-platform

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Environment Setup
```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Configure your API keys in backend/.env
# - JWT_SECRET
# - DATABASE_URL
# - OPENAI_API_KEY (for resume parsing)
```

### 3. Database Setup
```bash
cd backend
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 4. Run Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🐳 Deployment (Docker)

We support **Docker** for consistent staging and production deployments.

### 1. Build and Run
```bash
docker-compose up -d --build
```

### 2. Initialize Database
For the first run, apply migrations:
```bash
docker-compose exec backend npm run db:deploy
```

### 3. Access Application
- **Frontend**: http://localhost (or server IP)
- **Backend API**: http://localhost/api

## 📚 Documentation

- [System Architecture](docs/architecture.md)
- [Database Schema](docs/database-schema.md)
- [API Documentation](docs/api.md)
- [AI Services](docs/ai-services.md)
- [Compliance Guide](docs/compliance.md)
- [Deployment Guide](docs/deployment.md)

## 🔒 Security & Compliance

- All sessions monitored for PII sharing
- AI-powered content moderation
- End-to-end encryption for communications
- GDPR/CCPA compliant data handling
- Audit trails for all transactions

## 📄 License

MIT License
