import { NextResponse } from 'next/server'; import { scoreLead } from '@/lib/services/scoring';
export async function POST(req:Request){const s=await req.json(); return NextResponse.json(scoreLead(s));}
