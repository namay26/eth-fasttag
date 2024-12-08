"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NFCReader from "~~/components/NFCReader";
import { userWallet } from "~~/constants";
import { callContractFunction } from "~~/utils/contractwagmi";

interface Profile {
  user: {
    name: string;
    avatar: {
      fullUrl: string;
    };
  };
}

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const destinationAddress = "0x4590e901091b3Add6e99235c02C4BD8F496B2CaB";

export default function Reader() {
  // const [urlRecord, setUrlRecord] = useState("");
  const [profile, setProfile] = useState<string>(null);
  const [serialNumber, setSerialNumber] = useState("");
  const [data, setData] = useState("");
  const [isDataRead, setIsDataRead] = useState(false);
  const [error, setError] = useState("");

  const handleNFCData = ({ message, serialNumber }: { message: any; serialNumber: string }) => {
    setSerialNumber(serialNumber);
    const textDecoder = new TextDecoder();
    for (const record of message.records) {
      setData(textDecoder.decode(record.data));
    }
    setIsDataRead(true);
  };

  const executeOnFastagWallet = async () => {
    try {
      const receipt = await callContractFunction({
        to: data,
        destinationAddress,
        value: "50000000000000",
        functionData: "0x",
      });
      setProfile(receipt);
    } catch (error) {
      setError(error?.message);
    }
  };

  useEffect(() => {
    if (isDataRead) {
      executeOnFastagWallet();
    }
  }, [isDataRead]);

  return (
    <div className="flex items-center justify-center mt-40">
      <div style={{ marginLeft: "14px" }}>
        <NFCReader onChange={handleNFCData} />
      </div>
      {profile && <p>Transaction Hash: {profile}</p>}
      {isDataRead.toString()}
      {data && <p>Data: {data}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
