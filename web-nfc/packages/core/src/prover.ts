/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Groth16Proof, PublicSignals, ZKArtifact, groth16 } from "snarkjs";
import { ProverState, retrieveFileExtension } from "@anon-aadhaar/core";
import { AnonDigiLockerArgs, AnonDigiLockerProof } from "./types";

type Witness = AnonDigiLockerArgs;

async function fetchKey(keyURL: string, maxRetries = 3): Promise<ZKArtifact> {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      const response = await fetch(keyURL);
      if (!response.ok) {
        throw new Error(
          `Error while fetching ${retrieveFileExtension(keyURL)} artifacts from prover: ${response.statusText}`,
        );
      }

      const data = await response.arrayBuffer();
      return data as Buffer;
    } catch (error) {
      attempts++;
      if (attempts >= maxRetries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
    }
  }
  return keyURL;
}

interface KeyPathInterface {
  keyURL: string;
  getKey: () => Promise<ZKArtifact>;
}

export class KeyPath implements KeyPathInterface {
  keyURL: string;

  constructor(keyURL: string) {
    this.keyURL = keyURL;
  }

  async getKey(): Promise<ZKArtifact> {
    return await fetchKey(this.keyURL);
  }
}

export interface ProverInferace {
  wasm: KeyPath;
  zkey: KeyPath;
  proving: (witness: Witness, updateState?: (state: ProverState) => void) => Promise<AnonDigiLockerProof>;
}

export class AnonDigiLockerProver implements ProverInferace {
  wasm: KeyPath;
  zkey: KeyPath;

  constructor(wasmURL: string, zkey: string) {
    this.wasm = new KeyPath(wasmURL);
    this.zkey = new KeyPath(zkey);
  }

  async proving(witness: Witness, updateState?: (state: ProverState) => void): Promise<AnonDigiLockerProof> {
    if (updateState) updateState(ProverState.FetchingWasm);
    const wasmBuffer = new Uint8Array((await this.wasm.getKey()) as ArrayBuffer);
    if (updateState) updateState(ProverState.FetchingZkey);
    const zkeyBuffer = new Uint8Array((await this.zkey.getKey()) as ArrayBuffer);

    const input = {
      dataPadded: witness.dataPadded.value!,
      dataPaddedLength: witness.dataPaddedLength.value!,
      signedInfo: witness.signedInfo.value!,
      precomputedSHA: witness.precomputedSHA.value!,
      dataHashIndex: witness.dataHashIndex.value!,
      certificateDataNodeIndex: witness.certificateDataNodeIndex.value!,
      documentTypeLength: witness.documentTypeLength.value!,
      isRevealEnabled: witness.isRevealEnabled.value!,
      revealStartIndex: witness.revealStartIndex.value!,
      revealEndIndex: witness.revealEndIndex.value!,
      pubKey: witness.pubKey.value!,
      signalHash: witness.signalHash.value!,
    };

    if (updateState) updateState(ProverState.Proving);
    let result: {
      proof: Groth16Proof;
      publicSignals: PublicSignals;
    };
    try {
      result = await groth16.fullProve(input, wasmBuffer, zkeyBuffer);
    } catch (e) {
      console.error(e);
      if (updateState) updateState(ProverState.Error);
      throw new Error("[AnonAAdhaarProver]: Error while generating the proof");
    }

    const proof = result.proof;
    const publicSignals = result.publicSignals;

    if (updateState) updateState(ProverState.Completed);
    return {
      groth16Proof: proof,
      nullifierSeed: witness.nullifierSeed.value!,
      signalHash: witness.signalHash.value!,
      pubkeyHash: publicSignals[0],
      nullifier: publicSignals[1],
      documentType: publicSignals[2],
      reveal: publicSignals[3],
    };
  }
}
