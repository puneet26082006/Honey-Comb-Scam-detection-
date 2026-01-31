// src/routes/message.routes.js
import express from "express";
import { checkKeywords } from "../utils/keywordDetector.js";
import { classifyMessage } from "../agents/classifier.agent.js";
import { generateReply } from "../agents/persona.agent.js";
import { getConversation, updateConversation, saveExtractedData } from "../state/conversation.store.js";
import { extractEntities } from "../extractors/entity.extractor.js";
import { formatFinalResponse } from "../utils/formatter.js"; // Import Formatter

const router = express.Router();

router.post("/message", async (req, res) => {
    try {
        const { sender_id, message } = req.body;
        const conversation = getConversation(sender_id);

        // 1. EXTRACT DATA
        const newEntities = extractEntities(message);
        const currentExtractedData = saveExtractedData(sender_id, newEntities);

        // 2. CHECK TERMINATION CONDITIONS (Did we win?)
        // If we have UPI or Bank Account, OR history is too long ( > 10 turns)
        const hasCriticalData = currentExtractedData.upi.length > 0 || currentExtractedData.bank_account.length > 0;
        const isConversationTooLong = conversation.history.length >= 10;

        if (hasCriticalData || isConversationTooLong) {
            // We caught them! Send a final "Goodbye" and the full report.
            
            // Optional: Send one last "fake" success message
            const finalReply = "Okay, I have sent the details to my nephew to process. Thank you.";
            updateConversation(sender_id, message, "user");
            updateConversation(sender_id, finalReply, "model");

            return res.json({
                status: "mission_complete",
                final_action: "REPORT_GENERATED",
                reply: finalReply,
                report: formatFinalResponse(conversation) // <--- The JSON Judges want
            });
        }

        // 3. NORMAL SCAM DETECTION (If not terminated yet)
        let isScam = conversation.status === "SCAM_DETECTED";
        if (!isScam) {
            const hasKeywords = checkKeywords(message);
            const hasSuspiciousEntities = newEntities.upi.length > 0 || newEntities.links.length > 0;
            
            if (hasKeywords || hasSuspiciousEntities) {
                isScam = true;
                conversation.status = "SCAM_DETECTED";
            } else {
                const aiVerdict = await classifyMessage(message);
                if (aiVerdict === "SCAM" || aiVerdict === "SUSPICIOUS") {
                    isScam = true;
                    conversation.status = "SCAM_DETECTED";
                }
            }
        }

        // 4. GENERATE REPLY
        let reply = null;
        if (isScam) {
            updateConversation(sender_id, message, "user");
            reply = await generateReply(sender_id, message, conversation.history);
            updateConversation(sender_id, reply, "model");
        }

        res.json({
            status: "active",
            is_scam: isScam,
            reply: reply || "No reply needed",
            extracted_now: newEntities
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;