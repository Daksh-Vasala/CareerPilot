export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-8 w-36 animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 animate-pulse rounded-full bg-slate-200 ring-4 ring-slate-100" />
              <div className="mt-4 h-5 w-32 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-4 w-40 animate-pulse rounded bg-slate-200" />

              <div className="mt-5 w-full">
                <div className="mb-1 flex items-center justify-between">
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-10 animate-pulse rounded bg-slate-200" />
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-3/5 animate-pulse rounded-full bg-slate-200" />
                </div>
              </div>
            </div>

            <div className="my-6 h-px bg-slate-100" />

            <div className="space-y-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-4 w-4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            {[0, 1, 2].map((section) => (
              <section
                key={section}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-5 w-5 animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
                </div>
                <div className="h-px bg-slate-100" />

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {[0, 1].map((field) => (
                    <div key={field} className="space-y-2">
                      <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                      <div className="h-11 w-full animate-pulse rounded-lg bg-slate-200" />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
