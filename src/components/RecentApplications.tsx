import type { App } from "@/services/client/dashboard.service";

const statusColor = {
  Applied: "bg-blue-50 text-blue-700",
  "In Review": "bg-amber-50 text-amber-700",
  Interview: "bg-purple-50 text-purple-700",
  Offer: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
};

const statusIcon = {
  Applied: <Clock className="w-3 h-3" />,
  "In Review": <Clock className="w-3 h-3" />,
  Interview: <Calendar className="w-3 h-3" />,
  Offer: <CheckCircle2 className="w-3 h-3" />,
  Rejected: null,
};

import { Clock, Calendar, CheckCircle2 } from "lucide-react";

export default function RecentApplications({ apps }: { apps: App[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
      <h3 className="font-medium text-gray-900 mb-3">Recent Applications</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
              <th className="pb-3 font-medium">Company</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app, i) => (
              <tr
                key={i}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs">
                    {app.logo}
                  </div>
                  <span className="font-medium text-gray-900">{app.company}</span>
                </td>
                <td className="py-3 text-gray-600">{app.role}</td>
                <td className="py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColor[app.status]
                    }`}
                  >
                    {statusIcon[app.status]}
                    {app.status}
                  </span>
                </td>
                <td className="py-3 text-gray-400">{app.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}