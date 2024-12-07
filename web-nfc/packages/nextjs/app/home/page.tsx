"use client";

import { useEffect, useState } from "react";
import { walletManager } from "./../constants";
import { AnonAadhaarProof, useAnonAadhaar, useProver } from "@anon-aadhaar/react";
import type { NextPage } from "next";
import { stringToBytes, stringToHex, toBytes } from "viem";
import { useBalance, useReadContracts } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract, useTransactor } from "~~/hooks/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const metadata = getMetadata({
  title: "Vehicle Profile",
  description: "Manage vehicle details and view transaction history",
});

const VehicleProfile: NextPage = () => {
  // const { address } = useAccount();
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  // console.log(latestProof);

  console.log(anonAadhaar);

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("walletManager");

  const { data } = useScaffoldReadContract({
    contractName: "walletManager",
    functionName: "getWalletForCar",
    args: ["MJ03SM2536"],
  });

  const { data: userCars } = useScaffoldReadContract({
    contractName: "walletManager",
    functionName: "getUserCars",
    args: [stringToHex("14517253733069349235333669871336408150595731506407507345889184041886486997053")],
  });
  let balances = [];

  userCars?.forEach(ele => {
    let userAccount = useScaffoldReadContract({
      contractName: "walletManager",
      functionName: "getWalletForCar",
      args: [ele],
    });
    const result = useBalance({
      address: `${userAccount}`,
    });
    balances.push(result);
  });

  const transferEth = async (proof: string, vehicleId: string) => {
    try {
      await writeYourContractAsync({
        functionName: "createWalletForCar",
        args: [stringToHex(proof), vehicleId],
      });
      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {anonAadhaar?.status === "logged-in" && (
        <>
          <p>✅ Proof is valid</p>
          {latestProof && <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />}
        </>
      )}
      <div className="bg-black text-white h-screen flex flex-col items-center py-8">
        <div className="w-11/12 max-w-md">
          <div className="flex items-center justify-between mb-6">
            <input type="text" placeholder="Search" className="bg-gray-800 text-white w-4/5 py-2 px-4 rounded" />
            <button className="text-gray-400 text-2xl">🔔</button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="text-lg font-semibold mb-2">ID: 8387123010</div>
            <div className="text-sm text-gray-400">Volkswagen Polo</div>
            <div className="text-sm text-gray-400">MH 03 SM2536</div>
            <div className="text-sm text-green-400">Active</div>
            <div className="mt-4">
              <div className="text-lg font-semibold">Current Balance: 0.05634 ETH</div>
              <button className="mt-2 text-white bg-green-600 py-2 px-4 rounded">Add Amount</button>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>

            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <div>Toll plaza</div>
                <div>15</div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <div>National highway · 25</div>
                <div>18 August 2020 4:45pm</div>
              </div>
              <div className="text-white">Toll Amount: 0.0054 ETH</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <div>Toll plaza</div>
                <div>15</div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <div>National highway · 25</div>
                <div>18 August 2020 4:45pm</div>
              </div>
              <div className="text-white">Toll Amount: 0.0054 ETH</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <div>Toll plaza</div>
                <div>15</div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <div>National highway · 25</div>
                <div>18 August 2020 4:45pm</div>
              </div>
              <div className="text-white">Toll Amount: 0.0054 ETH</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleProfile;
