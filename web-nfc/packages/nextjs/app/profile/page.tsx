"use client";

import { useEffect, useState } from "react";
import { convertRevealBigIntToString } from "@anon-aadhaar/core";
import { useAnonAadhaar, useProver } from "@anon-aadhaar/react";
import type { NextPage } from "next";
import { stringToHex } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const metadata = getMetadata({
  title: "User Profile",
  description: "View and manage user profile details",
});

const UserProfile: NextPage = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const [, LatestProof] = useProver();
  const [profile, setProfile] = useState({
    state: "",
    pincode: "",
    gender: "",
  });

  console.log(anonAadhaar);
  // const proof = "1234k";

  // const { data: profile } = useScaffoldReadContract({
  //   contractName: "walletManager",
  //   functionName: "getProfile",
  //   args: [stringToHex(proof)],
  // });

  useEffect(() => {
    if (anonAadhaar.status === "logged-in" && LatestProof) {
      const { pincode, state, gender } = LatestProof.proof;
      console.log(LatestProof.proof);
      setProfile({
        state,
        pincode,
        gender: gender === "77" ? "Male" : "Female",
      });
    }
  }, [anonAadhaar.status, LatestProof]);

  console.log(profile);

  return (
    <>
      <div className="bg-black text-white h-screen flex flex-col items-center py-8">
        <div className="w-11/12 max-w-md">
          <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-6"></div>
          <h1 className="text-center text-2xl font-semibold mb-6">Samny Raina</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-500 text-sm">State</label>
              <input
                type="text"
                value={convertRevealBigIntToString(profile.state)}
                className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                disabled
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-gray-500 text-sm">Pin Code</label>
                <input
                  type="text"
                  value={profile.pincode}
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                  disabled
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-500 text-sm">Gender</label>
                <input
                  type="text"
                  value={profile.gender}
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
