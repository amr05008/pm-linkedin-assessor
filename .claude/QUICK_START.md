# Quick Start Guide

**Use this when starting a new session to get up to speed quickly.**

## Start Here

1. **Read Project Status:**
   ```bash
   cat .claude/PROJECT_STATUS.md
   ```
   This tells you: current state, what's working, what's broken, next priorities

2. **Check Latest Session:**
   ```bash
   tail -n 100 CLAUDE.md
   ```
   See what happened in the last session

3. **Verify Environment:**
   ```bash
   # Check if .env.local exists and has required vars
   grep -E "DATABASE_URL|ANTHROPIC_API_KEY" .env.local
   ```

4. **Start Dev Server:**
   ```bash
   npm run dev
   # Server runs on port 3002
   # Open: http://localhost:3002
   ```

## Common Commands

### Development
```bash
npm run dev          # Start dev server (port 3002)
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Database
```bash
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio GUI
npm run db:migrate   # Create migration (production)
```

### Git
```bash
git status           # Check current changes
git log -1           # See last commit
git diff             # See unstaged changes
```

## File Locations Reference

### Core Logic
- AI Assessment: `src/lib/ai.ts`
- Archetypes Config: `src/config/archetypes.ts`
- Database Client: `src/lib/db.ts`
- Validation: `src/lib/utils.ts`

### API Routes
- Analyze Profile: `src/app/api/analyze/route.ts`
- Submit Email: `src/app/api/submit-email/route.ts`
- Get Results: `src/app/api/results/[id]/route.ts`
- Stats Counter: `src/app/api/stats/route.ts`

### Components
- LandingPage: `src/components/LandingPage.tsx`
- CounterBadge: `src/components/CounterBadge.tsx`
- RoastSelector: `src/components/RoastSelector.tsx`
- EmailGate: `src/components/EmailGate.tsx`
- ResultsDisplay: `src/components/ResultsDisplay.tsx`
- ShareButtons: `src/components/ShareButtons.tsx`

### Main Pages
- Home: `src/app/page.tsx`
- Layout: `src/app/layout.tsx`
- Results: `src/app/results/[id]/page.tsx`

### Database
- Schema: `prisma/schema.prisma`
- Tables: Assessment, WaitlistEmail

## Environment Variables

**Required in `.env.local`:**
```env
DATABASE_URL="postgresql://..."
ANTHROPIC_API_KEY="sk-ant-..."
NEXT_PUBLIC_APP_URL="http://localhost:3002"
```

**Never commit:**
- `.env`
- `.env.local`

**Safe to commit:**
- `.env.example` (template with no real values)

## Troubleshooting

### Dev server won't start
```bash
# Kill any process on port 3002
lsof -ti:3002 | xargs kill -9
npm run dev
```

### Database connection issues
```bash
# Test connection
npm run db:studio
# If it opens, database is connected
```

### TypeScript errors
```bash
npm run build
# Shows all type errors
```

### Git push failing
```bash
# Check remote
git remote -v

# Manual push with auth
git push origin main
```

## Key Architecture Points

**User Flow:**
1. Landing → User enters LinkedIn URL + About text + selects roast level
2. Processing → 12-second animation while AI analyzes
3. Email Gate → User enters email to unlock results
4. Results → Display assessment + share buttons

**Data Flow:**
1. POST `/api/analyze` → Creates Assessment, calls Claude API
2. POST `/api/submit-email` → Updates Assessment, returns results
3. GET `/api/results/[id]` → Fetches assessment for sharing

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL (Supabase)
- Anthropic Claude Sonnet 4
- React Hot Toast
- Vercel Analytics

## Current Priorities (Updated Each Session)

**This Session:**
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Test production

**Next Session:**
- [ ] Add analytics tracking
- [ ] Create admin dashboard
- [ ] Email export functionality

---
**Pro Tip:** Always update PROJECT_STATUS.md at end of session!
