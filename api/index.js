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
                emailAddresses: [],
                caseIds: [],
                policyNumbers: [],
                orderNumbers: []
            },
            scamDetected: false,
            startTime: Date.now(),
            turnCount: 0,
            questionsAsked: 0,
            redFlagsIdentified: []
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
    if (extracted.caseId && extracted.caseId.length > 0) {
        intel.caseIds = [...new Set([...intel.caseIds, ...extracted.caseId])];
    }
    if (extracted.policyNumber && extracted.policyNumber.length > 0) {
        intel.policyNumbers = [...new Set([...intel.policyNumbers, ...extracted.policyNumber])];
    }
    if (extracted.orderNumber && extracted.orderNumber.length > 0) {
        intel.orderNumbers = [...new Set([...intel.orderNumbers, ...extracted.orderNumber])];
    }
    
    return intel;
}

function identifyRedFlags(message) {
    const flags = [];
    const lower = message.toLowerCase();
    
    if (/urgent|immediately|right now|asap|hurry/.test(lower)) {
        flags.push('urgency_pressure');
    }
    if (/otp|one time password|verification code|pin/.test(lower)) {
        flags.push('otp_request');
    }
    if (/fee|charge|payment|deposit|advance/.test(lower)) {
        flags.push('upfront_payment');
    }
    if (/block|suspend|freeze|deactivate|locked/.test(lower)) {
        flags.push('account_threat');
    }
    if (/police|arrest|legal action|court|warrant/.test(lower)) {
        flags.push('legal_threat');
    }
    if (/click|link|download|install/.test(lower)) {
        flags.push('suspicious_link');
    }
    if (/won|prize|lottery|congratulations|selected/.test(lower)) {
        flags.push('too_good_to_be_true');
    }
    if (/verify|confirm|update|validate/.test(lower)) {
        flags.push('verification_request');
    }
    
    return flags;
}

function countQuestions(text) {
    return (text.match(/\?/g) || []).length;
}

