"use client";

import type { NextPage } from "next";
import { stringToBytes, stringToHex, toBytes } from "viem";
import { useScaffoldReadContract, useTransactor } from "~~/hooks/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

import { useBalance, useReadContracts } from "wagmi";
import { useEffect, useState } from "react";


const metadata = getMetadata({
  title: "FASTag Profiles",
  description: "View and manage your FASTag accounts",
});

const FASTagProfile: NextPage = () => {





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
  const [balances, setBalances] = useState([]);

  type ContractConfig = {
    functionName: string;
    args: any[];
  };

  const contracts: ContractConfig[] = userCars?.map((car: any) => ({
    functionName: "getWalletForCar",
    args: [car],
  }));

  const result = useReadContracts({
    contracts,
  });
  const transactor = useTransactor();

  const transferEth = async () => {
    try {
      // if (!address) return;
      const tx = await transactor({
        to: "0x15E41209168cC2cfac67983DF6a480dCC9343113", // to address
        value: 1000000000000000000n,
      });
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-black text-white h-screen flex flex-col items-center py-8">
        <div className="w-11/12 max-w-md">
          <div className="flex items-center justify-between mb-6">
            <input type="text" placeholder="Search" className="bg-gray-800 text-white w-4/5 py-2 px-4 rounded" />
            <button className="text-gray-400 text-2xl">🔔</button>
          </div>

          <button className="text-gray-400 text-2xl">Add fastag</button>
          <div className="text-xl font-semibold mb-6">FASTags</div>




          {result?.data?.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="text-lg font-semibold mb-2">{item.id} </div>
              <div className="text-sm text-gray-400">Volkswagen Polo</div>
              <div className="text-sm text-gray-400">MH 03 SM2536</div>
              <div className="text-sm text-green-400">{item.status === "success" ? "Active" : "Inactive"}</div>
              <div className="mt-4">
                <div className="text-lg font-semibold">Current Balance: $1,500</div>
                <button className="mt-2 text-white bg-green-600 py-2 px-4 rounded">
                  Add Amount
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default FASTagProfile;
