export type JobApplication = {
  id: string;
  companyName: string;
  jobTitle: string;
  logo?: string | null;
  status: "APPLIED" | "SCREENING" | "INTERVIEWING" | "OFFER" | "REJECTED" | "WITHDRAWN";
  appliedAt: string;
  updatedAt: string;
};

export const MOCK_JOB_APPLICATIONS: JobApplication[] = [
  {
    id: "app-1",
    companyName: "Google",
    jobTitle: "Senior Frontend Engineer",
    status: "INTERVIEWING",
    appliedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-2",
    companyName: "Microsoft",
    jobTitle: "Full Stack Developer",
    status: "INTERVIEWING",
    appliedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-3",
    companyName: "Amazon",
    jobTitle: "Software Development Engineer",
    status: "INTERVIEWING",
    appliedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-4",
    companyName: "Meta",
    jobTitle: "React Developer",
    status: "INTERVIEWING",
    appliedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-5",
    companyName: "Netflix",
    jobTitle: "Senior UI Engineer",
    status: "REJECTED",
    appliedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-6",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    status: "SCREENING",
    appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-7",
    companyName: "Stripe",
    jobTitle: "Backend Engineer",
    status: "INTERVIEWING",
    appliedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-8",
    companyName: "Airbnb",
    jobTitle: "Product Engineer",
    status: "INTERVIEWING",
    appliedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-9",
    companyName: "Spotify",
    jobTitle: "Backend Engineer",
    status: "APPLIED",
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "app-10",
    companyName: "Uber",
    jobTitle: "Senior Software Engineer",
    status: "APPLIED",
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];