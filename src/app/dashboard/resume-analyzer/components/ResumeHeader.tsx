import ResumeActions from "./ResumeActions";

interface Prop {
  fileUrl: string,
  fileName: string,
}

export default function ResumeHeader({ fileUrl, fileName }: Prop) {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resume Analyzer</h1>
        <p className="text-gray-600">
          Comprehensive diagnostic for high‑tier tech roles.
        </p>
      </div>
      <ResumeActions variant="header" fileUrl={fileUrl} fileName={fileName} />
    </section>
  );
}
