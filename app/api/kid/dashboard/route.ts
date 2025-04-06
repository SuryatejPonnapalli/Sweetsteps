import Kid from "@/models/kid.models";
import Week from "@/models/week.models";
import Task from "@/models/task.models";
import calculateAge from "@/utils/calculateDob";
import { getTokenData } from "@/utils/getJwtData";
import connectDb from "@/utils/connectDb";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const parent = await getTokenData(request);
    console.log(parent);
    const kid = await Kid.findById(parent.kidId);
    console.log(kid);
    if (!kid) {
      return NextResponse.json(
        { success: false, message: "Parent does not have a registered kid." },
        { status: 404 }
      );
    }

    const age = calculateAge(kid.dob);

    const latestWeek = await Week.findOne({ parentId: parent.id }).sort({
      createdAt: -1,
    });

    if (!latestWeek) {
      return NextResponse.json(
        {
          success: true,
          data: {
            kid: {
              name: kid.name,
              dob: kid.dob,
              age,
              personality: kid.personality,
              expectation: kid.expectation,
              interests: kid.interests,
              sugarCollected: kid.sugarCollected,
            },
            week: null,
            tasks: [],
          },
          message: "Kid info found, but no tasks or week available yet.",
        },
        { status: 200 }
      );
    }

    const tasks = await Task.find({ weekId: latestWeek._id });

    return NextResponse.json(
      {
        success: true,
        data: {
          kid: {
            name: kid.name,
            dob: kid.dob,
            age,
            personality: kid.personality,
            expectation: kid.expectation,
            interests: kid.interests,
            sugarCollected: kid.sugarCollected,
          },
          week: {
            weekNo: latestWeek.weekNo,
            weekStart: latestWeek.weekStart,
            sugarCollected: latestWeek.sugarCollected,
          },
          tasks,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching kid info:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching kid info and tasks",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
