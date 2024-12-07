// import crypto from "crypto";
import { Application, Parse, SignedXml } from "xmldsigjs";
import { sha256Pad, generatePartialSHA } from "@zk-email/helpers/dist/sha-utils";
import { ArgumentTypeName } from "@pcd/pcd-types";
import { Uint8ArrayToCharArray, bigIntToChunkedBytes } from "@zk-email/helpers/dist/binary-format";
import { CIRCOM_FIELD_P } from "./constants";
import { InputGenerationParams, AnonDigiLockerArgs } from "./types";
import { hash } from "./hash";

Application.setEngine("OpenSSL", globalThis.crypto);

export async function generateInput(xml: string, params: InputGenerationParams) {
  const {
    nullifierSeed,
    revealStart,
    revealEnd,
    maxInputLength = 512 * 3,
    rsaKeyBitsPerChunk = 121,
    rsaKeyNumChunks = 17,
  } = params;

  if (BigInt(nullifierSeed) > CIRCOM_FIELD_P) {
    throw new Error("Nullifier seed is larger than the max field size");
  }

  // Parse XML
  const doc = Parse(xml);
  const signature = doc.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");
  const signedXml = new SignedXml(doc);
  signedXml.LoadXml(signature[0]);

  // Extract public key from the XML
  // @ts-ignore
  const publicKey = (await signedXml.GetPublicKeys())[0];
  const publicKeyJWK = await globalThis.crypto.subtle.exportKey("jwk", publicKey);
  const pubKeyBigInt = BigInt("0x" + Buffer.from(publicKeyJWK.n as string, "base64").toString("hex"));

  // Get the signed data
  const references = signedXml.XmlSignature.SignedInfo.References.GetIterator();
  if (references.length !== 1) {
    throw new Error("XML should have exactly one reference");
  }
  // @ts-ignore
  const signedData: string = signedXml.ApplyTransforms(references[0].Transforms, doc.documentElement);

  // Precompute SHA-256 hash of signed data till <CertificateData> node
  const signedDataUint8 = Uint8Array.from(Buffer.from(signedData));
  const bodySHALength = Math.floor((signedDataUint8.length + 63 + 65) / 64) * 64;
  const [signedDataPadded, signedDataPaddedLength] = sha256Pad(
    signedDataUint8,
    Math.max(maxInputLength, bodySHALength),
  );
  const {
    bodyRemaining: signedDataAfterPrecompute,
    bodyRemainingLength: signedDataAfterPrecomputeLength,
    precomputedSha,
  } = generatePartialSHA({
    body: signedDataPadded,
    bodyLength: signedDataPaddedLength,
    selectorString: "<CertificateData>", // String to split the body
    maxRemainingBodyLength: maxInputLength,
  });

  // Extract SignedInfo node and signature
  // @ts-ignore
  const signedInfo = signedXml.TransformSignedInfo(signedXml);
  // @ts-ignore
  const signatureBuff = Buffer.from(signedXml.signature.SignatureValue);
  const signatureBigInt = BigInt("0x" + signatureBuff.toString("hex"));

  // ----- Local verification
  // Ensure data hash is present in SignedInfo and verify RSA
  // const signedDataHaser = crypto.createHash("sha256");
  // signedDataHaser.update(signedData);
  // const signedDataHash = signedDataHaser.digest("base64");
  const signedDataHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(signedData));
  const signedDataHashB64 = Buffer.from(signedDataHash).toString("base64");

  const dataHashIndex = signedInfo.indexOf(signedDataHashB64);
  if (dataHashIndex === -1) {
    throw new Error("Body hash not found SignedInfo");
  }

  // const sha1 = crypto.createHash("sha1");
  // sha1.update(Buffer.from(signedInfo));
  const sha1 = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(signedInfo));

  const ASN1_PREFIX_SHA1 = Buffer.from("3021300906052b0e03021a05000414", "hex");
  const hashWithPrefx = Buffer.concat([ASN1_PREFIX_SHA1, Buffer.from(sha1)]);
  const paddingLength = 256 - hashWithPrefx.length - 3; // = 218; 3 bytes for 0x00 and 0x01 and 0x00
  const paddedMessage = Buffer.concat([
    Buffer.from([0x00, 0x01]),
    Buffer.alloc(paddingLength, 0xff),
    Buffer.from([0x00]),
    hashWithPrefx,
  ]);
  const paddedMessageBigInt = BigInt("0x" + paddedMessage.toString("hex"));
  const exponent = BigInt("0x" + Buffer.from(publicKeyJWK.e!, "base64").toString("hex")); // 65537

  const rsaResult = paddedMessageBigInt === signatureBigInt ** exponent % pubKeyBigInt;
  if (!rsaResult) {
    throw new Error("Local: RSA verification failed");
  }
  // ----- End Local verification

  // Extract <CertificateNode> and <DocumentType>
  const signedDataAfterPrecomputeBuff = Buffer.from(signedDataAfterPrecompute);
  const signedInfoArr = Uint8Array.from(Buffer.from(signedInfo));
  const certificateDataNodeIndex = signedDataAfterPrecomputeBuff.indexOf(Buffer.from("<CertificateData>"));
  const documentTypeNodeIndex = certificateDataNodeIndex + 17 + 1;

  // Data from 17 + 2 to next "space" or ">"
  const documentType = signedDataAfterPrecomputeBuff.subarray(
    documentTypeNodeIndex,
    Math.min(
      signedDataAfterPrecomputeBuff.indexOf(Buffer.from(" "), documentTypeNodeIndex),
      signedDataAfterPrecomputeBuff.indexOf(Buffer.from(">"), documentTypeNodeIndex),
    ),
  );

  let revealStartIndex = 0;
  let revealEndIndex = 0;
  const isRevealEnabled = revealStart && revealEnd ? 1 : 0;

  if (isRevealEnabled) {
    // Index of reveal start from "<CertificateData>"
    revealStartIndex =
      signedDataAfterPrecomputeBuff.indexOf(Buffer.from(revealStart!), certificateDataNodeIndex) -
      certificateDataNodeIndex;

    revealEndIndex =
      signedDataAfterPrecomputeBuff.indexOf(
        Buffer.from(revealEnd!),
        certificateDataNodeIndex + revealStartIndex + revealStart!.length + 1,
      ) - certificateDataNodeIndex;

    if (revealStartIndex < 0) {
      throw new Error("reveal start not found in doc");
    }
  }

  // Set signal to 1 by default if no signal is set
  const signalHash = params.signal ? hash(params.signal) : hash(1);

  // Circuit inputs
  const inputs = {
    dataPadded: Uint8ArrayToCharArray(signedDataAfterPrecompute),
    dataPaddedLength: signedDataAfterPrecomputeLength.toString(),
    signedInfo: Uint8ArrayToCharArray(signedInfoArr),
    precomputedSHA: Uint8ArrayToCharArray(precomputedSha),
    dataHashIndex: dataHashIndex.toString(),
    certificateDataNodeIndex: certificateDataNodeIndex.toString(),
    documentTypeLength: documentType.length.toString(),
    signature: bigIntToChunkedBytes(signatureBigInt, rsaKeyBitsPerChunk, rsaKeyNumChunks),
    pubKey: bigIntToChunkedBytes(pubKeyBigInt, rsaKeyBitsPerChunk, rsaKeyNumChunks),
    isRevealEnabled,
    revealStartIndex: revealStartIndex.toString(),
    revealEndIndex: revealEndIndex.toString(),
    nullifierSeed: nullifierSeed.toString(),
    signalHash: signalHash,
  };

  return inputs;
}

