import { inngest } from './client';
export const runCampaign = inngest.createFunction({ id: 'campaign-runner' }, { event: 'campaign/start' }, async ({ event }) => {
  return { status: 'scheduled', campaignId: event.data.campaignId };
});
