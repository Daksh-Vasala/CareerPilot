import { Building2, Calendar, Clock, Video, Monitor, MapPin, Phone, User, CheckCircle, XCircle, AlertCircle, Briefcase } from "lucide-react";
import { Interview, JobApplication, interviewTypeStyles, interviewStatusStyles, interviewResultStyles, interviewLocationStyles } from "./types";

interface InterviewCardProps {
  interview: Interview;
  application: JobApplication;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
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
      return <Monitor className="size-3.5" />;
    case "HR":
    case "BEHAVIORAL":
    case "CULTURAL":
      return <User className="size-3.5" />;
    case "MANAGERIAL":
    case "FINAL":
      return <Building2 className="size-3.5" />;
    default:
      return <Video className="size-3.5" />;
  }
}

function getStatusIcon(status: Interview["status"]) {
  switch (status) {
    case "SCHEDULED":
      return <Calendar className="size-3" />;
    case "COMPLETED":
      return <CheckCircle className="size-3" />;
    case "CANCELLED":
      return <XCircle className="size-3" />;
    case "NO_SHOW":
      return <AlertCircle className="size-3" />;
  }
}

function getLocationIcon(location: Interview["location"]) {
  switch (location) {
    case "ONLINE":
      return <Video className="size-3" />;
    case "PHONE":
      return <Phone className="size-3" />;
    case "ONSITE":
      return <MapPin className="size-3" />;
    default:
      return <Video className="size-3" />;
  }
}

export default function InterviewCard({ interview, application, onView, onEdit, onDelete }: InterviewCardProps) {
  return (
    <div
      onClick={onView}
      className="group py-3 flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between hover:bg-slate-50 -mx-3 px-3 rounded-lg transition-colors cursor-pointer sm:-mx-4 sm:px-4"
    >
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 sm:w-10 sm:h-10">
          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-slate-900 truncate">{application.companyName}</p>
          <p className="text-sm text-slate-500 truncate">{application.jobTitle}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-medium text-slate-700">Application:</span>
            <span className="truncate">{application.companyName} \u2014 {application.jobTitle}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 sm:ml-auto sm:shrink-0">
        {/* Type */}
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ring-1 ring-inset ${interviewTypeStyles[interview.type]}`}>
          {getTypeIcon(interview.type)}
          {interview.type.replace("_", " ")}
        </span>

        {/* Round */}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-50 text-slate-700">
          Round {interview.round}
        </span>

        {/* Location */}
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${interviewLocationStyles[interview.location]}`}>
          {getLocationIcon(interview.location)}
          {interview.location}
        </span>

        {/* Status */}
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ring-1 ring-inset ${interviewStatusStyles[interview.status]}`}>
          {getStatusIcon(interview.status)}
          {interview.status}
        </span>

        {/* Result (only show for completed interviews) */}
        {interview.status === "COMPLETED" && (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ring-1 ring-inset ${interviewResultStyles[interview.result]}`}>
            {interview.result === "PASSED" && <CheckCircle className="size-3" />}
            {interview.result === "FAILED" && <XCircle className="size-3" />}
            {interview.result === "PENDING" && <AlertCircle className="size-3" />}
            {interview.result}
          </span>
        )}
      </div>

      {/* Date and Time */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:ml-auto sm:flex-nowrap sm:shrink-0">
        <span className="flex items-center gap-1">
          <Calendar className="size-3.5" />
          {formatDate(interview.scheduledAt)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" />
          {formatTime(interview.scheduledAt)}
        </span>
        {interview.duration && (
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {interview.duration} min
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity sm:ml-3 sm:shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors touch-manipulation"
          aria-label="Edit interview"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-700 transition-colors touch-manipulation"
          aria-label="Delete interview"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}