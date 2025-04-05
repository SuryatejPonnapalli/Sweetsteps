"use client";
import Image from "next/image";
import { JSX, useState } from "react";
import {useRouter} from "next/navigation";

export default function Home(): JSX.Element {
  const [showParent, setShowParent] = useState(false);
  const [showKid, setShowKid] = useState(false);
  const [changeParent, setChangeParent] = useState(false);
  const [changeKid, setChangeKid] = useState(false);
  const router = useRouter();

  const handleChangeP = () => {
    setShowParent(!showParent); 
    setChangeParent(!changeParent);
  }
  const handleChangeK = () => { 
    setShowKid(!showKid);
    setChangeKid(!changeKid);
  }


  return (
    <>
      {/* main div */}
      <div className="flex flex-col items-center bg-[#FFEED0] min-h-screen">
        {/* image div */}
        <div className="mt-28">
          <Image src="/legsF.png" height={100} width={100} alt="Legs illustration" />
        </div>

        <p className="text-[#ff6b81] font-bold text-4xl mt-4">SweetSteps</p>

        {/* parentdiv */}
        <div
        className={`mt-16 cursor-pointer rounded-md ${
        changeParent ? "border-2  border-[#FF0000]" : ""
        }`}
        onClick={handleChangeP}>
          <Image src="/parent.png" height={300} width={300} alt="parent" />
        </div>

        {/* kiddiv */}
        <div
        className={`mt-8 cursor-pointer rounded-md ${
        changeKid ? "border-2  border-[#FF0000]" : ""
        }`}
        onClick={handleChangeK}>
          <Image src="/kid.png" height={300} width={300} alt="kid" />
        </div>

        {showParent && (
          <button className="mt-20 px-6 py-2 w-60 rounded-md bg-[#ff6b81] text-white font-bold text-xl" onClick={() => {router.push("/parent")}}>
            Next
          </button>
        )}
        {showKid && (
          <button className="mt-20 px-6 py-2 w-60 rounded-md bg-[#ff6b81] text-white font-bold text-xl" onClick={()=>{router.push("/kid")}}>
            Next
          </button>
        )}
      </div>
    </>
  );
}
