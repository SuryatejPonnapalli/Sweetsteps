"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Menu } from "lucide-react";

interface Task {
  _id: string;
  task: string;
  difficulty: string;
  status: "Complete" | "Incomplete";
  endDay: string;
}

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [kidName, setKidName] = useState("Loading...");
  const [sugar, setSugar] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const fetchKidInfo = async () => {
      try {
        const res = await fetch("/api/kid/dashboard", {
          method: "POST",
        });
        const data = await res.json();

        if (data.success) {
          const kid = data.data.kid;
          const tasks = data.data.tasks || [];

          setKidName(kid.name);
          setSugar(kid.sugarCollected);
          setTasks(tasks);

          const completed = tasks.filter(
            (task: Task) => task.status === "Complete"
          ).length;
          setCompletedCount(completed);
        }
      } catch (err) {
        console.error("Failed to load kid info", err);
      }
    };

    fetchKidInfo();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8ebd0] flex flex-col items-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="rounded-full overflow-hidden h-12 w-12 bg-[#f18d96]">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <button
            className="rounded-full bg-[#f18d96] h-12 w-12 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm flex justify-between items-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-[#3a9f75]">
              Hi {kidName}!
            </h2>
            <p className="text-gray-500 text-lg">
              Ready for some sweet tasks today?
            </p>
            <div className="pt-2">
              <p className="text-[#f18d96]">You Have</p>
              <p className="text-[#f18d96] font-semibold text-xl">
                {sugar} Sugar Cubes
              </p>
            </div>
          </div>
          <div className="relative h-32 w-32">
            <Image
              src="/kidF.png"
              alt="Character"
              width={128}
              height={128}
              className="object-contain"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <h3 className="text-2xl font-bold text-[#e94234] mb-5">
            Completed {completedCount}/{tasks.length}
          </h3>

          <div className="space-y-4">
            {tasks.map((task, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    task.status === "Complete"
                      ? "bg-[#3a9f75]"
                      : "border-2 border-dashed border-gray-300"
                  }`}
                >
                  {task.status === "Complete" && (
                    <Check className="text-white w-5 h-5" />
                  )}
                </div>
                <span className="text-[#3a9f75]">{task.task}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-[#e94234] flex items-center justify-center">
              <span className="text-[#e94234] text-xs font-bold">i</span>
            </div>
            <span className="text-[#e94234]">
              Complete all the tasks assigned to fill your jar 🍬
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <div className="w-16 h-2 rounded-full bg-[#e07a7a]"></div>
          <div className="w-16 h-2 rounded-full bg-[#f8c4c9]"></div>
          <div className="w-16 h-2 rounded-full bg-[#f8c4c9]"></div>
        </div>
      </div>
    </div>
  );
}
