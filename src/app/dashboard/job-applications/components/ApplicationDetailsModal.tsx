"use client";

import {
  X,
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  LinkIcon,
  User,
  Mail,
  FileText,
} from "lucide-react";
import { Application, statusStyles } from "./types";

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ApplicationDetailsModal({
  isOpen,
  onClose,
  application,
}: ApplicationDetailsModalProps) {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-linear-to-r from-indigo-50 to-blue-50 px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
              {application.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={application.logo}
                  alt=""
                  className="size-8 object-contain"
                />
              ) : (
                <Building2 className="size-6 text-slate-400" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {application.companyName}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {application.jobTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-slate-600"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Status Badge */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </label>
            <div className="mt-2">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${statusStyles[application.status]}`}
              >
                {application.status}
              </span>
            </div>
          </div>

          {/* Grid Layout for Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <MapPin className="size-4" />
                Location
              </label>
              <p className="mt-2 text-sm text-slate-900">
                {application.location || (
                  <span className="text-slate-400">Not specified</span>
                )}
              </p>
            </div>

            {/* Applied Date */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Calendar className="size-4" />
                Applied Date
              </label>
              <p className="mt-2 text-sm text-slate-900">
                {formatDate(application.appliedAt)}
              </p>
            </div>

            {/* Job Type */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Briefcase className="size-4" />
                Job Type
              </label>
              <p className="mt-2 text-sm text-slate-900">
                {application.jobType || (
                  <span className="text-slate-400">Not specified</span>
                )}
              </p>
            </div>

            {/* Salary */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <DollarSign className="size-4" />
                Salary
              </label>
              <p className="mt-2 text-sm text-slate-900">
                {application.salary || (
                  <span className="text-slate-400">Not specified</span>
                )}
              </p>
            </div>

            {/* Recruiter Name */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <User className="size-4" />
                Recruiter Name
              </label>
              <p className="mt-2 text-sm text-slate-900">
                {application.recruiterName || (
                  <span className="text-slate-400">Not specified</span>
                )}
              </p>
            </div>

            {/* Recruiter Email */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Mail className="size-4" />
                Recruiter Email
              </label>
              <p className="mt-2 text-sm text-slate-900">
                {application.recruiterEmail ? (
                  <a
                    href={`mailto:${application.recruiterEmail}`}
                    className="text-indigo-600 hover:text-indigo-700 hover:underline"
                  >
                    {application.recruiterEmail}
                  </a>
                ) : (
                  <span className="text-slate-400">Not specified</span>
                )}
              </p>
            </div>
          </div>

          {/* Job URL */}
          {application.jobUrl && (
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <LinkIcon className="size-4" />
                Job URL
              </label>
              <p className="mt-2 text-sm">
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  {application.jobUrl}
                </a>
              </p>
            </div>
          )}

          {/* Notes */}
          {application.notes && (
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <FileText className="size-4" />
                Notes
              </label>
              <div className="mt-2 whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {application.notes}
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end border-t border-slate-200 pt-6">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-6 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
