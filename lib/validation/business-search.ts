import { z } from 'zod';
export const businessSearchSchema = z.object({ keyword: z.string().min(2), location: z.string().min(2) });
