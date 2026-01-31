// src/agents/persona.agent.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { PERSONA_PROMPT } from "./persona.prompt.js";
import path from "path";
import { fileURLToPath } from "url";

// --- FIX START: FORCE LOAD .ENV FROM ROOT ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up 2 levels: agents -> src -> root
dotenv.config({ path: path.resolve(__dirname, "../../.env") }); 
// --- FIX END ---

// Debug line: Check if key is actually here now
console.log("DEBUG (Agent): Key loaded?", process.env.GEMINI_API_KEY ? "YES" : "NO");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateReply = async (senderId, message, history) => {
    try {
        let promptContext = `${PERSONA_PROMPT}\n\nHere is the conversation so far:\n`;
        
        history.forEach(msg => {
            const label = msg.role === "user" ? "Scammer" : "Ramesh (You)";
            promptContext += `${label}: ${msg.text}\n`;
        });

        promptContext += `\nScammer: ${message}\nRamesh (You):`;

        const result = await model.generateContent(promptContext);
        const reply = result.response.text().trim();

        return reply;

    } catch (error) {
        console.error("Persona Generation Error:", error);
        return "Okay sir, please tell me what to do next?"; // Fallback
    }
};