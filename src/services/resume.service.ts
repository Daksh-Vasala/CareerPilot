import { deleteResume, uploadResume } from "@/lib/upload";
import {
  createResume,
  getResumeByUserId,
  updateResume,
} from "@/repositories/resume.repository";

export async function saveResume(userId: string, file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploaded = await uploadResume(buffer, file.name);

  const existingResume = await getResumeByUserId(userId);

  if (existingResume) {
    await deleteResume(existingResume.publicId);

    return updateResume(userId, {
      fileName: file.name,
      fileUrl: uploaded.secure_url,
      publicId: uploaded.public_id,
      fileSize: uploaded.bytes,
    });
  }

  return createResume({
    userId,
    fileName: file.name,
    fileUrl: uploaded.secure_url,
    publicId: uploaded.public_id,
    fileSize: uploaded.bytes,
  });
}

export async function getResume(userId: string) {
  return getResumeByUserId(userId);
}
