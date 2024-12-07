"use client";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react"; 
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function Reader() {
  const router=useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [anonAadhaar] = useAnonAadhaar();
  if(anonAadhaar.status=="logged-in"){
    setIsLogged(true);
    router.push("/home");
  }

  console.log(anonAadhaar);


  return (
    <div className="bg-black text-white h-screen flex flex-col items-center py-8 mt-40">
      <LogInWithAnonAadhaar nullifierSeed={4354} />
    </div>
  );
}
