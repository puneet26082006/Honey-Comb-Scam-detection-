import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import express from 'express';
import cors from 'cors';
import { extractEntities } from '../src/extractors/entity.extractor.js';
import { generateGroqResponse, isGroqAvailable } from '../src/agents/groq.agent.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const HACKATHON_API_KEY = "HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA";
const GUVI_CALLBACK_URL = "https://hackathon.guvi.in/api/updateHoneyPotFinalResult";

// Session storage
const sessionData = new Map();

function getSessionData(sessionId) {
    if (!sessionData.has(sessionId)) {
        sessionData.set(sessionId, {
            conversationHistory: [],
            intelligence: {
                phoneNumbers: [],
                bankAccounts: [],
                upiIds: [],
                phishingLinks: [],
                emailAddresses: []
            },
            scamDetected: false,
            callbackSent: false,
            startTime: Date.now()
        });
    }
    return sessionData.get(sessionId);
}

function validateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
        return res.status(401).json({
            error: "Missing x-api-key header"
        });
    }
    
    if (apiKey !== HACKATHON_API_KEY) {
        return res.status(403).json({
            error: "Invalid API key"
        });
    }
    
    next();
}

function updateIntelligence(sessionId, extracted) {
    const session = getSessionData(sessionId);
    const intel = session.intelligence;
    
    if (extracted.phone && extracted.phone.length > 0) {
        intel.phoneNumbers = [...new Set([...intel.phoneNumbers, ...extracted.phone])];
    }
    if (extracted.bank_account && extracted.bank_account.length > 0) {
        intel.bankAccounts = [...new Set([...intel.bankAccounts, ...extracted.bank_account])];
    }
    if (extracted.upi && extracted.upi.length > 0) {
        intel.upiIds = [...new Set([...intel.upiIds, ...extracted.upi])];
    }
    if (extracted.links && extracted.links.length > 0) {
        intel.phishingLinks = [...new Set([...intel.phishingLinks, ...extracted.links])];
    }
    if (extracted.email && extracted.email.length > 0) {
        intel.emailAddresses = [...new Set([...intel.emailAddresses, ...extracted.email])];
    }
    
    return intel;
}

function generateAgentNotes(conversationHistory, intelligence) {
    const tactics = [];
    const allText = conversationHistory.map(msg => msg.text).join(' ').toLowerCase();
    
    if (/urgent|immediate|now|quickly/.test(allText)) tactics.push('urgency tactics');
    if (/block|suspend|freeze/.test(allText)) tactics.push('account threats');
    if (/upi|bank|payment/.test(allText)) tactics.push('payment redirection');
    if (/otp|password|pin|cvv/.test(allText)) tactics.push('credential theft');
    if (/won|prize|lottery/.test(allText)) tactics.push('prize scam');
    if (/job|earn|work/.test(allText)) tactics.push('job scam');
    if (/police|arrest|cbi/.test(allText)) tactics.push('authority impersonation');
    
    let notes = `Scammer used ${tactics.join(', ') || 'deceptive tactics'}. `;
    
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
        notes += `Identified ${intelligence.phishingLinks.length} phishing link(s). `;
    }
    
    notes += `Total ${conversationHistory.length} messages exchanged. Honeypot successfully engaged scammer.`;
    
    return notes;
}

async function sendFinalCallback(sessionId) {
    const session = getSessionData(sessionId);
    
    if (session.callbackSent) return;
    
    const engagementDuration = Math.floor((Date.now() - session.startTime) / 1000);
    
    const payload = {
        sessionId: sessionId,
        scamDetected: session.scamDetected,
        totalMessagesExchanged: session.conversationHistory.length,
        extractedIntelligence: session.intelligence,
        engagementMetrics: {
            engagementDurationSeconds: engagementDuration,
            totalMessages: session.conversationHistory.length
        },
        agentNotes: generateAgentNotes(session.conversationHistory, session.intelligence)
    };
    
    console.log(`📤 [${sessionId}] Sending final callback`);
    
    try {
        const response = await fetch(GUVI_CALLBACK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            console.log(`✅ [${sessionId}] Callback sent successfully`);
            session.callbackSent = true;
        } else {
            console.log(`⚠️ [${sessionId}] Callback failed: ${response.status}`);
        }
    } catch (error) {
        console.log(`❌ [${sessionId}] Callback error: ${error.message}`);
    }
}

// Main API endpoint
app.post('/api', validateApiKey, async (req, res) => {
    try {
        const { sessionId, message, conversationHistory = [] } = req.body;
        
        if (!sessionId || !message || !message.text) {
            return res.status(400).json({
                status: "error",
                reply: "Invalid request format"
            });
        }

        const incomingMessage = message.text;
        const sender = message.sender || "scammer";
        
        console.log(`📨 [${sessionId}] Message from ${sender}`);

        const session = getSessionData(sessionId);
        const effectiveHistory = conversationHistory.length > 0 ? conversationHistory : session.conversationHistory;

        // Scam detection
        const scamKeywords = [
            'police', 'cbi', 'arrest', 'fedex', 'parcel', 'kyc', 'paytm',
            'electricity', 'job', 'earn', 'lottery', 'won', 'prize',
            'tax', 'refund', 'urgent', 'block', 'suspend', 'verify',
            'payment', 'upi', 'bank', 'otp', 'password', 'phonepe', 'gpay'
        ];
        
        const isScam = scamKeywords.some(kw => incomingMessage.toLowerCase().includes(kw)) || effectiveHistory.length > 0;
        
        if (isScam) {
            session.scamDetected = true;
        }

        // Generate response using Groq AI
        let agentReply = "";
        
        if (isGroqAvailable()) {
            console.log(`🤖 [${sessionId}] Using Groq AI`);
            agentReply = await generateGroqResponse(incomingMessage, effectiveHistory);
        }
        
        if (!agentReply || agentReply.length < 5) {
            agentReply = "I'm not sure I understand. Can you explain more?";
        }

        // Extract intelligence
        const allMessages = [
            ...effectiveHistory.map(msg => msg.text),
            incomingMessage,
            agentReply
        ].join(' ');
        
        const extracted = extractEntities(allMessages);
        updateIntelligence(sessionId, extracted);
        
        // Update conversation history
        const updatedHistory = [
            ...effectiveHistory,
            { sender: sender, text: incomingMessage, timestamp: message.timestamp || Date.now() },
            { sender: "user", text: agentReply, timestamp: Date.now() }
        ];
        
        session.conversationHistory = updatedHistory;
        
        // Send callback after sufficient engagement
        const hasIntelligence = 
            session.intelligence.phoneNumbers.length > 0 ||
            session.intelligence.bankAccounts.length > 0 ||
            session.intelligence.upiIds.length > 0 ||
            session.intelligence.phishingLinks.length > 0;
        
        if (session.scamDetected && updatedHistory.length >= 6 && hasIntelligence && !session.callbackSent) {
            sendFinalCallback(sessionId).catch(err => console.log(`❌ Callback error: ${err.message}`));
        }

        res.json({
            status: "success",
            reply: agentReply
        });

    } catch (error) {
        console.error("❌ API error:", error);
        res.status(500).json({
            status: "error",
            reply: "Processing error occurred"
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        groqAvailable: isGroqAvailable()
    });
});

// Root
app.all('/', (req, res) => {
    res.json({
        message: "Honey-Pot Scam Detection API",
        status: "operational"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
    console.log(`🤖 Groq AI: ${isGroqAvailable() ? 'Available' : 'Not configured'}`);
});

export default app;
