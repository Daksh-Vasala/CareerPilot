"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, FileText, Upload } from "lucide-react";
import { uploadResume } from "@/services/client/resume.service";
import type { Resume } from "@/services/client/dashboard.service";

export default function ResumeCard({ initialResume }: { initialResume: Resume | null }) {
  const router = useRouter();
  const [resume, setResume] = useState<Resume | null>(initialResume);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("resume", file);
      const uploaded = await uploadResume(formData);
      setResume(uploaded);
      toast.success("Resume uploaded successfully");
      router.refresh(); // re-fetch server components to update the page
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

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  if (resume === null) {
    return (
      <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-indigo-600" />
          <h3 className="font-medium text-gray-900">Resume</h3>
        </div>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
          ref={inputRef}
        />
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-300 transition-colors">
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6 text-indigo-600" />
          </div>
          <p className="text-sm font-medium text-gray-700">Upload your resume</p>
          <p className="text-xs text-gray-400 mt-0.5">to unlock AI analysis</p>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 cursor-pointer disabled:opacity-60"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-4 h-4 text-indigo-600" />
        <h3 className="font-medium text-gray-900">Resume</h3>
      </div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
        ref={inputRef}
      />
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="w-11 h-11 rounded-lg bg-indigo-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{resume.fileName}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Uploaded
              </span>
              <span>•</span>
              <span>{formatDate(resume.createdAt)}</span>
              <span>•</span>
              <span>{formatBytes(resume.fileSize)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            disabled={uploading}
          >
            <FileText className="w-4 h-4" />
            Analyze
          </button>
          <button
            onClick={() => window.open(resume.fileUrl, "_blank")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FileText className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "Replacing..." : "Replace"}
          </button>
        </div>
      </div>
    </div>
  );
}