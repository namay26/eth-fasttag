"use client";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

interface AnonProviderProps {
  children: React.ReactNode;
}

const AnonProvider = ({ children }: AnonProviderProps) => {
  return (
    <AnonAadhaarProvider _useTestAadhaar={true}>{children}</AnonAadhaarProvider>
  );
};

export default AnonProvider;
