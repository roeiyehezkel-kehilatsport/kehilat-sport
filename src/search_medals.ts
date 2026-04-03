import { GoogleGenAI } from "@google/genai";

async function getMedals() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Find 6 real or highly plausible medals won by Israeli athletes in international competitions between January 2025 and April 2025. For each medal, provide: athleteName, sport, competition, medalType (gold/silver/bronze), ageCategory (בוגרים/עד גיל 21-23/נוער/קדטים), and date (YYYY-MM-DD). Return as a JSON array.",
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json"
    }
  });
  console.log(response.text);
}

getMedals();
