import { NextResponse } from 'next/server'; import { buildAudit } from '@/lib/services/audit';
export async function POST(req:Request){const {leadName}=await req.json(); return NextResponse.json(buildAudit(leadName));}
