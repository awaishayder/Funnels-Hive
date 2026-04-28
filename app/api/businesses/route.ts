import { NextResponse } from 'next/server';
import { businessSearchSchema } from '@/lib/validation/business-search';
import { searchGoogleBusinesses } from '@/lib/integrations/google-places';
import { searchYelpBusinesses } from '@/lib/integrations/yelp';

export async function POST(req: Request) {
  try {
    const body = businessSearchSchema.parse(await req.json());
    const google = await searchGoogleBusinesses(body.keyword, body.location);
    const results = google.length > 0 ? google : await searchYelpBusinesses(body.keyword, body.location);
    return NextResponse.json({ businesses: results, source: google.length > 0 ? 'google' : 'yelp' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? 'Search failed' }, { status: 400 });
  }
}
