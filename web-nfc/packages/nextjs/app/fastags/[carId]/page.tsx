"use client";

import { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";
import { timeStamp } from "console";
import type { NextPage } from "next";
import { useBalance } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const formatCarId = (carId: string) => {
  return carId.slice(0, 2) + " " + carId.slice(2, 4) + " " + carId.slice(4, 10);
};

const formatAddress = (address: string | undefined) => {
  return address ? address?.slice(0, 6) + "..." + address?.slice(-4) : "...";
};

const Page: NextPage = ({ params }: { params: { carId: string } }) => {
  const { carId } = params;
  const [txs, setTxs] = useState([]);

  const { data: fastWalletAddress } = useScaffoldReadContract({
    contractName: "walletManager",
    functionName: "getWalletForCar",
    args: [carId],
  });

  const { data: balance } = useBalance({
    address: fastWalletAddress,
  });

  console.log(balance, fastWalletAddress);

  useEffect(() => {
    if (fastWalletAddress) {
      const fetchData = async () => {
        const testAddress = "0x74bbf4b2223496C4547c44268242A5196E3c6499";
        const res = await fetch(
          `https://base-sepolia.blockscout.com/api/v2/addresses/${testAddress}/transactions?filter=from`,
        );
        const data = await res.json();
        console.log(data);
        const finalData = data.items.map((item: any) => ({
          from: item.from?.hash,
          to: item.to?.hash,
          value: item.value,
          txHash: item.hash,
          timestamp: item.timestamp,
        }));

        setTxs([...finalData]);
      };
      fetchData();
    }
  }, [fastWalletAddress]);

  console.log(txs);

  return (
    <>
      <div className="bg-black text-white h-screen flex flex-col items-center py-8">
        <div className="w-11/12 max-w-md">
          <div className="bg-[url('/bg.png')] flex justify-between gap-4 bg-cover bg-center rounded-lg p-6 mb-6">
            <div className={"flex flex-col gap-2"}>
              <div style={{ marginLeft: "3px", color: "#5D5F69", fontSize: "12px" }}>
                {formatAddress(fastWalletAddress)}
              </div>
              <div style={{ marginLeft: "3px", color: "black", fontSize: "24px", fontWeight: "strong" }}>
                {formatCarId(carId)}
              </div>
            </div>
            <div
              className="bg-black flex"
              style={{ flexDirection: "column", padding: "15px", borderRadius: "10px", width: "45%", marginTop: "4px" }}
            >
              <span style={{ fontSize: "10px", marginBottom: "4px" }}>Total Balance</span>
              <span style={{ fontSize: "25px", color: "#F9CB29", fontWeight: "bold" }}>
                {balance?.formatted} {balance?.symbol}
              </span>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>
            {txs.length > 0 ? (
              txs.map((tx: any, index: number) => <TransactionCard tx={tx} key={index} />)
            ) : (
              <p>No transactions found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
