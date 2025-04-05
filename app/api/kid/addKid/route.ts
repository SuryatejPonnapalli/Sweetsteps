import Kid from "@/models/kid.models";
import connectDb from "@/utils/connectDb";
import { getTokenData } from "@/utils/getJwtData";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();

  const { name, dob, personality, expectation, interests } = req;

  if (!name || !dob || !personality || !expectation || !interests) {
    return NextResponse.json(
      { success: false, message: "Kid details not provided." },
      { status: 400 }
    );
  }

  try {
    const parent = await getTokenData(request);
    const parentId = parent?.id;
    const kid = await Kid.create({
      parentId: parentId,
      name: name,
      dob: dob,
      personality: personality,
      expectation: expectation,
      interests: interests,
    });

    if (!kid) {
      return NextResponse.json(
        { success: false, message: "Kid could not be created." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Kid created successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
};

//get report,
