"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Menu } from "lucide-react";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8ebd0] flex flex-col items-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
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

        {/* Greeting Card */}
        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm flex justify-between items-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-[#3a9f75]">Hi Ansh!</h2>
            <p className="text-gray-500 text-lg">
              Ready for some sweet tasks today?
            </p>
            <div className="pt-2">
              <p className="text-[#f18d96]">You Have</p>
              <p className="text-[#f18d96] font-semibold text-xl">
                750 Sugar Cubes
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

        {/* Tasks Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <h3 className="text-2xl font-bold text-[#e94234] mb-5">
            Completed 2/6
          </h3>

          {/* Task List */}
          <div className="space-y-4">
            {/* Completed Task 1 */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3a9f75] flex items-center justify-center">
                <Check className="text-white w-5 h-5" />
              </div>
              <span className="text-[#e07a7a]">
                Ready for some sweet tasks today?
              </span>
            </div>

            {/* Completed Task 2 */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3a9f75] flex items-center justify-center">
                <Check className="text-white w-5 h-5" />
              </div>
              <span className="text-[#3a9f75]">
                Ready for some sweet tasks today?
              </span>
            </div>

            {/* Incomplete Task 1 */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"></div>
              <span className="text-[#e07a7a]">
                Ready for some sweet tasks today?
              </span>
            </div>

            {/* Incomplete Task 2 */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"></div>
              <span className="text-[#e9b426]">
                Ready for some sweet tasks today?
              </span>
            </div>

            {/* Incomplete Task 3 */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"></div>
              <span className="text-[#4db0e6]">
                Ready for some sweet tasks today?
              </span>
            </div>

            {/* Incomplete Task 4 */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"></div>
              <span className="text-[#b749e5]">
                Ready for some sweet tasks today?
              </span>
            </div>
          </div>

          {/* Info Message */}
          <div className="mt-8 flex items-start gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-[#e94234] flex items-center justify-center">
              <span className="text-[#e94234] text-xs font-bold">i</span>
            </div>
            <span className="text-[#e94234]">
              Complete all the task's assigned to fill your
            </span>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="w-16 h-2 rounded-full bg-[#e07a7a]"></div>
          <div className="w-16 h-2 rounded-full bg-[#f8c4c9]"></div>
          <div className="w-16 h-2 rounded-full bg-[#f8c4c9]"></div>
        </div>
      </div>
    </div>
  );
}
