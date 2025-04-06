"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Menu } from "lucide-react";
import clsx from "clsx";
import CandyPage from "@/components/ownComponents/Candy";
import toy1 from "@/public/toys/toy1.jpeg";
import toy2 from "@/public/toys/toy2.jpeg";
import toy3 from "@/public/toys/toy3.jpeg";
import toy4 from "@/public/toys/toy4.jpeg";

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
  const [menuState, setMenuState] = useState(0);
  const [candySugarLevel, setCandySugarLevel] = useState(0);
  const [localCandyLevel, setLocalCandyLevel] = useState(candySugarLevel);
  const [imageValue, setImageValue] = useState(0);
  const [imageSelected, setImageSelected] = useState(false);

  useEffect(() => {
    setLocalCandyLevel(candySugarLevel);
  }, [candySugarLevel]);

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
          setSugar(kid.sugarCollected * 100);
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

  const handleCandyClick = () => {
    const maxCandy = 20;
    const sugarPerCandy = 100;
    const candyPerClick = 2;

    const candyRemaining = maxCandy - candySugarLevel;
    const maxUsableCandy = Math.floor(sugar / sugarPerCandy);

    const actualCandyToAdd = Math.min(
      candyPerClick,
      candyRemaining,
      maxUsableCandy
    );

    if (actualCandyToAdd <= 0) return;

    setCandySugarLevel((prev) => prev + actualCandyToAdd);
    setSugar((prev) => prev - actualCandyToAdd * sugarPerCandy);
  };

  const handleToyClick = async () => {
    if (candySugarLevel >= 40) {
      const response = await fetch("/api/kid/redeemGift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          giftSugarLevel: 40,
          giftType: "toy",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCandySugarLevel(candySugarLevel - 40);
      }
    }
  };

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

        {menuState === 0 && (
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
        )}

        {menuState === 1 && (
          <div
            className="px-2 pt-2 pb-10 bg-[#fff5e1]"
            onClick={handleCandyClick}
          >
            <p className="pb-3 text-[#FF6B81]">
              Candies(Click to check if you deserve a candy):
            </p>
            <CandyPage fillPoints={localCandyLevel} />{" "}
          </div>
        )}

        {menuState === 2 && (
          <div className="px-2 pt-2 pb-10 bg-[#fff5e1]">
            <p className="pb-3 text-[#FF6B81]">Toys:</p>
            <div className="flex-col gap-2 justify-center items-center">
              <div className="flex flex-row gap-2 justify-center items-center">
                <Image
                  src={toy1}
                  width={80}
                  height={80}
                  alt="toy image"
                  className={clsx(
                    "border-2",
                    imageValue === 0 ? "border-red-500" : "border-white"
                  )}
                  onClick={() => {
                    setImageValue(0);
                    setImageSelected(true);
                  }}
                />
                <Image
                  src={toy1}
                  width={80}
                  height={80}
                  alt="toy image"
                  className={clsx(
                    "border-2",
                    imageValue === 1 ? "border-red-500" : "border-white"
                  )}
                  onClick={() => {
                    setImageValue(1);
                    setImageSelected(true);
                  }}
                />
              </div>
              <div className="flex flex-row gap-2 justify-center items-center">
                <Image
                  src={toy1}
                  width={80}
                  height={80}
                  alt="toy image"
                  className={clsx(
                    "border-2",
                    imageValue === 2 ? "border-red-500" : "border-white"
                  )}
                  onClick={() => {
                    setImageValue(2);
                    setImageSelected(true);
                  }}
                />
                <Image
                  src={toy1}
                  width={80}
                  height={80}
                  alt="toy image"
                  className={clsx(
                    "border-2",
                    imageValue === 3 ? "border-red-500" : "border-white"
                  )}
                  onClick={() => {
                    setImageValue(3);
                    setImageSelected(true);
                  }}
                />
              </div>
            </div>
            {imageSelected && <button onClick={handleToyClick}></button>}
          </div>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <div
            className={clsx(
              "w-16 h-2 rounded-full ",
              menuState === 0 ? "bg-[#e07a7a]" : "bg-[#f8c4c9]"
            )}
            onClick={() => {
              setMenuState(0);
            }}
          ></div>
          <div
            className={clsx(
              "w-16 h-2 rounded-full ",
              menuState === 1 ? "bg-[#e07a7a]" : "bg-[#f8c4c9]"
            )}
            onClick={() => {
              setMenuState(1);
            }}
          ></div>
          <div
            className={clsx(
              "w-16 h-2 rounded-full bg-[#f8c4c9]",
              menuState === 2 ? "bg-[#e07a7a]" : "bg-[#f8c4c9]"
            )}
            onClick={() => {
              setMenuState(2);
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
