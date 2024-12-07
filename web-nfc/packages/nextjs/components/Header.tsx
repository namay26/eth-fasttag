"use client";


import React, { useCallback, useRef, useState } from "react";
import { Poppins } from '@next/font/google';
import { useOutsideClick } from "~~/hooks/scaffold-eth";
const poppins = Poppins({ subsets: ['latin'], weight: ['600'] });

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky bg-black lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto ml-6 lg:w-1/2 font-semibold flex justify-between">
        <span className={poppins.className}>Toll Chain</span>
        <span className="right-0"><img src="/notif.svg" alt="Notification Icon" /></span>
      </div>
    </div>
  );
};
