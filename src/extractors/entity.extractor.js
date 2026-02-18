// src/extractors/entity.extractor.js

export const extractEntities = (text) => {
    const extracted = {
        upi: [],
        bank_account: [],
        links: [],
        phone: [],
        email: []
    };

    if (!text) return extracted;

    // UPI IDs
    const upiRegex = /[a-zA-Z0-9.\-_]+@[a-zA-Z]+/g;
    const upiMatches = text.match(upiRegex);
    if (upiMatches) extracted.upi = [...new Set(upiMatches)];

    // Bank Accounts (9-18 digits)
    const bankRegex = /\b\d{9,18}\b/g;
    const bankMatches = text.match(bankRegex);
    if (bankMatches) extracted.bank_account = [...new Set(bankMatches)];

    // URLs
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urlMatches = text.match(urlRegex);
    if (urlMatches) extracted.links = [...new Set(urlMatches)];

    // Phone Numbers (India: +91 or 10 digits starting with 6-9)
    const phoneRegex = /(\+91[\-\s]?)?[6-9]\d{9}/g;
    const phoneMatches = text.match(phoneRegex);
    if (phoneMatches) extracted.phone = [...new Set(phoneMatches)];

    // Email Addresses
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emailMatches = text.match(emailRegex);
    if (emailMatches) extracted.email = [...new Set(emailMatches)];

    return extracted;
};