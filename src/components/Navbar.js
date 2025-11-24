"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Work", href: "/work" },
    { name: "Projects", href: "/projects" },
    // { name: "Life", href: "/life" },
    { name: "Hobbies", href: "/hobbies" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-neutral-950 text-white px-8 py-4 flex justify-center items-center shadow-md fixed top-0 w-full z-50">
      {/* Logo with animation */}
      <Link
        href="/"
        className="absolute left-8 text-xl font-bold flex items-center gap-2 group transition-all"
      >
        <span className="group-hover:text-orange-400 group-hover:drop-shadow-[0_0_10px_rgba(255,165,0,0.7)] transition-colors">
          Abbas
        </span>
        <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
          🏍
        </span>
      </Link>

      {/* Nav Links */}
      <div className="flex space-x-10 font-sans tracking-wide">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative group transition-colors ${
                isActive
                  ? "text-orange-400 font-semibold"
                  : "text-white hover:text-orange-400"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-orange-400 transition-all duration-500 ${
                  isActive
                    ? "w-full"
                    : "w-0 group-hover:w-full group-hover:left-0"
                }`}
              ></span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
