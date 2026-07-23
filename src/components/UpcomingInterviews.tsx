import { Building2, CalendarDays } from "lucide-react";
import type { Interview } from "@/services/client/dashboard.service";

export default function UpcomingInterviews({ interviews }: { interviews: Interview[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
      <h3 className="font-medium text-gray-900 mb-3">Upcoming Interviews</h3>
      <div className="divide-y divide-gray-100">
        {interviews.map((item, i) => (
          <div
            key={i}
            className="py-3 flex items-center justify-between hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-700">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.company}</p>
                <p className="text-sm text-gray-400">
                  {item.role} • {item.time}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
              <CalendarDays className="w-3 h-3" />
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}