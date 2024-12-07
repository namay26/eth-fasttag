"use client";

import type { NextPage } from "next";
import { stringToHex } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { useProver } from "@anon-aadhaar/react";


import { Poppins } from '@next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const metadata = getMetadata({
  title: "User Profile",
  description: "View and manage user profile details",
});

const UserProfile: NextPage = () => {
  const [,LatestProof] = useProver();
  const proof = "1234k";

  const { data: profile } = useScaffoldReadContract({
    contractName: "walletManager",
    functionName: "getProfile",
    args: [stringToHex(proof)],
  });

  return (
    <>
      <div className="bg-black text-white h-screen flex flex-col items-center py-8" style={{position:"absolute", top:"70px"}}>
        <div className="w-11/12 max-w-md">
          <div className="w-24 h-24 rounded-full mx-auto mb-6" style={{backgroundColor:"#191919"}}></div>
          <h1 className="text-center text-2xl font-semibold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Samny Raina</h1>
          <div className="space-y-6 ml-6 mr-6">
            <div>
              <label className="block text-white text-l" style={{ fontFamily: 'Poppins, sans-serif', marginBottom: "10px"}}>Mobile Number</label>
              <input 
                type="text"
                value="+91 93425 34737"
                className="w-full text-white py-2 px-4 rounded"
                style={{backgroundColor:"#191919", color:"gray", fontFamily: 'Poppins, sans-serif'}}
                disabled
              />
            </div>
            <div>
              <label className="block text-white text-l" style={{ fontFamily: 'Poppins, sans-serif', marginBottom: "10px" }}>Address</label>
              <input
                type="text"
                value="Jawahar Bhawan, IIT Roorkee, Uttrakhand"
                className="w-full text-white py-2 px-4 rounded"
                style={{backgroundColor:"#191919",color:"gray", fontFamily: 'Poppins, sans-serif' }}
                disabled
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-white text-l" style={{ fontFamily: 'Poppins, sans-serif' , marginBottom: "10px"}}>Pin Code</label>
                <input
                  type="text"
                  value="360 576"
                  className="w-full text-white py-2 px-4 rounded"
                  style={{backgroundColor:"#191919", color:"gray",fontFamily: 'Poppins, sans-serif' }}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label className="block text-white text-l" style={{ fontFamily: 'Poppins, sans-serif', marginBottom: "10px" }}>City</label>
                <input
                  type="text"
                  value="Roorkee"
                  className="w-full text-white py-2 px-4 rounded"
                  style={{backgroundColor:"#191919", color:"gray",fontFamily: 'Poppins, sans-serif' }}
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
