import { NextResponse } from 'next/server';
import { sendOutboundEmail } from '@/lib/integrations/email';

export async function POST(req: Request) {
  const { to, subject, html } = await req.json();
  if (!to || !subject || !html) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const result = await sendOutboundEmail(to, subject, html);
  return NextResponse.json({ success: true, ...result });
}
