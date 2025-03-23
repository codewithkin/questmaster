"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner"; // Import Sonner
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

          {/* Story Content */}
          <div className="mt-4 text-slate-600">
            {loading ? (
              <Skeleton className="h-24 w-full bg-gray-600" />
            ) : (
              <p>{story || "Click below to start your journey!"}</p>
            )}
          </div>

          {/* Choice Buttons */}
          <div className="mt-6 space-y-2">
            {choices.length > 0 ? (
              choices.map((choice, index) => (
                <Button
                  key={index}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => chooseOption(choice)}
                >
                  {choice}
                </Button>
              ))
            ) : (
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={startAdventure}
                disabled={loading}
              >
                {loading ? "Loading..." : "Start Adventure"}
              </Button>
            )}
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