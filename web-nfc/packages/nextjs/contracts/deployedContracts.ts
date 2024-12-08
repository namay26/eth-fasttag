/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { walletManager } from "~~/app/constants";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  84532: {
    walletManager: {
      address: "0xE6680264108EC3c9D386b145142Cd56672eE8aE1",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_entryPoint",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "WalletManager__NotOwner",
          type: "error",
        },
        {
          inputs: [],
          name: "WalletManager__WalletAlreadyExists",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes",
              name: "user",
              type: "bytes",
            },
            {
              indexed: true,
              internalType: "string",
              name: "carId",
              type: "string",
            },
            {
              indexed: false,
              internalType: "address",
              name: "wallet",
              type: "address",
            },
          ],
          name: "WalletCreated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "addresses",
              type: "address[]",
            },
            {
              internalType: "string",
              name: "carId",
              type: "string",
            },
          ],
          name: "addToWhitelist_UserWallet",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "userProof",
              type: "bytes",
            },
            {
              internalType: "string",
              name: "carId",
              type: "string",
            },
          ],
          name: "createWalletForCar",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "userProof",
              type: "bytes",
            },
          ],
          name: "getProfile",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "gender",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "city",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "pincode",
                  type: "uint256",
                },
              ],
              internalType: "struct WalletManager.Person",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "user",
              type: "bytes",
            },
          ],
          name: "getUserCars",
          outputs: [
            {
              internalType: "string[]",
              name: "",
              type: "string[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "carId",
              type: "string",
            },
          ],
          name: "getWalletForCar",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "userProof",
              type: "bytes",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_gender",
              type: "string",
            },
            {
              internalType: "string",
              name: "_city",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_pincode",
              type: "uint256",
            },
          ],
          name: "setProfile",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
