import mongoose from "mongoose";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenDecoded extends JwtPayload {
  id: string;
  name: string;
  email: string;
  kidId: mongoose.Types.ObjectId;
  timeSpend: number;
}

export const getTokenData = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as JwtPayload;

    if (
      typeof decodedToken === "object" &&
      decodedToken &&
      "id" in decodedToken &&
      "name" in decodedToken &&
      "email" in decodedToken &&
      "kidId" in decodedToken &&
      "timeSpend" in decodedToken
    ) {
      const tokenData = decodedToken as TokenDecoded;
      console.log(tokenData);
      return {
        id: tokenData.id,
        name: tokenData.name,
        email: tokenData.email,
        kidId: tokenData.kidId,
        timeSpend: tokenData.timeSpend,
      };
    }

    throw new Error("Token payload does not match expected format");
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid or expired token");
    }
    throw new Error((error as Error).message);
  }
};
