# PM Assessment Quiz 🎯

**Discover your Product Manager archetype through AI-powered personality analysis.**

A witty, snarky web app that analyzes LinkedIn profiles to reveal what kind of PM you *really* are. Built with Next.js, Claude AI, and a healthy dose of humor.

---

## 🚀 Live Demo

[Try it here](https://your-domain.com) *(coming soon)*

## ✨ Features

- **AI-Powered Analysis**: Uses Claude API to generate personalized PM archetypes
- **12 Unique Archetypes**: From "Vision Vaporware PM" to "Chaotic Neutral PM"
- **Witty Animations**: Entertaining loading states while your profile is analyzed
- **Email Capture**: Lead generation built-in
- **Social Sharing**: Share your archetype on LinkedIn, Twitter, etc.
- **Mobile-First Design**: Looks great on all devices

## 🎭 The Archetypes

1. 🚀 **The Vision Vaporware PM** - All strategy, no execution
2. ⚙️ **The Feature Factory Foreman** - Ships everything, strategizes nothing
3. 📊 **The Data Paralysis PM** - Can't decide without 47 more A/B tests
4. 💝 **The User Whisperer** - Empathy levels off the charts
5. 🤹 **The Stakeholder Juggler** - Keeps everyone happy somehow
6. 🤖 **The AI Hype Beast** - "Can we add AI to this?"
7. 🎛️ **The Roadmap Remixer** - Priorities change weekly
8. 👨‍💻 **The Technical PM** - Basically an engineer who switched teams
9. 📚 **The Strategic Philosopher** - Frameworks for everything
10. 📈 **The Growth Hacker** - Metrics, metrics, metrics
11. 🎯 **The Customer Development Evangelist** - Jobs-to-be-Done tattooed somewhere
12. 🎲 **The Chaotic Neutral PM** - Vibes-based product management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (serverless)
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **AI**: Anthropic Claude API
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Anthropic API key

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pm-assessment-quiz.git
   cd pm-assessment-quiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your keys:
   ```
   DATABASE_URL="postgresql://..."
   ANTHROPIC_API_KEY="sk-ant-..."
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up database**
   ```bash
   npm run db:push
   npm run db:generate
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🗂️ Project Structure

```
pm-assessment-quiz/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Root layout
│   │   └── api/
│   │       ├── analyze/route.ts        # Analysis endpoint
│   │       ├── submit-email/route.ts   # Email capture endpoint
│   │       └── results/[id]/route.ts   # Results endpoint
│   ├── components/
│   │   ├── LandingPage.tsx
│   │   ├── ProcessingAnimation.tsx
│   │   ├── EmailGate.tsx
│   │   ├── ResultsDisplay.tsx
│   │   └── ShareButtons.tsx
│   ├── lib/
│   │   ├── db.ts                       # Prisma client
│   │   ├── ai.ts                       # Claude API wrapper
│   │   ├── scraper.ts                  # LinkedIn data extraction
│   │   └── utils.ts                    # Helper functions
│   ├── config/
│   │   └── archetypes.ts               # PM archetype definitions
│   └── types/
│       └── index.ts                    # TypeScript types
├── prisma/
│   └── schema.prisma                   # Database schema
└── public/
    └── og-image.png                    # Social sharing image
```

## 🔌 API Endpoints

### POST `/api/analyze`
Analyzes a LinkedIn profile and generates PM archetype.

**Request:**
```json
{
  "linkedinUrl": "https://linkedin.com/in/username"
}
```

**Response:**
```json
{
  "assessmentId": "uuid",
  "status": "processing"
}
```

### POST `/api/submit-email`
Captures email and returns full assessment results.

**Request:**
```json
{
  "assessmentId": "uuid",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "assessmentId": "uuid",
  "archetype": "The Vision Vaporware PM",
  "assessmentData": {
    "tagline": "...",
    "roast": "...",
    "traits": [...],
    "strengths": [...],
    "growthAreas": [...]
  }
}
```

### GET `/api/results/:id`
Retrieves assessment results for sharing.

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_APP_URL`
4. Deploy!

Vercel will auto-deploy on every push to main branch.

## 💰 Cost Estimate

**Monthly operating costs:**
- Supabase: Free tier (up to 500MB database)
- Anthropic API: ~$0.015 per assessment
  - 100 assessments/month = $1.50
  - 1,000 assessments/month = $15
- Vercel: Free tier (100GB bandwidth)

**Total**: $0-20/month depending on traffic

## 🧪 Testing

```bash
# Run type checking
npx tsc --noEmit

# Run linting
npm run lint

# Build for production (tests build)
npm run build
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:generate` - Generate Prisma Client
- `npm run db:studio` - Open Prisma Studio

## 🗺️ Roadmap

### v1.1 (Coming Soon)
- [ ] Real LinkedIn profile scraping
- [ ] Custom OG image generation
- [ ] Rate limiting
- [ ] Admin dashboard
- [ ] Email export functionality

### v2.0 (Future)
- [ ] Team assessments (compare multiple PMs)
- [ ] Premium PDF reports
- [ ] Job board integration
- [ ] Community features

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Anthropic API Documentation](https://docs.anthropic.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Powered by [Anthropic Claude](https://anthropic.com)
- Database by [Supabase](https://supabase.com)
- Deployed on [Vercel](https://vercel.com)
- Icons by [Lucide](https://lucide.dev)

---

**Built with ✨ and a questionable amount of PM humor**

*Find out your PM archetype at [yourdomain.com](https://yourdomain.com)*
