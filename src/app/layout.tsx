import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const headline = Playfair_Display({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Objection Atlas",
  description: "A calm one-screen utility for mapping the objections standing between a promising idea and a believable yes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headline.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
