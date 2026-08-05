import { FileText } from "lucide-react";

interface Props {
  summary: string;
  feedback: string;
}

export default function ResumeProfile({ summary }: Props) {
  return (
      <section className="bg-white rounded-2xl shadow p-8 relative border-l-4 border-indigo-500">
        <div className="flex items-center gap-3 mb-4">
          <FileText size={24} className="text-indigo-600" />
          <h2 className="text-xl font-semibold">AI Professional Profile</h2>
        </div>
        <blockquote className="text-lg text-gray-800 italic leading-relaxed">“{summary}”</blockquote>
      </section>
  );
}