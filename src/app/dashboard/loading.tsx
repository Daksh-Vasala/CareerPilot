export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-8xl space-y-6 px-4 py-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded-xl bg-slate-200" />
          <div className="h-4 w-80 rounded bg-slate-200" />
        </div>
        <div className="h-16 w-44 rounded-xl bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="h-8 w-8 rounded-lg bg-slate-200" />
            </div>
            <div className="h-8 w-16 rounded bg-slate-200" />
            <div className="mt-3 h-3 w-28 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="h-52 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <div className="h-5 w-28 rounded bg-slate-200" />
          <div className="mt-5 h-24 rounded-xl bg-slate-200" />
          <div className="mt-5 h-4 w-24 rounded bg-slate-200" />
        </div>

        <div className="space-y-3 lg:col-span-2">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="h-20 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-56 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-11 w-40 rounded-lg bg-slate-200" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="h-52 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <div className="h-5 w-24 rounded bg-slate-200" />
          <div className="mt-5 space-y-3">
            {[0, 1, 2].map((line) => (
              <div key={line} className="h-4 w-full rounded bg-slate-200" />
            ))}
          </div>
        </div>

        <div className="h-52 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="h-5 w-28 rounded bg-slate-200" />
          <div className="mt-5 space-y-3">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="h-4 w-full rounded bg-slate-200" />
            ))}
          </div>
        </div>
      </div>

      <div className="h-52 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="h-5 w-32 rounded bg-slate-200" />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((card) => (
            <div key={card} className="h-24 rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
