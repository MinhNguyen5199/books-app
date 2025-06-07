import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4 sm:p-6">
        <Link href="/" className="text-xl font-bold text-blue-600">
          BookSummary AI
        </Link>
        <nav className="space-x-6">
          <Link href="/dashboard" className="hover:text-blue-700 font-semibold">Dashboard</Link>
          <Link href="/login" className="hover:text-blue-700 font-semibold">Login</Link>
          <Link href="/register" className="hover:text-blue-700 font-semibold">Register</Link>
        </nav>
      </div>
    </header>
  );
}
