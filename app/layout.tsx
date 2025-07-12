import '@/app/ui/global.css'
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}