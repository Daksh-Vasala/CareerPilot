

interface Props {
  suggestions: string[];
}

export default function ResumeSuggestions({ suggestions }: Props) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          AI Actionable Improvements
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-6 space-y-4 hover:shadow-md transition"
          >
            <span className="inline-block text-[10px] font-bold uppercase px-2 py-1 rounded bg-indigo-100 text-indigo-700">
              Suggestion {index + 1}
            </span>

            <p className="text-gray-700 leading-relaxed">
              {suggestion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}