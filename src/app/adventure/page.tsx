"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function AdventureGame() {
  const [sessionId, setSessionId] = useState<string>(uuidv4());
  const [story, setStory] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialStory, setInitialStory] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    startGame();
  }, []);

  const startGame = async () => {
    setLoading(true);
    setGameOver(false);
    setSessionId(uuidv4()); // Reset session for new game

    try {
      const res = await axios.post("/api/adventure/generate", { sessionId });

      setStory(res.data.story);
      setChoices(res.data.choices);
      setInitialStory(res.data.story);
      setGameOver(res.data.choices.length === 0); // Detect if game ends immediately
    } catch (error) {
      toast.error("Failed to start adventure.");
    } finally {
      setLoading(false);
    }
  };

  const chooseOption = async (choice: string) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/adventure/progress", {
        choice,
        sessionId,
        initialStory,
      });

      setStory(res.data.story);
      setChoices(res.data.choices);
      setGameOver(res.data.choices.length === 0); // Check if adventure has ended
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-4">
      <Card className="relative z-10 w-full max-w-2xl text-center bg-white/10 backdrop-blur-md border border-blue-500 shadow-lg p-6 rounded-2xl">
        <CardContent>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {story.length < 1
              ? "Your Adventure Begins"
              : gameOver
                ? "The Journey Ends"
                : "Continue your adventure..."}
          </h1>

          <div className="mt-4 text-slate-600">
            {loading ? (
              <Skeleton className="h-24 w-full bg-gray-600" />
            ) : (
              <p className="whitespace-pre-line">
                {story || "Click below to start your journey!"}
              </p>
            )}
          </div>

          <div className="mt-6 space-y-2">
            {gameOver ? (
              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                onClick={startGame}
              >
                Start a New Adventure
              </Button>
            ) : choices.length > 0 ? (
              choices.map((choice, index) => (
                <Button
                  key={index}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white whitespace-normal px-4 py-4 h-fit text-center"
                  onClick={() => chooseOption(choice)}
                >
                  {choice}
                </Button>
              ))
            ) : (
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => chooseOption("Start Adventure")}
                disabled={loading}
              >
                {loading ? "Loading..." : "Start Adventure"}
              </Button>
            )}
          </div>

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
