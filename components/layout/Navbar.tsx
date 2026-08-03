"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";
export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
      <nav
  className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-8 py-4 backdrop-blur-xl transition-all duration-300 ${
    scrolled
      ? "border border-white/20 bg-black/80 shadow-2xl"
      : "border border-white/10 bg-black/40"
  }`}
>

        {/* Logo */}
        <Link
  href="/"
  className="cursor-pointer transition duration-300 hover:scale-105"
>

  <h1 className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
    Lumeora Hub
  </h1>

  <p className="text-xs text-gray-400">
    Powered by Shelby
  </p>

</Link>

        {/* Links */}
        <div className="hidden items-center gap-10 text-gray-300 lg:flex">

         <a href="#home" className="transition hover:text-violet-400">
  Home
</a>

<a href="#resources" className="transition hover:text-violet-400">
  Explore
</a>

<a href="#categories" className="transition hover:text-violet-400">
  Categories
</a>

<a href="#about" className="transition hover:text-violet-400">
  About
</a>

        </div>

        <ConnectWalletButton />

      </nav>
    </header>
  );
}


