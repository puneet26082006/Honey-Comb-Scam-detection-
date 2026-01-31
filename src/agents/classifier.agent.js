// src/agents/classifier.agent.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";               // <--- Add this
import { fileURLToPath } from "url";   // <--- Add this

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") }); // <--- Ensure .env loads here too

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const classifyMessage = async (message) => {
    try {
        const prompt = `
        You are a cybersecurity expert. Analyze the following message.
        Determine if it is "SCAM", "SAFE", or "SUSPICIOUS".
        
        Message: "${message}"
        
        Rules:
        1. "SCAM": Phishing, lottery, urgent money requests, fake KYC.
        2. "SAFE": Normal greetings, clear business queries.
        3. "SUSPICIOUS": Vague requests for personal info.
        
        Reply with ONLY one word: SCAM, SAFE, or SUSPICIOUS.
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text().trim().toUpperCase();

        return text; 
    } catch (error) {
        console.error("AI Classification Error:", error);
        return "UNKNOWN"; 
    }
};