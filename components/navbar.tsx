"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 fixed top-0 left-0 z-50
      backdrop-blur-md border-b
      bg-white/70 border-neutral-300 text-neutral-800
      dark:bg-black/50 dark:border-neutral-800 dark:text-white
      transition-colors"
    >
      {/* LEFT: Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/logo.webp"
          alt="Logo"
          width={35}
          height={35}
          className="object-contain"
          priority
        />
      </Link>

      {/* CENTER: Nav Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="nav-link neon-text">
          Characters
        </Link>
        <Link href="/episodes" className="nav-link neon-text">
          Episodes
        </Link>
      </div>

      {/* RIGHT: Theme toggle */}
      <ThemeToggle />
    </nav>
  );
}
