/**
 * Intelligent AI Agent for Honeypot Scam Detection
 * Generates dynamic, context-aware responses based on conversation analysis
 */

import { generateSmartResponse } from './smart.responses.js';
import { generateGrokResponse, isGrokAvailable } from './grok.agent.js';

// Generate dynamic response based on conversation phase
export async function generateIntelligentResponse(message, conversationHistory = []) {
    const lower = message.toLowerCase();
    const conversationLength = conversationHistory.length;
    
    // Detect scam type
    const scamType = detectScamType(lower);
    
    // Generate unique session ID from conversation history
    const sessionId = conversationHistory.length > 0 
        ? JSON.stringify(conversationHistory.slice(0, 2)).substring(0, 20)
        : 'new-session';
    
    // Try smart context-aware response first (our 300+ variations)
    const smartResponse = generateSmartResponse(message, scamType, conversationLength, sessionId, conversationHistory);
    
    // If smart response is generic/fallback AND Grok is available, use Grok AI
    const genericResponses = [
        "I'm listening. What should I do?",
        "Can you explain that again?",
        "Okay, I'm ready. What's next?",
        "Tell me what I need to do."
    ];
    
    const isGenericResponse = genericResponses.some(generic => 
        smartResponse.includes(generic.substring(0, 20))
    );
    
    // Use Grok AI for truly random/unknown scam types
    if (isGenericResponse && isGrokAvailable()) {
        console.log(`🤖 Using Grok AI for unknown scam pattern`);
        try {
            const grokResponse = await generateGrokResponse(message, conversationHistory);
            if (grokResponse) {
                return grokResponse;
            }
        } catch (error) {
            console.log(`⚠️ Grok AI failed, using smart response: ${error.message}`);
        }
    }
    
    return smartResponse;
}

// Detect scam type
function detectScamType(message) {
    if (/kyc|paytm|phonepe/.test(message)) return 'kyc_scam';
    if (/fedex|courier|parcel/.test(message)) return 'fedex_scam';
    if (/police|cbi|arrest/.test(message)) return 'digital_arrest';
    if (/electricity|power/.test(message)) return 'electricity_scam';
    if (/job|work.*home|earn/.test(message)) return 'job_scam';
    if (/won|lottery|prize/.test(message)) return 'lottery_scam';
    if (/tax|refund/.test(message)) return 'tax_refund';
    return 'generic_scam';
}

// Generate agent notes for callback
export function generateAgentNotes(conversationHistory, intelligence, metadata) {
    const tactics = [];
    
    // Analyze conversation for tactics
    const allText = conversationHistory.map(msg => msg.text).join(' ').toLowerCase();
    
    if (/urgent|immediate|now/.test(allText)) tactics.push('urgency tactics');
    if (/block|suspend|freeze/.test(allText)) tactics.push('account threats');
    if (/upi|bank|payment/.test(allText)) tactics.push('payment redirection');
    if (/otp|password|pin/.test(allText)) tactics.push('credential theft');
    if (/won|prize|lottery/.test(allText)) tactics.push('prize scam');
    
    let notes = `Scammer used ${tactics.join(', ') || 'various tactics'}. `;
    
    if (intelligence.upiIds.length > 0) {
        notes += `Attempted to extract UPI ID. `;
    }
    if (intelligence.phoneNumbers.length > 0) {
        notes += `Provided phone number for contact. `;
    }
    if (intelligence.phishingLinks.length > 0) {
        notes += `Shared suspicious links. `;
    }
    
    notes += `Total ${conversationHistory.length} messages exchanged.`;
    
    return notes;
}
