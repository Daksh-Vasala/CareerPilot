import { z } from "zod";

export const resumeSchema = z.object({
  resume: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Resume is required")
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed"
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Maximum file size is 5 MB"
    ),
});

export type ResumeInput = z.infer<typeof resumeSchema>;