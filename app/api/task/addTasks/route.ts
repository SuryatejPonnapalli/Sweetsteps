import Task from "@/models/task.models";
import connectDb from "@/utils/connectDb";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const { tasks } = req;

  try {
    await connectDb();
    const newTasks = await Promise.all(
      tasks.map(async (task: any, index: number) => {
        await Task.create({
          weekId: task.weekId,
          task: task.task,
          difficulty: task.difficulty,
          status: "Incomplete",
        });
      })
    );

    //other alternative const newTasks = await Task.insertMany(task)

    return NextResponse.json({ success: true, newTasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
