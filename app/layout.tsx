
import '@/app/ui/global.css';
import { ReactNode } from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import AppShell from '@/app/ui/app-shell';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = (await getServerSession(authOptions)) as Session | null;
  // Ensure session has an expires property for SessionProvider
  const sessionWithExpires = session && !session.expires
    ? { ...session, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString() }
    : session ?? undefined;
  const serializedSession = sessionWithExpires ? JSON.parse(JSON.stringify(sessionWithExpires)) : undefined;
  return (
    <html lang="en">
      <body>
        <AppShell session={serializedSession}>{children}</AppShell>
      </body>
    </html>
  );
}
