# AI Agency Growth OS

A production-ready Next.js SaaS to discover high-intent leads, run personalized outreach, manage pipeline, and automate closing workflows.

## Free-first stack choices
- **Lead source (free):** OpenStreetMap Overpass API (no API key required).
- **Email (free):** SMTP (Gmail app password / Zoho free / Brevo free SMTP).
- **Automation:** Inngest free tier.
- **Database:** PostgreSQL on Neon/Supabase free tier.
- **Deploy:** Vercel hobby tier.

## Setup
1. `npm install`
2. Fill `.env` from `.env.example`
3. `npx prisma generate`
4. `npx prisma migrate dev`
5. `npm run seed`
6. `npm run dev`

## Major Modules
- Multi-source lead discovery API (`/api/leads`): OpenStreetMap + optional Google Places.
- AI intent scoring (`/api/score`) + automatic scoring on discovery.
- Business audit + outreach generation (`/api/audit`, `/api/outreach`).
- Campaign + CRM data APIs (`/api/campaigns`, `/api/crm`, `/api/next-best`).
- Strategy AI endpoint (`/api/strategy`) powered by OpenAI.
- Deliverability analysis + SMTP/Resend outbound support (`/api/deliverability`, `/api/send-email`).

## Deployment (Vercel)
1. Import repo in Vercel.
2. Add all environment variables.
3. Set `DATABASE_URL` to managed PostgreSQL.
4. Run `npx prisma migrate deploy` in CI/CD.
5. Deploy and verify `/api/leads` and `/api/send-email`.

## Integration Notes
- Keep **OpenStreetMap** as baseline free provider; layer paid APIs only for enrichment depth.
- For outreach compliance, enforce opt-outs and sender limits in campaign scheduler.
- Add queue-backed retries in Inngest functions for high-volume campaign sends.
