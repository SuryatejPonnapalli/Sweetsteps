import Kid from "@/models/kid.models";
import Task from "@/models/task.models";
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
        { $inc: { sugarCollected: 5 } },
        { new: true }
      );
    }
    if (updatedTask.difficulty === "m") {
      updateKidSugar = await Kid.findByIdAndUpdate(
        updatedTask?.weekId?.kidId?._id,
        { $inc: { sugarCollected: 7 } },
        { new: true }
      );
    }
    if (updatedTask.difficulty === "h") {
      console.log("here");
      updateKidSugar = await Kid.findByIdAndUpdate(
        updatedTask?.weekId?.kidId?._id,
        { $inc: { sugarCollected: 10 } },
        { new: true }
      );
    }

    console.log("task", updatedTask);
    console.log("sugar", updateKidSugar);
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
      { status: 500 } //check error status
    );
  }
};
