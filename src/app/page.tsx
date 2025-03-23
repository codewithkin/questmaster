"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/t7YycgAoVSw')",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <Card className="relative z-10 w-full max-w-lg text-center bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-6 rounded-2xl">
        <CardContent>
          <h1 className="text-4xl font-bold text-white">Choose Your Adventure</h1>
          <p className="text-gray-300 mt-2">
            Embark on an AI-generated journey where every choice matters.
          </p>
          <Button
            size="lg"
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => router.push("/adventure")}
          >
            Start Adventure
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}