"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";
import { LogInWithAnonAadhaar } from "@anon-aadhaar/react";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="sticky bg-black lg:static top-0 navbar min-h-0 flex-row z-30">
      <div className="navbar-start w-full flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <span className={poppins.className} style={{ gap: "12px", display: "flex", alignItems: "center" }}>
          <img src="/logo.svg" style={{ width: "40px" }} alt="Logo" />
          Toll Chain
        </span>

        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Menu for Desktop */}
        <div className="hidden lg:flex items-center space-x-6">
          <RainbowKitCustomConnectButton />
          <LogInWithAnonAadhaar />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-black w-full lg:hidden px-6 py-4">
          <div className="flex flex-col space-y-4">
            <RainbowKitCustomConnectButton />
            <LogInWithAnonAadhaar />
          </div>
        </div>
      )}
    </div>
  );
};