export const generateArgs = async (xml: string, params: InputGenerationParams): Promise<AnonDigiLockerArgs> => {
  const inputs = await generateInput(xml, params);


  const anonDigiLockerArgs: AnonDigiLockerArgs = {
    dataPadded: {
      argumentType: ArgumentTypeName.StringArray,
      value: inputs.dataPadded,
    },
    dataPaddedLength: {
      argumentType: ArgumentTypeName.Number,
      value: inputs.dataPaddedLength,
    },
    signedInfo: {
      argumentType: ArgumentTypeName.StringArray,
      value: inputs.signedInfo,
    },
    precomputedSHA: {
      argumentType: ArgumentTypeName.StringArray,
      value: inputs.precomputedSHA,
    },
    dataHashIndex: {
      argumentType: ArgumentTypeName.Number,
      value: inputs.dataHashIndex,
    },
    certificateDataNodeIndex: {
      argumentType: ArgumentTypeName.Number,
      value: inputs.certificateDataNodeIndex,
    },
    documentTypeLength: {
      argumentType: ArgumentTypeName.Number,
      value: inputs.documentTypeLength,
    },
    signature: {
      argumentType: ArgumentTypeName.StringArray,
      value: inputs.signature,
    },
    pubKey: {
      argumentType: ArgumentTypeName.StringArray,
      value: inputs.pubKey,
    },
    isRevealEnabled: {
      argumentType: ArgumentTypeName.Number,
      value: inputs.isRevealEnabled ? "1" : "0",
    },
    revealStartIndex: {
      argumentType: ArgumentTypeName.Number,
      value: inputs.revealStartIndex,
    },
    revealEndIndex: {
      argumentType: ArgumentTypeName.Number,
      value: inputs.revealEndIndex,
    },
    nullifierSeed: {
      argumentType: ArgumentTypeName.String,
      value: inputs.nullifierSeed,
    },
    signalHash: {
      argumentType: ArgumentTypeName.String,
      value: inputs.signalHash,
    },
  };

  return anonDigiLockerArgs;
};
