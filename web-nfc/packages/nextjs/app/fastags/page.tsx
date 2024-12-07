import type { NextPage } from "next";
import { stringToBytes, stringToHex, toBytes } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "FASTag Profiles",
  description: "View and manage your FASTag accounts",
});

const FASTagProfile: NextPage = () => {
    //call proof using state
    //get vehicle id 
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
          {/* Search and Notification Icon */}
          <div className="flex items-center justify-between mb-6">
            <input type="text" placeholder="Search" className="bg-gray-800 text-white w-4/5 py-2 px-4 rounded" />
            <button className="text-gray-400 text-2xl">🔔</button>
          </div>

          <button className="text-gray-400 text-2xl" onClick={() => createUserWallet()}>
            Add fastag
          </button>
          {/* FASTags Header */}
          <div className="text-xl font-semibold mb-6">FASTags</div>

          {/* FASTag Details */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="text-lg font-semibold mb-2">ID: 8387123010</div>
            <div className="text-sm text-gray-400">Volkswagen Polo</div>
            <div className="text-sm text-gray-400">MH 03 SM2536</div>
            <div className="text-sm text-green-400">Active</div>
            <div className="mt-4">
              <div className="text-lg font-semibold">Current Balance: $1,500</div>
              <button className="mt-2 text-white bg-green-600 py-2 px-4 rounded">Add Amount</button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="text-lg font-semibold mb-2">ID: 8387123010</div>
            <div className="text-sm text-gray-400">Volkswagen Polo</div>
            <div className="text-sm text-gray-400">MH 03 SM2536</div>
            <div className="text-sm text-green-400">Active</div>
            <div className="mt-4">
              <div className="text-lg font-semibold">Current Balance: $1,500</div>
              <button className="mt-2 text-white bg-green-600 py-2 px-4 rounded">Add Amount</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FASTagProfile;
