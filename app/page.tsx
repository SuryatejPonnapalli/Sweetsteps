"use client";
import Image from "next/image";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home(): JSX.Element {
  const [selectedRole, setSelectedRole] = useState<"parent" | "kid" | null>(
    null
  );
  const router = useRouter();

  const handleSelect = (role: "parent" | "kid") => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole === "parent") router.push("/parent");
    else if (selectedRole === "kid") router.push("/kid");
  };

  return (
    <div className="flex flex-col items-center bg-[#FFEED0] min-h-screen">
      <div className="mt-28">
        <Image
          src="/legsF.png"
          height={100}
          width={100}
          alt="Legs illustration"
        />
      </div>

      <p className="text-[#ff6b81] font-bold text-4xl mt-4">SweetSteps</p>

      <div
        className={`mt-16 cursor-pointer rounded-md ${
          selectedRole === "parent" ? "border-2 border-[#FF0000]" : ""
        }`}
        onClick={() => handleSelect("parent")}
      >
        <Image src="/parent.png" height={300} width={300} alt="parent" />
      </div>

      <div
        className={`mt-8 cursor-pointer rounded-md ${
          selectedRole === "kid" ? "border-2 border-[#FF0000]" : ""
        }`}
        onClick={() => handleSelect("kid")}
      >
        <Image src="/kid.png" height={300} width={300} alt="kid" />
      </div>

      {selectedRole && (
        <button
          className="mt-20 px-6 py-2 w-60 rounded-md bg-[#ff6b81] text-white font-bold text-xl"
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
}
