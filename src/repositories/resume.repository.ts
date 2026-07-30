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
