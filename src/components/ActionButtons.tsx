import { FileText, Plus } from "lucide-react";

function ActionBtn({ children, icon, primary }: any) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all sm:w-auto";
  const style = primary
    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";
  return (
    <button className={`${base} ${style}`}>
      {icon} {children}
    </button>
  );
}

export default function ActionButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <ActionBtn icon={<FileText className="w-4 h-4" />} primary>
        Analyze Resume
      </ActionBtn>
      <ActionBtn icon={<Plus className="w-4 h-4" />}>
        Add Job Application
      </ActionBtn>
    </div>
  );
}
