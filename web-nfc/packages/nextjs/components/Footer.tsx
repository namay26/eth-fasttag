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
    label: "Scanner",
    href: "/scanner",
  },
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Fastags",
    href: "/fastags",
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <button key={href} className="text-gray-400">
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
            </button>
        );
      })}
    </>
  );
};

export const Footer = () => {

  return (
        <div className="fixed bottom-0 w-full bg-gray-900 py-4 flex justify-around">
           <HeaderMenuLinks />
        </div>
  );
};
