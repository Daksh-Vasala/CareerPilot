import { auth } from "@/auth";

import ResumeHeader from "./components/ResumeHeader";
import ResumeScore from "./components/ResumeScore";
import ResumeProfile from "./components/ResumeProfile";
import ResumeStrengths from "./components/ResumeStrengths";
import ResumeSkills from "./components/ResumeSkills";
import ResumeSuggestions from "./components/ResumeSuggestions";

import { getResumeAnalysis } from "@/services/resume-analysis.service";
import ResumeFeeback from "./components/ResumeFeeback";
import { getResume } from "@/services/resume.service";

export default async function ResumeAnalyzerPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const data = await getResumeAnalysis(session.user.id);

  const resume = await getResume(session.user.id);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Upload a resume to view analysis.
        </h2>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-8xl space-y-6 font-sans text-gray-900">
      <ResumeHeader
        fileName={resume?.fileName || ""}
        fileUrl={resume?.fileUrl || ""}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4">
          <ResumeScore
            score={data.atsScore}
            scoreLabel={data.scoreLabel}
            dashOffset={data.dashOffset}
            fileName={data.fileName}
          />
        </div>

        <div className="xl:col-span-8">
          <ResumeProfile
            summary={data.summary}
            feedback={data.overallFeedback}
          />
        </div>
      </div>

      <ResumeFeeback feedback={data.overallFeedback} />

      <ResumeStrengths
        strengths={
          Array.isArray(data.strengths) ? (data.strengths as string[]) : []
        }
        weaknesses={
          Array.isArray(data.weaknesses) ? (data.weaknesses as string[]) : []
        }
      />

      <ResumeSkills
        frontend={
          Array.isArray(data.frontend) ? (data.frontend as string[]) : []
        }
        backend={Array.isArray(data.backend) ? (data.backend as string[]) : []}
        tools={Array.isArray(data.tools) ? (data.tools as string[]) : []}
        softSkills={
          Array.isArray(data.softSkills) ? (data.softSkills as string[]) : []
        }
        missingSkills={
          Array.isArray(data.missingSkills)
            ? (data.missingSkills as string[])
            : []
        }
      />

      <ResumeSuggestions
        suggestions={
          Array.isArray(data.suggestions) ? (data.suggestions as []) : []
        }
      />

      {/* <ResumeHistory currentScore={data.atsScore} /> */}

      {/* <ResumeFooter /> */}
    </main>
  );
}
