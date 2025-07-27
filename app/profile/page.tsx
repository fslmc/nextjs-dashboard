"use client";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main>Loading...</main>;
  }

  if (!session?.user) {
    return <main>You are not logged in.</main>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-8 rounded shadow w-96 mb-4">
        <p><strong>Name:</strong> {session.user.name}</p>
        <p><strong>Email:</strong> {session.user.email}</p>
      </div>
      <button
        className="bg-red-600 text-white py-2 px-4 rounded"
        onClick={() => signOut({ callbackUrl: "/profile/signin" })}
      >
        Sign Out
      </button>
    </main>
  );
}