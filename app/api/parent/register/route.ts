import connectDb from "@/utils/connectDb";
import Parent from "@/models/parent.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const reqBody = await request.json();
    const { name, email, password, timeSpend } = reqBody;

    const existingParent = await Parent.findOne({ email });

    if (existingParent) {
      return NextResponse.json(
        { error: "Parent already exists with this email" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newParent = await Parent.create({
      name,
      email,
      timeSpend,
      password: hashedPassword,
    });

    if (!newParent) {
      return NextResponse.json(
        { error: "Parent could not be created" },
        { status: 500 }
      );
    }

    const tokenData = {
      id: newParent._id,
      name: newParent.name,
      email: newParent.email,
      timeSpend: newParent.timeSpend,
    };

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "3d",
    });

    const response = NextResponse.json({
      message: "Parent registered successfully",
      parentId: newParent._id,
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3, // 3 days
    });

    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
