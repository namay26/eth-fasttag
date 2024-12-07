import type { NextPage } from "next";
import { stringToHex } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "User Profile",
  description: "View and manage user profile details",
});

const UserProfile: NextPage = () => {
  //get the proof
  
  const { data: profile } = useScaffoldReadContract({
    contractName: "walletManager",
    functionName: "getProfile",
    args: [stringToHex(proof)],
  });

  return (
    <>
      <div className="bg-black text-white h-screen flex flex-col items-center py-8">
        <div className="w-11/12 max-w-md">
          <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-6"></div>
          <h1 className="text-center text-2xl font-semibold mb-6">Samny Raina</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-500 text-sm">Mobile Number</label>
              <input
                type="text"
                value="+91 93425 34737"
                className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm">Address</label>
              <input
                type="text"
                value="Jawahar Bhawan, IIT Roorkee, Uttrakhand"
                className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                disabled
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-gray-500 text-sm">Pin Code</label>
                <input
                  type="text"
                  value="360 576"
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                  disabled
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-500 text-sm">City</label>
                <input
                  type="text"
                  value="Roorkee"
                  className="w-full bg-gray-800 text-white py-2 px-4 rounded"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
