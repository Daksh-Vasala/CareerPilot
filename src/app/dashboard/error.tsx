"use client";

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-xl font-semibold text-gray-800">Something went wrong!</h2>
      <p className="text-gray-500">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Try again
      </button>
    </div>
  );
}