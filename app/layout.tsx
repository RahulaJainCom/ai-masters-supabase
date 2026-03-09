import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online AI Masters",
  description: "Compare online AI master's programs, official program links, and programmatic SEO pages."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container nav">
            <Link href="/" className="brand">Online AI Masters</Link>
            <nav className="nav-links">
              <Link href="/rankings/best-online-ai-masters-programs">Rankings</Link>
              <Link href="/programs">Programs</Link>
              <Link href="/filters/no-gre">No GRE</Link>
              <Link href="/filters/under-20000">Under $20k</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
