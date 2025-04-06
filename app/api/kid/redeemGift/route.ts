import Gift from "@/models/gift.models";
import Kid from "@/models/kid.models";
import connectDb from "@/utils/connectDb";
import { getTokenData } from "@/utils/getJwtData";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const { giftSugarLevel, giftType } = req;

  console.log(req);

  try {
    const parent = await getTokenData(request);
    await connectDb();

    console.log(giftSugarLevel);

    const updatedKid = await Kid.findOneAndUpdate(
      {
        _id: parent.kidId,
        sugarCollected: { $gte: giftSugarLevel },
      },
      {
        $inc: { sugarCollected: -giftSugarLevel },
      },
      { new: true }
    );

    const createGift = await Gift.create({ giftType: giftType });

    if (!updatedKid) {
      return NextResponse.json(
        { success: false, message: "Failed in redeeming the gift." },
        { status: 406 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Redeemed gift successfully.",
        data: { gift: createGift, kid: updatedKid },
      },
      { status: 200 }
    );
  } catch (error) {}
};
