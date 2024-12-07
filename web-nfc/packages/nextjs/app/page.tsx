// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import type { NextPage } from "next";
// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
// const Home: NextPage = () => {
//   const { address: connectedAddress } = useAccount();
//   return (
//     <>
//       <div className="flex items-center flex-col flex-grow pt-10">
//         <div className="px-5">
//           <h1 className="text-center">
//             <span className="block text-2xl mb-2">Welcome to</span>
//             <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
//           </h1>
//           <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
//             <p className="my-2 font-medium">Connected Address:</p>
//             <Address address={connectedAddress} />
//           </div>
//           <p className="text-center text-lg">
//             Get started by editing{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/nextjs/app/page.tsx
//             </code>
//           </p>
//           <p className="text-center text-lg">
//             Edit your smart contract{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               YourContract.sol
//             </code>{" "}
//             in{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/hardhat/contracts
//             </code>
//           </p>
//         </div>
//         <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
//           <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <BugAntIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Tinker with your smart contract using the{" "}
//                 <Link href="/debug" passHref className="link">
//                   Debug Contracts
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Explore your local transactions with the{" "}
//                 <Link href="/blockexplorer" passHref className="link">
//                   Block Explorer
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;
"use client";

import React, { useState } from "react";
import Image from "next/image";
// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import type { NextPage } from "next";
// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
// const Home: NextPage = () => {
//   const { address: connectedAddress } = useAccount();
//   return (
//     <>
//       <div className="flex items-center flex-col flex-grow pt-10">
//         <div className="px-5">
//           <h1 className="text-center">
//             <span className="block text-2xl mb-2">Welcome to</span>
//             <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
//           </h1>
//           <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
//             <p className="my-2 font-medium">Connected Address:</p>
//             <Address address={connectedAddress} />
//           </div>
//           <p className="text-center text-lg">
//             Get started by editing{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/nextjs/app/page.tsx
//             </code>
//           </p>
//           <p className="text-center text-lg">
//             Edit your smart contract{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               YourContract.sol
//             </code>{" "}
//             in{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/hardhat/contracts
//             </code>
//           </p>
//         </div>
//         <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
//           <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <BugAntIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Tinker with your smart contract using the{" "}
//                 <Link href="/debug" passHref className="link">
//                   Debug Contracts
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Explore your local transactions with the{" "}
//                 <Link href="/blockexplorer" passHref className="link">
//                   Block Explorer
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;
// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import type { NextPage } from "next";
// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
// const Home: NextPage = () => {
//   const { address: connectedAddress } = useAccount();
//   return (
//     <>
//       <div className="flex items-center flex-col flex-grow pt-10">
//         <div className="px-5">
//           <h1 className="text-center">
//             <span className="block text-2xl mb-2">Welcome to</span>
//             <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
//           </h1>
//           <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
//             <p className="my-2 font-medium">Connected Address:</p>
//             <Address address={connectedAddress} />
//           </div>
//           <p className="text-center text-lg">
//             Get started by editing{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/nextjs/app/page.tsx
//             </code>
//           </p>
//           <p className="text-center text-lg">
//             Edit your smart contract{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               YourContract.sol
//             </code>{" "}
//             in{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/hardhat/contracts
//             </code>
//           </p>
//         </div>
//         <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
//           <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <BugAntIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Tinker with your smart contract using the{" "}
//                 <Link href="/debug" passHref className="link">
//                   Debug Contracts
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Explore your local transactions with the{" "}
//                 <Link href="/blockexplorer" passHref className="link">
//                   Block Explorer
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
// import ShowAccountAddress from "~~/components/ShowAccountAddress";
import { WagmiConfig } from "wagmi";
import NFCReader from "~~/components/NFCReader";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import type { NextPage } from "next";
// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
// const Home: NextPage = () => {
//   const { address: connectedAddress } = useAccount();
//   return (
//     <>
//       <div className="flex items-center flex-col flex-grow pt-10">
//         <div className="px-5">
//           <h1 className="text-center">
//             <span className="block text-2xl mb-2">Welcome to</span>
//             <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
//           </h1>
//           <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
//             <p className="my-2 font-medium">Connected Address:</p>
//             <Address address={connectedAddress} />
//           </div>
//           <p className="text-center text-lg">
//             Get started by editing{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/nextjs/app/page.tsx
//             </code>
//           </p>
//           <p className="text-center text-lg">
//             Edit your smart contract{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               YourContract.sol
//             </code>{" "}
//             in{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/hardhat/contracts
//             </code>
//           </p>
//         </div>
//         <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
//           <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <BugAntIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Tinker with your smart contract using the{" "}
//                 <Link href="/debug" passHref className="link">
//                   Debug Contracts
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Explore your local transactions with the{" "}
//                 <Link href="/blockexplorer" passHref className="link">
//                   Block Explorer
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import type { NextPage } from "next";
// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
// const Home: NextPage = () => {
//   const { address: connectedAddress } = useAccount();
//   return (
//     <>
//       <div className="flex items-center flex-col flex-grow pt-10">
//         <div className="px-5">
//           <h1 className="text-center">
//             <span className="block text-2xl mb-2">Welcome to</span>
//             <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
//           </h1>
//           <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
//             <p className="my-2 font-medium">Connected Address:</p>
//             <Address address={connectedAddress} />
//           </div>
//           <p className="text-center text-lg">
//             Get started by editing{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/nextjs/app/page.tsx
//             </code>
//           </p>
//           <p className="text-center text-lg">
//             Edit your smart contract{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               YourContract.sol
//             </code>{" "}
//             in{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/hardhat/contracts
//             </code>
//           </p>
//         </div>
//         <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
//           <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <BugAntIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Tinker with your smart contract using the{" "}
//                 <Link href="/debug" passHref className="link">
//                   Debug Contracts
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Explore your local transactions with the{" "}
//                 <Link href="/blockexplorer" passHref className="link">
//                   Block Explorer
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import type { NextPage } from "next";
// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";

