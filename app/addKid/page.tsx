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
      const res = await fetch("/api/kid/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {
        toast("Kid registered successfully");
        router.push("/home");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
      <div className="w-full max-w-lg p-8 rounded-lg border border-gray-800 bg-[#020817]/50 backdrop-blur-sm">
        <h1 className="text-2xl font-semibold text-white mb-4">Register Kid</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-400 text-sm">Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter kid's name"
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-sm">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-sm">Date of Birth</label>
            <Input
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
            />
            {fieldErrors.dob && (
              <p className="text-red-500 text-sm">{fieldErrors.dob}</p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-sm">Personality</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "shy",
                "creative",
                "energetic",
                "sensitive",
                "atheletic",
                "playful",
              ].map((trait) => (
                <label key={trait} className="text-white text-sm">
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
            <label className="text-gray-400 text-sm">Parent Expectation</label>
            <Input
              value={formData.expectation}
              onChange={(e) =>
                setFormData({ ...formData, expectation: e.target.value })
              }
              placeholder="e.g., Improve confidence"
            />
            {fieldErrors.expectation && (
              <p className="text-red-500 text-sm">{fieldErrors.expectation}</p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-sm">Interests</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["drawing", "sports", "singing", "dance"].map((item) => (
                <label key={item} className="text-white text-sm">
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

          <Button type="submit" className="w-full mt-4">
            Register Kid
          </Button>
        </form>
      </div>
    </div>
  );
}
