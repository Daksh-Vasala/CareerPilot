import { ai, GEMINI_MODEL } from "@/lib/gemini";
import {
  resumeAnalysisSchema,
  type ResumeAnalysis,
} from "@/schemas/resume-analysis.schema";

export async function generateResumeAnalysis(
  resumeText: string
): Promise<ResumeAnalysis> {
  const prompt = `
You are an expert ATS (Applicant Tracking System) resume reviewer and senior technical recruiter.

Analyze the resume below and return ONLY a valid JSON object.

Do not wrap the JSON in markdown.
Do not add explanations.
Do not add any text before or after the JSON.

Return exactly this structure:

{
  "atsScore": number,
  "summary": string,
  "overallFeedback": string,
  "strengths": string[],
  "weaknesses": string[],
  "technicalSkills": string[],
  "softSkills": string[],
  "missingSkills": string[],
  "suggestions": string[]
}

Scoring Rules:
- atsScore must be between 0 and 100.
- summary should be 2-3 sentences.
- overallFeedback should be concise and actionable.
- strengths should contain 3-6 points.
- weaknesses should contain 3-6 points.
- technicalSkills should list technologies found in the resume.
- softSkills should list inferred soft skills.
- missingSkills should list valuable skills missing for modern software roles.
- suggestions should provide practical resume improvements.

Resume:

${resumeText}
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  return resumeAnalysisSchema.parse(parsed);
}