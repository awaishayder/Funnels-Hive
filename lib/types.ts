export type Business = {
  id: string;
  name: string;
  email: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  rating: number | null;
  totalReviews: number | null;
  mapsLink: string;
  lat: number | null;
  lng: number | null;
  source: 'google' | 'yelp';
};
