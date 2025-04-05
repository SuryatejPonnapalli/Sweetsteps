"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Menu } from "lucide-react";
import { Check } from "lucide-react";
import sugarCube from "@/public/sugarcube.jpeg";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Dashboard() {
  const today = new Date();
  const [showAddTaskModal, setShowAddModal] = useState<boolean>(false);
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const tasks = [
    {
      day: "Monday",
      task: "Cleaning",
      description: "Clean your bedroom and change your blanket",
      status: "done",
      color: "bg-pink-200",
    },
    {
      day: "Tuesday",
      task: "Reading",
      description: "Read a storybook for 15 minutes",
      status: "done",
      color: "bg-green-200",
    },
    {
      day: "Wednesday",
      task: "Cleaning",
      description: "Clean your bedroom and change your blanket",
      status: "not-done",
      color: "bg-red-200",
    },
    {
      day: "Thursday",
      task: "Cleaning",
      description: "Clean your bedroom and change your blanket",
      status: "done",
      color: "bg-yellow-200",
    },
    {
      day: "Friday",
      task: "Cleaning",
      description: "Clean your bedroom and change your blanket",
      status: "done",
      color: "bg-blue-200",
    },
    {
      day: "Saturday",
      task: "Cleaning",
      description: "Clean your bedroom and change your blanket",
      status: "done",
      color: "bg-purple-200",
    },
  ];

  const achievements = [
    {
      name: "Sugar Points",
      value: "3500+",
      icon: sugarCube,
      color: "bg-yellow-200",
    },
    {
      name: "Big Candy",
      value: "10+",
      icon: sugarCube,
      color: "bg-yellow-200",
    },
    { name: "Toys", value: "8+", icon: sugarCube, color: "bg-yellow-200" },
  ];

  return (
    <div className="bg-[#FFEED0] min-h-screen pb-8">
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#]">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Profile"
              width={48}
              height={48}
              className="object-cover"
            />
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
            onClick={() => setShowAddModal((prev) => !prev)}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

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

                <p className="text-[8px]">{task.day}</p>
              </div>
              <p className="text-xs">{task.description}</p>
              {/* <button className="bg-[#00885F] rounded-md w-[60%] justify-center mx-auto text-white">
                Done
              </button> */}
              <span className="bg-[#00885F] text-white rounded-2xl h-6 w-6 ml-auto flex items-center justify-center">
                <Check size={16} />
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="p-4">
        <h2 className="text-xl font-bold mb-4">Kid's Achievements</h2>
        <div className="flex justify-between">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#FFE57C] mb-2 items-center justify-center">
                <Image
                  src={achievement.icon}
                  alt={achievement.name}
                  width={40}
                  height={40}
                  className=" object-cover  mix-blend-multiply items-center justify-center mx-auto mt-2"
                />
              </div>
              <h3 className="text-sm font-medium">{achievement.name}</h3>
              <p className="text-yellow-500 font-bold">{achievement.value}</p>
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
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Kid Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-green-700">
                  Ansh Kumar
                </h3>
                <p className="text-sm text-gray-600">6 years</p>
              </div>
            </div>
            <div className="text-pink-500 font-medium">Grade 3</div>
          </div>
        </Card>
      </section>
      {showAddTaskModal && <ShowAddTaskModal />}
    </div>
  );
}

const ShowAddTaskModal = () => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [customTasks, setCustomTasks] = useState<Record<string, string[]>>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [newTask, setNewTask] = useState<string>("");

  // Predefined task suggestions for each day
  const predefinedTasks: Record<string, string[]> = {
    Monday: ["Weekly planning", "Team meeting", "Check emails"],
    Tuesday: ["Project review", "Client calls", "Update documentation"],
    Wednesday: ["Mid-week check-in", "Progress report", "Team lunch"],
    Thursday: ["Quality assurance", "Prepare for demo", "Update stakeholders"],
    Friday: ["Weekly review", "Plan next week", "Team feedback"],
    Saturday: ["Personal projects", "Learning time", "Relaxation"],
  };

  const days = [
    { name: "Monday", color: "bg-[#f8c4c4]" },
    { name: "Tuesday", color: "bg-[#c8f8c4]" },
    { name: "Wednesday", color: "bg-[#e8c8b8]" },
    { name: "Thursday", color: "bg-[#f8e8b0]" },
    { name: "Friday", color: "bg-[#c4e0f8]" },
    { name: "Saturday", color: "bg-[#e0c8f0]" },
  ];

  const toggleDay = (day: string) => {
    if (expandedDay === day) {
      setExpandedDay(null);
    } else {
      setExpandedDay(day);
    }
  };

  const addCustomTask = (day: string) => {
    if (newTask.trim() !== "") {
      setCustomTasks({
        ...customTasks,
        [day]: [...customTasks[day], newTask.trim()],
      });
      setNewTask("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 text-white ">
      <div className="bg-[#FFEED0] mx-2 px-6 py-6 rounded-[1rem] space-y-4 text-center text-black w-[90%]">
        <h2 className="text-xl font-semibold ">Assign tasks for this week</h2>
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
                <div className="p-4 bg-white/50 border border-t-0 border-gray-200">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Suggested Tasks:</h3>
                    <ul className="space-y-2">
                      {predefinedTasks[day.name].map((task, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-4 h-4 border border-gray-400 rounded-sm"></div>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {customTasks[day.name].length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Your Tasks:</h3>
                      <ul className="space-y-2">
                        {customTasks[day.name].map((task, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-4 h-4 border border-gray-400 rounded-sm"></div>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Add Personal Task:</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter your task"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a5d3c]"
                      />
                      <button
                        onClick={() => addCustomTask(day.name)}
                        className="p-2 bg-[#2a5d3c] text-white rounded-lg hover:bg-opacity-90"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
