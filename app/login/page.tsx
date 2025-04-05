"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

export default function ParentLoginForm() {
  const router = useRouter();
  const [loginClick, setLoginClick] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginClick(true);

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as any);
      setLoginClick(false);
      return;
    }

    setError(null);
    setFieldErrors({});

    try {
      console.log("jsj");
      const response = await fetch("/api/parent/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast("Login successful");
        router.push("/");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoginClick(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 bg-[#FFEED0] min-h-screen">
      <div className="flex flex-col items-center justify-center mt-10 mb-4">
        <Image
          src="/legsF.png"
          height={100}
          width={100}
          alt="Legs illustration"
        />
        <p className="text-[#ff6b81] font-bold text-4xl m-4">SweetSteps</p>
      </div>
      <div className="w-full max-w-md p-8 rounded-lg border border-white bg-white">
        <h1 className="text-2xl text-[#ff6b81] mb-2 font-bold">Parent Login</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-lg font-semibold text-gray-400"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                className="bg-gray-100 placeholder:text-gray-500"
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
              <label
                htmlFor="password"
                className="text-lg text-gray-400 font-semibold"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter passowrd"
                className="bg-gray-100 placeholder:text-gray-500"
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

            <div className="flex items-center justify-center mt-12 mr-6">
              <Button
                type="submit"
                size="lg"
                className="text-md w-[75%] bg-[#ff6b81] text-lg font-bold"
              >
                {loginClick ? (
                  <TailSpin height="20" width="20" color="#ff6b81" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-auto mb-12">
        <button
          className="bg-white py-2 px-20 text-lg rounded-md"
          onClick={() => {
            router.push("/register");
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
