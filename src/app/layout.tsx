// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Next.js font optimization
import "./globals.css"; // Global styles and Tailwind
import { ThemeProvider } from "./components/ThemeProvider"; // Custom ThemeProvider component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookWise AI - Knowledge Unleashed",
  description: "AI-Powered Book Summaries & Reviews for Accelerated Learning. Basic, Pro, and VIP Tiers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ThemeProvider manages dark mode state and applies 'dark' class */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
