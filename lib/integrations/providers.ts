export type DiscoveredLead = {
  name: string;
  website: string | null;
  email: string | null;
  phone: string | null;
  rating: number | null;
  source: string;
};

async function fetchOverpassLeads(niche: string, city: string): Promise<DiscoveredLead[]> {
  const query = `[out:json][timeout:25];area[name="${city}"]->.searchArea;(node["shop"~"${niche}"](area.searchArea);node["amenity"~"${niche}"](area.searchArea););out tags center 20;`;
  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`
  });
  if (!response.ok) return [];
  const data = await response.json();
  return (data.elements ?? []).slice(0, 25).map((e: any) => ({
    name: e.tags?.name ?? `${city} ${niche}`,
    website: e.tags?.website ?? null,
    email: e.tags?.email ?? null,
    phone: e.tags?.phone ?? null,
    rating: null,
    source: 'openstreetmap'
  }));
}

async function fetchGooglePlacesLeads(niche: string, city: string): Promise<DiscoveredLead[]> {
  if (!process.env.GOOGLE_PLACES_API_KEY) return [];
  const q = encodeURIComponent(`${niche} in ${city}`);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${q}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) return [];
  const data = await response.json();
  return (data.results ?? []).slice(0, 20).map((r: any) => ({
    name: r.name,
    website: null,
    email: null,
    phone: null,
    rating: typeof r.rating === 'number' ? r.rating : null,
    source: 'google'
  }));
}

export async function discoverLeads(niche: string, city: string): Promise<DiscoveredLead[]> {
  const [free, premium] = await Promise.allSettled([
    fetchOverpassLeads(niche, city),
    fetchGooglePlacesLeads(niche, city)
  ]);

  const leads = [
    ...(free.status === 'fulfilled' ? free.value : []),
    ...(premium.status === 'fulfilled' ? premium.value : [])
  ];

  const unique = new Map<string, DiscoveredLead>();
  leads.forEach((lead) => unique.set(`${lead.name}-${lead.phone ?? 'na'}`, lead));
  return Array.from(unique.values()).slice(0, 50);
}
