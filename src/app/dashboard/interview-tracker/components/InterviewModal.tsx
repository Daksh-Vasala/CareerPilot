"use client";

import { useState, useEffect } from "react";
import { X, Loader, Building2 } from "lucide-react";
import { Interview, InterviewFormData, InterviewType, InterviewLocation, InterviewStatus, InterviewResult, JobApplicationWithInterviews } from "./types";

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InterviewFormData) => Promise<void>;
  interview?: Interview;
  isLoading?: boolean;
  application?: JobApplicationWithInterviews;
}

const INTERVIEW_TYPES: InterviewType[] = [
  "TECHNICAL",
  "HR",
  "BEHAVIORAL",
  "SYSTEM_DESIGN",
  "CODING",
  "MANAGERIAL",
  "CULTURAL",
  "FINAL",
  "OTHER",
];

const INTERVIEW_LOCATIONS: InterviewLocation[] = ["ONLINE", "PHONE", "ONSITE", "OTHER"];

const INTERVIEW_STATUSES: InterviewStatus[] = ["SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"];

const INTERVIEW_RESULTS: InterviewResult[] = ["PENDING", "PASSED", "FAILED"];

export default function InterviewModal({
  isOpen,
  onClose,
  onSubmit,
  interview,
  isLoading = false,
  application,
}: InterviewModalProps) {
  const [formData, setFormData] = useState<InterviewFormData>({
    applicationId: "",
    type: "TECHNICAL",
    round: 1,
    scheduledAt: new Date().toISOString().slice(0, 16),
    duration: 60,
    location: "ONLINE",
    meetingLink: "",
    interviewer: "",
    status: "SCHEDULED",
    result: "PENDING",
    feedback: "",
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (interview) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        applicationId: interview.applicationId,
        type: interview.type,
        round: interview.round,
        scheduledAt: interview.scheduledAt.slice(0, 16),
        duration: interview.duration || 60,
        location: interview.location,
        meetingLink: interview.meetingLink || "",
        interviewer: interview.interviewer || "",
        status: interview.status,
        result: interview.result,
        feedback: interview.feedback || "",
      });
    } else if (application) {
      setFormData((prev) => ({
        ...prev,
        applicationId: application.id,
        round: application.interviews ? Math.max(...application.interviews.map((i) => i.round), 0) + 1 : 1,
      }));
    } else {
      setFormData({
        applicationId: "",
        type: "TECHNICAL",
        round: 1,
        scheduledAt: new Date().toISOString().slice(0, 16),
        duration: 60,
        location: "ONLINE",
        meetingLink: "",
        interviewer: "",
        status: "SCHEDULED",
        result: "PENDING",
        feedback: "",
      });
    }
    setError("");
  }, [interview, application, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "round" || name === "duration" ? Number(value) : value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.applicationId) {
      setError("Job Application is required");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save interview");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {interview ? "Edit Interview" : "Add New Interview"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Job Application - Display only, not editable */}
          {application && (
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Job Application
              </label>
              <div className="mt-1 p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Building2 className="size-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{application.companyName}</p>
                    <p className="text-sm text-slate-600 truncate">{application.jobTitle}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                    {application.status}
                  </span>
                </div>
              </div>
              <input
                type="hidden"
                name="applicationId"
                value={formData.applicationId}
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Interview Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Interview Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                {INTERVIEW_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Round */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Round
              </label>
              <input
                type="number"
                name="round"
                value={formData.round}
                onChange={handleChange}
                min={1}
                max={10}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Scheduled Date & Time */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Date & Time *
              </label>
              <input
                type="datetime-local"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min={15}
                max={480}
                step={15}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                {INTERVIEW_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Meeting Link */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Meeting Link
              </label>
              <input
                type="url"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleChange}
                placeholder="e.g., https://meet.google.com/..."
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Interviewer */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Interviewer Name
              </label>
              <input
                type="text"
                name="interviewer"
                value={formData.interviewer}
                onChange={handleChange}
                placeholder="e.g., John Smith"
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                {INTERVIEW_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Result */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Result
              </label>
              <select
                name="result"
                value={formData.result}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                {INTERVIEW_RESULTS.map((result) => (
                  <option key={result} value={result}>
                    {result}
                  </option>
                ))}
              </select>
            </div>

            {/* Feedback */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Feedback / Notes
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Add any feedback or notes about the interview..."
                rows={4}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  Saving...
                </>
              ) : interview ? (
                "Update"
              ) : (
                "Add Interview"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}