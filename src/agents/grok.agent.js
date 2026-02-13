/**
 * Groq AI Agent Integration (using Llama models)
 * Fallback AI for handling unknown/random scam types
 */

// 1. PLACE KEY HERE: Priority is given to Environment Variables, falling back to your hardcoded key.
const GROQ_API_KEY = process.env.GROK_API_KEY || process.env.GROQ_API_KEY || 'YOUR_KEY_HERE'; 
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Generate response using Groq AI (Llama 3)
 * @param {string} message - The scam message
 * @param {Array} conversationHistory - Previous messages
 * @returns {Promise<string>} - AI-generated response
 */
export async function generateGrokResponse(message, conversationHistory = []) {
    // 2. FIXED VALIDATION: Checks if key is missing or still set to a placeholder
    if (!GROQ_API_KEY || GROQ_API_KEY.length < 20 || GROQ_API_KEY === 'YOUR_KEY_HERE') {
        console.log('⚠️ Groq API key not configured');
        return null;
    }
    
    try {
        // Build conversation context
        const messages = [
            {
                role: 'system',
                content: `You are a potential scam victim responding to a scammer. Your goal is to:
1. Act confused, concerned, or interested (depending on the scam type)
2. Ask clarifying questions to keep the scammer engaged
3. Show gradual trust as the conversation progresses
4. NEVER reveal you know it's a scam
5. Keep responses short (1-2 sentences, max 30 words)
6. Sound like a real person, not an AI
7. Show appropriate emotions (worry, excitement, confusion)
8. Be willing to comply but ask for details first

Conversation phase guidelines:
- Early messages (1-3): Show confusion, concern, or interest. Ask basic questions.
- Middle messages (4-7): Show growing trust. Ask about process/details.
- Later messages (8+): Show readiness to comply. Ask for final instructions.

Respond naturally as a potential victim would. Keep it brief and human-like.`
            }
        ];
        
        // Add conversation history
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
        
        console.log(`🤖 Calling Groq AI (Llama 3) for response...`);
        
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: messages,
                temperature: 0.8,
                max_tokens: 100,
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
            console.log(`✅ Groq AI response generated: ${reply.substring(0, 50)}...`);
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
    const key = GROQ_API_KEY;
    // Check if key exists and is not a placeholder
    return key && 
           key !== 'YOUR_KEY_HERE' && 
           key !== 'your_grok_api_key_here' && 
           key !== 'your_groq_api_key_here' &&
           key.length > 20;
}
