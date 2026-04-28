import { NextResponse } from 'next/server';
export async function POST(req:Request){const {leadName,services,price}=await req.json(); return NextResponse.json({proposal:`Proposal for ${leadName}`,contract:`Service contract: ${services.join(',')}`,invoice:{amount:price,currency:'USD'}});}
