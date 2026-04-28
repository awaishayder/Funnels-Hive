import { NextResponse } from 'next/server';
import { discoverLeads } from '@/lib/integrations/providers';
import { prisma } from '@/lib/prisma';
import { leadSearchSchema } from '@/lib/validation';
import { scoreLead } from '@/lib/services/scoring';

export async function POST(req: Request) {
  const body = leadSearchSchema.parse(await req.json());
  const discovered = await discoverLeads(body.niche, body.city);

  const leads = discovered.map((lead) => {
    const scoring = scoreLead({
      ads: false,
      hiring: false,
      badReviews: lead.rating && lead.rating < 4 ? 2 : 0,
      seoPoor: !lead.website,
      siteOutdated: !lead.website
    });
    return {
      ...lead,
      niche: body.niche,
      city: body.city,
      workspaceId: body.workspaceId,
      intentScore: scoring.score,
      temperature: scoring.temperature
    };
  });

  await prisma.lead.createMany({ data: leads });
  return NextResponse.json({ count: leads.length, leads });
}
