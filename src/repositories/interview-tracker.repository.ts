import {
  InterviewLocation,
  InterviewResult,
  InterviewStatus,
  InterviewType,
} from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export type CreateInterviewInput = {
  applicationId: string;
  type: InterviewType;
  round: number;
  scheduledAt: Date;
  duration?: number;
  location?: InterviewLocation;
  meetingLink?: string;
  interviewer?: string;
  status?: InterviewStatus;
  result?: InterviewResult;
  feedback?: string;
};

export type UpdateInterviewInput = Partial<Omit<CreateInterviewInput, "applicationId">>;

export async function getJobApplicationsInterview(userId: string) {
  return prisma.jobApplication.findMany({
    where: {
      userId,
      status: "INTERVIEW",
    },
    include: {
      interviews: true,
    },
  });
}

export async function getInterviewsByApplicationId(id: string) {
  const interviews = await prisma.interview.findMany({
    where: {
      applicationId: id,
    },
  });

  return interviews;
}

export async function getInterviewById(id: string) {
  const interview = await prisma.interview.findUnique({
    where: {
      id,
    },
    include: {
      application: true,
    },
  });

  return interview;
}

export async function createInterview(data: CreateInterviewInput) {
  return prisma.interview.create({
    data,
  });
}

export async function updateInterview(id: string, data: UpdateInterviewInput) {
  return prisma.interview.update({
    where: { id },
    data,
  });
}

export async function deleteInterview(id: string) {
  return prisma.interview.delete({
    where: { id },
  });
}

export async function getInterviewsByUserId(userId: string) {
  return prisma.interview.findMany({
    where: {
      application: {
        userId,
      },
    },
    include: {
      application: true,
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });
}
