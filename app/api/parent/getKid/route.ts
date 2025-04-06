import Kid from "@/models/kid.models";
import calculateAge from "@/utils/calculateDob";
import { getTokenData } from "@/utils/getJwtData";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const parent = await getTokenData(request);

    const kid = await Kid.findById(parent.kidId);

    if (!kid) {
      return NextResponse.json(
        { success: false, message: "Parent does not have a registered kid." },
        { status: 404 }
      );
    }

    const age = calculateAge(kid.dob);

    const data = {
      name: kid.name,
      dob: kid.dob,
      age,
      personality: kid.personality,
      expectation: kid.expectation,
      interests: kid.interests,
      sugarCollected: kid.sugarCollected,
    };

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching kid info:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching kid info",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
