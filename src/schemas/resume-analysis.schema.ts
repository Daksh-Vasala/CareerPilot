import { z } from "zod";

export const resumeAnalysisSchema = z.object({
  atsScore: z.number().min(0).max(100),

  summary: z.string(),

  overallFeedback: z.string(),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  technicalSkills: z.array(z.string()),

  softSkills: z.array(z.string()),

  missingSkills: z.array(z.string()),

  suggestions: z.array(z.string()),
});

export type ResumeAnalysis = z.infer<typeof resumeAnalysisSchema>;