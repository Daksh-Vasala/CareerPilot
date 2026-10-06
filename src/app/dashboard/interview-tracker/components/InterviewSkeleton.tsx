export default function InterviewSkeleton() {
  return (
    <div className="divide-y divide-slate-100">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full animate-pulse bg-slate-200" />
            <div className="space-y-1">
              <div className="h-4 w-40 animate-pulse bg-slate-200 rounded" />
              <div className="h-3 w-32 animate-pulse bg-slate-200 rounded" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-5 w-20 animate-pulse bg-slate-200 rounded-full" />
            <div className="h-5 w-16 animate-pulse bg-slate-200 rounded-full" />
            <div className="h-5 w-14 animate-pulse bg-slate-200 rounded-full" />
            <div className="h-5 w-24 animate-pulse bg-slate-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}