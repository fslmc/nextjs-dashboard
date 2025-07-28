"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function NavAuth() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <>
        <Link href="/profile" className="text-white font-medium mr-2">{session.user.name}</Link>
        <button
          className="text-white font-medium bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors"
          onClick={() => signOut({ callbackUrl: "/signin" })}
        >
          Sign Out
        </button>
      </>
    );
  }
  return <Link href="/signin" className="text-white font-medium">Sign In</Link>;
}
