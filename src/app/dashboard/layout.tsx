import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <Link href="/dashboard" className="font-bold text-blue-600 text-xl">
          Dashboard
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard/summary" className="hover:underline">Summarize Book</Link>
          <Link href="/dashboard/upgrade" className="hover:underline">Upgrade Plan</Link>
          <Link href="/dashboard/challenge" className="hover:underline">Silly Sh!t Challenge</Link>
          <Link href="/" className="hover:underline text-red-600">Logout</Link>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </>
  );
}
