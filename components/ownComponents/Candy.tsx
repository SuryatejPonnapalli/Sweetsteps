import { useEffect, useState } from "react";

type CandyPageProps = {
  fillPoints: number; // Value from 0 to 20
};

export default function CandyPage({ fillPoints }: CandyPageProps) {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [boughtCandy, setBoughtCandy] = useState(false);

  useEffect(() => {
    setFillPercentage(Math.min(fillPoints, 20));
  }, [fillPoints]);

  const stickMaxHeight = 40;
  const candyMaxHeight = 100;
  const totalHeight = stickMaxHeight + candyMaxHeight;

  const totalFill = (fillPercentage / 20) * totalHeight;
  const stickFill = Math.min(totalFill, stickMaxHeight);
  const candyFill = totalFill > stickMaxHeight ? totalFill - stickMaxHeight : 0;

  const handleGetCandy = async () => {
    const response = await fetch("/api/kid/redeemGift", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        giftSugarLevel: 20,
        giftType: "candy",
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setFillPercentage(0);
    }
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#fff5e1] gap-6">
      <div className="flex flex-col items-center">
        <div className="relative w-[100px] h-[100px] rounded-full bg-pink-200 overflow-hidden shadow-md">
          <div
            className="absolute bottom-0 left-0 w-full bg-[#ff6b81] transition-all duration-500 ease-in-out"
            style={{ height: `${candyFill}px` }}
          />
        </div>

        <div className="relative w-[10px] h-[40px] bg-gray-300 mt-1 overflow-hidden rounded-full shadow-inner">
          <div
            className="absolute bottom-0 left-0 w-full bg-[#ff6b81] transition-all duration-500 ease-in-out"
            style={{ height: `${stickFill}px` }}
          />
        </div>
      </div>

      {fillPercentage === 20 && !boughtCandy && (
        <p
          className="text-[#ff6b81] font-semibold text-lg"
          onClick={handleGetCandy}
        >
          Get Candy
        </p>
      )}

      {boughtCandy && (
        <p className="text-[#ff6b81] font-semibold text-lg">
          Bought Candy Successfully
        </p>
      )}
    </div>
  );
}
