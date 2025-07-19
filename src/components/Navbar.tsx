"use client";

import { MouseEvent } from "react";

export default function Navbar() {
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    const element = document.getElementById("home");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 text-white bg-black shadow-md p-4 flex justify-between items-center">
      <img
        src="/logo.png"
        alt="Logo"
        onClick={handleLogoClick}
        className="h-8 w-auto cursor-pointer"
      />
      <div className="flex justify-center flex-1">
        <div className="flex gap-10 text-lg">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="hover:scale-110 transition-transform duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="hover:scale-110 transition-transform duration-200"
          >
            About
          </a>
          <a
            href="#study"
            onClick={(e) => handleNavClick(e, "#study")}
            className="hover:scale-110 transition-transform duration-200"
          >
            Study
          </a>
        </div>
      </div>
      <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
        Login
      </button>
    </nav>
  );
}