import { NextResponse } from 'next/server';
export async function POST(req:Request){const {content}=await req.json(); const spam=/free money|urgent transfer/i.test(content); return NextResponse.json({spamRisk:spam?'high':'low',warmupPlan:'Start with 20 emails/day and +10 daily'});}
