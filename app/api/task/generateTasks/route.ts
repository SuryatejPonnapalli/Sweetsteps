import Kid from "@/models/kid.models";
import calculateAge from "@/utils/calculateDob";
import { getTokenData } from "@/utils/getJwtData";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const parent = await getTokenData(request);
    const kid = await Kid.findById(parent.kidId);

    console.log(kid.dob);

    const age = calculateAge(kid.dob);

    console.log(age);

    const payload = {
      goal: kid.expectation,
      characteristics: kid.personality,
      age: age,
      interests: kid.interests,
      available_time: kid.timeSpend,
    };

    const response = await fetch(`${process.env.ML_URL}/suggest_tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch tasks from external API",
        status: response.status,
      });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching tasks",
      error,
    });
  }
};
