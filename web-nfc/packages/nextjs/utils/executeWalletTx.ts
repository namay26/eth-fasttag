import { getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { usePublicClient, useSendTransaction, useWalletClient } from "wagmi";
import { userWallet } from "~~/constants";

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;

export function useExecuteWalletTransaction() {
  const { data: walletClient } = useWalletClient({});
  const publicClient = usePublicClient();

  const executeTransaction = async (
    userWalletAddress: string,
    destinationAddress: string,
    functionData: string,
    value: string,
  ) => {
    try {
      if (!walletClient || !publicClient) {
        throw new Error("Wallet not connected");
      }

      const contract = getContract({
        address: userWalletAddress,
        abi: userWallet.abi,
        publicClient,
        walletClient,
      });

      const tx = await contract?.write.execute([destinationAddress, BigInt(value), functionData]);
      const hash = tx.hash;
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt;
    } catch (error) {
      console.error("Error executing wallet transaction:", error);
      throw error;
    }
  };

  return executeTransaction;
}
