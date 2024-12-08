"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";

export default function Reader() {
  const router = useRouter();
  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    if (anonAadhaar.status == "logged-in") {
      router.push("/fastags");
    }
  }, [anonAadhaar]);

  return (
    <div className="bg-[#13120d] flex flex-col items-center">
      <div className="w-[390px] h-[899px] py-2 bg-[#13120d] flex-col justify-start items-start gap-[9px] inline-flex">
        <div className="self-stretch h-[720.93px] pt-[229px] flex-col justify-start items-center gap-[94.69px] flex">
          <div className=" bg-[url('/logo1.png')] h-[230.80px] flex-col justify-center items-center gap-[12.74px] flex">
            <img src="/logo1.png" className="h-[230.80px] flex-col justify-center items-center gap-[12.74px] flex" />

          </div>
          <div className="self-stretch h-[166.44px] flex-col justify-start items-start gap-[23.84px] flex">
            <div className="self-stretch h-[57.61px] text-center text-white/80 text-[21.19px] font-medium font-['Clash Display'] leading-[29.13px]" style={{ fontFamily: "Poppins, sans-serif" }}>"Revolutionize toll payments <br />with blockchain."</div>
            <div className="self-stretch text-center text-white text-lg font-medium font-['Clash Display'] leading-[85px]" style={{ fontFamily: "Poppins, sans-serif" }}> Start your journey!</div>
          </div>
        </div>
        <div className="self-stretch h-[43.70px] flex-col justify-start items-start flex">
          <div className="self-stretch h-[43.70px] flex-col justify-center items-center flex">
            <div className="w-[323.79px] h-[43.70px] relative" style={{display:"flex", justifyContent:"center"}}>
              <LogInWithAnonAadhaar
                fieldsToReveal={["revealGender", "revealState", "revealPinCode"]}
                nullifierSeed={Number(process.env.NEXT_PUBLIC_SEED) || 1234}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}