# 🌿 Verix — AI-Powered Impact Verification

> **Verify your impact. Share your proof.**

Verix is a web application that enables users to document and share verifiable proof of positive social and environmental actions through AI-powered before/after photo analysis.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Authentication:** NextAuth.js (Google OAuth + Email)
- **Database:** Supabase PostgreSQL
- **Storage:** Supabase Storage
- **AI:** Google Gemini 1.5 Flash
- **Rate Limiting:** Upstash Redis
- **Image Compression:** TinyPNG API
- **Hosting:** Vercel (Free Tier)

## 📋 Prerequisites

- Node.js 18.17+
- npm or yarn
- Supabase account (free)
- Google Cloud account (for OAuth)
- Google AI Studio API key
- Upstash Redis account (free)

## 🔧 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Layne237/verix-mvp.git
   cd verix-mvp
   ```

2. Copy `.env.local.example` to `.env.local` and fill in values
   ```bash
   cp .env.local.example .env.local
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Run development server
   ```bash
   npm run dev
   ```

5. Set up Supabase tables and RLS policies
   - Run `scripts/seed.sql` in Supabase SQL Editor

6. Deploy to Vercel
   ```bash
   vercel --prod
   ```

## 📁 Project Structure

```
verix-mvp/
├── app/              # Next.js App Router pages and API routes
├── components/       # Reusable UI components
├── lib/              # Core library files (Supabase, AI, Redis)
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── config/           # App configuration
├── scripts/          # Database migrations and seed data
└── tests/            # Unit, integration, and E2E tests
```

## 👥 Team

| Role | Name | Responsibilities |
|------|------|------------------|
| Project Manager | Layne Wintchester | Coordination, CDCF, Git management |
| Backend APIs | Damon Torento | API routes, integrations, security |
| Frontend UI/UX | Claude | Design system, components, pages |
| AI Integration | Pavel Dada Junior | Gemini, prompt engineering, scoring |
| DevOps & Security | Aboubakar | Deployment, CI/CD, monitoring |
| Database | Layne Wintchester | PostgreSQL, Storage, RLS |

## 📄 License

MIT

---
**Verix — Make your impact verifiable.**
