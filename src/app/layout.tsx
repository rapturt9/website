import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://rampotham.com"),
  title: "Ram Potham - AI Control & Monitoring Researcher",
  description:
    "AI control and monitoring researcher. Fellow at Redwood Research. Co-author of LinuxArena, used for risk evaluations at OpenAI, Anthropic, and the EU AI Office.",
  keywords: [
    "AI control",
    "AI monitoring",
    "AI safety",
    "AI alignment",
    "Redwood Research",
    "LinuxArena",
    "research",
  ],
  openGraph: {
    title: "Ram Potham - AI Control & Monitoring Researcher",
    description:
      "AI control and monitoring researcher. Fellow at Redwood Research. Co-author of LinuxArena, used for risk evaluations at OpenAI, Anthropic, and the EU AI Office.",
    url: "https://rampotham.com",
    siteName: "Ram Potham",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ram Potham - AI Control & Monitoring Researcher",
    description:
      "AI control and monitoring researcher. Fellow at Redwood Research. Co-author of LinuxArena, used for risk evaluations at OpenAI, Anthropic, and the EU AI Office.",
    creator: "@PothamRam",
  },
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
