import connectDb from "@/utils/connectDb";
import Parent from "@/models/parent.models"; // Updated import
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const reqBody = await request.json();
    const { name, email, password, kidId, timeSpend } = reqBody;

    const existingParent = await Parent.findOne({ email });

    if (existingParent) {
      return NextResponse.json(
        { error: "Parent already exists with this email" },
        { status: 400 }
      );
    }
    //67f168492751ed4bf2c2ceb2
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newParent = await Parent.create({
      name,
      email,
      kidId,
      timeSpend,
      password: hashedPassword,
    });

    if (newParent) {
      return NextResponse.json(
        { message: "Parent registered successfully", parentId: newParent._id },
        { status: 200 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
