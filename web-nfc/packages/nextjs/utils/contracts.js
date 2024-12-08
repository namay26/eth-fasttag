import { userWallet } from "../constants/index";
import { ethers } from "ethers";

// Replace with your private key and RPC URL
const PRIVATE_KEY = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY;
const RPC_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const callContractFunction = async arg => {
  try {
    // Initialize provider and wallet signer
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // Create contract instance
    const contract = new ethers.Contract(arg.to, userWallet.abi, wallet);

    const gasLimit = await contract.estimateGas.execute(arg.destinationAddress, arg.value, arg.functionData);
    // Call the contract function (replace 'yourFunction' with actual function name)
    const tx = await contract.execute(arg.destinationAddress, arg.value, arg.functionData, {
      gasLimit: "100000000000",
    });

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error calling contract function:", error);
    throw error;
  }
};
