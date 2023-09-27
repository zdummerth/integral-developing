"use client";

import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import useOnClickOutside from "@/utils/useOnClickOutside";
import HamburgerToX from "./HamburgerToX";

export function Navigation({ navigation, logo }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const linkClassName =
    "px-3 py-3 md:py-1 border-t last:border-b md:border-none flex justify-start";

  const mobileRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(mobileRef, () => setIsOpen(false));

  // Close menu when you go to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = navigation.data.slices.map((slice: any) => {
    return (
      <li key={slice.id} className={linkClassName}>
        <PrismicNextLink field={slice.primary.link}>
          {slice.primary.name}
        </PrismicNextLink>

        {/* Renders child links, if present. */}
        {slice.items.length > 0 && (
          <ul>
            {slice.items.map((item: any) => {
              return (
                <li key={JSON.stringify(item)}>
                  <PrismicNextLink field={item.child_link}>
                    {item.child_name}
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  });

  return (
    <>
      <nav ref={mobileRef} className="relative z-40 bg-black text-white h-16">
        <div className="mx-auto max-w-6xl h-full">
          <div className="flex justify-between align-center flex-row h-full">
            <div className="flex items-center pl-4">
              <a className={``} href="/" aria-label="Logo">
                <PrismicNextImage field={logo} width={72} height={72} />
              </a>
            </div>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="mr-4 md:hidden"
            >
              <HamburgerToX isOpen={isOpen} />
            </button>

            <ul
              className={`flex flex-col fixed top-16 w-3/4 h-screen dark-gradient md:hidden transition-all ease-in-out duration-500 overflow-hidden ${
                !isOpen ? "-right-full" : "right-0"
              }`}
            >
              {links}
            </ul>

            <ul className="hidden md:flex space-x-2 items-center">{links}</ul>
          </div>
        </div>
      </nav>
      {isOpen && (
        <style>
          {`
          body {
            overflow: hidden;
          }
        `}
        </style>
      )}
    </>
  );
}
