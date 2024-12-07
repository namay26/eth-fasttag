import { NumberArgument, StringArrayArgument, StringArgument } from "@pcd/pcd-types";
import { Groth16Proof } from "snarkjs";

export type BigNumberish = string | bigint;

export const AnonDigiLockerTypeName = "anon-digilocker";

export type InputGenerationParams = {
  nullifierSeed: number | bigint;
  revealStart?: string;
  revealEnd?: string;
  signal?: string;
  maxInputLength?: number;
  rsaKeyBitsPerChunk?: number;
  rsaKeyNumChunks?: number;
};

/**
 * @dev all the arguments needed to initialize the Core package.
 * You can find these URLs in ./constants.ts
 */
export interface InitArgs {
  wasmURL: string;
  zkeyURL: string;
  vkeyURL: string;
}

/**
 * @dev claim that you have a document signed by pubKey.
 */
export type AnonDigiLockerClaim = {
  pubKey: string[];
  signalHash: string;
  documentType: string;
  reveal: string | null;
};

/**
 * @dev proof of a correct claim
 */
export type AnonDigiLockerProof = {
  groth16Proof: Groth16Proof; // 3 points on curve if we use groth16
  pubkeyHash: string;
  nullifierSeed: string;
  nullifier: string;
  signalHash: string;
  documentType: string;
  reveal: string;
};

/**
 * @dev Arguments needed to compute the witness.
 */
export type AnonDigiLockerArgs = {
  dataPadded: StringArrayArgument;
  dataPaddedLength: NumberArgument;
  signedInfo: StringArrayArgument;
  precomputedSHA: StringArrayArgument;
  dataHashIndex: NumberArgument;
  documentTypeLength: NumberArgument;
  certificateDataNodeIndex: NumberArgument;
  signature: StringArrayArgument;
  pubKey: StringArrayArgument;
  isRevealEnabled: NumberArgument;
  revealStartIndex: NumberArgument;
  revealEndIndex: NumberArgument;
  nullifierSeed: StringArgument;
  signalHash: StringArgument;
};
