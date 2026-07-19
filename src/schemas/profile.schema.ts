import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().trim().min(3).max(100),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/)
    .optional()
    .or(z.literal("")),

  college: z.string().max(150).optional().or(z.literal("")),

  degree: z.string().max(100).optional().or(z.literal("")),

  graduationYear: z.coerce
    .number()
    .int()
    .min(2000)
    .max(2100)
    .optional(),

  github: z.string().url().optional().or(z.literal("")),

  linkedin: z.string().url().optional().or(z.literal("")),

  portfolio: z.string().url().optional().or(z.literal("")),

  bio: z.string().max(500).optional().or(z.literal("")),
});

export type ProfileInput = z.infer<typeof profileSchema>;