import { Business } from '@/lib/types';

const base = 'https://maps.googleapis.com/maps/api/place';

export async function searchGoogleBusinesses(keyword: string, location: string): Promise<Business[]> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) throw new Error('GOOGLE_PLACES_API_KEY missing');

  const textSearchUrl = `${base}/textsearch/json?query=${encodeURIComponent(`${keyword} in ${location}`)}&key=${key}`;
  const searchRes = await fetch(textSearchUrl, { next: { revalidate: 1800 } });
  if (!searchRes.ok) throw new Error(`Google search failed: ${searchRes.status}`);
  const searchData = await searchRes.json();

  const top = (searchData.results ?? []).slice(0, 20);
  const details = await Promise.all(top.map(async (place: any) => {
    const detailsUrl = `${base}/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,url,geometry&key=${key}`;
    const dRes = await fetch(detailsUrl, { next: { revalidate: 1800 } });
    if (!dRes.ok) return null;
    const d = await dRes.json();
    const r = d.result;
    if (!r) return null;
    return {
      id: place.place_id,
      name: r.name,
      email: null,
      address: r.formatted_address ?? null,
      phone: r.formatted_phone_number ?? null,
      website: r.website ?? null,
      rating: typeof r.rating === 'number' ? r.rating : null,
      totalReviews: typeof r.user_ratings_total === 'number' ? r.user_ratings_total : null,
      mapsLink: r.url ?? `https://maps.google.com/?q=${encodeURIComponent(r.name)}`,
      lat: r.geometry?.location?.lat ?? null,
      lng: r.geometry?.location?.lng ?? null,
      source: 'google' as const
    } satisfies Business;
  }));

  return details.filter(Boolean) as Business[];
}
