import { ApplicationStatus } from "@/generated/prisma/enums";

import {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} from "@/repositories/job-application.repository";

interface CreateJobApplicationData {
  userId: string;
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  location?: string;
  jobType?: string;
  salary?: string;
  status?: ApplicationStatus;
  appliedAt?: Date;
  notes?: string;
  recruiterName?: string;
  recruiterEmail?: string;
}

interface UpdateJobApplicationData {
  companyName?: string;
  jobTitle?: string;
  jobUrl?: string | null;
  location?: string | null;
  jobType?: string | null;
  salary?: string | null;
  status?: ApplicationStatus;
  appliedAt?: Date;
  notes?: string | null;
  recruiterName?: string | null;
  recruiterEmail?: string | null;
}

export async function createJobApplicationService(
  data: CreateJobApplicationData,
) {
  return createJobApplication(data);
}

export async function getJobApplicationsService(userId: string) {
  return getJobApplications(userId);
}

export async function getJobApplicationService(id: string, userId: string) {
  const application = await getJobApplicationById(id, userId);

  if (!application) {
    throw new Error("Job application not found");
  }

  return application;
}

export async function updateJobApplicationService(
  id: string,
  userId: string,
  data: UpdateJobApplicationData,
) {
  const application = await updateJobApplication(id, userId, data);

  if (!application) {
    throw new Error("Job application not found");
  }

  return application;
}

export async function deleteJobApplicationService(id: string, userId: string) {
  const application = await deleteJobApplication(id, userId);

  if (!application) {
    throw new Error("Job application not found");
  }

  return application;
}
