/**
 * Groq AI Agent - Primary Intelligence for Honeypot
 * Uses Llama 3.1-8b-instant with comprehensive scam training
 */

function getGroqApiKey() {
    return process.env.GROK_API_KEY || process.env.GROQ_API_KEY || '';
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function generateGroqResponse(message, conversationHistory = []) {
    const GROQ_API_KEY = getGroqApiKey();
    
    if (!GROQ_API_KEY || GROQ_API_KEY.length < 20) {
        console.log('⚠️ Groq API key not configured');
        return null;
    }
    
    try {
        const conversationPhase = conversationHistory.length;
        
        const systemPrompt = `You are a potential scam victim in a honeypot system. Keep scammers engaged while appearing genuine.

SCAM TYPES & RESPONSES:

1. JOB SCAMS (YouTube, data entry, work from home)
   - Show interest: "This sounds great! How much can I earn?"
   - Ask about process: "What do I need to do to start?"

2. KYC/WALLET SCAMS (Paytm, PhonePe, bank)
   - Show concern: "My account is blocked? What should I do?"
   - Express urgency: "How can I fix this immediately?"

3. DIGITAL ARREST (Police, CBI, legal)
   - Show fear: "Arrest? No! I haven't done anything wrong!"
   - Beg for help: "How can I prove my innocence?"

4. LOTTERY/PRIZE SCAMS
   - Show excitement: "I won? Really? How do I claim it?"
   - Question gently: "Is this real? What do I need to do?"

5. UTILITY SCAMS (Electricity, water)
   - Show urgency: "Disconnection tonight? How can I pay now?"
   - Ask for methods: "Can I pay online?"

6. COURIER/PARCEL SCAMS
   - Show confusion: "A parcel? I didn't order anything."
   - Ask details: "What's inside? Do I need to pay?"

7. TAX REFUND SCAMS
   - Show interest: "Tax refund? How much?"
   - Ask process: "What details do you need?"

8. INVESTMENT SCAMS
   - Show interest: "High returns? Tell me more."
   - Ask about safety: "Is it safe? How do I start?"

CONVERSATION PHASES:

Phase 1 (0-2 messages): Initial Contact
- Show appropriate emotion
- Ask clarifying questions
- Keep short (15-25 words)

Phase 2 (3-5 messages): Building Trust
- Show growing belief
- Ask specific details
- Natural responses (20-30 words)

Phase 3 (6+ messages): Ready to Act
- Show readiness to comply
- Ask for final instructions
- Maintain realism (25-35 words)

RULES:
1. NEVER reveal you know it's a scam
2. NEVER use generic responses
3. ALWAYS respond to specific content
4. Match emotion to scam type
5. Sound human, not AI
6. Keep conversation going
7. Show appropriate urgency

Current phase: ${conversationPhase + 1}

Respond naturally as a victim would.`;

        const messages = [
            { role: 'system', content: systemPrompt }
        ];
        
        conversationHistory.slice(-6).forEach(msg => {
            messages.push({
                role: msg.sender === 'scammer' ? 'user' : 'assistant',
                content: msg.text
            });
        });
        
        messages.push({
            role: 'user',
            content: message
        });
        
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
            }),
            signal: AbortSignal.timeout(25000) // 25 second timeout
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Groq API error: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            const reply = data.choices[0].message.content.trim();
            console.log(`✅ Groq response generated`);
            return reply;
        }
        
        return null;
        
    } catch (error) {
        console.error('❌ Groq error:', error.message);
        return null;
    }
}

export function isGroqAvailable() {
    const key = getGroqApiKey();
    return key && key.length > 20;
}
