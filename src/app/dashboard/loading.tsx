export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-80 bg-gray-100 rounded mt-2" />
        </div>
        <div className="w-48 h-16 bg-gray-200 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border p-5 h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 h-48 bg-gray-200 rounded-xl" />
        <div className="lg:col-span-2 space-y-3">
          <div className="h-20 bg-gray-200 rounded-xl" />
          <div className="h-20 bg-gray-200 rounded-xl" />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 w-40 bg-gray-200 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 h-48 bg-gray-200 rounded-xl" />
        <div className="lg:col-span-2 h-48 bg-gray-200 rounded-xl" />
      </div>
      <div className="h-48 bg-gray-200 rounded-xl" />
    </div>
  );
}