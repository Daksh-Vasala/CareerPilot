import type { Metadata } from "next";
import ApplicationsClient from "./components/ApplicationsClient";
import type { Application } from "./components/types";
import { getJobApplicationsService } from "@/services/job-application.service";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Job Applications | CareerPilot",
  description: "Track and manage every job application, interview and offer in one clean dashboard.",
  openGraph: {
    title: "Job Applications | CareerPilot",
    description: "Track and manage every job application, interview and offer in one clean dashboard.",
    type: "website",
  },
};

// Replace with a real DB/API call — this stays on the server.
async function getApplications(): Promise<Application[]> {
  const session = await auth();
  const data = await getJobApplicationsService(session!.user?.id);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((app: any) => ({
    id: app.id,
    companyName: app.companyName,
    jobTitle: app.jobTitle,
    location: app.location || "",
    status: app.status,
    appliedAt: app.appliedAt.toISOString(),
    logo: app.logo || null,
    jobUrl: app.jobUrl || null,
    jobType: app.jobType || null,
    salary: app.salary || null,
    notes: app.notes || null,
    recruiterName: app.recruiterName || null,
    recruiterEmail: app.recruiterEmail || null,
  }) as Application);
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-semibold tabular-nums ${tone}`}>{value}</p>
    </div>
  );
}

export default async function JobApplicationsPage() {
  const applications = await getApplications();

  const total = applications.length;
  const count = (s: Application["status"]) => applications.filter((a) => a.status === s).length;

  return (
    <main className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Job Applications
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 sm:text-base">
              Track and manage your job search in one place.
            </p>
          </div>
        </header>

        <section aria-label="Overview" className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Stat label="Total Applications" value={total} tone="text-slate-900" />
          <Stat label="Applied" value={count("APPLIED")} tone="text-indigo-600" />
          <Stat label="Interviewing" value={count("INTERVIEW")} tone="text-emerald-600" />
          <Stat label="Offers" value={count("OFFER")} tone="text-teal-600" />
          <Stat label="Rejected" value={count("REJECTED")} tone="text-rose-600" />
        </section>

        <section className="mt-6">
          <ApplicationsClient applications={applications} />
        </section>
      </div>
    </main>
  );
}
