import { Briefcase, FileText, Calendar, Target, TrendingUp } from "lucide-react";
import type { Stats } from "@/services/client/dashboard.service";

const colorMap = {
  emerald: "bg-emerald-50 text-emerald-700",
  purple: "bg-purple-50 text-purple-700",
  amber: "bg-amber-50 text-amber-700",
  indigo: "bg-indigo-50 text-indigo-700",
} as const;

type StatItem = {
  icon: JSX.Element;
  label: string;
  value: string | number;
  badge: string;
  color: keyof typeof colorMap;
  bg: string;
};

export default function DashboardStats({ stats }: { stats: Stats }) {
  const statData: StatItem[] = [
    {
      icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
      label: "Job Applications",
      value: stats.applications,
      badge: "+12%",
      color: "emerald",
      bg: "bg-indigo-50",
    },
    {
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      label: "Resume Score",
      value: `${stats.resumeScore}/100`,
      badge: "Excellent",
      color: "emerald",
      bg: "bg-emerald-50",
    },
    {
      icon: <Calendar className="w-5 h-5 text-purple-600" />,
      label: "Upcoming Interviews",
      value: stats.interviews,
      badge: "Next: Google",
      color: "purple",
      bg: "bg-purple-50",
    },
    {
      icon: <Target className="w-5 h-5 text-amber-600" />,
      label: "Roadmap Progress",
      value: `${stats.roadmapProgress}%`,
      badge: "On track",
      color: "amber",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statData.map((s, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className={`${s.bg} p-2.5 rounded-lg`}>{s.icon}</div>
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${colorMap[s.color]}`}
            >
              {s.badge === "+12%" && <TrendingUp className="w-3 h-3" />}
              {s.badge}
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-3 tracking-tight">{s.value}</p>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{s.label}</p>
        </div>
      ))}
    </div>
  );
}