/**
 * Intelligent AI Agent for Honeypot Scam Detection
 * Primary: Groq AI with comprehensive scam training
 * Fallback: Smart pattern-based responses
 */

import { generateSmartResponse } from './smart.responses.js';
import { generateGrokResponse, isGrokAvailable } from './grok.agent.js';

/**
 * Generate intelligent response - Groq AI first, pattern-based fallback
 */
export async function generateIntelligentResponse(message, conversationHistory = []) {
    const conversationLength = conversationHistory.length;
    
    // PRIORITY 1: Try Groq AI (our primary intelligence)
    if (isGrokAvailable()) {
        console.log(`🤖 Using Groq AI as primary intelligence`);
        try {
            const grokResponse = await generateGrokResponse(message, conversationHistory);
            if (grokResponse && grokResponse.length > 10) {
                return grokResponse;
            }
            console.log(`⚠️ Groq AI returned empty/short response, using fallback`);
        } catch (error) {
            console.log(`⚠️ Groq AI failed: ${error.message}, using fallback`);
        }
    } else {
        console.log(`⚠️ Groq AI not available, using pattern-based fallback`);
    }
    
    // FALLBACK: Pattern-based smart responses
    const lower = message.toLowerCase();
    const scamType = detectScamType(lower);
    const sessionId = conversationHistory.length > 0 
        ? JSON.stringify(conversationHistory.slice(0, 2)).substring(0, 20)
        : 'new-session';
    
    return generateSmartResponse(message, scamType, conversationLength, sessionId, conversationHistory);
}

/**
 * Detect scam type for fallback system
 */
function detectScamType(message) {
    if (/kyc|paytm|phonepe|wallet|gpay/.test(message)) return 'kyc_scam';
    if (/fedex|courier|parcel|package|customs/.test(message)) return 'fedex_scam';
    if (/police|cbi|arrest|legal|court|warrant/.test(message)) return 'digital_arrest';
    if (/electricity|power|bill|disconnect/.test(message)) return 'electricity_scam';
    if (/job|work.*home|earn|income|youtube|like|data entry/.test(message)) return 'job_scam';
    if (/won|lottery|prize|congratulations|lucky draw|kbc/.test(message)) return 'lottery_scam';
    if (/tax|refund|income tax|gst/.test(message)) return 'tax_refund';
    if (/invest|trading|crypto|bitcoin|returns|profit/.test(message)) return 'investment_scam';
    if (/bank|account|block|suspend|freeze/.test(message)) return 'bank_scam';
    if (/challan|fine|traffic|violation/.test(message)) return 'traffic_scam';
    return 'generic_scam';
}

/**
 * Generate agent notes for callback
 */
export function generateAgentNotes(conversationHistory, intelligence) {
    const tactics = [];
    
    const allText = conversationHistory.map(msg => msg.text).join(' ').toLowerCase();
    
    if (/urgent|immediate|now|quickly/.test(allText)) tactics.push('urgency tactics');
    if (/block|suspend|freeze|locked/.test(allText)) tactics.push('account threats');
    if (/upi|bank|payment|transfer/.test(allText)) tactics.push('payment redirection');
    if (/otp|password|pin|cvv/.test(allText)) tactics.push('credential theft');
    if (/won|prize|lottery/.test(allText)) tactics.push('prize scam');
    if (/job|earn|work/.test(allText)) tactics.push('job scam');
    if (/police|arrest|legal/.test(allText)) tactics.push('authority impersonation');
    
    let notes = `Scammer used ${tactics.join(', ') || 'various tactics'}. `;
    
    if (intelligence.upiIds.length > 0) {
        notes += `Extracted ${intelligence.upiIds.length} UPI ID(s). `;
    }
    if (intelligence.phoneNumbers.length > 0) {
        notes += `Captured ${intelligence.phoneNumbers.length} phone number(s). `;
    }
    if (intelligence.bankAccounts.length > 0) {
        notes += `Obtained ${intelligence.bankAccounts.length} bank account(s). `;
    }
    if (intelligence.phishingLinks.length > 0) {
        notes += `Identified ${intelligence.phishingLinks.length} suspicious link(s). `;
    }
    
    notes += `Total ${conversationHistory.length} messages exchanged. Honeypot successfully engaged scammer.`;
    
    return notes;
}
