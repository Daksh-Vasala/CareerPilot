import { CheckCircle, Verified } from "lucide-react";
import ResumeActions from "./ResumeActions";

interface Props {
  score: number;
  scoreLabel: string;
  dashOffset: number;
  fileName: string;
}

export default function ResumeScore({
  score,
  scoreLabel,
  dashOffset,
  fileName,
}: Props) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center">
        <div className="relative w-48 h-48 mb-6">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={dashOffset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gray-900">{score}</span>
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              {scoreLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1">
            <CheckCircle size={16} />
            ATS Friendly
          </span>

          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full flex items-center gap-1">
            <Verified size={16} />
            High Impact
          </span>
        </div>

        <div className="w-full bg-gray-100 p-4 rounded-lg border border-gray-200 text-left mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Active File</span>
            <span className="text-gray-500">{fileName}</span>
          </div>
        </div>

        <ResumeActions variant="analyze" />
      </div>
    </div>
  );
}