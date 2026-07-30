import { deleteResume, uploadResume } from "@/lib/upload";
import {
  createResume,
  getResumeByUserId,
  updateResume,
} from "@/repositories/resume.repository";

import pdfParse from "pdf-parse-fixed";

export async function saveResume(userId: string, file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const extractedText = await extractResumeText(buffer);

  const uploaded = await uploadResume(buffer, file.name);

  const existingResume = await getResumeByUserId(userId);

  if (existingResume) {
    await deleteResume(existingResume.publicId);

    return updateResume(userId, {
      fileName: file.name,
      fileUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      extractedText,
      fileSize: uploaded.bytes,
    });
  }

  return createResume({
    userId,
    fileName: file.name,
    fileUrl: uploaded.secure_url,
    publicId: uploaded.public_id,
    extractedText,
    fileSize: uploaded.bytes,
  });
}

export async function getResume(userId: string) {
  return getResumeByUserId(userId);
}

export async function extractResumeText(buffer: Buffer): Promise<string> {
  const { text } = await pdfParse(buffer);

  return cleanResumeText(text);
}

function cleanResumeText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\u0000/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}
