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
  title: "QuestMaster | Interactive Story Adventure",
  description:
    "Embark on an epic journey with QuestMaster, the ultimate interactive story adventure where your choices shape the outcome.",
  keywords:
    "QuestMaster, interactive story, text-based adventure, choose your own adventure, game",
  openGraph: {
    title: "QuestMaster - Shape Your Own Adventure",
    description:
      "Dive into QuestMaster, a thrilling interactive storytelling experience where your decisions define the story.",
    type: "website",
    url: "https://questmasterforeverydayai.vercel.app/",
    images: [
      {
        url: "https://questmasterforeverydayai.vercel.app/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QuestMaster - Interactive Story Adventure",
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
