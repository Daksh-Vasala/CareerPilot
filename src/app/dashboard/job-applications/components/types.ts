export type ApplicationStatus =
  | "APPLIED"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED";

export type Application = {
  id: string;
  companyName: string;
  logo?: string | null;
  jobTitle: string;
  location: string;
  status: ApplicationStatus;
  appliedAt: string; // ISO date
  jobUrl?: string | null;
  jobType?: string | null;
  salary?: string | null;
  notes?: string | null;
  recruiterName?: string | null;
  recruiterEmail?: string | null;
};

export const statusStyles: Record<ApplicationStatus, string> = {
  APPLIED: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  INTERVIEW: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  OFFER: "bg-teal-50 text-teal-700 ring-teal-200",
  REJECTED: "bg-rose-50 text-rose-700 ring-rose-200",
};
