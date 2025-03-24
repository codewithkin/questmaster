import { Metadata } from "next";

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


export default function AdventureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
