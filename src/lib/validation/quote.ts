import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(320),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  eventType: z.string().trim().min(2).max(120),
  eventDate: z.iso.date().optional().or(z.literal("")),
  eventLocation: z.string().trim().max(180).optional().or(z.literal("")),
  guestCount: z.coerce.number().int().min(1).max(100000).optional(),
  budget: z.coerce.number().min(0).max(100000000).optional(),
  serviceId: z.uuid().optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
