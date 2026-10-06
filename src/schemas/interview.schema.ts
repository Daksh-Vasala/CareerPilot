import { z } from "zod";

export const createInterviewSchema = z.object({
  applicationId: z.string().min(1, "Application is required"),

  type: z.enum([
    "TECHNICAL",
    "HR",
    "BEHAVIORAL",
    "SYSTEM_DESIGN",
    "CODING",
    "MANAGERIAL",
    "CULTURAL",
    "FINAL",
    "OTHER",
  ]),

  round: z
    .number()
    .int("Round must be a whole number")
    .min(1, "Round must be at least 1"),

  scheduledAt: z.coerce.date({
    message: "Invalid interview date",
  }),

  duration: z
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0")
    .optional(),

  location: z
    .enum(["ONLINE", "PHONE", "ONSITE", "OTHER"])
    .optional(),

  meetingLink: z
    .string()
    .url("Invalid meeting link")
    .optional()
    .or(z.literal("")),

  interviewer: z
    .string()
    .trim()
    .max(100, "Interviewer name is too long")
    .optional()
    .or(z.literal("")),

  status: z
    .enum(["SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"])
    .optional(),

  result: z
    .enum(["PENDING", "PASSED", "FAILED"])
    .optional(),

  feedback: z
    .string()
    .trim()
    .max(2000, "Feedback is too long")
    .optional()
    .or(z.literal("")),
});