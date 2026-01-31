import express from "express";
import dotenv from "dotenv";
import messageRoutes from "./routes/message.routes.js";
import path from "path";
import { fileURLToPath } from "url";

// --- FIX STARTS HERE ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force dotenv to look in the parent directory (ROOT folder)
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// --- FIX ENDS HERE ---

const app = express();
const PORT = process.env.PORT || 3000;

// Debug line to confirm it works now
console.log("DEBUG: API Key Status:", process.env.GEMINI_API_KEY ? "Loaded ✅" : "Still Missing ❌");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", messageRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});