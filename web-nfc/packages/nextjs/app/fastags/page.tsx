"use client";

import type { NextPage } from "next";
import { stringToBytes, stringToHex, toBytes } from "viem";
import { useScaffoldReadContract, useTransactor } from "~~/hooks/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

import { useBalance, useReadContracts } from "wagmi";
import { useEffect, useState } from "react";

import { Poppins } from '@next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });
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
          <button className="text-white" style={{marginLeft:"340px", fontSize:'30px'}}>+</button>


          <div className="bg-[url('/bg.png')] bg-cover bg-center rounded-lg p-6 mb-6">
            <div className={poppins.className} style={{marginLeft:"3px", color: "#5D5F69", fontSize:'12px'}}>Volkswagen Polo :</div>
            <div className={poppins.className} style={{marginLeft:"3px",color: "black", fontSize:'24px', fontWeight: "strong"}}>MH 03 SM2536</div> 
            <div className="bg-black flex" style={{flexDirection:"column", padding:"15px", borderRadius:"10px", width:"45%", marginTop:"4px"}}>
                <span className={poppins.className} style={{fontSize:"10px", marginBottom:"4px"}}>Total Balance</span>
                <span className={poppins.className} style={{fontSize:"25px", color:"#F9CB29", fontWeight:"bold"}}>$214.920</span>
            </div>
          </div>
          <div className="bg-[url('/bg.png')] bg-cover bg-center rounded-lg p-6 mb-6">
            <div className={poppins.className} style={{marginLeft:"3px", color: "#5D5F69", fontSize:'12px'}}>Volkswagen Polo :</div>
            <div className={poppins.className} style={{marginLeft:"3px",color: "black", fontSize:'24px', fontWeight: "strong"}}>MH 03 SM2536</div> 
            <div className="bg-black flex" style={{flexDirection:"column", padding:"15px", borderRadius:"10px", width:"45%", marginTop:"4px"}}>
                <span className={poppins.className} style={{fontSize:"10px", marginBottom:"4px"}}>Total Balance</span>
                <span className={poppins.className} style={{fontSize:"25px", color:"#F9CB29", fontWeight:"bold"}}>$214.920</span>
            </div>
          </div>
          <div className="bg-[url('/bg.png')] bg-cover bg-center rounded-lg p-6 mb-6">
            <div className={poppins.className} style={{marginLeft:"3px", color: "#5D5F69", fontSize:'12px'}}>Volkswagen Polo :</div>
            <div className={poppins.className} style={{marginLeft:"3px",color: "black", fontSize:'24px', fontWeight: "strong"}}>MH 03 SM2536</div> 
            <div className="bg-black flex" style={{flexDirection:"column", padding:"15px", borderRadius:"10px", width:"45%", marginTop:"4px"}}>
                <span className={poppins.className} style={{fontSize:"10px", marginBottom:"4px"}}>Total Balance</span>
                <span className={poppins.className} style={{fontSize:"25px", color:"#F9CB29", fontWeight:"bold"}}>$214.920</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default FASTagProfile;
