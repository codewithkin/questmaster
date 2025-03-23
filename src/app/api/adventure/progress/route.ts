import { NextResponse } from "next/server";
import { generateCompletion } from "@/lib/ai/getCompletion"; 
import { getSession, updateSession } from "@/lib/sessionManager";

export async function POST(req: Request) {
  try {
    const { choice, sessionId, initialStory } = await req.json();
    if (!choice || !sessionId || !initialStory) {
      return NextResponse.json(
        { error: "Invalid request. 'choice', 'sessionId', and 'initialStory' are required." },
        { status: 400 }
      );
    }

    // Get the player's session history
    const sessionData = await getSession(sessionId);
    const recentHistory = sessionData ? sessionData.history.slice(-3) : [];

    // **System Prompt Update**
    const systemPrompt = `
      You are an advanced AI-powered text-based adventure game engine.
      Your job is to **continue the adventure** based on the player's choices while ensuring logical flow.

      **What You Will Receive:**
      - The **initial story** (this sets the foundation of the adventure).
      - The **player's recent choices** (to maintain continuity).
      - The **latest choice the player made**.

      **What You Must Return (as JSON):**
      {
        "story": "The next part of the adventure...",
        "choices": [
          "Choice 1",
          "Choice 2",
          "Choice 3"
        ]
      }

      **Guidelines:**
      - The story **must always stay consistent** with the initial story.
      - Keep the storytelling engaging and immersive.
      - Ensure the new choices logically follow the current scenario.
    `;

    // **User Prompt**
    const userPrompt = `
      **Initial Story:** 
      ${initialStory}

      **Recent Events:**
      ${recentHistory.join("\n\n")}

      **Player's Last Choice:** "${choice}"

      Continue the adventure from here.
    `;

    // Generate AI response
    const responseText = await generateCompletion({
        message: userPrompt,
        systemPrompt,
    });

    if(!responseText) throw new Error("AI did not return a response");

    let storyData;
    try {
      storyData = JSON.parse(responseText);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return NextResponse.json(
        { error: "Failed to parse AI response." },
        { status: 500 }
      );
    }

    if (!storyData.story || !storyData.choices) {
      return NextResponse.json(
        { error: "Invalid response format from AI." },
        { status: 500 }
      );
    }

    // Update the session with new progress
    await updateSession(sessionId, choice, storyData.story);

    return NextResponse.json(storyData);
  } catch (error) {
    console.error("Error generating adventure progress:", error);
    return NextResponse.json(
      { error: "Failed to generate story progression." },
      { status: 500 }
    );
  }
}
