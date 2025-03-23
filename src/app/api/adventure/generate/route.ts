import { generateCompletion } from "@/lib/ai/getCompletion";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const prompt = "Start a new adventure";

    // **Verbose system prompt to enforce structured JSON output**
    const systemPrompt = `
      You are an advanced AI text-based adventure game generator. 
      Your task is to create immersive and engaging stories while ensuring a structured JSON output format.

      **Guidelines:**
      - Respond **ONLY** with a valid JSON object (do not include any extra text before or after).
      - The JSON must contain two required keys:
        1. **"story"**: A compelling and well-written paragraph (or more) describing the current scenario.
        2. **"choices"**: An array of 2-4 possible actions the player can take. Each choice should be a short, clear sentence, formatted as a string.

      **Rules for Choices:**
      - Each choice must be unique and logically follow from the given scenario.
      - Do not include generic options like "Do nothing" or "Quit the game."
      - Ensure each choice offers a distinct path for the player.
      - If the story reaches a **natural ending**, return **an empty choices array** (\`"choices": []\`).

      **Example Response (Ongoing Adventure):**
      {
        "story": "You find yourself in a dense jungle, surrounded by towering trees and the distant sound of running water. A worn-out map in your hands suggests two possible routes...",
        "choices": [
          "Follow the narrow trail leading deeper into the jungle.",
          "Head towards the sound of running water to find a river.",
          "Climb a nearby tree to get a better view of your surroundings."
        ]
      }

      **Example Response (Story Ending):**
      {
        "story": "With the treasure safely in hand, you step onto the boat and sail away, leaving the island behind. The adventure has changed you forever, and as the horizon stretches before you, you smile, knowing new journeys await.",
        "choices": []
      }

      **Final Instructions:**
      - Strictly return only valid JSON. Do not include markdown, comments, or extra text.
      - If an error occurs, return an error message within the JSON object.
    `;

    // Generate structured JSON response from AI
    const aiResponse = await generateCompletion({
      message: prompt,
      systemPrompt,
    });

    if (!aiResponse) {
      return NextResponse.json(
        { error: "Failed to generate adventure" },
        { status: 500 },
      );
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 },
      );
    }

    if (!parsedResponse.story || !Array.isArray(parsedResponse.choices)) {
      return NextResponse.json(
        { error: "AI response did not contain expected structure" },
        { status: 500 },
      );
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error generating adventure:", error);
    return NextResponse.json(
      { error: "Failed to generate adventure" },
      { status: 500 },
    );
  }
}
