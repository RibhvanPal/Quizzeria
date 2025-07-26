"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string, route: string) => {
    e.preventDefault();
    const targetId = href.startsWith("#") ? href.substring(1) : "";
    const element = targetId ? document.getElementById(targetId) : null;

    if (element) {
      // Smooth scroll with slower duration
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Add custom scroll duration via CSS or JS if needed
      element.style.scrollBehavior = "smooth";
    } else {
      // Navigate to the route if section not found
      router.push(route);
    }
  };

  const handleLogoClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    const element = document.getElementById("home");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 text-white bg-black shadow-md p-4 flex justify-between items-center">
      <img
        src="/logo.png"
        alt="Logo"
        onClick={handleLogoClick}
        className="h-8 w-auto scale-200 cursor-pointer rounded-full transform hover:scale-220 hover:shadow-lg transition-transform duration-200 ease-in-out"
      />
      <div className="flex justify-center flex-1">
        <div className="flex gap-10 text-lg">
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "#home", "/")}
            className="hover:scale-110 transition-transform duration-200"
          >
            Home
          </Link>
          <Link
            href="#about"
            onClick={(e) => handleNavClick(e, "#about", "/about")}
            className="hover:scale-110 transition-transform duration-200"
          >
            About
          </Link>
          <Link
            href="#study"
            onClick={(e) => handleNavClick(e, "#study", "/study")}
            className="hover:scale-110 transition-transform duration-200"
          >
            Study
          </Link>
        </div>
      </div>
      <Link href="/login">
        <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
          Login
        </button>
      </Link>
    </nav>
  );
}