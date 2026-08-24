import ResumeActions from "./ResumeActions";

interface Prop {
  fileUrl: string;
  fileName: string;
}

export default function ResumeHeader({ fileUrl, fileName }: Prop) {
  return (
    <section className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
      <div className="flex items-start gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resume Analyzer</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Comprehensive diagnostic for high‑tier tech roles.
          </p>
        </div>
      </div>
      <ResumeActions variant="header" fileUrl={fileUrl} fileName={fileName} />
    </section>
  );
}
