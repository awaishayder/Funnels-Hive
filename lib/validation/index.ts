import { z } from 'zod';
export const leadSearchSchema = z.object({ niche: z.string().min(2), city: z.string().min(2), workspaceId: z.string().min(4) });
export const strategySchema = z.object({ question: z.string().min(10) });
