import { DisplayOptions, PCD, PCDPackage, SerializedPCD } from "@pcd/pcd-types";
import { ProverState } from "@anon-aadhaar/core/src/types";
import { convertRevealBigIntToString } from "@anon-aadhaar/core";
import {
  InitArgs,
  AnonDigiLockerTypeName,
  AnonDigiLockerClaim,
  AnonDigiLockerProof,
  AnonDigiLockerArgs,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import { groth16 } from "snarkjs";
import JSONBig from "json-bigint";
import { AnonDigiLockerProver, ProverInferace } from "./prover";
import { PUBKEY_HASH } from "./constants";

export class AnonDigiLockerCore implements PCD<AnonDigiLockerClaim, AnonDigiLockerProof> {
  type = AnonDigiLockerTypeName;
  claim: AnonDigiLockerClaim;
  proof: AnonDigiLockerProof;
  id: string;

  public constructor(id: string, claim: AnonDigiLockerClaim, proof: AnonDigiLockerProof) {
    this.id = id;
    this.claim = claim;
    this.proof = proof;
  }
}

// initial function
let initArgs: InitArgs | undefined = undefined;
export async function init(args: InitArgs): Promise<void> {
  initArgs = args;
}

export async function prove(
  args: AnonDigiLockerArgs,
  updateState?: (state: ProverState) => void,
): Promise<AnonDigiLockerCore> {
  if (!initArgs) {
    throw new Error("cannot make Anon DigiLocker proof: init has not been called yet");
  }

  if (!args.signalHash.value) {
    throw new Error("Invalid signalHash argument");
  }

  const id = uuidv4();

  const prover: ProverInferace = new AnonDigiLockerProver(initArgs.wasmURL, initArgs.zkeyURL);

  const anonDigiLockerProof = await prover.proving(args, updateState);

  const anonDigiLockerClaim: AnonDigiLockerClaim = {
    pubKey: args.pubKey.value!,
    signalHash: args.signalHash.value,
    documentType: convertRevealBigIntToString(anonDigiLockerProof.documentType),
    reveal: convertRevealBigIntToString(anonDigiLockerProof.reveal) || null,
  };

  return new AnonDigiLockerCore(id, anonDigiLockerClaim, anonDigiLockerProof);
}

async function getVerifyKey() {
  if (!initArgs) {
    throw new Error("cannot make Anon DigiLocker proof: init has not been called yet");
  }

  const response = await fetch(initArgs.vkeyURL);
  if (!response.ok) {
    throw new Error(`Failed to fetch the verify key from server`);
  }

  const vk = await response.json();
  return vk;
}

export async function verify(pcd: AnonDigiLockerCore): Promise<boolean> {
  let pubkeyHash = PUBKEY_HASH;

  if (pcd.proof.pubkeyHash !== pubkeyHash) {
    throw new Error("VerificationError: public key mismatch.");
  }

  const vk = await getVerifyKey();

  return groth16.verify(
    vk,
    [
      pcd.proof.pubkeyHash,
      pcd.proof.nullifier,
      pcd.proof.documentType,
      pcd.proof.reveal,
      pcd.proof.nullifierSeed,
      pcd.proof.signalHash,
    ],
    pcd.proof.groth16Proof,
  );
}

export function serialize(pcd: AnonDigiLockerCore): Promise<SerializedPCD<AnonDigiLockerCore>> {
  return Promise.resolve({
    type: AnonDigiLockerTypeName,
    pcd: JSONBig().stringify({
      type: pcd.type,
      id: pcd.id,
      claim: pcd.claim,
      proof: pcd.proof,
    }),
  } as SerializedPCD<AnonDigiLockerCore>);
}

export async function deserialize(serialized: string): Promise<AnonDigiLockerCore> {
  return JSONBig().parse(serialized);
}

export function getDisplayOptions(pcd: AnonDigiLockerCore): DisplayOptions {
  return {
    header: "Anon DigiLocker Signature",
    displayName: "pcd-" + pcd.type,
  };
}

export const AnonDigiLockerCorePackage: PCDPackage<
  AnonDigiLockerClaim,
  AnonDigiLockerProof,
  AnonDigiLockerArgs,
  InitArgs
> = {
  name: AnonDigiLockerTypeName,
  getDisplayOptions,
  prove,
  init,
  verify,
  serialize,
  deserialize,
};
