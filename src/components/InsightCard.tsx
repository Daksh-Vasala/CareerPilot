type InsightCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "amber" | "blue";
};

export default function InsightCard({ icon, title, description, color }: InsightCardProps) {
  const bg = color === "amber" ? "bg-amber-50" : "bg-blue-50";
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
      <div className={`${bg} p-2 rounded-lg`}>{icon}</div>
      <div>
        <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}