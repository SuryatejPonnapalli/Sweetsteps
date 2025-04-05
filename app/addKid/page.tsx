"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const kidSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  personality: z
    .array(
      z.enum([
        "shy",
        "creative",
        "energetic",
        "sensitive",
        "atheletic",
        "playful",
      ])
    )
    .min(1, "Select at least one personality"),
  expectation: z.string().min(1, "Expectation is required"),
  interests: z
    .array(z.enum(["drawing", "sports", "singing", "dance"]))
    .min(1, "Select at least one interest"),
});

export default function KidRegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    personality: [] as string[],
    expectation: "",
    interests: [] as string[],
  });

  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (
    field: "personality" | "interests",
    value: string
  ) => {
    const list = formData[field];
    const updatedList = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    setFormData({ ...formData, [field]: updatedList });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = kidSchema.safeParse(formData);

    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors);
      return;
    }

    setFieldErrors({});
    try {
      const res = await fetch("/api/kid/addKid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {
        toast("Kid registered successfully");
        router.push("/login");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFEED0] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center px-8 py-6">
        <div>
          <img src="/legsF.png" alt="Steps Image" className="w-28 h-28" />
        </div>

        <div>
          <p className="text-[#FF6B81] font-bold text-5xl font-baloo">
            SweetSteps
          </p>
        </div>
      </div>

      <div className="w-full max-w-lg p-8 rounded-lg border px-8 bg-[#FFF8EB] backdrop-blur-sm">
        <h1 className="text-2xl font-semibold text-[#FF6B81] mb-4">
          Register Kid
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[#777777] text-sm">Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter kid's name"
              className="bg-[#F6F1E8] text-[#777777] placeholder:text-gray-500"
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-sm">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <label className="text-[#777777] text-sm">Date of Birth</label>
            <Input
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className="bg-[#F6F1E8] text-[#777777] placeholder:text-gray-500"
            />
            {fieldErrors.dob && (
              <p className="text-red-500 text-sm">{fieldErrors.dob}</p>
            )}
          </div>

          <div>
            <label className="text-[#F6F1E8 ] text-sm">Personality</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "shy",
                "creative",
                "energetic",
                "sensitive",
                "atheletic",
                "playful",
              ].map((trait) => (
                <label key={trait} className="text-[#777777] text-sm">
                  <input
                    type="checkbox"
                    checked={formData.personality.includes(trait)}
                    onChange={() => handleCheckboxChange("personality", trait)}
                    className="mr-1"
                  />
                  {trait}
                </label>
              ))}
            </div>
            {fieldErrors.personality && (
              <p className="text-red-500 text-sm">{fieldErrors.personality}</p>
            )}
          </div>

          <div>
            <label className="text-[#777777] text-sm">Parent Expectation</label>
            <Input
              value={formData.expectation}
              onChange={(e) =>
                setFormData({ ...formData, expectation: e.target.value })
              }
              placeholder="e.g., Improve confidence"
              className="bg-[#F6F1E8] text-[#777777] placeholder:text-gray-500"
            />
            {fieldErrors.expectation && (
              <p className="text-red-500 text-sm">{fieldErrors.expectation}</p>
            )}
          </div>

          <div>
            <label className="text-[#777777] text-sm">Interests</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["drawing", "sports", "singing", "dance"].map((item) => (
                <label key={item} className="text-[#777777] text-sm">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(item)}
                    onChange={() => handleCheckboxChange("interests", item)}
                    className="mr-1"
                  />
                  {item}
                </label>
              ))}
            </div>
            {fieldErrors.interests && (
              <p className="text-red-500 text-sm">{fieldErrors.interests}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-4 bg-[#FF6B81] text-white">
            Register Kid
          </Button>
        </form>
      </div>
    </div>
  );
}