// const Home: NextPage = () => {
//   const { address: connectedAddress } = useAccount();

//   return (
//     <>
//       <div className="flex items-center flex-col flex-grow pt-10">
//         <div className="px-5">
//           <h1 className="text-center">
//             <span className="block text-2xl mb-2">Welcome to</span>
//             <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
//           </h1>
//           <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
//             <p className="my-2 font-medium">Connected Address:</p>
//             <Address address={connectedAddress} />
//           </div>

//           <p className="text-center text-lg">
//             Get started by editing{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/nextjs/app/page.tsx
//             </code>
//           </p>
//           <p className="text-center text-lg">
//             Edit your smart contract{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               YourContract.sol
//             </code>{" "}
//             in{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/hardhat/contracts
//             </code>
//           </p>
//         </div>

//         <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
//           <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <BugAntIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Tinker with your smart contract using the{" "}
//                 <Link href="/debug" passHref className="link">
//                   Debug Contracts
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Explore your local transactions with the{" "}
//                 <Link href="/blockexplorer" passHref className="link">
//                   Block Explorer
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

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
  const [anonAadhaar] = useAnonAadhaar();

  console.log(anonAadhaar);

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
    <div>
      <LogInWithAnonAadhaar nullifierSeed={4354} />
      {!serialNumber && (
        <Image
          src="/nfcwallet-logo.png"
          alt="NFC Wallet"
          width="300"
          height="124"
          className={`mx-auto ${serialNumber ? "my-4" : "my-20"}`}
        />
      )}
      <div>
        {/* <p>Serial Number: {serialNumber}</p> */}
        {/* {serialNumber && <ShowAccountAddress profile={profile} serialNumber={serialNumber} />} */}
      </div>
      <NFCReader onChange={handleNFCData} />
    </div>
  );
}
