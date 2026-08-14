import { prisma } from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/enums";

interface CreateJobApplicationInput {
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

interface UpdateJobApplicationInput {
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

export async function createJobApplication(data: CreateJobApplicationInput) {
  return prisma.jobApplication.create({
    data: {
      userId: data.userId,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      jobUrl: data.jobUrl,
      location: data.location,
      jobType: data.jobType,
      salary: data.salary,
      status: data.status ?? ApplicationStatus.APPLIED,
      appliedAt: data.appliedAt ?? new Date(),
      notes: data.notes,
      recruiterName: data.recruiterName,
      recruiterEmail: data.recruiterEmail,
    },
  });
}

export async function getJobApplications(userId: string) {
  return prisma.jobApplication.findMany({
    where: {
      userId,
    },
    orderBy: {
      appliedAt: "desc",
    },
  });
}

export async function getJobApplicationById(id: string, userId: string) {
  return prisma.jobApplication.findFirst({
    where: {
      id,
      userId,
    },
  });
}

export async function updateJobApplication(
  id: string,
  userId: string,
  data: UpdateJobApplicationInput,
) {
  const existingApplication = await prisma.jobApplication.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existingApplication) {
    return null;
  }

  return prisma.jobApplication.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteJobApplication(id: string, userId: string) {
  const existingApplication = await prisma.jobApplication.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existingApplication) {
    return null;
  }

  return prisma.jobApplication.delete({
    where: {
      id,
    },
  });
}
