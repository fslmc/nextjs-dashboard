"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="text-white font-medium bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors"
      onClick={() => signOut({ callbackUrl: "/signin" })}
    >
      Sign Out
    </button>
  );
}
