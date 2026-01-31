// src/utils/keywordDetector.js

const SCAM_KEYWORDS = [
    "kyc", "pan card", "blocked", "urgent", 
    "lottery", "winner", "click here", "refund", 
    "bank account", "password", "otp"
];

export const checkKeywords = (message) => {
    const lowerMsg = message.toLowerCase();
    // Returns true if ANY keyword is found
    return SCAM_KEYWORDS.some(keyword => lowerMsg.includes(keyword));
};