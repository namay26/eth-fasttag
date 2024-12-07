
"use client";

import React, { useState } from "react";
import Image from "next/image";
import NFCReader from "~~/components/NFCReader";


interface Profile {
  user: {
    name: string;
    avatar: {
      fullUrl: string;
    };
  };
}

export default function Reader() {
  // const [urlRecord, setUrlRecord] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [serialNumber, setSerialNumber] = useState("");

  const fetchProfile = async (profileId: string) => {
    const res = await fetch(`/api/getProfile/${profileId}`);
    const json = await res.json();
    setProfile(json.profile);
  };

  const handleNFCData = ({ message, serialNumber }: { message: any; serialNumber: string }) => {
    setSerialNumber(serialNumber);
    const textDecoder = new TextDecoder();
    for (const record of message.records) {
      console.log("Record type:  " + record.recordType);
      console.log("MIME type:    " + record.mediaType);
      console.log("Record id:    " + record.id);
      console.log("Record data:  " + textDecoder.decode(record.data));
      if (record.recordType === "url") {
        const urlstr = textDecoder.decode(record.data);
        // setUrlRecord(urlstr);
        const profileId = urlstr.substring(urlstr.lastIndexOf("/") + 1);
        fetchProfile(profileId);
      }
    }
  };

  return (
    <div style={{position:"absolute",top:"330px", marginLeft:"68px"}}>
      <NFCReader onChange={handleNFCData} />
    </div>
  );
}
