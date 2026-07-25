import { api } from "@/lib/api";
import { Resume } from "@/types/resume.type";


export function getResume() {
  return api<Resume | null>("/api/resume");
}

export function uploadResume(formData: FormData) {
  return api<Resume>("/api/resume", {
    method: "POST",
    body: formData,
  });
}
