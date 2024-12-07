"use client";

import { walletManager } from "./../constants";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { stringToBytes, stringToHex, toBytes } from "viem";
import { useBalance, useReadContracts } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract, useTransactor } from "~~/hooks/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { useProver } from "@anon-aadhaar/react";


import { Poppins } from '@next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const metadata = getMetadata({
  title: "Vehicle Profile",
  description: "Manage vehicle details and view transaction history",
});

const VehicleProfile: NextPage = () => {
  const [,LatestProof] = useProver();
  const proof = "hello"
  const vehicleId = "1234J";
  const createUserWallet = async (vehicleId, proof) => {
    const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("walletManager");
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
      <div className="bg-black text-white h-screen flex flex-col items-center py-8">  
        <div className="w-11/12 max-w-md">

          <div className="bg-[url('/bg.png')] bg-cover bg-center rounded-lg p-6 mb-6">
            <div className={poppins.className} style={{marginLeft:"3px", color: "#5D5F69", fontSize:'12px'}}>Volkswagen Polo :</div>
            <div className={poppins.className} style={{marginLeft:"3px",color: "black", fontSize:'24px', fontWeight: "strong"}}>MH 03 SM2536</div> 
            <div className="bg-black flex" style={{flexDirection:"column", padding:"15px", borderRadius:"10px", width:"45%", marginTop:"4px"}}>
                <span className={poppins.className} style={{fontSize:"10px", marginBottom:"4px"}}>Total Balance</span>
                <span className={poppins.className} style={{fontSize:"25px", color:"#F9CB29", fontWeight:"bold"}}>$214.920</span>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 ml-5">Transactions</h2>

            <div className="p-4 mb-4" style={{borderBottom:"1px solid gray"}}>
            <span className={poppins.className} style={{fontSize: "20px"}}> -> National Highway - 25</span> <br />
            <span className={poppins.className} style={{fontSize:"12px", marginLeft:"28px"}}>02:03 PM</span>
            <span className={poppins.className} style={{fontSize:"12px", marginLeft:"28px"}}> 05 Aug 2022</span>
            <span className={poppins.className} style={{position:"absolute",fontSize:"17px", left:"280px", color:"#00CA1D"}}> -$180,87</span>
            </div>

            <div className="p-4 mb-4" style={{borderBottom:"1px solid gray"}}>
            <span className={poppins.className} style={{fontSize: "20px"}}> -> National Highway - 23</span> <br />
            <span className={poppins.className} style={{fontSize:"12px", marginLeft:"28px"}}>02:03 PM</span>
            <span className={poppins.className} style={{fontSize:"12px", marginLeft:"28px"}}> 05 Aug 2022</span>
            <span className={poppins.className} style={{position:"absolute",fontSize:"17px", left:"280px", color:"#00CA1D"}}> -$201,12</span>
            </div>

            <div className="p-4 mb-4" style={{borderBottom:"1px solid gray"}}>
            <span className={poppins.className} style={{fontSize: "20px"}}> -> National Highway - 21</span> <br />
            <span className={poppins.className} style={{fontSize:"12px", marginLeft:"28px"}}>02:10 PM</span>
            <span className={poppins.className} style={{fontSize:"12px", marginLeft:"28px"}}> 07 Aug 2022</span>
            <span className={poppins.className} style={{position:"absolute",fontSize:"17px", left:"280px", color:"#00CA1D"}}> -$190,23</span>
            </div>



          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleProfile;
