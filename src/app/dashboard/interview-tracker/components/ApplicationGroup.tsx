"use client";

import { Briefcase, Calendar, ChevronDown, Building2, TrendingUp, CheckCircle } from "lucide-react";
import { JobApplication, Interview } from "./types";
import InterviewRow from "./InterviewRow";

interface ApplicationGroupProps {
  application: JobApplication;
  interviews: Interview[];
  onViewInterview: (interview: Interview) => void;
  onEditInterview: (interview: Interview) => void;
  onDeleteInterview: (interviewId: string) => void;
  onAddInterview: (applicationId: string) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  showStats?: boolean;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusColor(status: JobApplication["status"]) {
  switch (status) {
    case "APPLIED":
      return "bg-slate-100 text-slate-700";
    case "SCREENING":
      return "bg-blue-100 text-blue-700";
    case "INTERVIEWING":
      return "bg-indigo-100 text-indigo-700";
    case "OFFER":
      return "bg-emerald-100 text-emerald-700";
    case "REJECTED":
      return "bg-rose-100 text-rose-700";
    case "WITHDRAWN":
      return "bg-amber-100 text-amber-700";
  }
}

export default function ApplicationGroup({
  application,
  interviews,
  onViewInterview,
  onEditInterview,
  onDeleteInterview,
  onAddInterview,
  isExpanded = true,
  onToggleExpand,
  showStats = true,
}: ApplicationGroupProps) {
  const upcomingInterviews = interviews.filter((i) => new Date(i.scheduledAt) >= new Date());
  const pastInterviews = interviews.filter((i) => new Date(i.scheduledAt) < new Date());
  const completedCount = interviews.filter((i) => i.status === "COMPLETED").length;
  const passedCount = interviews.filter((i) => i.result === "PASSED").length;
  const scheduledCount = interviews.filter((i) => i.status === "SCHEDULED").length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        onClick={onToggleExpand}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
        disabled={!onToggleExpand}
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            {application.logo ? (
              <img src={application.logo} alt={application.companyName} className="w-8 h-8 rounded" />
            ) : (
              <Building2 className="size-6 text-indigo-600" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-semibold text-slate-900 truncate">{application.companyName}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600 truncate">{application.jobTitle}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="size-3" />
              <span>Applied {formatDate(application.appliedAt)}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:shrink-0">
          {showStats && (
            <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1 text-indigo-600">
                <Calendar className="size-3.5" />
                {upcomingInterviews.length} upcoming
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <CheckCircle className="size-3.5" />
                {completedCount} completed
              </span>
              <span className="flex items-center gap-1 text-teal-600">
                <TrendingUp className="size-3.5" />
                {passedCount} passed
              </span>
            </div>
          )}
          {onToggleExpand && (
            <ChevronDown
              className={`size-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="divide-y divide-slate-100 bg-slate-50/30">
          <div className="px-4 py-3 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Interview Rounds</h4>
              <button
                onClick={() => onAddInterview(application.id)}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700"
              >
                <span className="size-3.5" />
                Add Round
              </button>
            </div>
          </div>

          {interviews.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <Briefcase className="size-8 mx-auto text-slate-300" />
              <p className="mt-2 text-sm font-medium text-slate-700">No interview rounds yet</p>
              <p className="mt-1 text-sm text-slate-500">Click "Add Round" to schedule your first interview</p>
            </div>
          ) : (
            <>
              {upcomingInterviews.length > 0 && (
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Upcoming ({upcomingInterviews.length})</p>
                  <div className="divide-y divide-slate-100">
                    {upcomingInterviews.map((interview) => (
                      <InterviewRow
                        key={interview.id}
                        interview={interview}
                        onView={() => onViewInterview(interview)}
                        onEdit={() => onEditInterview(interview)}
                        onDelete={(id) => onDeleteInterview(id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {pastInterviews.length > 0 && (
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Past ({pastInterviews.length})</p>
                  <div className="divide-y divide-slate-100">
                    {pastInterviews.map((interview) => (
                      <InterviewRow
                        key={interview.id}
                        interview={interview}
                        onView={() => onViewInterview(interview)}
                        onEdit={() => onEditInterview(interview)}
                        onDelete={(id) => onDeleteInterview(id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}