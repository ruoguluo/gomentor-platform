# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PhxNorth Platform is an AI-powered global mentorship platform with:
- **Backend**: Node.js + Express + TypeScript (port 3000)
- **Frontend**: React + TypeScript + Vite + Tailwind CSS (port 5173)
- **Database**: SQLite (dev/staging) via Prisma ORM
- **Real-time**: Socket.io for chat and notifications

## Common Commands

### Backend (cd backend/)
```bash
npm run dev           # Start development server with hot reload (tsx watch)
npm run build         # Compile TypeScript to dist/
npm run start         # Run compiled server
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm test              # Run Jest tests

# Database
npx prisma generate   # Generate Prisma client after schema changes
npx prisma db push    # Push schema to database (creates dev.db for SQLite)
npx prisma migrate dev # Create and apply migration
npx prisma db seed    # Run seed script (tsx prisma/seed.ts)
npx prisma studio     # Open Prisma Studio GUI
```

### Frontend (cd frontend/)
```bash
npm run dev           # Start Vite dev server
npm run build         # TypeScript compile + Vite build
npm run preview       # Preview production build
npm run lint          # ESLint check
```

### Running Tests
```bash
# Backend tests (Jest)
cd backend && npm test

# Single test file
cd backend && npx jest auth.controller.test.ts
```

## Development Workflow

### Database Setup (First Time)
1. Configure `backend/.env` with `DATABASE_URL="file:./dev.db"`
2. `cd backend && npx prisma generate`
3. `npx prisma db push` - creates tables

### Full Stack Development
Run in separate terminals:
1. `cd backend && npm run dev`  (port 3000)
2. `cd frontend && npm run dev` (port 5173)

The Vite dev server proxies `/api` and `/socket.io` to the backend automatically.

## Architecture

### Backend Structure
```
backend/src/
├── server.ts              # Express server setup, middleware, routes
├── routes/                # Route definitions (auth, user, mentor, etc.)
├── controllers/           # Request handlers
├── services/              # Business logic
├── middleware/            # auth.middleware.ts, errorHandler.ts, validateRequest.ts
├── validators/            # Zod validation schemas
├── socket/                # Socket.io handlers
└── models/                # (Prisma models in prisma/schema.prisma)
```

### Frontend Structure
```
frontend/src/
├── App.tsx                # React Router routes
├── main.tsx               # Entry point
├── pages/                 # Page components organized by feature
│   ├── auth/              # Login, Register, ForgotPassword
│   ├── dashboard/         # DashboardPage
│   ├── mentors/           # MentorSearchPage, MentorProfilePage
│   ├── portal/            # MentorPortalPage, MenteePortalPage
│   ├── profile/           # ProfilePage, MentorProfileEditPage
│   └── admin/             # Admin pages
├── components/            # Shared components
│   ├── ui/                # shadcn/ui style components
│   ├── layout/            # Layout components
│   └── landing/           # Landing page sections
├── layouts/               # MainLayout, AuthLayout, AdminLayout
├── services/              # API clients (api.ts, auth.ts, mentor.ts)
└── store/                 # Zustand stores (authStore.ts)
```

### Key Architectural Patterns

**Backend:**
- Routes import controllers which import services
- `AuthRequest` interface extends Express Request with `user` property
- JWT authentication via `authenticate` middleware
- Role-based access via `requireRole(['MENTOR', 'ADMIN'])`
- Zod validation via `validateRequest(schema)` middleware
- Prisma client instantiated per-request (consider singleton pattern)
- All API responses use `{ success: boolean, data?: any, error?: string }` format

**Frontend:**
- Zustand for state management with persistence
- API layer in `services/` folder using axios
- Auth token automatically attached via axios interceptor reading from localStorage
- Path aliases configured in `vite.config.ts` and `tsconfig.json`
- Tailwind CSS with custom color scheme in `index.css`

**Database:**
- Prisma schema defines all models
- Roles stored as JSON string `["MENTEE", "MENTOR"]` in `User.roles`
- Multi-role support: users can be MENTEE, MENTOR, FREELANCER simultaneously

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="file:./dev.db"     # SQLite for dev
PORT=3000
JWT_SECRET=your-secret
FRONTEND_URL=http://localhost:5173
# Optional: Stripe, Twilio, AWS S3, Redis, AI_SERVICE_URL
```

### Frontend (.env)
```env
VITE_API_URL=/api                 # Uses Vite proxy
```

## Key Files

- `backend/src/server.ts` - Express app setup with all routes
- `backend/src/middleware/auth.middleware.ts` - JWT authentication
- `backend/src/middleware/errorHandler.ts` - Global error handling
- `backend/prisma/schema.prisma` - Database schema
- `frontend/src/App.tsx` - Route definitions
- `frontend/src/services/api.ts` - Axios instance with auth interceptor
- `frontend/src/store/authStore.ts` - Zustand auth state with persistence
