// src/extractors/entity.extractor.js

export const extractEntities = (text) => {
    const extracted = {
        upi: [],
        bank_account: [],
        links: [],
        phone: []
    };

    if (!text) return extracted;

    // 1. UPI Extraction (e.g., example@okicici, paytm-123@paytm)
    const upiRegex = /[a-zA-Z0-9.\-_]+@[a-zA-Z]+/g;
    const upiMatches = text.match(upiRegex);
    if (upiMatches) extracted.upi = [...new Set(upiMatches)]; // Remove duplicates

    // 2. Bank Account (Simple 9-18 digit sequence)
    // Note: This might catch regular large numbers, so we are careful.
    const bankRegex = /\b\d{9,18}\b/g;
    const bankMatches = text.match(bankRegex);
    if (bankMatches) extracted.bank_account = [...new Set(bankMatches)];

    // 3. Phishing Links (http/https)
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urlMatches = text.match(urlRegex);
    if (urlMatches) extracted.links = [...new Set(urlMatches)];

    // 4. Phone Numbers (India: +91 or 10 digits starting with 6-9)
    const phoneRegex = /(\+91[\-\s]?)?[6-9]\d{9}/g;
    const phoneMatches = text.match(phoneRegex);
    if (phoneMatches) extracted.phone = [...new Set(phoneMatches)];

    return extracted;
};