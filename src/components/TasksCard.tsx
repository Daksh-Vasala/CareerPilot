"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { Task } from "@/services/client/dashboard.service";
// import { toggleTask } from "@/services/client/dashboard.service"; // hypothetical client API
import { useRouter } from "next/navigation";

export default function TasksCard({ initialTasks }: { initialTasks: Task[] }) {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const completed = tasks.filter((t) => t.done).length;

  // const handleToggle = async (id: number) => {
  //   // Optimistically update
  //   const updated = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  //   setTasks(updated);
  //   try {
  //     await toggleTask(id); // call API/server action
  //     router.refresh(); // re-fetch server data (optional)
  //   } catch (error) {
  //     // revert on error
  //     setTasks(initialTasks);
  //     console.error(error);
  //   }
  // };

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">Today&apos;s Tasks</h3>
        <span className="text-xs font-medium text-indigo-600">
          {completed} / {tasks.length} Completed
        </span>
      </div>
      <div className="space-y-2">
        {tasks.map((t) => (
          <label
            key={t.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <button
              // onClick={() => handleToggle(t.id)}
              className="shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors group-hover:border-indigo-400"
            >
              {t.done && <Check className="w-3 h-3 text-indigo-600" />}
            </button>
            <span
              className={`text-sm ${t.done ? "text-gray-400 line-through" : "text-gray-700"}`}
            >
              {t.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}