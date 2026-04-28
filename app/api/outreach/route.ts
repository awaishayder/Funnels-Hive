import { NextResponse } from 'next/server'; import { buildOutreach } from '@/lib/services/outreach';
export async function POST(req:Request){const b=await req.json(); return NextResponse.json(buildOutreach(b));}
