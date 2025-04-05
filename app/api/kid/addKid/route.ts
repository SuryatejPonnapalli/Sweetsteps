import Kid from "@/models/kid.models";
import Parent from "@/models/parent.models";
import connectDb from "@/utils/connectDb";
import { getTokenData } from "@/utils/getJwtData";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const req = await request.json();
    const { name, dob, personality, expectation, interests } = req;

    if (!name || !dob || !personality || !expectation || !interests) {
      return NextResponse.json(
        { success: false, message: "Kid details not provided." },
        { status: 400 }
      );
    }

    const parent = await getTokenData(request);
    const parentId = parent?.id;

    if (!parentId) {
      return NextResponse.json(
        { success: false, message: "Parent authentication failed." },
        { status: 401 }
      );
    }

    const kid = await Kid.create({
      name,
      dob,
      personality,
      expectation,
      interests,
    });

    const updateParent = await Parent.findByIdAndUpdate(
      parentId,
      { kidId: kid._id },
      { new: true }
    );

    if (!kid || !updateParent) {
      return NextResponse.json(
        { success: false, message: "Kid could not be created." },
        { status: 500 }
      );
    }

    const tokenData = {
      id: updateParent._id,
      name: updateParent.name,
      email: updateParent.email,
      timeSpend: updateParent.timeSpend,
      kidId: kid._id,
    };

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET not defined");
    }

    const updatedToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "3d",
    });

    const response = NextResponse.json({
      success: true,
      message: "Kid created successfully and parent updated.",
    });

    response.cookies.set("token", updatedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3, // 3 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
};
