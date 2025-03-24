export const metadata = {
  title: "Adventure Mode | Interactive Story Game",
  description:
    "Continue your adventure, make choices, and shape the outcome of your journey.",
  keywords: "adventure game, choice-based game, text adventure, role-playing",
  openGraph: {
    title: "Adventure Mode - Choose Your Story",
    description:
      "Dive into an interactive adventure where every choice matters!",
    type: "website",
    url: "https://questmasterforeverydayai.vercel.app/adventure",
    images: [
      {
        url: "https://questmasterforeverydayai.vercel.app/assets/adventure-og.jpg",
        width: 1200,
        height: 630,
        alt: "Adventure Game Screenshot",
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
