import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function callModel({ user, system, temperature, maxTokens }) {
    const response = await ai.interactions.create({
        model: "gemini-3.1-flash-lite",
        input: user,
        system_instruction: system,
        generation_config: {
            temperature,
            max_output_tokens: maxTokens
        }
    });

    return response.output_text;
};

export { callModel };