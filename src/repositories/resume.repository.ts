import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export function getResumeByUserId(userId: string) {
  return prisma.resume.findUnique({
    where: {
      userId,
    },
  });
}

export function createResume(data: {
  userId: string;
  fileName: string;
  fileUrl: string;
  publicId: string;
  extractedText: string;
  fileSize: number;
}) {
  return prisma.resume.create({
    data,
  });
}

export function updateResume(
  userId: string,
  data: {
    fileName: string;
    fileUrl: string;
    publicId: string;
    extractedText: string;
    fileSize: number;
  },
) {
  return prisma.resume.update({
    where: {
      userId,
    },
    data,
  });
}

export function deleteResume(userId: string) {
  return prisma.resume.delete({
    where: {
      userId,
    },
  });
}

export async function createResumeAnalysis(
  data: Prisma.ResumeAnalysisCreateInput,
) {
  return prisma.resumeAnalysis.create({
    data,
  });
}


export async function getResumeById(id: string) {
  return prisma.resume.findUnique({
    where: {
      id,
    },
  });
}

export async function getResumeAnalysisByResumeId(resumeId: string) {
  return prisma.resumeAnalysis.findUnique({
    where: {
      resumeId,
    },
  });
}

export async function updateResumeAnalysis(
  resumeId: string,
  data: Prisma.ResumeAnalysisUpdateInput
) {
  return prisma.resumeAnalysis.update({
    where: {
      resumeId,
    },
    data,
  });
}

export async function deleteResumeAnalysis(resumeId: string) {
  return prisma.resumeAnalysis.delete({
    where: {
      resumeId,
    },
  });
}