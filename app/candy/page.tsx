"use client";

import { useEffect, useState } from "react";

// Define task difficulty-based fill increments
const fillMap: Record<"easy" | "medium" | "hard", number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

type Task = {
  id: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
};

export default function CandyPage() {
  const [fillPercentage, setFillPercentage] = useState(0);

  // Mock tasks - in real app this would come from backend
  const tasks: Task[] = [
    { id: 1, title: "Brush Teeth", difficulty: "hard", completed: true },
    { id: 2, title: "Do Homework", difficulty: "hard", completed: true },
    { id: 3, title: "Clean Room", difficulty: "hard", completed: false },
    { id: 4, title: "Read a Book", difficulty: "hard", completed: true },
    { id: 5, title: "Water Plants", difficulty: "hard", completed: false },
  ];

  useEffect(() => {
    // Calculate fill based on completed tasks
    const totalFill = tasks.reduce((acc, task) => {
      if (task.completed) return acc + fillMap[task.difficulty];
      return acc;
    }, 0);

    setFillPercentage(Math.min(totalFill, 100));
  }, [tasks]);

  const stickMaxHeight = 40;
  const candyMaxHeight = 100;
  const totalFill = (fillPercentage / 100) * (stickMaxHeight + candyMaxHeight);
  const stickFill = Math.min(totalFill, stickMaxHeight);
  const candyFill = totalFill > stickMaxHeight ? totalFill - stickMaxHeight : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff5e1] gap-6">
      {/* Candy visual */}
      <div className="flex flex-col items-center">
        <div className="relative w-[100px] h-[100px] rounded-full bg-pink-200 overflow-hidden shadow-md">
          <div
            className="absolute bottom-0 left-0 w-full bg-[#ff6b81] transition-all duration-500 ease-in-out"
            style={{ height: `${candyFill}px` }}
          />
        </div>

        <div className="relative w-[10px] h-[40px] bg-gray-300 mt-1 overflow-hidden rounded-full shadow-inner">
          <div
            className="absolute bottom-0 left-0 w-full bg-[#ff6b81] transition-all duration-500 ease-in-out"
            style={{ height: `${stickFill}px` }}
          />
        </div>
      </div>

      <p className="text-[#ff6b81] font-semibold text-lg">
        Candy Fill: {fillPercentage}%
      </p>
    </div>
  );
}
