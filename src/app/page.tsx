"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0"></div>

      {/* Motion Card (Animated Slide-Up) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="border border-purple-300 text-center backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <CardContent>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              Choose Your Adventure
            </h1>
            <p className="text-slate-600 mt-2">
              Embark on an AI-generated journey where every choice matters.
            </p>
            <Button
              size="lg"
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white hover:cursor-pointer transition-all duration-500"
              onClick={() => router.push("/adventure")}
            >
              Start Adventure
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
