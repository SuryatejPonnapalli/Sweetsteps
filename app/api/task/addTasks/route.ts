import Task from "@/models/task.models";
import connectDb from "@/utils/connectDb";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  console.log(req);
  const { tasks } = req;
  console.log(tasks);

  console.log(tasks);
  try {
    await connectDb();

    const formattedTasks = tasks.map((task: any) => ({
      weekId: task.weekId,
      task: task.task,
      difficulty: task.difficulty,
      status: "Incomplete",
      endDay: task.endDay,
    }));

    const newTasks = await Task.insertMany(formattedTasks);

    return NextResponse.json(
      { success: true, newTasks: newTasks },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
