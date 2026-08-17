export default function ResumeAnalyzerLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-8xl space-y-8 bg-gray-50 px-4 py-6 text-gray-900 sm:px-6 md:px-10 animate-pulse">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-7 w-64 rounded bg-slate-200" />
            <div className="h-4 w-44 rounded bg-slate-200" />
          </div>
          <div className="h-10 w-36 rounded-lg bg-slate-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <div className="h-[320px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mx-auto h-48 w-48 rounded-full bg-slate-200" />
            <div className="mt-6 h-6 w-28 rounded bg-slate-200 mx-auto" />
            <div className="mt-3 h-4 w-40 rounded bg-slate-200 mx-auto" />
          </div>
        </div>

        <div className="xl:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 h-6 w-40 rounded bg-slate-200" />
            <div className="space-y-4">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-4 w-full rounded bg-slate-200" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 h-6 w-32 rounded bg-slate-200" />
        <div className="space-y-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-4 w-full rounded bg-slate-200" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 h-6 w-32 rounded bg-slate-200" />
          <div className="space-y-3">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-4 w-full rounded bg-slate-200" />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 h-6 w-32 rounded bg-slate-200" />
          <div className="space-y-3">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-4 w-full rounded bg-slate-200" />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 h-6 w-28 rounded bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-24 rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
    </main>
  );
}
