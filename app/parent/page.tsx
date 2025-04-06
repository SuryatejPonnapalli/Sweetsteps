"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Menu, Check, X, ChevronDown } from "lucide-react";
import sugarCube from "@/public/sugarcube.jpeg";
import { useState, useEffect } from "react";

interface Task {
  _id: string;
  task: string;
  difficulty: string;
  status: "Complete" | "Incomplete";
  endDay: string;
}

interface Week {
  _id: string;
  weekNo: number;
  weekStart: string;
  sugarCollected: number;
}

export default function Dashboard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const [showAddTaskModal, setShowAddModal] = useState<boolean>(false);
  const [week, setWeek] = useState<Week | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState("");
  const [kid, setKid] = useState<{ name: string; age: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/week/getWeek", { method: "POST" });

      const data = await res.json();
      if (data.success) {
        setWeek(data.data.week);
        setTasks(data.data.tasks || []);
        const dob = new Date(data.data.kid.dob);
        const today = new Date();
        const age =
          today.getFullYear() -
          dob.getFullYear() -
          (today.getMonth() < dob.getMonth() ||
          (today.getMonth() === dob.getMonth() &&
            today.getDate() < dob.getDate())
            ? 1
            : 0);

        setKid({
          name: data.data.kid.name,
          age: age,
        });
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
      setMessage("Failed to fetch week");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="bg-[#FFEED0] min-h-screen pb-8">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#]">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-pink-500"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-[#FF6B81] text-white hover:bg-pink-600"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </header>

      <section className="p-4 bg-[#FFF8EB] mx-4 rounded-2xl mt-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-row items-center justify-between w-full">
            <h2 className="text-xl font-medium text-green-700">Hi there! 👋</h2>
            <span className="text-sm font-bold">{formattedDate}</span>
          </div>
        </div>
        <p className="text-gray-600 mt-1">
          Your little champion is ready for their next adventure!
        </p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-pink-500">
            Wanna see your little champ performance?
          </p>
          <Button className="bg-[#FF6B81] hover:bg-pink-600 text-white">
            Get report
          </Button>
        </div>
      </section>

      <section className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Kid's Task</h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-[#FF6B81] text-white hover:bg-pink-600"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="h-5 w-5 text-white" />
          </Button>
        </div>

        {tasks.length === 0 && (
          <div className="h-[8rem] w-full border-2 border-dotted border-[#003a29] flex flex-col items-center justify-center rounded-2xl">
            <Plus className="h-10 w-10 bg-[#ff6b81] rounded-3xl" />
            <p className="w-[8rem] items-center">
              No tasks added till now add tasks
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex flex-col bg-[#FFB3C5] rounded-md px-2 py-2 space-y-2"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center space-x-2">
                  <div className="h-6 w-6 bg-white rounded-2xl"></div>
                  <h1 className="text-[#6D6D6D] text-lg">{task.task}</h1>
                </div>
                <p className="text-[7.4px]">
                  {new Date(task.endDay).toDateString() ===
                  new Date().toDateString()
                    ? "Today"
                    : new Date(task.endDay).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                </p>
              </div>
              {task.status === "Complete" ? (
                <span className="bg-[#00885F] text-white rounded-2xl h-6 w-6 ml-auto flex items-center justify-center">
                  <Check size={16} />
                </span>
              ) : (
                <button
                  className="bg-[#00885F] rounded-md w-[60%] justify-center mx-auto text-white"
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/task/finishTask", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ taskId: task._id }),
                      });

                      const data = await res.json();
                      if (data.success) {
                        alert("Task marked as complete!");
                        location.reload(); // or update state if you want to avoid reload
                      } else {
                        alert("Failed to mark task as complete.");
                      }
                    } catch (err) {
                      console.error("Error completing task", err);
                      alert(
                        "Something went wrong while marking the task as complete."
                      );
                    }
                  }}
                >
                  Done
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Kid's Details</h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-pink-500 text-white hover:bg-pink-600"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <Card className="p-4 border-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-pink-500">
                {/* <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Kid Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                /> */}
              </div>
              <div>
                <h3 className="text-lg font-medium text-green-700">
                  {kid?.name ?? "Loading..."}
                </h3>
                <p className="text-sm text-gray-600">
                  {kid ? `${kid.age} years` : "Fetching age..."}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {showAddTaskModal && week && (
        <ShowAddTaskModal
          closeModal={() => setShowAddModal(false)}
          weekId={week._id}
        />
      )}
    </div>
  );
}

interface ShowAddTaskModalProps {
  closeModal: () => void;
  weekId: string;
}

const ShowAddTaskModal = ({ closeModal, weekId }: ShowAddTaskModalProps) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [suggestedTasks, setSuggestedTasks] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Record<string, string>>({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch("/api/task/generateTasks", { method: "POST" });
        const data = await res.json();
        console.log(data);
        if (data.success && data.data?.week_1) {
          const suggestions = data.data.week_1.map(
            (item: [string, string]) => item[0]
          );
          setSuggestedTasks(suggestions);
        }
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      }
    };

    fetchSuggestions();
  }, []);

  console.log(suggestedTasks);

  const days = [
    { name: "Monday", color: "bg-[#f8c4c4]" },
    { name: "Tuesday", color: "bg-[#c8f8c4]" },
    { name: "Wednesday", color: "bg-[#e8c8b8]" },
    { name: "Thursday", color: "bg-[#f8e8b0]" },
    { name: "Friday", color: "bg-[#c4e0f8]" },
    { name: "Saturday", color: "bg-[#e0c8f0]" },
  ];

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const handleTaskChange = (day: string, value: string) => {
    setTasks({ ...tasks, [day]: value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const today = new Date();

      const tasksToSend = Object.entries(tasks)
        .filter(([_, value]) => value.trim() !== "")
        .map(([day, value]) => {
          const endDate = new Date();
          const dayIndex = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].indexOf(day);

          const diff = (dayIndex + 7 - endDate.getDay()) % 7;
          endDate.setDate(endDate.getDate() + diff);
          endDate.setHours(23, 59, 59, 999);

          return {
            weekId: weekId,
            task: value.trim(),
            difficulty: "e",
            status: "Incomplete",
            endDay: endDate.toISOString(),
          };
        });

      const createRes = await fetch("/api/task/addTasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: tasksToSend, weekId }),
      });

      const result = await createRes.json();

      if (result.success) {
        alert("Tasks created successfully!");
        closeModal();
        location.reload();
      } else {
        alert("Something went wrong while creating tasks.");
      }
    } catch (err) {
      console.error("Task creation failed", err);
      alert("Error creating tasks");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 text-white">
      <div className="bg-[#FFEED0] mx-2 px-6 py-6 rounded-[1rem] space-y-4 text-center text-black w-[90%] max-w-xl relative">
        <button
          className="absolute right-4 top-4 text-black hover:text-red-500"
          onClick={closeModal}
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold">Assign a task for each day</h2>

        <div className="space-y-4">
          {days.map((day) => (
            <div key={day.name} className="rounded-xl overflow-hidden">
              <button
                className={`w-full p-4 flex justify-between items-center ${day.color}`}
                onClick={() => toggleDay(day.name)}
              >
                <span className="text-xl font-medium">{day.name}</span>
                <ChevronDown className="h-6 w-6 text-white" />
              </button>

              {expandedDay === day.name && (
                <div className="p-4 bg-white/50 border border-t-0 border-gray-200 space-y-2">
                  <textarea
                    value={tasks[day.name]}
                    onChange={(e) => handleTaskChange(day.name, e.target.value)}
                    rows={3}
                    placeholder={`Enter a task for ${day.name}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a5d3c] resize-none"
                  />
                  {/* {suggestedTasks.length > 0 && (
                    <div className="text-left space-y-1">
                      <p className="text-sm font-semibold text-gray-600">
                        Suggestions:
                      </p>
                      <ul className="space-y-1">
                        {suggestedTasks.map((suggestion, index) => (
                          <li
                            key={index}
                            className="bg-white border text-sm px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f8ebd0]"
                            onClick={() =>
                              handleTaskChange(day.name, suggestion)
                            }
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )} */}
                  {suggestedTasks.length > 0 && (
                    <div className="text-left space-y-1">
                      <p className="text-sm font-semibold text-gray-600">
                        Suggestions:
                      </p>
                      <div className="max-h-40 overflow-y-auto pr-1">
                        <ul className="space-y-1">
                          {suggestedTasks.map((suggestion, index) => (
                            <li
                              key={index}
                              className="bg-white border text-sm px-3 py-2 rounded-lg cursor-pointer hover:bg-[#f8ebd0]"
                              onClick={() =>
                                handleTaskChange(day.name, suggestion)
                              }
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <Button
          disabled={submitting}
          onClick={handleSubmit}
          className="w-full bg-[#2a5d3c] hover:bg-[#1f4930] text-white"
        >
          {submitting ? "Creating..." : "Create Tasks"}
        </Button>
      </div>
    </div>
  );
};
