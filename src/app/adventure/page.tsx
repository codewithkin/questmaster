"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, Spinner } from "@heroui/react";
import axios from "axios";

export default function AdventurePage() {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the first story step
  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await axios.get("/api/adventure/generate");
        setStory(response.data);
      } catch (error) {
        console.error("Error fetching adventure:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStory();
  }, []);

  // Handle user choices
  async function handleChoice(choiceId: string) {
    setLoading(true);
    try {
      const response = await axios.post("/api/adventure/continue", { choice: choiceId });
      setStory(response.data);
    } catch (error) {
      console.error("Error continuing adventure:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
         style={{ backgroundImage: "url('https://source.unsplash.com/daily')" }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <Card className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-6 rounded-2xl text-center">
        <CardContent>
          {loading ? (
            <Spinner className="text-white w-10 h-10 mx-auto" />
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white">{story?.title}</h1>
              <p className="text-gray-300 mt-2">{story?.text}</p>
              <div className="mt-4 flex flex-col gap-2">
                {story?.choices?.map((choice) => (
                  <Button key={choice.id} className="bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => handleChoice(choice.id)}>
                    {choice.text}
                  </Button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}