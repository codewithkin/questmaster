import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interactive Story Adventure | Home",
  description: "Start your interactive story adventure and shape your own destiny through choices.",
  keywords: "interactive story, text-based adventure, choose your own adventure, game",
  openGraph: {
    title: "Interactive Story Adventure",
    description: "Begin your journey in this immersive, choice-driven adventure game.",
    type: "website",
    url: "https://questmasterforeverydayai.vercel.app/",
    images: [
      {
        url: "https://questmasterforeverydayai.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Interactive Story Adventure",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="light" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors expand visibleToasts={5} />
      </body>
    </html>
  );
}
