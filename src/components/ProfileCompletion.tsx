import Link from "next/link";

export default function ProfileCompletion({
  percentage,
}: {
  percentage: number;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-gray-200/80 bg-white px-3 py-2 shadow-sm hover:shadow-md transition-shadow sm:flex-row sm:items-center">
      <div className="relative w-14 h-14 shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#4F46E5"
            strokeWidth="3"
            strokeDasharray={`${percentage * 0.5026} 100`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-800">
          {percentage}%
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">Profile Completion</p>
        <p className="text-xs text-gray-400 truncate">
          Complete GitHub and Portfolio to unlock better AI recommendations.
        </p>
      </div>
      <Link
        href={"/dashboard/profile"}
        className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors whitespace-nowrap"
      >
        Complete Profile →
      </Link>
    </div>
  );
}
