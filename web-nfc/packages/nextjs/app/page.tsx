"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";

export default function Reader() {
  const router = useRouter();
  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    if (anonAadhaar.status == "logged-in") {
      router.push("/home");
    }
  }, [anonAadhaar]);

  return (
    <div className="bg-black text-white h-screen flex flex-col items-center py-8 mt-40">
      <LogInWithAnonAadhaar
        fieldsToReveal={["revealGender", "revealState", "revealPinCode"]}
        nullifierSeed={Number(process.env.NEXT_PUBLIC_SEED) || 1234}
      />
    </div>
  );
}
