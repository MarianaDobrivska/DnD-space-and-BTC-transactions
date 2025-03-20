import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Test Task",
  description: "Interactive Workspace and WebSocket-based Bitcoin Transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <header>
          <nav
            className="mx-auto flex max-w-7xl items-center justify-end p-6 lg:px-8"
            aria-label="Global">
            <div className="flex items-end gap-x-4 sm:gap-x-8 md:gap-x-12 ">
              <Link href="/workspace" className="text-sm/6 font-semibold ">
                Workspace
              </Link>
              <Link href="/transactions" className="text-sm/6 font-semibold ">
                Transactions
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
