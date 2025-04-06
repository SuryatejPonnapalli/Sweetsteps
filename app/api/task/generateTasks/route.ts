import Kid from "@/models/kid.models";
import calculateAge from "@/utils/calculateDob";
import connectDb from "@/utils/connectDb";
import { getTokenData } from "@/utils/getJwtData";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const parent = await getTokenData(request);
    await connectDb();
    const kid = await Kid.findById(parent.kidId);

    const age = calculateAge(kid.dob);

    const payload = {
      goal: kid.expectation,
      characteristics: kid.personality,
      age: age,
      interests: kid.interests,
      available_time: parent.timeSpend,
    };

    console.log(payload);

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
    console.log(data);
    return NextResponse.json({ success: true, data: "hello" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching tasks",
      error,
    });
  }
};
