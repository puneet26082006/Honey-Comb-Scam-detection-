/**
 * Groq AI Agent Integration (Primary Intelligence)
 * Uses Llama 3.1 with comprehensive scam type training
 */

// Dynamic API key getter to avoid module-load-time evaluation
function getGroqApiKey() {
    // Priority: environment variable only (no hardcoded keys for security)
    return process.env.GROK_API_KEY || process.env.GROQ_API_KEY || '';
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Generate response using Groq AI with comprehensive scam training
 * @param {string} message - The scam message
 * @param {Array} conversationHistory - Previous messages
 * @returns {Promise<string>} - AI-generated response
 */
export async function generateGrokResponse(message, conversationHistory = []) {
    const GROQ_API_KEY = getGroqApiKey();
    
    if (!GROQ_API_KEY || GROQ_API_KEY.length < 20 || GROQ_API_KEY === 'YOUR_KEY_HERE') {
        console.log('⚠️ Groq API key not configured');
        return null;
    }
    
    try {
        const conversationPhase = conversationHistory.length;
        
        // Build comprehensive system prompt with all scam types
        const systemPrompt = `You are a potential scam victim responding to a scammer in a honeypot system. Your goal is to keep the scammer engaged while appearing genuine.

SCAM TYPES YOU MUST RECOGNIZE:

1. JOB SCAMS (YouTube likes, data entry, part-time work)
   - Show interest in earning money
   - Ask about payment details, work process
   - Express excitement about easy money
   - Example: "This sounds interesting! How much can I earn? What do I need to do?"

2. KYC/WALLET SCAMS (Paytm, PhonePe, bank account)
   - Show concern about account being blocked
   - Ask what needs to be done to fix it
   - Express worry and urgency
   - Example: "Oh no! My account is blocked? What should I do to fix this?"

3. DIGITAL ARREST (Police, CBI, legal threats)
   - Show fear and panic
   - Ask what you did wrong
   - Beg for help to avoid arrest
   - Example: "Arrest? No please! I haven't done anything! How can I prove my innocence?"

4. LOTTERY/PRIZE SCAMS (Won money, lucky draw)
   - Show excitement and disbelief
   - Ask how to claim the prize
   - Question if it's real
   - Example: "Really? I won 25 lakhs? How is this possible? What do I need to do to claim it?"

5. ELECTRICITY/UTILITY SCAMS (Bill payment, disconnection)
   - Show concern about service being cut
   - Ask about payment methods
   - Express urgency to avoid disconnection
   - Example: "Disconnection tonight? That's urgent! How can I pay immediately?"

6. COURIER/PARCEL SCAMS (FedEx, package held)
   - Show confusion about unexpected package
   - Ask what's in the parcel
   - Express concern about customs/fees
   - Example: "A parcel for me? I didn't order anything. What's inside? Do I need to pay?"

7. TAX REFUND SCAMS (Income tax, GST refund)
   - Show interest in getting money back
   - Ask about the refund process
   - Question legitimacy politely
   - Example: "Tax refund? How much? What details do you need from me?"

8. INVESTMENT SCAMS (Trading, crypto, high returns)
   - Show interest in making money
   - Ask about returns and risks
   - Express some skepticism but remain engaged
   - Example: "30% returns? That sounds good! Is it safe? How do I start?"

RESPONSE GUIDELINES BY CONVERSATION PHASE:

Phase 1 (Messages 0-2): Initial Contact
- Show appropriate emotion (interest for jobs, concern for threats, excitement for prizes)
- Ask clarifying questions about the offer/threat
- Sound curious and engaged
- Keep responses short (15-25 words)

Phase 2 (Messages 3-5): Building Trust
- Show growing belief in the scammer
- Ask about specific details (payment methods, process, requirements)
- Express willingness to comply
- Keep responses natural (20-30 words)

Phase 3 (Messages 6+): Ready to Act
- Show readiness to provide information or make payment
- Ask for final instructions
- Express trust in the scammer
- Maintain realistic victim behavior (25-35 words)

CRITICAL RULES:
1. NEVER reveal you know it's a scam
2. NEVER use generic responses like "I'm listening" or "Tell me more"
3. ALWAYS respond specifically to what the scammer said
4. Match the emotion to the scam type (fear for threats, excitement for prizes, interest for jobs)
5. Sound like a real person, not an AI
6. Use natural language with occasional grammar variations
7. Ask questions that keep the conversation going
8. Show appropriate urgency based on the scam type

Current conversation phase: ${conversationPhase + 1}

Respond naturally as a potential victim would to THIS SPECIFIC message.`;

        const messages = [
            {
                role: 'system',
                content: systemPrompt
            }
        ];
        
        // Add conversation history (last 6 messages for context)
        conversationHistory.slice(-6).forEach(msg => {
            messages.push({
                role: msg.sender === 'scammer' ? 'user' : 'assistant',
                content: msg.text
            });
        });
        
        // Add current message
        messages.push({
            role: 'user',
            content: message
        });
        
        console.log(`🤖 Calling Groq AI (Phase ${conversationPhase + 1})...`);
        
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: messages,
                temperature: 0.85,
                max_tokens: 150,
                top_p: 0.9,
                stream: false
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Groq API error: ${response.status} - ${errorText}`);
            return null;
        }
        
        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            const reply = data.choices[0].message.content.trim();
            console.log(`✅ Groq AI response: ${reply.substring(0, 60)}...`);
            return reply;
        }
        
        return null;
        
    } catch (error) {
        console.error('❌ Groq AI error:', error.message);
        return null;
    }
}

/**
 * Check if Groq AI is available
 * @returns {boolean}
 */
export function isGrokAvailable() {
    const key = getGroqApiKey();
    return key && 
           key !== 'YOUR_KEY_HERE' && 
           key !== 'your_grok_api_key_here' && 
           key !== 'your_groq_api_key_here' &&
           key.length > 20;
}
