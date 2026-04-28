import BusinessFinder from '@/components/business-finder';

export default function Home() {
  return <main className='max-w-5xl mx-auto p-6 space-y-6'>
    <h1 className='text-3xl font-bold'>Local Business Finder</h1>
    <p className='text-slate-300'>Search local businesses by keyword and location using Google Places.</p>
    <BusinessFinder />
  </main>;
}
