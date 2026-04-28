import { NextResponse } from 'next/server'; import { openai } from '@/lib/ai/client'; import { strategySchema } from '@/lib/validation';
export async function POST(req:Request){const {question}=strategySchema.parse(await req.json()); const r=await openai.responses.create({model:'gpt-4.1-mini',input:`Give GTM strategy for: ${question}`}); return NextResponse.json({answer:r.output_text});}
