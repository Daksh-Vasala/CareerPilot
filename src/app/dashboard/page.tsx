"use client";

import { useState } from "react";
import {
  Briefcase,
  FileText,
  Calendar,
  Target,
  TrendingUp,
  Upload,
  Sparkles,
  Users,
  Plus,
  Rocket,
  Check,
  Clock,
  Building2,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { ResumeCard } from "@/components/ResumeCard";
import { ProfileCompletion } from "@/components/ProfileCompletion";

type Task = { id: number; label: string; done: boolean };
type App = {
  company: string;
  role: string;
  status: "Applied" | "In Review" | "Interview" | "Offer" | "Rejected";
  date: string;
  logo: string;
};
type Interview = { company: string; role: string; time: string; date: string };

const MOCK_APPS: App[] = [
  {
    company: "Google",
    role: "Senior Frontend Eng.",
    status: "In Review",
    date: "Oct 12, 2023",
    logo: "G",
  },
];
const MOCK_INTERVIEWS: Interview[] = [
  {
    company: "ABC Technologies",
    role: "Frontend Developer",
    time: "10:00 AM",
    date: "Tomorrow",
  },
];
const MOCK_TASKS: Task[] = [
  { id: 1, label: "Upload latest resume", done: false },
  { id: 2, label: "Apply to 2 companies", done: false },
  { id: 3, label: "React interview prep", done: false },
];


export default function DashboardPage() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [stats] = useState({
    applications: 24,
    resumeScore: 92,
    interviews: 3,
    roadmapProgress: 65,
  });
  const [loading] = useState(false); // simulate loading; set true for skeleton

  const toggleTask = (id: number) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  const completed = tasks.filter((t) => t.done).length;

  

  const statusColor = {
    Applied: "bg-blue-50 text-blue-700",
    "In Review": "bg-amber-50 text-amber-700",
    Interview: "bg-purple-50 text-purple-700",
    Offer: "bg-emerald-50 text-emerald-700",
    Rejected: "bg-red-50 text-red-700",
  };
  const statusIcon = {
    Applied: <Clock className="w-3 h-3" />,
    "In Review": <Clock className="w-3 h-3" />,
    Interview: <Calendar className="w-3 h-3" />,
    Offer: <CheckCircle2 className="w-3 h-3" />,
    Rejected: null,
  };

  const statData = [
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

  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-700",
    purple: "bg-purple-50 text-purple-700",
    amber: "bg-amber-50 text-amber-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Good Morning, Daksh 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            You&apos;re making great progress. Keep building your career.
          </p>
        </div>
        <ProfileCompletion />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statData.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className={`${s.bg} p-2.5 rounded-lg`}>{s.icon}</div>
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${colorMap[s.color as keyof typeof colorMap]}`}
              >
                {s.badge === "+12%" && <TrendingUp className="w-3 h-3" />}
                {s.badge}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-3 tracking-tight">
              {loading ? (
                <span className="inline-block w-12 h-8 bg-gray-200 animate-pulse rounded" />
              ) : (
                s.value
              )}
            </p>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Resume + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <ResumeCard
          />
        </div>
        <div className="lg:col-span-2 space-y-3">
          <Insight
            icon={<Sparkles className="w-4 h-4 text-amber-500" />}
            title="Resume Optimization"
            desc="Adding measurable achievements could increase your ATS score by 8%."
            color="amber"
          />
          <Insight
            icon={<Users className="w-4 h-4 text-blue-500" />}
            title="Skill Match"
            desc="Your React + Node.js skills match 92% of Backend Developer roles."
            color="blue"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <ActionBtn icon={<FileText className="w-4 h-4" />} primary>
          Analyze Resume
        </ActionBtn>
        <ActionBtn icon={<Plus className="w-4 h-4" />}>
          Add Job Application
        </ActionBtn>
        <ActionBtn icon={<Rocket className="w-4 h-4" />}>
          Generate AI Roadmap
        </ActionBtn>
      </div>

      {/* Tasks + Recent Apps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <TasksCard
            tasks={tasks}
            onToggle={toggleTask}
            completed={completed}
            total={tasks.length}
          />
        </div>
        <div className="lg:col-span-2">
          <RecentApps
            apps={MOCK_APPS}
            statusColor={statusColor}
            statusIcon={statusIcon}
          />
        </div>
      </div>

      {/* Upcoming Interviews */}
      <UpcomingInterviews interviews={MOCK_INTERVIEWS} />
    </div>
  );
}

// ─── Subcomponents ─────────────────────────────────────────



function Insight({ icon, title, desc, color }: any) {
  const bg = color === "amber" ? "bg-amber-50" : "bg-blue-50";
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
      <div className={`${bg} p-2 rounded-lg`}>{icon}</div>
      <div>
        <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

function ActionBtn({ children, icon, primary }: any) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all";
  const style = primary
    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";
  return (
    <button className={`${base} ${style}`}>
      {icon} {children}
    </button>
  );
}

function TasksCard({ tasks, onToggle, completed, total }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">Today&apos;s Tasks</h3>
        <span className="text-xs font-medium text-indigo-600">
          {completed} / {total} Completed
        </span>
      </div>
      <div className="space-y-2">
        {tasks.map((t: Task) => (
          <label
            key={t.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <button
              onClick={() => onToggle(t.id)}
              className="shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors group-hover:border-indigo-400"
            >
              {t.done && <Check className="w-3 h-3 text-indigo-600" />}
            </button>
            <span
              className={`text-sm ${t.done ? "text-gray-400 line-through" : "text-gray-700"}`}
            >
              {t.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function RecentApps({ apps, statusColor, statusIcon }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
      <h3 className="font-medium text-gray-900 mb-3">Recent Applications</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
              <th className="pb-3 font-medium">Company</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app: App, i: number) => (
              <tr
                key={i}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs">
                    {app.logo}
                  </div>
                  <span className="font-medium text-gray-900">
                    {app.company}
                  </span>
                </td>
                <td className="py-3 text-gray-600">{app.role}</td>
                <td className="py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[app.status]}`}
                  >
                    {statusIcon[app.status]}
                    {app.status}
                  </span>
                </td>
                <td className="py-3 text-gray-400">{app.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UpcomingInterviews({ interviews }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
      <h3 className="font-medium text-gray-900 mb-3">Upcoming Interviews</h3>
      <div className="divide-y divide-gray-100">
        {interviews.map((item: Interview, i: number) => (
          <div
            key={i}
            className="py-3 flex items-center justify-between hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-700">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.company}</p>
                <p className="text-sm text-gray-400">
                  {item.role} • {item.time}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
              <CalendarDays className="w-3 h-3" />
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
