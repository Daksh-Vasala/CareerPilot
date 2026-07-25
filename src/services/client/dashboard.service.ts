// types
export type Task = { id: number; label: string; done: boolean };
export type App = {
  company: string;
  role: string;
  status: "Applied" | "In Review" | "Interview" | "Offer" | "Rejected";
  date: string;
  logo: string;
};
export type Interview = {
  company: string;
  role: string;
  time: string;
  date: string;
};
export type Stats = {
  applications: number;
  resumeScore: number;
  interviews: number;
  roadmapProgress: number;
};
export type Resume = {
  fileName: string;
  fileUrl: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
  
};

// Mock data
const MOCK_APPS: App[] = [
  {
    company: "Google",
    role: "Senior Frontend Eng.",
    status: "In Review",
    date: "Oct 12, 2023",
    logo: "G",
  },
];
const MOCK_INTERVIEWS: Interview[] = [
  {
    company: "ABC Technologies",
    role: "Frontend Developer",
    time: "10:00 AM",
    date: "Tomorrow",
  },
];
const MOCK_TASKS: Task[] = [
  { id: 1, label: "Upload latest resume", done: false },
  { id: 2, label: "Apply to 2 companies", done: false },
  { id: 3, label: "React interview prep", done: false },
];

export async function getStats(): Promise<Stats> {
  // simulate DB/API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    applications: 24,
    resumeScore: 92,
    interviews: 3,
    roadmapProgress: 65,
  };
}


export async function getTasks(): Promise<Task[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_TASKS;
}

export async function getRecentApplications(): Promise<App[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_APPS;
}

export async function getUpcomingInterviews(): Promise<Interview[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_INTERVIEWS;
}

export async function getProfileCompletion(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return 85;
}
