"use client";

import Link from "next/link";
import { useBalance } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const formatCarId = (carId: string) => {
  return carId.slice(0, 2) + " " + carId.slice(2, 4) + " " + carId.slice(4, 10);
};

const formatAddress = (address: string | undefined) => {
  return address ? address?.slice(0, 6) + "..." + address?.slice(-4) : "...";
};

const FastagCard = ({ carId }: { carId: string }) => {
  const { data } = useScaffoldReadContract({
    contractName: "walletManager",
    functionName: "getWalletForCar",
    args: [carId],
  });

  const { data: balance } = useBalance({
    address: data,
  });

  console.log(balance, data);
  return (
    <Link
      href={"/fastags/" + carId}
      className="bg-[url('/bg.png')] flex justify-between gap-4 bg-cover bg-center rounded-lg p-6 mb-6"
    >
      <div className={"flex flex-col gap-2"}>
        <div style={{ marginLeft: "3px", color: "#5D5F69", fontSize: "12px" }}>{formatAddress(data)}</div>
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
    </Link>
  );
};

export default FastagCard;
