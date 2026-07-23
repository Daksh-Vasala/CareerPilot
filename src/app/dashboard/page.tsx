import ActionButtons from "@/components/ActionButtons";
import DashboardStats from "@/components/DashboardStats";
import InsightCard from "@/components/InsightCard";
import  ProfileCompletion  from "@/components/ProfileCompletion";
import RecentApplications from "@/components/RecentApplications";
import ResumeCard from "@/components/ResumeCard";
import TasksCard from "@/components/TasksCard";
import UpcomingInterviews from "@/components/UpcomingInterviews";
import {
  getStats,
  getResume,
  getTasks,
  getRecentApplications,
  getUpcomingInterviews,
  getProfileCompletion,
} from "@/services/client/dashboard.service";
import { Sparkles, Users } from "lucide-react";

export default async function DashboardPage() {
  // Fetch all data in parallel
  const [stats, resume, tasks, apps, interviews, profilePct] = await Promise.all([
    getStats(),
    getResume(),
    getTasks(),
    getRecentApplications(),
    getUpcomingInterviews(),
    getProfileCompletion(),
  ]);

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
        <ProfileCompletion percentage={profilePct} />
      </div>

      {/* Stats */}
      <DashboardStats stats={stats} />

      {/* Resume + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <ResumeCard initialResume={resume} />
        </div>
        <div className="lg:col-span-2 space-y-3">
          <InsightCard
            icon={<Sparkles className="w-4 h-4 text-amber-500" />}
            title="Resume Optimization"
            description="Adding measurable achievements could increase your ATS score by 8%."
            color="amber"
          />
          <InsightCard
            icon={<Users className="w-4 h-4 text-blue-500" />}
            title="Skill Match"
            description="Your React + Node.js skills match 92% of Backend Developer roles."
            color="blue"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <ActionButtons />

      {/* Tasks + Recent Apps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <TasksCard initialTasks={tasks} />
        </div>
        <div className="lg:col-span-2">
          <RecentApplications apps={apps} />
        </div>
      </div>

      {/* Upcoming Interviews */}
      <UpcomingInterviews interviews={interviews} />
    </div>
  );
}