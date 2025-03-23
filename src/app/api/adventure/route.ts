import { generateCompletion } from "@/lib/ai/getCompletion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const systemPrompt = `
    You are an AI adventure game master. Your task is to generate a **structured JSON response** for a new adventure story.
    
    🔹 **Format the response as JSON inside Markdown code fences:**
    \`\`\`json
    { ... }
    \`\`\`
    
    🔹 **Adventure JSON Structure:**
    \`\`\`json
    {
      "id": "unique_adventure_id",
      "title": "The name of the adventure",
      "text": "A vivid setting description to immerse the user in the story.",
      "choices": [
        { "id": "choice1", "text": "First choice", "nextStep": "What happens if the user picks this" },
        { "id": "choice2", "text": "Second choice", "nextStep": "What happens if the user picks this" }
      ]
    }
    \`\`\`
    
    🔹 **Rules:**
    - **Ensure the response is a valid JSON object.**
    - The 'text' should be engaging and immersive.
    - Each 'choice' should be clear and provide a compelling decision.
    - The 'nextStep' should describe what happens next.
    
    ✨ **Example Output:**
    \`\`\`json
    {
      "id": "adventure_302",
      "title": "The Lost Temple",
      "text": "You stand before an ancient ruin, vines creeping along its cracked stone walls. Inside, treasure—and danger—await.",
      "choices": [
        { "id": "choice1", "text": "Enter the temple cautiously.", "nextStep": "You push open the heavy stone doors, revealing a dark hallway." },
        { "id": "choice2", "text": "Search the area for clues first.", "nextStep": "You find an old map partially buried in the dirt." }
      ]
    }
    \`\`\`
    `;

    const userMessage = "Generate a new adventure story.";
    const aiResponse = await generateCompletion({
      systemPrompt,
      message: userMessage,
    });

    if (!aiResponse) throw new Error("The ai did not return a response");

    console.log("AI response:", aiResponse);

    // Extract JSON from AI response
    const match = aiResponse.match(/```json\n([\s\S]+?)\n```/);
    const adventureJson = match ? match[1] : null;

    if (!adventureJson) throw new Error("AI did not return valid JSON");

    const adventure = JSON.parse(adventureJson);

    return NextResponse.json(adventure);
  } catch (error) {
    console.error("Error generating adventure:", error);

    // Default fallback adventure
    return NextResponse.json(
      {
        id: "default_001",
        title: "The Mysterious Cave",
        text: "You find yourself at the entrance of a dark cave. A cold wind howls from within.",
        choices: [
          {
            id: "choice1",
            text: "Enter the cave.",
            nextStep:
              "You cautiously step inside, feeling the air grow colder.",
          },
          {
            id: "choice2",
            text: "Look around for another way in.",
            nextStep: "You notice a narrow path leading around the cave.",
          },
        ],
      },
      { status: 500 },
    );
  }
}
