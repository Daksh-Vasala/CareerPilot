// src/hooks/useResumeUpload.ts
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { uploadResume } from "@/services/client/resume.service";
import type { Resume } from "@/services/client/dashboard.service";

export function useResumeUpload(onSuccess?: (resume: Resume) => void) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("resume", file);
      const uploaded = await uploadResume(formData);
      onSuccess?.(uploaded);
      toast.success("Resume uploaded successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be smaller than 5 MB");
      e.target.value = "";
      return;
    }
    await handleUpload(file);
    e.target.value = "";
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return { uploading, inputRef, openFilePicker, handleFileSelect };
}