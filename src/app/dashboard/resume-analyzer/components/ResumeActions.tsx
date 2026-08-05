"use client";

import { Download, Upload, RefreshCw } from "lucide-react";

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
  const handleDownload = () => {
    if (!fileUrl) return;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName ?? "resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReplace = () => {
    // TODO
  };

  const handleAnalyzeAgain = () => {
    // TODO
  };

  const handleApplyAll = () => {
    // TODO
  };

  if (variant === "header") {
    return (
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 flex items-center gap-2"
        >
          <Download size={18} />
          Download
        </button>

        <button
          onClick={handleReplace}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2"
        >
          <Upload size={18} />
          Replace Resume
        </button>
      </div>
    );
  }

  if (variant === "analyze") {
    return (
      <button
        onClick={handleAnalyzeAgain}
        className="w-full py-3 border-2 border-indigo-200 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 flex items-center justify-center gap-2 transition"
      >
        <RefreshCw size={18} />
        Analyze Again
      </button>
    );
  }

  if (variant === "apply") {
    return (
      <button
        onClick={handleApplyAll}
        className="text-sm text-indigo-600 font-bold hover:underline"
      >
        Apply all changes
      </button>
    );
  }

  return null;
}