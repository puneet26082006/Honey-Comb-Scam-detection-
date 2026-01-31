// src/utils/formatter.js

export const formatFinalResponse = (conversation) => {
    return {
        report_id: conversation.id,
        status: "COMPLETED",
        scam_intelligence: {
            is_scam: true,
            risk_level: "HIGH",
            extracted_data: conversation.extracted_data
        },
        conversation_log: conversation.history.map(msg => ({
            sender: msg.role === "user" ? "Scammer" : "Honeypot Agent",
            message: msg.text,
            timestamp: new Date().toISOString() // In real app, store actual time
        })),
        meta: {
            agent_version: "1.0.0",
            model_used: "Gemini-1.5-Flash"
        }
    };
};