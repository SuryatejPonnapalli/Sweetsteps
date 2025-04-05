import { NextRequest, NextResponse } from "next/server";
import Parent from "@/models/parent.models";
import connectDb from "@/utils/connectDb";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();

    const req = await request.json();
    const { email, password } = req;
    console.log(email, password);

    const parent = await Parent.findOne({ email });
    if (!parent) {
      return NextResponse.json(
        { error: "Parent with this email does not exist" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcryptjs.compare(password, parent.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: parent._id,
      name: parent.name,
      email: parent.email,
      kidId: parent?.kidId,
      timeSpend: parent.timeSpend,
    };

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "3d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3, // 3 days
    });

    return response;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
