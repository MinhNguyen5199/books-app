import './globals.css';
import Header from '../app/components/Header'
import Footer from '../app/components/Footer';

export const metadata = {
  title: 'BookSummary AI SaaS',
  description: 'AI-powered book summary and review platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
