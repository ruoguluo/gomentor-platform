# GoMentor Platform

A comprehensive AI-powered global mentorship platform connecting mentees with top-tier mentors worldwide.

## 🌟 Key Features

### Core Platform
- **Multi-Role System**: Mentee, Mentor, Freelancer-Consultant, Admin, Compliance Staff
- **Membership Tiers**: Free and Paid members with differentiated access
- **AI-Powered Matching**: Smart mentor-mentee pairing based on personality, expertise, and goals
- **Real-time Communication**: Video/audio calls, chat, and AI transcription

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
- **AI Services**: Python + FastAPI + OpenAI
- **Real-time**: Socket.io
- **Video Calls**: Twilio / Daily.co
- **File Storage**: AWS S3
- **Queue**: Redis + Bull

### Project Structure
```
gomentor-platform/
├── backend/                 # Main API server
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Auth, validation
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helpers
│   │   └── ai/              # AI integration
│   ├── prisma/              # Database schema
│   └── tests/
├── frontend/                # React web app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API clients
│   │   ├── store/           # State management
│   │   └── utils/           # Helpers
│   └── public/
├── ai-services/             # Python AI microservices
│   ├── src/
│   │   ├── analysis/        # Profile analysis
│   │   ├── compliance/      # Content monitoring
│   │   ├── transcription/   # Speech-to-text
│   │   └── guidance/        # Question guidance
│   └── models/
├── database/                # Migrations & seeds
├── docs/                    # Documentation
└── docker/                  # Deployment configs
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- SQLite (for dev/staging) or PostgreSQL 14+ (for production)
- Redis 7+

### 1. Clone & Install
```bash
cd /root/Projects/gomentor-platform

# Backend
cd backend
npm install
```

### 2. Database Setup (SQLite for Staging/Dev)

Since we are using SQLite for easier deployment and portability, follow these steps to set up the database:

1.  **Configure Environment**:
    Create or update your `.env` file in the `backend` directory:
    ```env
    # backend/.env
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="your_jwt_secret"
    # ... other variables
    ```

2.  **Generate Prisma Client**:
    This ensures the client code matches the schema (especially for SQLite compatibility).
    ```bash
    cd backend
    npx prisma generate
    ```

3.  **Push Schema to Database**:
    This creates the `dev.db` file and creates all tables.
    ```bash
    npx prisma db push
    ```

### 3. Start the Application

```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm run dev
```
# Frontend
cd ../frontend
npm install

# AI Services
cd ../ai-services
pip install -r requirements.txt
```

### 2. Environment Setup
```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp ai-services/.env.example ai-services/.env

# Configure your API keys, database URLs, etc.
```

### 3. Database Setup
```bash
cd backend
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

# Terminal 3 - AI Services
cd ai-services
python -m uvicorn main:app --reload --port 8000
```

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
