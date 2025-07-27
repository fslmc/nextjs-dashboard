
import '@/app/ui/global.css';
import Link from 'next/link';
import getServerSession from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { headers } from "next/headers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
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
              {session?.user ? (
                <Link href="/profile" className="text-white font-medium">{session.user.name}</Link>
              ) : (
                <Link href="/signin" className="text-white font-medium">Sign In</Link>
              )}
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}