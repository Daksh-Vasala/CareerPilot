"use client";

import { useState } from "react";
import { Download, Upload, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useResumeUpload } from "@/hooks/useResumeUpload";

type Variant = "header" | "analyze" | "apply";

interface Props {
  variant: Variant;
  fileUrl?: string;
  fileName?: string;
}

export default function ResumeActions({
  variant,
  fileUrl,
  fileName,
}: Props) {
  const { uploading, inputRef, openFilePicker, handleFileSelect } =
    useResumeUpload();

  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(false);

  const handleDownload = async () => {
    if (!fileUrl) {
      toast.error("Resume not found.");
      return;
    }

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName ?? "resume.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Unable to download resume at the moment.");
    }
  };

  const handleAnalyzeAgain = async () => {
    try {
      setAnalyzing(true);

      const response = await fetch("/api/resume/analyze", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to analyze resume.");
      }

      toast.success(data.message);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze resume.");
    } finally {
      setAnalyzing(false);
    }
  };

  if (variant === "header") {
    return (
      <div className="flex gap-3">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
          ref={inputRef}
        />

        <button
          onClick={handleDownload}
          className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 flex items-center gap-2"
        >
          <Download size={18} />
          Download
        </button>

        <button
          onClick={openFilePicker}
          disabled={uploading}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Upload size={18} />
          {uploading ? "Uploading..." : "Replace Resume"}
        </button>
      </div>
    );
  }

  if (variant === "analyze") {
    return (
      <button
        onClick={handleAnalyzeAgain}
        disabled={analyzing}
        className="w-full py-3 border-2 border-indigo-200 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
      >
        <RefreshCw
          size={18}
          className={analyzing ? "animate-spin" : ""}
        />
        {analyzing ? "Analyzing..." : "Analyze Again"}
      </button>
    );
  }

  return null;
}