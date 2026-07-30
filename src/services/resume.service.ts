import { deleteResume, uploadResume } from "@/lib/upload";
import {
  createResume,
  getResumeByUserId,
  updateResume,
} from "@/repositories/resume.repository";

import pdfParse from "pdf-parse-fixed";

import { analyzeResume } from "@/services/resume-analysis.service";

export async function saveResume(userId: string, file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const extractedText = await extractResumeText(buffer);

  const uploaded = await uploadResume(buffer, file.name);

  const existingResume = await getResumeByUserId(userId);

  let resume;

  if (existingResume) {
    await deleteResume(existingResume.publicId);

    resume = await updateResume(userId, {
      fileName: file.name,
      fileUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      extractedText,
      fileSize: uploaded.bytes,
    });
  } else {
    resume = await createResume({
      userId,
      fileName: file.name,
      fileUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      extractedText,
      fileSize: uploaded.bytes,
    });
  }

  try {
    await analyzeResume(resume.id);
  } catch (error) {
    console.error("Resume analysis failed:", error);
  }

  return resume;
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
