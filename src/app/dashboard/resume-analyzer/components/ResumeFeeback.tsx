import { TrendingUp } from 'lucide-react'

interface Props  {
  feedback: string
}

const ResumeFeeback = ({ feedback }: Props) => {
  return (
    <section>
        <h2 className="text-xl font-semibold mb-4">Structural Feedback</h2>
        <div className="bg-white rounded-2xl shadow p-8">
          <p className="text-gray-700 leading-relaxed mb-4">{feedback || "No additional feedback available."}</p>
          <div className="flex items-center gap-3 text-sm font-medium text-indigo-700 bg-indigo-50 p-3 rounded-lg w-fit">
            <TrendingUp size={20} /> Career Positioning: Strong Senior / Lead potential.
          </div>
        </div>
      </section>
  )
}

export default ResumeFeeback