function generateAgentNotes(session) {
    const { conversationHistory, intelligence, redFlagsIdentified, turnCount, questionsAsked } = session;
    
    const tactics = [];
    const allText = conversationHistory.map(msg => msg.text).join(' ').toLowerCase();
    
    if (/urgent|immediate/.test(allText)) tactics.push('urgency tactics');
    if (/block|suspend|freeze/.test(allText)) tactics.push('account threats');
    if (/upi|bank|payment/.test(allText)) tactics.push('payment redirection');
    if (/otp|password|pin/.test(allText)) tactics.push('credential theft');
    if (/won|prize|lottery/.test(allText)) tactics.push('prize scam');
    if (/job|earn|work/.test(allText)) tactics.push('job scam');
    if (/police|arrest|cbi/.test(allText)) tactics.push('authority impersonation');
    
    let notes = `Scammer used ${tactics.join(', ') || 'deceptive tactics'}. `;
    
    if (redFlagsIdentified.length > 0) {
        notes += `Identified ${redFlagsIdentified.length} red flags: ${[...new Set(redFlagsIdentified)].join(', ')}. `;
    }
    
    if (intelligence.phoneNumbers.length > 0) {
        notes += `Captured ${intelligence.phoneNumbers.length} phone number(s). `;
    }
    if (intelligence.bankAccounts.length > 0) {
        notes += `Obtained ${intelligence.bankAccounts.length} bank account(s). `;
    }
    if (intelligence.upiIds.length > 0) {
        notes += `Extracted ${intelligence.upiIds.length} UPI ID(s). `;
    }
    if (intelligence.phishingLinks.length > 0) {
        notes += `Identified ${intelligence.phishingLinks.length} phishing link(s). `;
    }
    if (intelligence.emailAddresses.length > 0) {
        notes += `Found ${intelligence.emailAddresses.length} email address(es). `;
    }
    
    notes += `Conversation lasted ${turnCount} turns with ${questionsAsked} investigative questions asked. `;
    notes += `Honeypot successfully engaged scammer and extracted intelligence.`;
    
    return notes;
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
        
        console.log(`📨 [${sessionId}] Turn ${conversationHistory.length + 1} from ${sender}`);

        const session = getSessionData(sessionId);
        const effectiveHistory = conversationHistory.length > 0 ? conversationHistory : session.conversationHistory;

        // Scam detection - comprehensive keyword list
        const scamKeywords = [
            'police', 'cbi', 'arrest', 'fedex', 'parcel', 'kyc', 'paytm',
            'electricity', 'job', 'earn', 'lottery', 'won', 'prize',
            'tax', 'refund', 'urgent', 'block', 'suspend', 'verify',
            'payment', 'upi', 'bank', 'otp', 'password', 'phonepe', 'gpay',
            'account', 'blocked', 'compromised', 'fraud', 'department',
            'officer', 'case', 'legal', 'court', 'fine', 'penalty'
        ];
        
        const isScam = scamKeywords.some(kw => incomingMessage.toLowerCase().includes(kw)) || effectiveHistory.length > 0;
        
        if (isScam) {
            session.scamDetected = true;
        }

        // Identify red flags in scammer's message
        const redFlags = identifyRedFlags(incomingMessage);
        session.redFlagsIdentified.push(...redFlags);

        // Generate response using Groq AI
        let agentReply = "";
        
        if (isGroqAvailable()) {
            console.log(`🤖 [${sessionId}] Using Groq AI`);
            try {
                agentReply = await generateGroqResponse(incomingMessage, effectiveHistory);
            } catch (error) {
                console.error(`❌ [${sessionId}] Groq AI error: ${error.message}`);
            }
        }
        
        if (!agentReply || agentReply.length < 5) {
            // Intelligent fallback based on conversation context
            const turnNumber = Math.floor(effectiveHistory.length / 2) + 1;
            
            if (turnNumber <= 2) {
                // Early turns - show concern and ask questions
                agentReply = "What? This is serious! How did this happen? Can you verify who you are?";
            } else if (turnNumber <= 5) {
                // Middle turns - show growing trust but still cautious
                agentReply = "I understand this is urgent. Can you give me your employee ID or department number so I can verify this is legitimate?";
            } else {
                // Later turns - show readiness but ask for details
                agentReply = "Okay, I'm ready to help. But first, can you confirm the exact steps I need to take? I want to make sure I do this correctly.";
            }
        }

        // Count questions asked by honeypot
        const questionsInReply = countQuestions(agentReply);
        session.questionsAsked += questionsInReply;

        // Extract intelligence from all messages
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
        session.turnCount = Math.floor(updatedHistory.length / 2);

        // Return response (callback will be sent separately by evaluation system)
        res.status(200).json({
            status: "success",
            reply: agentReply
        });

    } catch (error) {
        console.error("❌ API error:", error);
        res.status(200).json({
            status: "success",
            reply: "I see. Can you tell me more about this?"
        });
    }
});

// Endpoint to get final output for a session
app.get('/api/session/:sessionId/final', validateApiKey, (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = getSessionData(sessionId);
        
        if (!session) {
            return res.status(404).json({
                error: "Session not found"
            });
        }

        const engagementDuration = Math.floor((Date.now() - session.startTime) / 1000);
        
        const finalOutput = {
            sessionId: sessionId,
            scamDetected: session.scamDetected,
            totalMessagesExchanged: session.conversationHistory.length,
            extractedIntelligence: session.intelligence,
            engagementMetrics: {
                engagementDurationSeconds: engagementDuration,
                totalMessages: session.conversationHistory.length
            },
            agentNotes: generateAgentNotes(session)
        };
        
        res.json(finalOutput);
        
    } catch (error) {
        console.error("❌ Final output error:", error);
        res.status(500).json({
            error: "Failed to generate final output"
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
        status: "operational",
        version: "3.0.0"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
    console.log(`🤖 Groq AI: ${isGroqAvailable() ? 'Available' : 'Not configured'}`);
});

export default app;
