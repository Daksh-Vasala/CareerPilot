import { generateResumeAnalysis } from "@/lib/ai/resume-analysis";
import { getResumeById } from "@/repositories/resume.repository";
import {
  createResumeAnalysis,
  getResumeAnalysisByResumeId,
  updateResumeAnalysis,
} from "@/repositories/resume.repository";

export async function analyzeResume(resumeId: string) {
  
  const resume = await getResumeById(resumeId);

  if (!resume) {
    throw new Error("Resume not found.");
  }

  if (!resume.extractedText) {
    throw new Error("Resume text not found.");
  }

  const analysis = await generateResumeAnalysis(resume.extractedText);

  const existingAnalysis =
    await getResumeAnalysisByResumeId(resumeId);

  if (existingAnalysis) {
    return await updateResumeAnalysis(resumeId, {
      atsScore: analysis.atsScore,
      summary: analysis.summary,
      overallFeedback: analysis.overallFeedback,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      technicalSkills: analysis.technicalSkills,
      softSkills: analysis.softSkills,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions,
      analyzedAt: new Date(),
    });
  }

  return await createResumeAnalysis({
    atsScore: analysis.atsScore,
    summary: analysis.summary,
    overallFeedback: analysis.overallFeedback,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    technicalSkills: analysis.technicalSkills,
    softSkills: analysis.softSkills,
    missingSkills: analysis.missingSkills,
    suggestions: analysis.suggestions,
    analyzedAt: new Date(),

    resume: {
      connect: {
        id: resumeId,
      },
    },
  });
}