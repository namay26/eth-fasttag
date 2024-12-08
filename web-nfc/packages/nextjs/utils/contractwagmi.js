import { userWallet } from "../constants/index";
import { createWalletClient, encodeFunctionData, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia, mainnet } from "wagmi/chains";

// Replace with your private key and RPC URL
const PRIVATE_KEY = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY;
const RPC_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const callContractFunction = async arg => {
  try {
    // Setup account and wallet client
    const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);
    const walletClient = createWalletClient({
      chain: baseSepolia,
      account,
      transport: http(RPC_URL),
    });

    // // Get gas estimate for the function call
    // const gasEstimate = await walletClient.estimateGas({
    //   to: arg.to,
    //   data: userWallet.abi
    //     .find(({ name }) => name === "execute")
    //     ?.encode([arg.destinationAddress, parseEther(arg.value.toString()), arg.functionData]),
    // });
    const encodedData = encodeFunctionData({
      abi: userWallet.abi,
      functionName: "execute",
      args: [arg.destinationAddress, parseEther(arg.value.toString()), arg.functionData],
    });

    // Send transaction
    const txHash = await walletClient.sendTransaction({
      to: arg.to,
      data: encodedData,
    });

    // Wait for transaction receipt
    const receipt = await walletClient.waitForTransactionReceipt(txHash);
    return receipt;
  } catch (error) {
    console.error("Error calling contract function:", error);
    throw error;
  }
};
