import { NextResponse } from "next/server";
import { generateCompletion } from "@/lib/ai/getCompletion";
import { getSession, updateSession } from "@/lib/sessionManager";

export async function POST(req: Request) {
  try {
    const { choice, sessionId, initialStory } = await req.json();
    if (!choice || !sessionId || !initialStory) {
      return NextResponse.json(
        {
          error:
            "Invalid request. 'choice', 'sessionId', and 'initialStory' are required.",
        },
        { status: 400 },
      );
    }

    // Get the player's session history
    const sessionData = await getSession(sessionId);
    const recentHistory = sessionData ? sessionData.history.slice(-3) : [];

    // **System Prompt Update**
    const systemPrompt = `
    You are an advanced AI-powered text-based adventure game engine.

    ### **Your Role:**
    Your job is to **continue the adventure** based on the player's choices while ensuring logical flow, immersion, and consistency with the initial story.

    ---

    ### **What You Will Receive:**
    - The **initial story** (this sets the foundation of the adventure).
    - The **player's recent choices** (to maintain continuity).
    - The **latest choice the player made**.

    ---

    ### **How You Must Respond (STRICT JSON FORMAT):**
    You must always return a valid JSON object structured as follows:

    \`\`\`json
    {
      "story": "The next part of the adventure...",
      "choices": [
        "Choice 1",
        "Choice 2",
        "Choice 3"
      ]
    }
    \`\`\`

    ---

    ### **Strict Response Rules:**
    ✅ **DO:**  
    - Keep the **story logical, immersive, and engaging**.  
    - Ensure **new choices logically follow** the previous events.  
    - Stay **consistent with the initial story** and past choices.  
    - Use **descriptive storytelling** that immerses the player.  
    - If the adventure reaches a **natural ending**, return **an empty choices array** (\`"choices": []\`).

    ❌ **DO NOT:**  
    - **DO NOT** include Markdown (\`**\`, \`*\`, \`_\`, etc.) or any formatting.  
    - **DO NOT** add explanations, comments, or extra text—**only return valid JSON**.  
    - **DO NOT** break continuity or introduce inconsistencies in the adventure.  
    - **DO NOT** return empty or null choices unless the story has truly ended.  

    ---

    ### **Example Valid Response (Ongoing Adventure):**
    \`\`\`json
    {
      "story": "The narrow corridor opens into a vast, dimly lit chamber. Flickering torches line the walls, casting eerie shadows. A stone pedestal stands at the center, holding a golden artifact.",
      "choices": [
        "Examine the golden artifact closely.",
        "Look around the chamber for hidden dangers.",
        "Leave the chamber and explore another path."
      ]
    }
    \`\`\`

    ### **Example Valid Response (Story Ending):**
    \`\`\`json
    {
      "story": "With a final step through the portal, you find yourself back home. The adventure is over, but the memories will last forever.",
      "choices": []
    }
    \`\`\`

    ---

    ### **Important:**
    🚨 **If you fail to return strictly formatted JSON, your response will be rejected.** 🚨  
    Stick to the structured format at all times.  
    Now, continue the adventure! 🚀
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

    if (!responseText) throw new Error("AI did not return a response");

    let storyData;
    try {
      // Remove Markdown code block if present
      const cleanedResponseText = responseText
        .replace(/^```json\s*|```$/g, "")
        .trim();

      storyData = JSON.parse(cleanedResponseText);
    } catch (error) {
      console.log("Failed response: ", responseText);
      console.error("Error parsing AI response:", error);

      return NextResponse.json(
        { error: "Failed to parse AI response." },
        { status: 500 },
      );
    }

    if (!storyData.story || !storyData.choices) {
      return NextResponse.json(
        { error: "Invalid response format from AI." },
        { status: 500 },
      );
    }

    // Update the session with new progress
    await updateSession(sessionId, choice, storyData.story);

    return NextResponse.json(storyData);
  } catch (error) {
    console.error("Error generating adventure progress:", error);
    return NextResponse.json(
      { error: "Failed to generate story progression." },
      { status: 500 },
    );
  }
}

// To prevent timeouts and other errors in production
export const config = {
  api: {
    responseLimit: "8mb",
    bodyParser: { sizeLimit: "1mb" },
  },
};
