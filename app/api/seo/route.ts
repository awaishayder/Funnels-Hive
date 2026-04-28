import { NextResponse } from 'next/server';
export async function POST(req:Request){const {keyword,city}=await req.json(); return NextResponse.json({backlinks:[`${keyword} ${city} directory`],guestPosts:[`${city} business blog`],partnerships:[`${city} chamber of commerce`]});}
