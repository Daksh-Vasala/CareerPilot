"use client";

import {
  X,
  Building2,
  Briefcase,
  Calendar,
  Clock,
  Video,
  Monitor,
  MapPin,
  Phone,
  LinkIcon,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react";
import { Interview, JobApplicationWithInterviews, interviewTypeStyles, interviewStatusStyles, interviewResultStyles, interviewLocationStyles } from "./types";

interface InterviewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  interview: Interview | null;
  application: JobApplicationWithInterviews | null;
  onEdit: () => void;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getTypeIcon(type: Interview["type"]) {
  switch (type) {
    case "TECHNICAL":
    case "CODING":
    case "SYSTEM_DESIGN":
      return <Monitor className="size-4" />;
    case "HR":
    case "BEHAVIORAL":
    case "CULTURAL":
      return <User className="size-4" />;
    case "MANAGERIAL":
    case "FINAL":
      return <Building2 className="size-4" />;
    default:
      return <Video className="size-4" />;
  }
}

function getStatusIcon(status: Interview["status"]) {
  switch (status) {
    case "SCHEDULED":
      return <Calendar className="size-4" />;
    case "COMPLETED":
      return <CheckCircle className="size-4" />;
    case "CANCELLED":
      return <X className="size-4" />;
    case "NO_SHOW":
      return <AlertCircle className="size-4" />;
  }
}

function getLocationIcon(location: Interview["location"]) {
  switch (location) {
    case "ONLINE":
      return <Video className="size-4" />;
    case "PHONE":
      return <Phone className="size-4" />;
    case "ONSITE":
      return <MapPin className="size-4" />;
    default:
      return <Video className="size-4" />;
  }
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

export default function InterviewDetailsModal({
  isOpen,
  onClose,
  interview,
  application,
  onEdit,
}: InterviewDetailsModalProps) {
  if (!isOpen || !interview) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-linear-to-r from-indigo-50 to-blue-50 px-6 py-6">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
              {application?.logo ? (
                <img src={application.logo} alt={application.companyName} className="w-8 h-8 rounded" />
              ) : (
                <Building2 className="size-6 text-indigo-600" />
              )}
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold text-slate-900 truncate">
                {application?.companyName || "Unknown Application"}
              </h2>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <p className="text-sm text-slate-600">{application?.jobTitle || "Unknown Role"}</p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application?.status || "APPLIED")}`}>
                  {application?.status || "APPLIED"}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                <span className="font-medium text-slate-700">Round {interview.round}</span>
                <span className="text-slate-300">/</span>
                <span>Interview Details</span>
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
          {/* Status, Type, Result Badges */}
          <div className="flex flex-wrap gap-3">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-inset ${interviewStatusStyles[interview.status]}`}
            >
              {getStatusIcon(interview.status)}
              {interview.status}
            </span>
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-inset ${interviewTypeStyles[interview.type]}`}
            >
              {getTypeIcon(interview.type)}
              {interview.type.replace("_", " ")}
            </span>
            {interview.status === "COMPLETED" && (
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-inset ${interviewResultStyles[interview.result]}`}
              >
                {interview.result === "PASSED" && <CheckCircle className="size-4" />}
                {interview.result === "FAILED" && <AlertCircle className="size-4" />}
                {interview.result}
              </span>
            )}
          </div>

          {/* Grid Layout for Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Date & Time */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Calendar className="size-4" />
                Date & Time
              </label>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-slate-900">{formatDate(interview.scheduledAt)}</p>
                <p className="text-sm text-slate-900">{formatTime(interview.scheduledAt)}</p>
              </div>
            </div>

            {/* Duration */}
            {interview.duration && (
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <Clock className="size-4" />
                  Duration
                </label>
                <p className="mt-2 text-sm text-slate-900">{interview.duration} minutes</p>
              </div>
            )}

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {getLocationIcon(interview.location)}
                Location
              </label>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${interviewLocationStyles[interview.location]}`}
                >
                  {interview.location}
                </span>
              </div>
            </div>

            {/* Meeting Link */}
            {interview.meetingLink && (
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <LinkIcon className="size-4" />
                  Meeting Link
                </label>
                <p className="mt-2 text-sm">
                  <a
                    href={interview.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-indigo-600 hover:text-indigo-700 hover:underline"
                  >
                    {interview.meetingLink}
                  </a>
                </p>
              </div>
            )}

            {/* Interviewer */}
            {interview.interviewer && (
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <User className="size-4" />
                  Interviewer
                </label>
                <p className="mt-2 text-sm text-slate-900">{interview.interviewer}</p>
              </div>
            )}

            {/* Application Info */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Briefcase className="size-4" />
                Job Application
              </label>
              <div className="mt-2">
                {application && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                      <Building2 className="size-4 text-indigo-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 truncate">{application.companyName}</p>
                      <p className="text-sm text-slate-600 truncate">{application.jobTitle}</p>
                      <p className="text-xs text-slate-500">Applied {formatDate(application.appliedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feedback */}
          {interview.feedback && (
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <MessageSquare className="size-4" />
                Feedback / Notes
              </label>
              <div className="mt-2 whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {interview.feedback}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              onClick={() => {
                onClose();
                onEdit();
              }}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Edit Interview
            </button>
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