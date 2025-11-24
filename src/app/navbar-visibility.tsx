"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

export default function NavbarVisibility() {
  const pathname = usePathname();

  // Hide navbar ONLY on landing page
  const hideNavbar = pathname === "/";

  if (hideNavbar) return null;

  return <Navbar />;
}
