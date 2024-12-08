"use client";

import { useState } from "react";
import { useAnonAadhaar } from "@anon-aadhaar/react";
import { groth16 } from "snarkjs";
import { stringToHex } from "viem";
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const VehicleProfile = () => {
  const [xmlContent, setXmlContent] = useState("");
  const [vehicleId, setVehicleId] = useState("MH20CA1343");
  const [status, setStatus] = useState("Create Wallet");
  const [anonAadhaar] = useAnonAadhaar();

  const { writeContractAsync } = useScaffoldWriteContract("walletManager");

  const { data: walletData } = useScaffoldReadContract({
    contractName: "walletManager",
    functionName: "getWalletForCar",
    args: [vehicleId],
  });

  const generateProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Generating proof...");

    try {
      const nullifierSeed = Number(process.env.NEXT_PUBLIC_SEED) || 1234;
      const cleanXml = xmlContent.replace("\n", "").trim();

      // Assuming generateInput is imported and available
      const inputs = await generateInput(cleanXml, { nullifierSeed });
      const fullProof = await groth16.fullProve(
        inputs,
        `${process.env.NEXT_PUBLIC_ARTIFACTS_URL}digilocker-verifier.wasm`,
        `${process.env.NEXT_PUBLIC_ARTIFACTS_URL}circuit_final.zkey`
      );

      const isValid = await groth16.verify(
        await fetch(`${process.env.NEXT_PUBLIC_ARTIFACTS_URL}vkey.json`).then((res) => res.json()),
        fullProof.publicSignals,
        fullProof.proof
      );

      setStatus(isValid ? "Proof Verified!" : "Proof Verification Failed");
      return isValid ? fullProof : null;
    } catch (error) {
      console.error("Proof Generation Error:", error.message);
      setStatus("Error Generating Proof");
      return null;
    }
  };

  const createWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Creating Wallet...");
    try {
      const nullifier = JSON.parse(anonAadhaar?.anonAadhaarProofs?.[0]?.pcd)?.proof?.nullifier;

      if (nullifier) {
        await writeContractAsync({
          functionName: "createWalletForCar",
          args: [stringToHex(nullifier), vehicleId],
        });
        setStatus("Wallet Created Successfully!");
      } else {
        setStatus("Proof Invalid. Wallet Creation Failed.");
      }
    } catch (error) {
      console.error("Wallet Creation Error:", error.message);
      setStatus("Error Creating Wallet");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center py-8">
      <div className="w-11/12 max-w-xl">
        {/* Vehicle Details Section */}
        <div className="bg-[url('/bg.png')] bg-cover bg-center rounded-xl p-6 mb-6 relative">
          <div className={`${poppins.className} text-gray-500 text-sm`}>Volkswagen Polo :</div>
          <div className={`${poppins.className} text-black text-2xl font-bold`}>{vehicleId}</div>
          <div className="bg-black text-yellow-500 rounded-lg p-4 mt-4 w-1/2">
            <div className={`${poppins.className} text-sm mb-1`}>Total Balance</div>
            <div className={`${poppins.className} text-lg font-bold`}>$214.920</div>
          </div>
        </div>

        {/* Transactions Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          <div className="p-4 mb-4 border-b border-gray-600">
            <span className={`${poppins.className} text-lg`}>→ National Highway - 25</span> <br />
            <span className={`${poppins.className} text-sm text-gray-500`}>02:03 PM, 05 Aug 2022</span>
            <span className={`${poppins.className} text-lg text-green-500 float-right`}>-$180.87</span>
          </div>
          <div className="p-4 mb-4 border-b border-gray-600">
            <span className={`${poppins.className} text-lg`}>→ National Highway - 23</span> <br />
            <span className={`${poppins.className} text-sm text-gray-500`}>02:03 PM, 05 Aug 2022</span>
            <span className={`${poppins.className} text-lg text-green-500 float-right`}>-$201.12</span>
          </div>
          <div className="p-4 mb-4 border-b border-gray-600">
            <span className={`${poppins.className} text-lg`}>→ National Highway - 21</span> <br />
            <span className={`${poppins.className} text-sm text-gray-500`}>02:10 PM, 07 Aug 2022</span>
            <span className={`${poppins.className} text-lg text-green-500 float-right`}>-$190.23</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleProfile;
