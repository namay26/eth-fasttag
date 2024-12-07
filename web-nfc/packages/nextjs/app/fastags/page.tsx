"use client";

import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FastagCard from "./components/FastagCard";
import { useAnonAadhaar } from "@anon-aadhaar/react";
import type { NextPage } from "next";
import { stringToBytes, stringToHex, toBytes } from "viem";
import { useBalance, useReadContracts } from "wagmi";
import { useScaffoldReadContract, useTransactor } from "~~/hooks/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const metadata = getMetadata({
  title: "FASTag Profiles",
  description: "View and manage your FASTag accounts",
});

const FASTagProfile: NextPage = () => {
  const [anonAadhaar] = useAnonAadhaar();
  // const { data } = useScaffoldReadContract({
  //   contractName: "walletManager",
  //   functionName: "getWalletForCar",
  //   args: ["MJ03SM2536"],
  // });

  // const { data: userCars } = useScaffoldReadContract({
  //   contractName: "walletManager",
  //   functionName: "getUserCars",
  //   args: [stringToHex(anonAadhaar)],
  // });

  const pcd = (anonAadhaar as any)?.anonAadhaarProofs
    ? (anonAadhaar as any)?.anonAadhaarProofs[0]?.pcd
    : '{ "proof": {}}';

  const { data: userCars } = useScaffoldReadContract({
    contractName: "walletManager",
    functionName: "getUserCars",
    args: [stringToHex(JSON.parse(pcd).proof.nullifier || "")],
  });

  console.log(userCars);

  // const wallets = userCars?.map((carId: any) => {
  //   const { data } = useScaffoldReadContract({
  //     contractName: "walletManager",
  //     functionName: "getWalletForCar",
  //     args: [carId],
  //   });
  //   return data;
  // });

  // console.log(anonAadhaar);
  // console.log(userCars, wallets);

  // const contracts: any = userCars?.map((car: any) => ({
  //   functionName: "getWalletForCar",
  //   args: [car],
  // }));

  // const result = useReadContracts({
  //   contracts: contracts,
  // });
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
          <Link href="/add" passHref>
            <button className="text-white" style={{ marginBottom: "20px", marginLeft: "320px", fontSize: "40px" }}>
              +
            </button>
          </Link>
          {userCars?.map((carId: any) => {
            return <FastagCard carId={carId} />;
          })}
        </div>
      </div>
    </>
  );
};

export default FASTagProfile;
