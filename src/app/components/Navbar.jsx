"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = ({ snowEnabled, setSnowEnabled }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212] bg-opacity-90">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          JD
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            <li className="flex items-center">
              <button
                onClick={() => setSnowEnabled(!snowEnabled)}
                className="cursor-pointer group"
              >
                <div
                  className={`
                  w-6 h-6 rounded border-2 bg-black
                  flex items-center justify-center
                  transition-all duration-300
                  hover:border-white
                  ${snowEnabled ? "border-white" : "border-[#ADB7BE]"}
                `}
                >
                  {/* Snowflake icon - 7x7 grid with your positions */}
                  <div className="relative w-[14px] h-[14px]">
                    {[
                      4, 9, 11, 13, 17, 19, 22, 23, 25, 27, 28, 31, 33, 37, 39,
                      41, 46,
                    ].map((position, index) => {
                      // Convert position number to row,col in 7x7 grid (positions 1-49)
                      const row = Math.ceil(position / 7);
                      const col = position - (row - 1) * 7;
                      return (
                        <div
                          key={index}
                          className={`
                          absolute
                          transition-colors duration-300
                          ${snowEnabled ? "bg-white" : "bg-gray-500 group-hover:bg-white"}
                        `}
                          style={{
                            width: "2px",
                            height: "2px",
                            left: `${(col - 1) * 2}px`,
                            top: `${(row - 1) * 2}px`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
      {navbarOpen ? (
        <MenuOverlay links={navLinks} closeMenu={() => setNavbarOpen(false)} />
      ) : null}
    </nav>
  );
};

export default Navbar;
