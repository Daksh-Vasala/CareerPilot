import { TrendingUp, AlertTriangle } from "lucide-react";

interface Props {
  strengths: string[];
  weaknesses: string[];
}

export default function ResumeStrengths({ strengths, weaknesses }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-green-500">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp size={24} className="text-green-600" />
          <h3 className="text-xl font-semibold">Key Strengths</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {strengths.map(s => (
            <span key={s} className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-amber-500">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={24} className="text-amber-600" />
          <h3 className="text-xl font-semibold">Critical Improvements</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {weaknesses.map(w => (
            <span key={w} className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-sm font-medium">
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}