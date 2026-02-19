/**
 * Entity Extractor - Extracts intelligence from conversation
 */

export const extractEntities = (text) => {
    const extracted = {
        upi: [],
        bank_account: [],
        links: [],
        phone: [],
        email: [],
        caseId: [],
        policyNumber: [],
        orderNumber: []
    };

    if (!text) return extracted;

    // UPI IDs (e.g., user@bank, name@paytm)
    const upiRegex = /[a-zA-Z0-9.\-_]+@[a-zA-Z]+/g;
    const upiMatches = text.match(upiRegex);
    if (upiMatches) {
        // Filter out email addresses (they have .com, .in, etc.)
        const upiOnly = upiMatches.filter(match => 
            !match.match(/\.(com|in|org|net|co|edu|gov)$/i)
        );
        extracted.upi = [...new Set(upiOnly)];
    }

    // Bank Accounts (9-18 digits)
    const bankRegex = /\b\d{9,18}\b/g;
    const bankMatches = text.match(bankRegex);
    if (bankMatches) extracted.bank_account = [...new Set(bankMatches)];

    // URLs (http/https)
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

    // Case IDs (e.g., CASE-12345, CBI-123, FIR-456, REF-789)
    const caseIdRegex = /\b(CASE|CBI|FIR|REF|ID|TICKET|COMPLAINT)[\-\s]?[A-Z0-9]{3,15}\b/gi;
    const caseIdMatches = text.match(caseIdRegex);
    if (caseIdMatches) extracted.caseId = [...new Set(caseIdMatches)];

    // Policy Numbers (e.g., POL-123456, POLICY-789, LIC-456)
    const policyRegex = /\b(POL|POLICY|LIC|INS)[\-\s]?[A-Z0-9]{5,15}\b/gi;
    const policyMatches = text.match(policyRegex);
    if (policyMatches) extracted.policyNumber = [...new Set(policyMatches)];

    // Order Numbers (e.g., ORD-12345, ORDER-789, #123456)
    const orderRegex = /\b(ORD|ORDER|#)[\-\s]?[A-Z0-9]{4,15}\b/gi;
    const orderMatches = text.match(orderRegex);
    if (orderMatches) extracted.orderNumber = [...new Set(orderMatches)];

    return extracted;
};
