# Technical Decisions Log

This file tracks important technical decisions and their rationale.

## Architecture Decisions

### Why Next.js 14 App Router?
**Decision:** Use Next.js 14 with App Router instead of Pages Router
**Rationale:**
- Modern React Server Components
- Better performance with streaming
- Simplified API routes
- Future-proof for Next.js ecosystem
**Date:** November 6, 2025

### Why Supabase over other databases?
**Decision:** Use Supabase PostgreSQL
**Rationale:**
- Free tier generous enough for MVP
- Built-in connection pooling
- Easy Prisma integration
- Future scaling options available
**Date:** November 6, 2025

### Why user-provided About text instead of scraping?
**Decision:** Ask users to paste LinkedIn About section
**Rationale:**
- ✅ No legal/TOS issues with LinkedIn
- ✅ No scraping API costs
- ✅ Better data quality (users provide what they want analyzed)
- ✅ No scraping failures
- ✅ Users more invested in results
**Alternative Considered:** Proxycurl API ($0.50/profile), LinkedIn scraping (risky)
**Date:** November 6, 2025

## Implementation Decisions

### Roast Level Selector (Session 4)
**Decision:** Three roast levels with different AI tones
**Options:** Light Roast, Medium Roast, Burnt Toast
**Rationale:**
- Users have different comfort levels with feedback
- Increases engagement (users try multiple levels)
- Makes app more shareable ("I did Burnt Toast!")
- Professional users can choose Light Roast
**Date:** November 7, 2025

### In-Memory Rate Limiting
**Decision:** In-memory Map-based rate limiting
**Rationale:**
- Simple, no external dependencies
- Good enough for MVP
- Easy to replace with Redis later
**Trade-off:** Resets on serverless cold starts
**Future:** Migrate to Upstash Redis for production
**Date:** November 6, 2025

### Counter Badge with Real-time Count
**Decision:** Fetch real count from database on each page load
**Rationale:**
- Shows social proof (more assessments = more credible)
- Animated count-up is engaging
- Simple implementation
**Performance:** Database query on every page load (acceptable for MVP)
**Date:** November 7, 2025

## UI/UX Decisions

### Purple Gradient Background
**Decision:** Vibrant purple-to-indigo gradient
**Rationale:**
- More engaging than light blue
- Stands out in screenshots/shares
- Professional yet playful
- Good contrast for glassmorphism
**Date:** November 7, 2025

### Glassmorphism for Counter Badge
**Decision:** Use backdrop-blur with semi-transparent background
**Rationale:**
- Modern, trendy design
- Works well on gradient backgrounds
- Draws attention without being overwhelming
**Date:** November 7, 2025

### Toast Notifications over Alerts
**Decision:** Use react-hot-toast instead of browser alerts
**Rationale:**
- Non-blocking user experience
- Professional appearance
- Better UX for errors and success messages
**Date:** November 6, 2025

## Data Decisions

### Store Full AI Response as JSON
**Decision:** Store complete AI response in database
**Rationale:**
- Can re-display results without re-generating
- Enables analytics on AI outputs
- Supports future features (compare assessments over time)
**Storage:** Minimal (~2KB per assessment)
**Date:** November 6, 2025

### Separate WaitlistEmail Table
**Decision:** Track emails in separate table from assessments
**Rationale:**
- Easy to export emails for marketing
- Prevents duplicates
- Can track source/timestamp
- Supports future multi-assessment per user
**Date:** November 6, 2025

## Security Decisions

### IP-based Rate Limiting
**Decision:** Rate limit by IP address
**Rationale:**
- Prevents API abuse
- No authentication required
- Simple to implement
**Limitation:** Shared IPs (offices, VPNs) share limit
**Date:** November 6, 2025

### Zod Validation on All Inputs
**Decision:** Use Zod for schema validation
**Rationale:**
- Type-safe runtime validation
- Better error messages
- Prevents injection attacks
- TypeScript integration
**Date:** November 6, 2025

## Deployment Decisions

### Vercel for Hosting
**Decision:** Deploy to Vercel
**Rationale:**
- Seamless Next.js integration
- Free tier sufficient
- Auto-deployment from GitHub
- Serverless functions for API routes
**Date:** Not yet deployed

---

**Update this file whenever making significant technical choices.**
