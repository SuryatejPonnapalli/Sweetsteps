import Kid from "@/models/kid.models";
import Task from "@/models/task.models";
import Week from "@/models/week.models";
import connectDb from "@/utils/connectDb";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();

  const { taskId } = req;

  if (!taskId) {
    return NextResponse.json(
      { success: false, message: "No task ID provided" },
      { status: 400 }
    );
  }

  try {
    await connectDb();

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: "Complete" },
      { new: true }
    ).populate({
      path: "weekId",
      populate: {
        path: "kidId",
      },
    });

    let updateKidSugar;
    if (updatedTask.difficulty === "e") {
      updateKidSugar = await Kid.findByIdAndUpdate(
        updatedTask?.weekId?.kidId?._id,
        { $inc: { sugarLevel: 5 } },
        { new: true }
      );
    }
    if (updatedTask.difficulty === "m") {
      updateKidSugar = await Kid.findByIdAndUpdate(
        updatedTask?.weekId?.kidId?._id,
        { $inc: { sugarLevel: 7 } },
        { new: true }
      );
    }
    if (updatedTask.difficulty === "h") {
      updateKidSugar = await Kid.findByIdAndUpdate(
        updatedTask?.weekId?.kidId?._id,
        { $inc: { sugarLevel: 10 } },
        { new: true }
      );
    }

    if (!updatedTask || !updateKidSugar) {
      return NextResponse.json(
        { success: false, message: "Failed in updating Database." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: { kidSugar: updateKidSugar, updatedTask: updatedTask },
        message: "Task updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Task failed",
      },
      { status: error?.status || 500 } //check error status
    );
  }
};
