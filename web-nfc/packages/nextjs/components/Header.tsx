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
    <div className="sticky bg-black lg:static top-3 navbar min-h-0 flex-shrink-0 justify-between z-30">
      <div className="navbar-start w-100 ml-6 lg:w-1/2 font-semibold flex justify-between" style={{width: "100%"}}>
        <span className={poppins.className}>Toll Chain</span>
        <img src="/notif.svg" style={{ float: 'right', marginRight:"8%" }} alt="Notification Icon" />
      </div>
    </div>
  );
};
