import Link from 'next/link';
const pages = ['dashboard','lead-finder','lead-details','campaigns','crm','strategy','settings'];
export default function Home() {
  return <main className="p-8"><h1 className="text-3xl font-bold">AI Agency Growth OS</h1><div className="mt-6 grid grid-cols-2 gap-3">{pages.map(p=><Link key={p} className="rounded border p-3" href={`/${p}`}>{p}</Link>)}</div></main>;
}
