'use client';
import { useState } from 'react';
import { Business } from '@/lib/types';

export default function BusinessFinder() {
  const [keyword, setKeyword] = useState('dentist');
  const [location, setLocation] = useState('Austin, TX');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Business[]>([]);

  const search = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/businesses', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ keyword, location }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      setResults(data.businesses ?? []);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  return <div className='space-y-6'>
    <div className='grid md:grid-cols-3 gap-3'>
      <input className='rounded border bg-slate-900 p-3' value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder='Keyword' />
      <input className='rounded border bg-slate-900 p-3' value={location} onChange={e=>setLocation(e.target.value)} placeholder='City or location' />
      <button onClick={search} className='rounded bg-blue-600 p-3 font-semibold'>{loading ? 'Searching...' : 'Search'}</button>
    </div>
    {error && <p className='text-red-400'>{error}</p>}
    <div className='grid gap-4'>
      {results.map((b)=><div key={b.id} className='rounded border p-4 bg-slate-900'>
        <h3 className='font-bold text-lg'>{b.name}</h3>
        <p>{b.address ?? 'No address'}</p>
        <p>Phone: {b.phone ?? 'N/A'} | Email: {b.email ?? 'N/A'}</p>
        <p>Website: {b.website ? <a className='text-blue-300' href={b.website} target='_blank'>{b.website}</a> : 'N/A'}</p>
        <p>Rating: {b.rating ?? 'N/A'} ({b.totalReviews ?? 0} reviews)</p>
        <a className='text-blue-300' href={b.mapsLink} target='_blank'>Open Maps</a>
        <p>Coordinates: {b.lat ?? 'N/A'}, {b.lng ?? 'N/A'}</p>
      </div>)}
    </div>
  </div>;
}
