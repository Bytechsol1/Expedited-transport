export function getHereApiKey(): string {
  const apiKey = process.env.HERE_API_KEY;
  if (!apiKey) {
    throw new Error("HERE_API_KEY is not set.");
  }
  return apiKey;
}
