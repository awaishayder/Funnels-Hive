import { Business } from '@/lib/types';

export async function searchYelpBusinesses(keyword: string, location: string): Promise<Business[]> {
  const key = process.env.YELP_API_KEY;
  if (!key) return [];
  const url = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}&limit=20`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` }, next: { revalidate: 1800 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.businesses ?? []).map((b: any) => ({
    id: b.id,
    name: b.name,
    email: null,
    address: b.location?.display_address?.join(', ') ?? null,
    phone: b.display_phone ?? null,
    website: null,
    rating: b.rating ?? null,
    totalReviews: b.review_count ?? null,
    mapsLink: b.url,
    lat: b.coordinates?.latitude ?? null,
    lng: b.coordinates?.longitude ?? null,
    source: 'yelp' as const
  }));
}
