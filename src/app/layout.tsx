import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Website - Research & Portfolio",
  description:
    "A sleek personal website showcasing research outputs, publications, and professional experience.",
  keywords: ["research", "portfolio", "academic", "publications", "resume"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-gray-50 text-gray-900`}
      >
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
