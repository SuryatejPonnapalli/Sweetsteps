import Task from "@/models/task.models";
import Week from "@/models/week.models";
import connectDb from "@/utils/connectDb";
import { getTokenData } from "@/utils/getJwtData";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const parent = await getTokenData(request);
    console.log(parent);
    await connectDb();

    const latestWeek = await Week.findOne({ parentId: parent.id }).sort({
      createdAt: -1,
    });

    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (
      !latestWeek ||
      now - new Date(latestWeek.weekStart).getTime() > sevenDaysMs
    ) {
      const createdWeek = await Week.create({
        parentId: parent.id,
        weekNo: latestWeek?.weekNo ? latestWeek.weekNo + 1 : 1,
        kidId: parent.kidId,
        weekStart: now,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Week created successfully.",
          data: { week: createdWeek },
        },
        { status: 200 }
      );
    }

    console.log(latestWeek._id);
    const tasks = await Task.find({ weekId: latestWeek._id });

    return NextResponse.json(
      {
        success: true,
        message: "Week already exists.",
        data: { week: latestWeek, tasks: tasks },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Server error." },
      { status: 500 }
    );
  }
};
