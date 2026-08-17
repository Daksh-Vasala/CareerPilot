"use client";

import { useState, useEffect } from "react";
import { X, Loader } from "lucide-react";
import { ApplicationStatus } from "@/generated/prisma/enums";
import { Application } from "./types";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApplicationFormData) => Promise<void>;
  application?: Application;
  isLoading?: boolean;
}

export interface ApplicationFormData {
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  location?: string;
  jobType?: string;
  salary?: string;
  status?: ApplicationStatus;
  appliedAt?: string;
  notes?: string;
  recruiterName?: string;
  recruiterEmail?: string;
}

const STATUSES: ApplicationStatus[] = [
  ApplicationStatus.APPLIED,
  ApplicationStatus.INTERVIEW,
  ApplicationStatus.OFFER,
  ApplicationStatus.REJECTED,
];

export default function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  application,
  isLoading = false,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState<ApplicationFormData>({
    companyName: "",
    jobTitle: "",
    location: "",
    status: ApplicationStatus.APPLIED,
    appliedAt: new Date().toISOString().split("T")[0],
    jobUrl: "",
    jobType: "",
    salary: "",
    notes: "",
    recruiterName: "",
    recruiterEmail: "",
  });

  const [error, setError] = useState<string>("");

  // Update form data when application changes (for editing)
  useEffect(() => {
    if (application) {
      // Edit mode - pre-fill all details
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        companyName: application.companyName || "",
        jobTitle: application.jobTitle || "",
        location: application.location || "",
        status: application.status as ApplicationStatus,
        appliedAt: application.appliedAt
          ? application.appliedAt.split("T")[0]
          : new Date().toISOString().split("T")[0],
        jobUrl: application.jobUrl || "",
        jobType: application.jobType || "",
        salary: application.salary || "",
        notes: application.notes || "",
        recruiterName: application.recruiterName || "",
        recruiterEmail: application.recruiterEmail || "",
      });
    } else {
      // Add mode - reset to empty
      setFormData({
        companyName: "",
        jobTitle: "",
        location: "",
        status: ApplicationStatus.APPLIED,
        appliedAt: new Date().toISOString().split("T")[0],
        jobUrl: "",
        jobType: "",
        salary: "",
        notes: "",
        recruiterName: "",
        recruiterEmail: "",
      });
    }
    setError("");
  }, [application, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.companyName.trim()) {
      setError("Company name is required");
      return;
    }

    if (!formData.jobTitle.trim()) {
      setError("Job title is required");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save application",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {application ? "Edit Application" : "Add New Application"}
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g., Google"
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
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
                value={formData.status || ApplicationStatus.APPLIED}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Job Type
              </label>
              <input
                type="text"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                placeholder="e.g., Full-time, Remote"
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., $120,000 - $150,000"
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Job URL */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Job URL
              </label>
              <input
                type="url"
                name="jobUrl"
                value={formData.jobUrl}
                onChange={handleChange}
                placeholder="e.g., https://..."
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Applied Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Applied Date
              </label>
              <input
                type="date"
                name="appliedAt"
                value={formData.appliedAt}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Recruiter Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Recruiter Name
              </label>
              <input
                type="text"
                name="recruiterName"
                value={formData.recruiterName}
                onChange={handleChange}
                placeholder="e.g., John Smith"
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Recruiter Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Recruiter Email
              </label>
              <input
                type="email"
                name="recruiterEmail"
                value={formData.recruiterEmail}
                onChange={handleChange}
                placeholder="e.g., john@company.com"
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes..."
              rows={4}
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
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
              ) : application ? (
                "Update"
              ) : (
                "Add Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
