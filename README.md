# Leadership Loom v2

A modern succession planning and leadership assessment application built with React, Vite, Tailwind CSS, shadcn/ui, and Supabase.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email + Google OAuth)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Development Status

### ✅ Phase 1 Complete: Foundation

- [x] Project initialization
- [x] Dependencies installed
- [x] Folder structure created
- [x] Database schema and RLS policies
- [x] Survey questions migrated (621 lines)
- [x] Scoring algorithm migrated (exact preservation)
- [x] Supabase client setup

### 🚧 Next Steps

- Build authentication system
- Set up React Router
- Install shadcn/ui components
- Create survey forms
- Build dashboard

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Critical Files

⚠️ These files preserve exact business logic from legacy app:

1. **src/constants/proprietary.ts** - All survey questions
2. **src/services/evaluate.ts** - Scoring algorithm

**DO NOT modify without approval**

