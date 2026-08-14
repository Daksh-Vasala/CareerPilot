import { z } from "zod";
import { ApplicationStatus } from "@/generated/prisma/enums";

export const createJobApplicationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name is too long"),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(150, "Job title is too long"),

  jobUrl: z.url("Invalid job URL").optional().or(z.literal("")),

  location: z.string().trim().max(100, "Location is too long").optional(),

  jobType: z.string().trim().max(50, "Job type is too long").optional(),

  salary: z.string().trim().max(100, "Salary is too long").optional(),

  status: z.enum(ApplicationStatus).default(ApplicationStatus.APPLIED),

  appliedAt: z.coerce.date().optional(),

  notes: z.string().trim().max(5000, "Notes are too long").optional(),

  recruiterName: z
    .string()
    .trim()
    .max(100, "Recruiter name is too long")
    .optional(),

  recruiterEmail: z
    .email("Invalid recruiter email")
    .optional()
    .or(z.literal("")),
});

export const updateJobApplicationSchema = createJobApplicationSchema.partial();
