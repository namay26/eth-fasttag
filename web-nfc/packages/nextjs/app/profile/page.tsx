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
      <div
        className="bg-black text-white flex flex-col items-center justify-center"
      >
        <div className="w-11/12 max-w-md">
          <div
            className="bg-[url('/dp.jpeg')] bg-cover bg-center w-24 h-24 rounded-full mx-auto mb-6"
          ></div>
          <h1
            className="text-center text-2xl font-semibold mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Alpha Dose
          </h1>
          <div className="space-y-6">
            <div>
              <label
                className="block text-white text-l"
                style={{ fontFamily: "Poppins, sans-serif", marginBottom: "10px" }}
              >
                State
              </label>
              <input
                type="text"
                value={convertRevealBigIntToString(profile.state)}
                className="w-full text-white py-2 px-4 rounded"
                style={{
                  backgroundColor: "#191919",
                  color: "gray",
                  fontFamily: "Poppins, sans-serif",
                }}
                disabled
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  className="block text-white text-l"
                  style={{ fontFamily: "Poppins, sans-serif", marginBottom: "10px" }}
                >
                  Pin Code
                </label>
                <input
                  type="text"
                  value={profile.pincode}
                  className="w-full text-white py-2 px-4 rounded"
                  style={{
                    backgroundColor: "#191919",
                    color: "gray",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-white text-l"
                  style={{ fontFamily: "Poppins, sans-serif", marginBottom: "10px" }}
                >
                  Gender
                </label>
                <input
                  type="text"
                  value={profile.gender === "77" ? "Male" : "Female"}
                  className="w-full text-white py-2 px-4 rounded"
                  style={{
                    backgroundColor: "#191919",
                    color: "gray",
                    fontFamily: "Poppins, sans-serif",
                  }}
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
