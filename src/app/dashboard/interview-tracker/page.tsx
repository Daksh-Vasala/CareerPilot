import type { Metadata } from "next";
import InterviewTrackerClient from "./components/InterviewTrackerClient";
import { adaptJobApplicationsForTracker } from "./components/mockData";
import type { JobApplicationWithInterviews } from "./components/types";
import { auth } from "@/auth";
import { getJobApplicationsInterviewService } from "@/services/interview-tracker.service";

export const metadata: Metadata = {
  title: "Interview Tracker | CareerPilot",
  description:
    "Track and manage your interviews, from scheduling to results, all in one place.",
  openGraph: {
    title: "Interview Tracker | CareerPilot",
    description:
      "Track and manage your interviews, from scheduling to results, all in one place.",
    type: "website",
  },
};

async function getApplicationsForTracker(): Promise<JobApplicationWithInterviews[]> {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  try {
    const prismaApps = await getJobApplicationsInterviewService(session.user.id);
    if (prismaApps && Array.isArray(prismaApps) && prismaApps.length > 0) {
      return adaptJobApplicationsForTracker(prismaApps);
    }
  } catch (error) {
    console.error("Failed to fetch interviews from service:", error);
  }

  return [];
}

export default async function InterviewTrackerPage() {
  const applications = await getApplicationsForTracker();
  return (
    <div className="mx-auto max-w-8xl space-y-6 px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Interview Tracker
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Manage your interview pipeline from scheduling to results.
            </p>
          </div>
        </div>
      </header>

      <section>
        <InterviewTrackerClient applications={applications} />
      </section>
    </div>
  );
}
