"use client";

import React from "react";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";

export default function Reader() {
  const [anonAadhaar] = useAnonAadhaar();

  const handleLoginSuccess = (response) => {
    console.log("Login successful", response);

    // Send the login response (e.g., nullifier or proof) to your backend for verification
    fetch("/api/verify-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ proof: response.proof }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Authentication successful on server:", data);
          // Redirect or set user session
        } else {
          console.error("Authentication failed on server");
        }
      })
      .catch((error) => console.error("Error during server verification:", error));
  };

  return (
    <div>
      <h1>Log in with Anon Aadhaar</h1>
      <LogInWithAnonAadhaar 
        nullifierSeed="4354" 
        onSuccess={handleLoginSuccess}
        onError={(err) => console.error("Login error", err)}
      />
    </div>
  );
}
