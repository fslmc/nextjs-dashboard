"use client";
import { SessionProvider } from "next-auth/react";
import NavAuth from "@/app/ui/nav-auth";
import Link from "next/link";
import type { Session } from "next-auth";

export default function AppShell({ children, session }: { children: React.ReactNode; session?: Session }) {
  return (
    <SessionProvider session={session}>
      <nav className="flex items-center justify-between bg-blue-600 px-8 py-4 mb-8 rounded-lg shadow">
        <div className="text-white text-2xl font-bold">LOREM IPSUM</div>
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="text-white hover:text-blue-200 transition-colors font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link href="/portfolio" className="text-white hover:text-blue-200 transition-colors font-medium">
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-white hover:text-blue-200 transition-colors font-medium">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/services" className="text-white hover:text-blue-200 transition-colors font-medium">
              Services
            </Link>
          </li>
          <li>
            <NavAuth />
          </li>
        </ul>
      </nav>
      {children}
    </SessionProvider>
  );
}
