export type InterviewType =
  | "TECHNICAL"
  | "HR"
  | "BEHAVIORAL"
  | "SYSTEM_DESIGN"
  | "CODING"
  | "MANAGERIAL"
  | "CULTURAL"
  | "FINAL"
  | "OTHER";

export type InterviewLocation = "ONLINE" | "PHONE" | "ONSITE" | "OTHER";

export type InterviewStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

export type InterviewResult = "PENDING" | "PASSED" | "FAILED";

export type JobApplication = {
  id: string;
  companyName: string;
  jobTitle: string;
  logo?: string | null;
  status: "APPLIED" | "SCREENING" | "INTERVIEWING" | "OFFER" | "REJECTED" | "WITHDRAWN";
  appliedAt: string;
  updatedAt: string;
};

export type Interview = {
  id: string;
  applicationId: string;
  type: InterviewType;
  round: number;
  scheduledAt: string;
  duration?: number | null;
  location: InterviewLocation;
  meetingLink?: string | null;
  interviewer?: string | null;
  status: InterviewStatus;
  result: InterviewResult;
  feedback?: string | null;
  createdAt: string;
  updatedAt: string;
};

export const interviewTypeStyles: Record<InterviewType, string> = {
  TECHNICAL: "bg-blue-50 text-blue-700 ring-blue-200",
  HR: "bg-purple-50 text-purple-700 ring-purple-200",
  BEHAVIORAL: "bg-green-50 text-green-700 ring-green-200",
  SYSTEM_DESIGN: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  CODING: "bg-orange-50 text-orange-700 ring-orange-200",
  MANAGERIAL: "bg-teal-50 text-teal-700 ring-teal-200",
  CULTURAL: "bg-pink-50 text-pink-700 ring-pink-200",
  FINAL: "bg-amber-50 text-amber-700 ring-amber-200",
  OTHER: "bg-slate-50 text-slate-700 ring-slate-200",
};

export const interviewStatusStyles: Record<InterviewStatus, string> = {
  SCHEDULED: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-700 ring-rose-200",
  NO_SHOW: "bg-amber-50 text-amber-700 ring-amber-200",
};

export const interviewResultStyles: Record<InterviewResult, string> = {
  PENDING: "bg-slate-50 text-slate-700 ring-slate-200",
  PASSED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  FAILED: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const interviewLocationStyles: Record<InterviewLocation, string> = {
  ONLINE: "bg-blue-50 text-blue-700",
  PHONE: "bg-green-50 text-green-700",
  ONSITE: "bg-purple-50 text-purple-700",
  OTHER: "bg-slate-50 text-slate-700",
};

export interface InterviewFormData {
  applicationId: string;
  type: InterviewType;
  round: number;
  scheduledAt: string;
  duration?: number;
  location: InterviewLocation;
  meetingLink?: string;
  interviewer?: string;
  status: InterviewStatus;
  result: InterviewResult;
  feedback?: string;
}

export type JobApplicationWithInterviews = JobApplication & {
  interviews: Interview[];
};