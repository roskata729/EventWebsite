import { z } from "zod";

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(320),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  eventDate: z.iso.date().optional().or(z.literal("")),
});

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;
