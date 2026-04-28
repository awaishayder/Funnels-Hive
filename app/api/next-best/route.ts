import { NextResponse } from 'next/server'; import { prisma } from '@/lib/prisma';
export async function GET(){const leads=await prisma.lead.findMany({orderBy:{intentScore:'desc'},take:10}); return NextResponse.json({leads});}
