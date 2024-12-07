import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    icon: "/home.svg",
    label: "Home",
    href: "/home",
  },
  {
    icon: "/wallet.svg",
    label: "Fastags",
    href: "/fastags",
  },
  {
    icon: "/map.svg",
    label: "Scanner",
    href: "/scanner",

  },
  {
    icon: "/profile.svg",
    label: "Profile",
    href: "/profile",

  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <button key={href}>
            <Link
              href={href}
              passHref
              className={`${isActive ? "bg-gray-1200 shadow-md" : ""
                } hover:bg-secondary color:white hover:shadow-md focus:bg-secondary active:text-neutral py-1.5 px-3 text-sm rounded-10 gap-2 grid grid-flow-col`}
            >
              <span><img src={icon} /></span>
            </Link>
          </button>
        );
      })}
    </>
  );
};

export const Footer = () => {

  return (
    <div className="fixed bottom-0 w-full py-4 flex justify-around">
      <HeaderMenuLinks />
    </div>
  );
};
