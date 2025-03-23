"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner"; // Import Sonner for notifications
import axios from "axios";

export default function AdventurePage() {
  const [story, setStory] = useState<string | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to start a new adventure
  const startAdventure = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/adventure/generate", {
        prompt: "Start a new adventure.",
      });

      setStory(res.data.story);
      setChoices(res.data.choices);
    } catch (error) {
      console.error("Error generating adventure:", error);
      toast.error("Failed to start adventure. Please try again!"); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  // Function to progress the adventure
  const chooseOption = async (choice: string) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/adventure/progress", { choice });

      setStory(res.data.story);
      setChoices(res.data.choices);
    } catch (error) {
      console.error("Error progressing adventure:", error);
      toast.error("Something went wrong! Please try again."); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-4">
      <Card className="relative z-10 w-full max-w-2xl text-center bg-white/10 backdrop-blur-md border border-blue-500 shadow-lg p-6 rounded-2xl">
        <CardContent>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Your Adventure Begins
          </h1>

          {/* Story Content with Animation */}
          <div className="mt-4 text-slate-600">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Skeleton className="h-24 w-full bg-gray-600" />
                </motion.div>
              ) : (
                <motion.p
                  key={story} // Animates when story updates
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  {story || "Click below to start your journey!"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Choice Buttons with Animation */}
          <div className="mt-6 space-y-2">
            <AnimatePresence mode="wait">
              {choices.length > 0 ? (
                choices.map((choice, index) => (
                  <motion.div
                    key={choice} // Ensures smooth transition when choices update
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => chooseOption(choice)}
                      disabled={loading}
                    >
                      {choice}
                    </Button>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="start-button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={startAdventure}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Start Adventure"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Back to Home */}
          <Button
            className="mt-4 w-full bg-gray-700 hover:bg-gray-800 text-white"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
