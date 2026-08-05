import { PlusCircle } from "lucide-react";

interface Props {
  frontend: string[];
  backend: string[];
  tools: string[];
  softSkills: string[];
  missingSkills: string[];
}

export default function ResumeSkills({ frontend, backend, tools, softSkills, missingSkills }: Props) {
  const groups = [
    { title: "Frontend Engineering", skills: frontend },
    { title: "Backend & Infra", skills: backend },
    { title: "Tools & Methodology", skills: tools },
  ];

  return (
    <>
      {/* Technical Skills */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Technical Inventory</h2>
        <div className="bg-white rounded-2xl shadow p-8 space-y-6">
          {groups.map(g => (
            <div key={g.title}>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{g.title}</h4>
              <div className="flex flex-wrap gap-2">
                {g.skills.length > 0 ? (
                  g.skills.map(s => (
                    <span key={s} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm border border-gray-200">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No skills listed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Soft Skills & Missing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
          <div className="bg-white rounded-2xl shadow p-8 flex flex-wrap gap-3">
            {softSkills.map(s => (
              <span key={s} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm border border-indigo-200">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Missing High‑Value Skills</h3>
          <div className="bg-white rounded-2xl shadow p-8 space-y-3">
            {missingSkills.map(s => (
              <div key={s} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-3">
                  <PlusCircle size={20} className="text-orange-500" />
                  <span className="font-medium">{s}</span>
                </div>
                <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded uppercase font-bold">Recommended</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}