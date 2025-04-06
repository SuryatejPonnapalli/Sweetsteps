"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  timeSpend: z.enum(["morning", "afternoon", "night"]),
});

export default function ParentRegisterForm() {
  const router = useRouter();
  const [loginClick, setLoginClick] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    timeSpend: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginClick(true);
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as any);
      return;
    }

    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/parent/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {
        toast("Parent registered successfully");
        router.push("/addKid");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong");
    } finally {
      setLoginClick(false);
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
      <div className="w-full max-w-xl p-8 rounded-lg border bg-[#FFF8EB] backdrop-blur-sm">
        <h1 className="text-2xl font-semibold text-[#FF6B81] mb-2">
          Parent Registration
        </h1>
        <p className="text-[#777777] mb-6">
          Fill in all the details to create your account
        </p>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-[#777777]">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="bg-[#F6F1E8] text-[#777777] placeholder:text-gray-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-sm">{fieldErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-[#777777]">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="bg-[#F6F1E8] text-[#777777] placeholder:text-gray-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-[#777777]">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="bg-[#F6F1E8] text-[#777777] placeholder:text-gray-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-sm">{fieldErrors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="timeSpend" className="text-sm text-[#777777]">
              Preferred Time to Spend
            </label>
            <select
              id="timeSpend"
              className="bg-[#F6F1E8] border text-[#777777] w-full px-4 py-2 rounded-md"
              value={formData.timeSpend}
              onChange={(e) =>
                setFormData({ ...formData, timeSpend: e.target.value })
              }
              required
            >
              <option value="">Select Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </select>
            {fieldErrors.timeSpend && (
              <p className="text-red-500 text-sm">{fieldErrors.timeSpend}</p>
            )}
          </div>

          <div className="flex items-center justify-center mt-[30px] mr-6">
            <Button
              type="submit"
              size="lg"
              className="text-md w-[75%] bg-[#FF6B81]"
            >
              {loginClick ? (
                <TailSpin height="20" width="20" color="#FFFFFF" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
