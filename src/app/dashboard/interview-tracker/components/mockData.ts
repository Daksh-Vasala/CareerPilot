import { Interview, JobApplication, JobApplicationWithInterviews } from "./types";
import { MOCK_JOB_APPLICATIONS } from "./jobApplications";

export const MOCK_INTERVIEWS: Interview[] = [
  {
    id: "int-1",
    applicationId: "app-1",
    type: "TECHNICAL",
    round: 2,
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 60,
    location: "ONLINE",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    interviewer: "Sarah Chen",
    status: "SCHEDULED",
    result: "PENDING",
    feedback: "",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "int-2",
    applicationId: "app-2",
    type: "SYSTEM_DESIGN",
    round: 3,
    scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 90,
    location: "ONLINE",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/...",
    interviewer: "James Wilson",
    status: "SCHEDULED",
    result: "PENDING",
    feedback: "",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "int-3",
    applicationId: "app-3",
    type: "CODING",
    round: 1,
    scheduledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 60,
    location: "ONLINE",
    meetingLink: "https://chime.aws/...",
    interviewer: "Maria Garcia",
    status: "COMPLETED",
    result: "PASSED",
    feedback: "Strong problem-solving skills. Good communication during coding. Recommended for next round.",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "int-4",
    applicationId: "app-4",
    type: "BEHAVIORAL",
    round: 2,
    scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 45,
    location: "ONLINE",
    meetingLink: "https://meet.google.com/xyz-uvw-rst",
    interviewer: "David Kim",
    status: "COMPLETED",
    result: "PASSED",
    feedback: "Good cultural fit. Strong examples of past projects and teamwork.",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "int-5",
    applicationId: "app-5",
    type: "TECHNICAL",
    round: 1,
    scheduledAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 60,
    location: "ONSITE",
    meetingLink: "",
    interviewer: "Lisa Thompson",
    status: "COMPLETED",
    result: "FAILED",
    feedback: "Technical knowledge gaps in React internals. Need more experience with performance optimization.",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "int-6",
    applicationId: "app-6",
    type: "HR",
    round: 1,
    scheduledAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 30,
    location: "PHONE",
    meetingLink: "",
    interviewer: "Robert Johnson",
    status: "SCHEDULED",
    result: "PENDING",
    feedback: "",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "int-7",
    applicationId: "app-7",
    type: "SYSTEM_DESIGN",
    round: 2,
    scheduledAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 90,
    location: "ONLINE",
    meetingLink: "https://meet.google.com/stripe-design",
    interviewer: "Emily Davis",
    status: "COMPLETED",
    result: "PASSED",
    feedback: "Excellent system design thinking. Scalable architecture proposals.",
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "int-8",
    applicationId: "app-8",
    type: "CULTURAL",
    round: 3,
    scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 45,
    location: "ONLINE",
    meetingLink: "https://meet.google.com/airbnb-culture",
    interviewer: "Michael Brown",
    status: "SCHEDULED",
    result: "PENDING",
    feedback: "",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function buildMockApplicationsWithInterviews(): JobApplicationWithInterviews[] {
  const interviewsByAppId = new Map<string, Interview[]>();

  for (const interview of MOCK_INTERVIEWS) {
    const appId = interview.applicationId;
    if (!interviewsByAppId.has(appId)) {
      interviewsByAppId.set(appId, []);
    }
    interviewsByAppId.get(appId)!.push(interview);
  }

  return MOCK_JOB_APPLICATIONS
    .filter((app) => app.status === "INTERVIEWING")
    .map((app) => ({
      ...app,
      interviews: (interviewsByAppId.get(app.id) || [])
        .sort((a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt)),
    }))
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export const MOCK_JOB_APPLICATIONS_WITH_INTERVIEWS = buildMockApplicationsWithInterviews();

/**
 * Simple adapter: transforms Prisma JobApplication (with interviews) to UI type
 * - Maps status "INTERVIEW" -> "INTERVIEWING"
 * - Ensures interviews array exists (empty if none)
 * - Sorts interviews by scheduledAt
 * - Sorts applications by updatedAt desc
 */
export function adaptJobApplicationsForTracker(
  prismaApps: Array<{
    id: string;
    companyName: string;
    jobTitle: string;
    status: string;
    appliedAt: Date | string;
    updatedAt: Date | string;
    interviews?: Array<{
      id: string;
      applicationId: string;
      type: string;
      round: number;
      scheduledAt: Date | string;
      duration: number | null;
      location: string | null;
      meetingLink: string | null;
      interviewer: string | null;
      status: string;
      result: string;
      feedback: string | null;
      createdAt: Date | string;
      updatedAt: Date | string;
    }>;
  }>
): JobApplicationWithInterviews[] {
  return prismaApps
    .filter((app) => app.status === "INTERVIEW")
    .map((app) => {
      const mappedStatus = app.status === "INTERVIEW" ? "INTERVIEWING" : app.status;
      const interviews = (app.interviews || []).map((i) => ({
        id: i.id,
        applicationId: i.applicationId,
        type: i.type as Interview["type"],
        round: i.round,
        scheduledAt: i.scheduledAt instanceof Date ? i.scheduledAt.toISOString() : i.scheduledAt,
        duration: i.duration,
        location: i.location as Interview["location"],
        meetingLink: i.meetingLink,
        interviewer: i.interviewer,
        status: i.status as Interview["status"],
        result: i.result as Interview["result"],
        feedback: i.feedback,
        createdAt: i.createdAt instanceof Date ? i.createdAt.toISOString() : i.createdAt,
        updatedAt: i.updatedAt instanceof Date ? i.updatedAt.toISOString() : i.updatedAt,
      })).sort((a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt));

      return {
        id: app.id,
        companyName: app.companyName,
        jobTitle: app.jobTitle,
        logo: null,
        status: mappedStatus as JobApplication["status"],
        appliedAt: app.appliedAt instanceof Date ? app.appliedAt.toISOString() : app.appliedAt,
        updatedAt: app.updatedAt instanceof Date ? app.updatedAt.toISOString() : app.updatedAt,
        interviews,
      };
    })
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}