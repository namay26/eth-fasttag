"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";

export default function Home() {
  const [anonAadhaar] = useAnonAadhaar();
  const router = useRouter();

  console.log(anonAadhaar);

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log(JSON.parse(anonAadhaar?.anonAadhaarProofs[0]?.pcd));
      if (window?.ReactNativeWebView)
        window?.ReactNativeWebView?.postMessage(anonAadhaar);
    }
  }, []);

  function postMessage() {
    if (window?.ReactNativeWebView) {
      window?.ReactNativeWebView?.postMessage("hello");
      router.push("/close");
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LogInWithAnonAadhaar nullifierSeed={4354} />
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <button onClick={() => postMessage()}>post message</button>
      </main>
    </div>
  );
}
