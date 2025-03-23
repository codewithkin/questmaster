const sessionStore = new Map<string, { history: string[] }>();

export async function getSession(sessionId: string) {
  return sessionStore.get(sessionId) || { history: [] };
}

export async function updateSession(
  sessionId: string,
  choice: string,
  newStory: string,
) {
  const session = sessionStore.get(sessionId) || { history: [] };
  session.history.push(`You chose: "${choice}"`);
  session.history.push(newStory);

  // Keep only the last 5 entries to reduce cost
  session.history = session.history.slice(-5);

  sessionStore.set(sessionId, session);
}
