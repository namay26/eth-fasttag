export const userWallet = {
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
      inputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "UserWallet__CallFailed",
      type: "error",
    },
    {
      inputs: [],
      name: "UserWallet__OnlyEntryPointAllowed",
      type: "error",
    },
    {
      inputs: [],
      name: "UserWallet__OnlyEntryPointOrOwnerAllowed",
      type: "error",
    },
    {
      inputs: [],
      name: "UserWallet__OnlyOwnerAllowed",
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
          name: "_add",
          type: "address",
        },
      ],
      name: "addToWhitelist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
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
      inputs: [
        {
          internalType: "address",
          name: "_add",
          type: "address",
        },
      ],
      name: "isWhitelisted",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
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
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdrawToll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
};
