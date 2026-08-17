"use client";

import { useMemo, useState, useCallback } from "react";
import { Search, ChevronDown, Building2, Inbox, Loader } from "lucide-react";
import { toast } from "sonner";
import {
  statusStyles,
  type Application,
  type ApplicationStatus,
} from "./types";
import ApplicationModal, { type ApplicationFormData } from "./ApplicationModal";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import ActionMenu from "./ActionMenu";

const STATUSES: (ApplicationStatus | "All")[] = [
  "All",
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
];

const SORTS = ["Most Recent", "Oldest", "Company A–Z"] as const;
type Sort = (typeof SORTS)[number];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Select({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white pl-3.5 pr-9 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

export default function ApplicationsClient({
  applications: initialApplications,
}: {
  applications: Application[];
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("Most Recent");
  const [applications, setApplications] = useState(initialApplications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<
    Application | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedApplicationForDetails, setSelectedApplicationForDetails] =
    useState<Application | null>(null);

  const handleOpenModal = useCallback((app?: Application) => {
    setSelectedApplication(app);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedApplication(undefined);
  }, []);

  const handleOpenDetailsModal = useCallback((app: Application) => {
    setSelectedApplicationForDetails(app);
    setIsDetailsModalOpen(true);
  }, []);

  const handleCloseDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setSelectedApplicationForDetails(null);
  }, []);

  const handleSaveApplication = useCallback(
    async (data: ApplicationFormData) => {
      setIsLoading(true);
      const toastId = toast.loading(
        selectedApplication
          ? "Updating application..."
          : "Adding application...",
      );

      try {
        if (selectedApplication) {
          // Update existing application
          const response = await fetch(
            `/api/job-applications/${selectedApplication.id}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            },
          );

          if (!response.ok) {
            throw new Error("Failed to update application");
          }

          // Update local state with new data
          setApplications((prev) =>
            prev.map((app) =>
              app.id === selectedApplication.id
                ? {
                    ...app,
                    companyName: data.companyName,
                    jobTitle: data.jobTitle,
                    location: data.location || app.location,
                    status: (data.status as ApplicationStatus) || app.status,
                    appliedAt: data.appliedAt || app.appliedAt,
                  }
                : app,
            ),
          );

          toast.success("Application updated successfully", { id: toastId });
          handleCloseModal();

        } else {
          // Create new application
          const response = await fetch("/api/job-applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error("Failed to create application");
          }

          const result = await response.json();

          // Add new application to local state
          if (result.data) {
            const newApp: Application = {
              id: result.data.id,
              companyName: result.data.companyName,
              jobTitle: result.data.jobTitle,
              location: result.data.location,
              status: result.data.status,
              appliedAt: result.data.appliedAt,
              logo: result.data.logo,
            };
            setApplications((prev) => [newApp, ...prev]);
          }

          toast.success("Application added successfully", { id: toastId });
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to save application",
          { id: toastId },
        );
      } finally {
        setIsLoading(false);
      }
    },
    [handleCloseModal, selectedApplication],
  );

  const handleDeleteApplication = useCallback(async (appId: string) => {
    const confirmed = await new Promise<boolean>((resolve) => {
      const toastId = toast.custom(
        () => (
          <div className="flex gap-3 rounded-lg bg-white p-4 shadow-lg">
            <div className="flex-1">
              <p className="font-medium text-slate-900">Delete Application?</p>
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

    if (!confirmed) {
      return;
    }

    setDeletingId(appId);
    const toastId = toast.loading("Deleting application...");

    try {
      const response = await fetch(`/api/job-applications/${appId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete application");
      }

      // Remove from local state
      setApplications((prev) => prev.filter((app) => app.id !== appId));
      toast.success("Application deleted successfully", { id: toastId });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete application",
        { id: toastId },
      );
    } finally {
      setDeletingId(null);
    }
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = applications.filter(
      (a) =>
        (status === "All" || a.status === status) &&
        (!q ||
          a.companyName.toLowerCase().includes(q) ||
          a.jobTitle.toLowerCase().includes(q)),
    );

    return [...filtered].sort((a, b) => {
      if (sort === "Company A–Z")
        return a.companyName.localeCompare(b.companyName);
      const diff = +new Date(b.appliedAt) - +new Date(a.appliedAt);
      return sort === "Most Recent" ? diff : -diff;
    });
  }, [applications, query, status, sort]);

  return (
    <>
      {/* Filters */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company or job title..."
              aria-label="Search applications"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/60 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:w-auto sm:grid-cols-3">
            <div className="sm:w-44">
              <Select
                label="Filter by status"
                value={status}
                options={STATUSES}
                onChange={setStatus}
              />
            </div>
            <div className="sm:w-44">
              <Select
                label="Sort applications"
                value={sort}
                options={SORTS}
                onChange={(v) => setSort(v as Sort)}
              />
            </div>
            <button
              onClick={() => handleOpenModal()}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:col-span-1"
            >
              {isLoading ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Add Application"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[1.3fr_1.4fr_1.2fr_0.9fr_0.9fr_56px] gap-4 border-b border-slate-200 bg-slate-50/70 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:grid">
          <span>Company</span>
          <span>Position</span>
          <span>Location</span>
          <span>Status</span>
          <span>APPLIED Date</span>
          <span className="text-right">Actions</span>
        </div>

        {rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <Inbox className="size-6 text-slate-300" />
            <p className="text-sm font-medium text-slate-700">
              No applications found
            </p>
            <p className="text-sm text-slate-500">
              Try a different search or status filter.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {rows.map((a) => (
              <li
                key={a.id}
                onClick={() => handleOpenDetailsModal(a)}
                className="cursor-pointer grid grid-cols-1 gap-2 px-5 py-4 transition-all hover:bg-indigo-50/50 md:grid-cols-[1.3fr_1.4fr_1.2fr_0.9fr_0.9fr_56px] md:items-center md:gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    {a.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.logo}
                        alt=""
                        className="size-5 object-contain"
                      />
                    ) : (
                      <Building2 className="size-4 text-slate-400" />
                    )}
                  </span>
                  <span className="font-medium text-slate-900">
                    {a.companyName}
                  </span>
                </div>
                <div className="text-sm text-slate-700 md:text-[15px]">
                  {a.jobTitle}
                </div>
                <div className="text-sm text-slate-500">{a.location}</div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[a.status]}`}
                  >
                    {a.status}
                  </span>
                </div>
                <div className="text-sm tabular-nums text-slate-600">
                  {formatDate(a.appliedAt)}
                </div>
                <div className="md:text-right">
                  <ActionMenu
                    onEdit={() => handleOpenModal(a)}
                    onDelete={() => handleDeleteApplication(a.id)}
                    isDeleting={deletingId === a.id}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modals */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveApplication}
        application={selectedApplication}
        isLoading={isLoading}
      />

      <ApplicationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        application={selectedApplicationForDetails}
      />
    </>
  );
}
