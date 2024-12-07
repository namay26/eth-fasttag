export const walletManager = {
    address: "0x256Bac4CCD510f812efAE680a61e6Ebd6356F5EA",
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
        name: "WalletAlreadyExists",
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
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        name: "carIdToWallet",
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
      {
        inputs: [
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "userCars",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
  };
  
  export const userWallet = {
    address: "",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "entryPoint",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "ECDSAInvalidSignature",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "length",
            type: "uint256",
          },
        ],
        name: "ECDSAInvalidSignatureLength",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "ECDSAInvalidSignatureS",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        name: "MinimalAccount__CallFailed",
        type: "error",
      },
      {
        inputs: [],
        name: "MinimalAccount__OnlyEntryPointAllowed",
        type: "error",
      },
      {
        inputs: [],
        name: "MinimalAccount__OnlyEntryPointOrOwnerAllowed",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dest",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "functionData",
            type: "bytes",
          },
        ],
        name: "execute",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
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
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "initCode",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "callData",
                type: "bytes",
              },
              {
                internalType: "bytes32",
                name: "accountGasLimits",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "preVerificationGas",
                type: "uint256",
              },
              {
                internalType: "bytes32",
                name: "gasFees",
                type: "bytes32",
              },
              {
                internalType: "bytes",
                name: "paymasterAndData",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
              },
            ],
            internalType: "struct PackedUserOperation",
            name: "userOp",
            type: "tuple",
          },
          {
            internalType: "bytes32",
            name: "userOpHash",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "missingAccountFunds",
            type: "uint256",
          },
        ],
        name: "validateUserOp",
        outputs: [
          {
            internalType: "uint256",
            name: "validationData",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        stateMutability: "payable",
        type: "receive",
      },
    ],
  };
  