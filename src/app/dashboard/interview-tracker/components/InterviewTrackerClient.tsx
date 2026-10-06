"use client";

import { useState, useCallback, useMemo } from "react";
import { Search, Plus, Calendar, Briefcase, Building2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Interview,
  InterviewFormData,
  JobApplicationWithInterviews,
} from "./types";
import InterviewModal from "./InterviewModal";
import InterviewDetailsModal from "./InterviewDetailsModal";

async function apiCreateInterview(data: InterviewFormData): Promise<Interview> {
  const res = await fetch("/api/interviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create interview");
  return res.json();
}

async function apiUpdateInterview(id: string, data: Partial<InterviewFormData>): Promise<Interview> {
  const res = await fetch(`/api/interviews/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update interview");
  return res.json();
}

async function apiDeleteInterview(id: string): Promise<void> {
  const res = await fetch(`/api/interviews/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete interview");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusColor(status: JobApplicationWithInterviews["status"]) {
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

export default function InterviewTrackerClient({
  applications: initialApplications,
}: {
  applications: JobApplicationWithInterviews[];
}) {
  const [query, setQuery] = useState("");
  const [applications, setApplications] = useState(initialApplications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<
    Interview | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [modalApplication, setModalApplication] = useState<JobApplicationWithInterviews | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedInterviewForDetails, setSelectedInterviewForDetails] = useState<Interview | null>(null);

  const filteredApplications = useMemo(() => {
    if (!query.trim()) return applications;
    const q = query.trim().toLowerCase();
    return applications.filter(
      (app) =>
        app.companyName.toLowerCase().includes(q) ||
        app.jobTitle.toLowerCase().includes(q) ||
        app.interviews.some((i) => i.type.toLowerCase().includes(q))
    );
  }, [applications, query]);

  const handleOpenModal = useCallback((interview?: Interview) => {
    if (interview) {
      const app = applications.find((a) => a.id === interview.applicationId);
      if (app) setModalApplication(app);
    } else {
      setModalApplication(null);
    }
    setSelectedInterview(interview);
    setIsModalOpen(true);
  }, [applications]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedInterview(undefined);
    setModalApplication(null);
  }, []);

  const handleOpenDetailsModal = useCallback((interview: Interview) => {
    const app = applications.find((a) => a.id === interview.applicationId);
    if (app) setModalApplication(app);
    setSelectedInterviewForDetails(interview);
    setIsDetailsModalOpen(true);
  }, [applications]);

  const handleCloseDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setSelectedInterviewForDetails(null);
  }, []);

  const handleSaveInterview = useCallback(
    async (data: InterviewFormData) => {
      setIsLoading(true);
      const toastId = toast.loading(
        selectedInterview ? "Updating interview..." : "Adding interview..."
      );

      try {
        let updatedInterview: Interview;

        if (selectedInterview) {
          updatedInterview = await apiUpdateInterview(selectedInterview.id, data);
        } else {
          updatedInterview = await apiCreateInterview(data);
        }

        setApplications((prev) => {
          if (selectedInterview) {
            return prev.map((app) =>
              app.id === selectedInterview.applicationId
                ? {
                    ...app,
                    interviews: app.interviews.map((i) =>
                      i.id === selectedInterview.id
                        ? { ...updatedInterview }
                        : i
                    ),
                  }
                : app
            );
          } else {
            return prev.map((app) =>
              app.id === data.applicationId
                ? {
                    ...app,
                    interviews: [...app.interviews, updatedInterview].sort(
                      (a, b) =>
                        +new Date(a.scheduledAt) - +new Date(b.scheduledAt)
                    ),
                  }
                : app
            );
          }
        });

        toast.success(
          selectedInterview
            ? "Interview updated successfully"
            : "Interview added successfully",
          { id: toastId }
        );
        handleCloseModal();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to save interview",
          { id: toastId }
        );
      } finally {
        setIsLoading(false);
      }
    },
    [handleCloseModal, selectedInterview]
  );

  const handleDeleteInterview = useCallback(async (interviewId: string) => {
    const confirmed = await new Promise<boolean>((resolve) => {
      const toastId = toast.custom(
        () => (
          <div className="flex gap-3 rounded-lg bg-white p-4 shadow-lg">
            <div className="flex-1">
              <p className="font-medium text-slate-900">Delete Interview?</p>
              <p className="mt-1 text-sm text-slate-600">
                This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  resolve(false);
                  toast.dismiss(toastId);
                }}
                className="rounded px-3 py-1 text-sm text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resolve(true);
                  toast.dismiss(toastId);
                }}
                className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ),
        { duration: Infinity },
      );
    });

    if (!confirmed) return;

    const toastId = toast.loading("Deleting interview...");

    try {
      await apiDeleteInterview(interviewId);

      setApplications((prev) =>
        prev.map((app) => ({
          ...app,
          interviews: app.interviews.filter((i) => i.id !== interviewId),
        }))
      );

      toast.success("Interview deleted successfully", { id: toastId });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete interview",
        { id: toastId }
      );
    }
  }, []);

  const handleAddInterview = (applicationId: string) => {
    const appWithInterviews = applications.find((a) => a.id === applicationId);

    if (appWithInterviews) {
      setModalApplication(appWithInterviews);
    }
    setSelectedInterview(undefined);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Header Stats */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm flex items-center gap-3">
          <div className="bg-indigo-50 p-2 rounded-lg">
            <Briefcase className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {filteredApplications.length}
            </p>
            <p className="text-xs text-slate-500">Applications in Interview</p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {filteredApplications.reduce(
                (sum, app) => sum + app.interviews.length,
                0
              )}
            </p>
            <p className="text-xs text-slate-500">Total Interviews</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company, job title, or interview type..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Applications List */}
      <section aria-label="Job Applications in Interview Stage">
        {filteredApplications.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
              <Building2 className="size-8 text-slate-300" />
              <p className="text-sm font-medium text-slate-700">
                {applications.length === 0
                  ? "No applications in interview stage"
                  : "No applications match your search"}
              </p>
              <p className="text-sm text-slate-500">
                {applications.length === 0
                  ? "Applications with status 'Interview' will appear here"
                  : "Try a different search term"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
              >
                {/* Application Header */}
                <div className="p-4 bg-slate-50/30 border-b border-slate-100">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                        <Building2 className="size-6 text-indigo-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-slate-900 truncate">
                            {application.companyName}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {application.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600 truncate">
                          {application.jobTitle}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="size-3" />
                          <span>Applied {formatDate(application.appliedAt)}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddInterview(application.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700"
                    >
                      <Plus className="size-3.5" />
                      Add Interview
                    </button>
                  </div>
                </div>

                {/* Interviews List */}
                <div className="divide-y divide-slate-100">
                  {application.interviews.length === 0 ? (
                    <div className="px-4 py-8 text-center text-slate-500">
                      <p className="text-sm">No interviews scheduled yet</p>
                      <p className="text-xs mt-1">
                        Click &ldquo;Add Interview&rdquo; to schedule the first
                        round
                      </p>
                    </div>
                  ) : (
                    application.interviews.map((interview) => (
                      <div
                        key={interview.id}
                        className="px-4 py-3 flex items-center justify-between flex-wrap gap-2 hover:bg-slate-50/30 transition-colors cursor-pointer"
                        onClick={() => handleOpenDetailsModal(interview)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            Round {interview.round}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                            {interview.type}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            {interview.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3.5" />
                            {formatDate(interview.scheduledAt)}
                          </span>
                          {interview.duration && (
                            <span className="flex items-center gap-1">
                              {interview.duration} min
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(interview);
                            }}
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
                            aria-label="Edit interview"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteInterview(interview.id);
                            }}
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-red-600 transition"
                            aria-label="Delete interview"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add Interview Modal */}
      <InterviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveInterview}
        interview={selectedInterview}
        isLoading={isLoading}
        application={modalApplication ?? undefined}
      />

      {/* Interview Details Modal */}
      <InterviewDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        interview={selectedInterviewForDetails}
        application={modalApplication ?? undefined}
        onEdit={() => {
          handleCloseDetailsModal();
          if (selectedInterviewForDetails) {
            handleOpenModal(selectedInterviewForDetails);
          }
        }}
      />
    </>
  );
}