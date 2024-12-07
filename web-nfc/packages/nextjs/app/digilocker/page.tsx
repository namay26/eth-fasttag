"use client";

import { useEffect, useState } from "react";
import revealSelectors from "./reveal-selectors.json";
import { generateInput } from "@anon-digilocker/core/src/input-generator";
import { highlight, languages } from "prismjs/components/prism-core";
import Editor from "react-simple-code-editor";
import { groth16 } from "snarkjs";

const artifactsUrl = process.env.NEXT_PUBLIC_ARTIFACTS_URL;

export default function App() {
  const [xmlContent, setXmlContent] = useState("");
  const [status, setStatus] = useState("");
  const [proof, setProof] = useState();

  function handleXMLChange(newXml) {
    setXmlContent(newXml);

    const hasMatch = revealSelectors.some(selector => {
      const searchKey = `<CertificateData><${selector.documentType}`;

      if (!newXml.includes(searchKey)) {
        return false;
      }

      return true;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    document.getElementsByClassName("btn-submit")[0].disabled = true;

    try {
      const nullifierSeed = parseInt(e.target.nullifierSeed.value.trim());
      const signalStr = e.target.signal.value.trim();
      const signal = [...new TextEncoder().encode(signalStr)].reduce(
        (acc, byte, i) => acc + BigInt(byte) * BigInt(256) ** BigInt(i),
        BigInt(0),
      );

      setStatus("Generating input...");

      const cleanXml = xmlContent.replace("\n", "").trim();
      const inputs = await generateInput(cleanXml, {
        nullifierSeed,
        signal,
      });

      setStatus("Generating proof...");

      const startTime = performance.now();
      const fullProof = await groth16.fullProve(
        inputs,
        `${artifactsUrl}digilocker-verifier.wasm`,
        `${artifactsUrl}circuit_final.zkey`,
        console,
      );
      const result = await groth16.verify(
        await fetch(`${artifactsUrl}vkey.json`).then(res => res.json()),
        fullProof.publicSignals,
        fullProof.proof,
      );
      const endTime = performance.now();
      const duration = Math.round((endTime - startTime) / 1000);

      setStatus(result ? `Proof generated and verified in ${duration}s` : "Proof failed");

      if (result) {
        setProof(fullProof);
      }
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    } finally {
      document.getElementsByClassName("btn-submit")[0].disabled = false;
    }
  }

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="container pb-5 mb-12">
      <div className="box" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 className="mt-3 mb-3">Anon DigiLocker</h1>
        <hr />

        <div className="mb-3">
          <ul>
            <li>
              Open DigiLocker app and go to the <code>Issued</code> tab.
            </li>
            <li>
              Click the three dot menu icon against the document you want to prove and select <code>Download XML</code>.
            </li>
            <li>Copy the XMl content and paste in the form below.</li>
          </ul>
        </div>

        <hr />

        <form onSubmit={handleSubmit}>
          <label htmlFor="xml">DigiLocker XML (Paste below)</label>
          <Editor
            value={xmlContent}
            onValueChange={code => handleXMLChange(code)}
            highlight={code => highlight(code, languages.text)}
            padding={10}
            style={{
              backgroundColor: "#f5f5f5",
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              height: "400px",
              overflowY: "scroll",
              marginTop: "10px",
            }}
          />

          <hr />

          <div className="form-row row">
            <div>
              <h5>Selective Disclosure</h5>
              <p>
                You can reveal some data from the <code>{"<CertificateData />"}</code> node of the XML, as part of the
                proof. Type of the Document (PAN, DirivingLicense, etc.) will always be revealed.
              </p>
              <p>
                Enter the text from which the reveal should start and end. For example, in a PAN Verification Record XML
                you can reveal your PAN number which is between <code>num="</code> and <code>"</code> in the XML
              </p>
            </div>
          </div>

          <hr />

          <div className="form-group mb-3">
            <label htmlFor="nullifierSeed">Nullifier Seed (a random number for generating unique nullifier)</label>
            <input
              type="number"
              defaultValue="1"
              maxLength={30}
              className="form-control"
              name="nullifierSeed"
              id="nullifierSeed"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="signal">Signal (any message you want to sign as part of the proof)</label>
            <input type="text" className="form-control" name="signal" id="signal" />
          </div>

          <button disabled={!xmlContent} className="btn btn-submit btn-primary mt-4" type="submit">
            Submit
          </button>
        </form>

        {status.length > 0 && <div className="alert alert-light mt-4">{status}</div>}

        {proof && (
          <div className="alert alert-light">
            <code>
              <pre>{JSON.stringify(proof, null, 2)}</pre>
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
