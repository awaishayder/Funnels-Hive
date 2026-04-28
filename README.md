# Local Business Finder

Next.js App Router module for finding and displaying local businesses using Google Places API (with optional Yelp fallback).

## Features
- Search by keyword + city/location.
- Server-side API route integration with Google Places Text Search + Place Details.
- Optional fallback to Yelp if Google has no results.
- Displays: name, address, phone, website, rating, review count, maps link, coordinates, and email placeholder.
- Rate-limit friendly fetch timeout and robust error handling.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Add `GOOGLE_PLACES_API_KEY` (required) and optionally `YELP_API_KEY`
4. `npm run dev`

## API
`POST /api/businesses`
```json
{ "keyword": "dentist", "location": "Austin, TX" }
```

## Vercel Deployment
1. Push to GitHub.
2. Import in Vercel.
3. Add env vars (`GOOGLE_PLACES_API_KEY`, optional `YELP_API_KEY`).
4. Deploy.

The API key remains server-side only and is never exposed to the browser.
