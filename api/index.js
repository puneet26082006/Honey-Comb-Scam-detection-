import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { extractEntities } from '../src/extractors/entity.extractor.js';
import { generateIntelligentResponse, generateAgentNotes } from '../src/agents/intelligent.agent.js';
import { generateOllamaResponse, checkOllamaAvailability } from '../src/agents/ollama.agent.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Key for hackathon validation
const HACKATHON_API_KEY = "HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA";

// GUVI Callback endpoint
const GUVI_CALLBACK_URL = "https://hackathon.guvi.in/api/updateHoneyPotFinalResult";

// Check Ollama availability on startup
let ollamaAvailable = false;
checkOllamaAvailability().then(available => {
    ollamaAvailable = available;
    if (available) {
        console.log('✅ Ollama model available - using AI-generated responses');
    } else {
        console.log('⚠️ Ollama not available - using smart pattern-based responses');
    }
});

// API Key validation middleware
function validateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
        return res.status(401).json({
            error: "Missing x-api-key header",
            message: "Please provide x-api-key in headers"
        });
    }
    
    if (apiKey !== HACKATHON_API_KEY) {
        return res.status(403).json({
            error: "Invalid API key",
            message: "The provided x-api-key is not valid"
        });
    }
    
    next();
}

// Session-based storage
const sessionData = new Map();

function getSessionData(sessionId) {
    if (!sessionData.has(sessionId)) {
        sessionData.set(sessionId, {
            conversationHistory: [],
            intelligence: {
                bankAccounts: [],
                upiIds: [],
                phishingLinks: [],
                phoneNumbers: [],
                suspiciousKeywords: []
            },
            scamDetected: false,
            callbackSent: false
        });
    }
    return sessionData.get(sessionId);
}

function updateSessionIntelligence(sessionId, extracted, message) {
    const session = getSessionData(sessionId);
    const intel = session.intelligence;
    
    if (extracted.bank_account && extracted.bank_account.length > 0) {
        intel.bankAccounts = [...new Set([...intel.bankAccounts, ...extracted.bank_account])];
    }
    if (extracted.upi && extracted.upi.length > 0) {
        intel.upiIds = [...new Set([...intel.upiIds, ...extracted.upi])];
    }
    if (extracted.links && extracted.links.length > 0) {
        intel.phishingLinks = [...new Set([...intel.phishingLinks, ...extracted.links])];
    }
    if (extracted.phone && extracted.phone.length > 0) {
        intel.phoneNumbers = [...new Set([...intel.phoneNumbers, ...extracted.phone])];
    }
    
    const scamKeywords = [
        'urgent', 'verify now', 'account blocked', 'suspended', 'immediately',
        'bank account', 'upi', 'paytm', 'verify', 'download', 'anydesk',
        'payment', 'fee', 'charge', 'otp', 'pin', 'password', 'kyc'
    ];
    
    const foundKeywords = scamKeywords.filter(keyword => 
        message.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (foundKeywords.length > 0) {
        intel.suspiciousKeywords = [...new Set([...intel.suspiciousKeywords, ...foundKeywords])];
    }
    
    return intel;
}

function hasSignificantIntelligence(intel) {
    return intel.bankAccounts.length > 0 || 
           intel.upiIds.length > 0 || 
           intel.phoneNumbers.length > 0 ||
           intel.phishingLinks.length > 0;
}

async function sendFinalResultCallback(sessionId, conversationHistory, metadata) {
    const session = getSessionData(sessionId);
    const intel = session.intelligence;
    
    // Only send if we have significant intelligence
    if (!hasSignificantIntelligence(intel)) {
        console.log(`[${sessionId}] Not enough intelligence to send callback`);
        return false;
    }
    
    // Prepare payload exactly as per problem statement
    const payload = {
        sessionId: sessionId,
        scamDetected: true,
        totalMessagesExchanged: conversationHistory.length,
        extractedIntelligence: {
            bankAccounts: intel.bankAccounts,
            upiIds: intel.upiIds,
            phishingLinks: intel.phishingLinks,
            phoneNumbers: intel.phoneNumbers,
            suspiciousKeywords: intel.suspiciousKeywords
        },
        agentNotes: generateAgentNotes(conversationHistory, intel, metadata)
    };
    
    console.log(`📤 [${sessionId}] Sending final result callback to GUVI`);
    console.log(`📊 Intelligence: UPI(${intel.upiIds.length}) Bank(${intel.bankAccounts.length}) Phone(${intel.phoneNumbers.length}) Links(${intel.phishingLinks.length})`);
    
    try {
        const response = await fetch(GUVI_CALLBACK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            console.log(`✅ [${sessionId}] Callback sent successfully`);
            return true;
        } else {
            const errorText = await response.text();
            console.log(`⚠️ [${sessionId}] Callback failed with status: ${response.status}`);
            console.log(`⚠️ Response: ${errorText}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ [${sessionId}] Callback error:`, error.message);
        return false;
    }
}

// Main API endpoint
app.post('/api', validateApiKey, async (req, res) => {
    try {
        const { sessionId, message, conversationHistory = [], metadata = {} } = req.body;
        
        if (!sessionId || !message || !message.text) {
            return res.status(400).json({
                status: "error",
                reply: "Invalid request format. Missing sessionId or message.text"
            });
        }

        const incomingMessage = message.text;
        const sender = message.sender || "scammer";
        
        console.log(`📨 [${sessionId}] Processing message from ${sender}`);

        // Enhanced scam detection
        const scamKeywords = [
            'police', 'cbi', 'arrest', 'fedex', 'parcel', 'drugs', 'kyc', 'paytm',
            'electricity', 'disconnect', 'job', 'earn', 'lottery', 'won', 'prize',
            'tax', 'refund', 'urgent', 'immediate', 'block', 'suspend', 'verify',
            'payment', 'upi', 'bank', 'otp', 'password', 'challan', 'fine', 'traffic',
            'phonepe', 'gpay', 'account', 'card', 'cvv', 'anydesk', 'teamviewer'
        ];
        
        const session = getSessionData(sessionId);
        
        // Use server-side history if client doesn't provide it
        const effectiveHistory = conversationHistory.length > 0 
            ? conversationHistory 
            : session.conversationHistory;

        // Smart scam detection - honeypot should engage with ALL messages
        let scamDetected = false;
        
        // Check for obvious scam keywords
        if (scamKeywords.some(keyword => incomingMessage.toLowerCase().includes(keyword.toLowerCase()))) {
            scamDetected = true;
        }
        
        // If conversation already started, continue engaging
        if (!scamDetected && effectiveHistory.length > 0) {
            scamDetected = true;
        }
        
        // For first message without keywords, still engage (honeypot behavior)
        // A real honeypot should respond to ANY message to keep scammer engaged
        if (!scamDetected) {
            scamDetected = true; // Engage with everything
        }

        let agentReply = "";
        
        session.scamDetected = true; // Mark as scam conversation
        
        // Always generate intelligent response (with Grok fallback for unknown types)
        try {
            if (ollamaAvailable) {
                console.log(`🤖 [${sessionId}] Using Ollama AI model`);
                agentReply = await generateOllamaResponse(incomingMessage, effectiveHistory);
            } else {
                console.log(`💡 [${sessionId}] Using smart pattern-based response (with Grok fallback)`);
                agentReply = await generateIntelligentResponse(incomingMessage, effectiveHistory);
            }
        } catch (ollamaError) {
            console.log(`⚠️ [${sessionId}] Ollama failed, using fallback`);
            agentReply = await generateIntelligentResponse(incomingMessage, effectiveHistory);
        }

        // Extract intelligence
        const allMessages = [
            ...effectiveHistory.map(msg => msg.text),
            incomingMessage,
            agentReply
        ].join(' ');
        
        const extractedIntelligence = extractEntities(allMessages);
        updateSessionIntelligence(sessionId, extractedIntelligence, allMessages);
        
        // Update conversation history
        const updatedHistory = [
            ...effectiveHistory,
            { sender: sender, text: incomingMessage, timestamp: message.timestamp || Date.now() },
            { sender: "user", text: agentReply, timestamp: Date.now() }
        ];
        
        session.conversationHistory = updatedHistory;
        
        // Check if callback should be sent
        const totalMessages = updatedHistory.length;
        const sessionIntel = session.intelligence;

        if (session.scamDetected && 
            totalMessages >= 6 && 
            hasSignificantIntelligence(sessionIntel) && 
            !session.callbackSent) {
            
            session.callbackSent = true;
            sendFinalResultCallback(sessionId, updatedHistory, metadata).catch(err => {
                console.log(`❌ [${sessionId}] Callback failed:`, err.message);
            });
        }

        // Return simple response as per problem statement
        res.json({
            status: "success",
            reply: agentReply
        });

    } catch (error) {
        console.error("❌ API processing error:", error);
        res.status(500).json({
            status: "error",
            reply: "I'm having trouble processing your message right now. Could you try again?"
        });
    }
});

// Get conversation history for a session
app.get('/api/session/:sessionId', validateApiKey, (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = getSessionData(sessionId);
        
        res.json({
            sessionId: sessionId,
            conversationHistory: session.conversationHistory,
            totalMessages: session.conversationHistory.length,
            scamDetected: session.scamDetected,
            intelligence: session.intelligence,
            callbackSent: session.callbackSent
        });
    } catch (error) {
        console.error("❌ Session retrieval error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve session data"
        });
    }
});

// Get all active sessions
app.get('/api/sessions', validateApiKey, (req, res) => {
    try {
        const sessions = [];
        sessionData.forEach((data, sessionId) => {
            sessions.push({
                sessionId: sessionId,
                messageCount: data.conversationHistory.length,
                scamDetected: data.scamDetected,
                intelligenceCount: {
                    upiIds: data.intelligence.upiIds.length,
                    bankAccounts: data.intelligence.bankAccounts.length,
                    phoneNumbers: data.intelligence.phoneNumbers.length,
                    links: data.intelligence.phishingLinks.length
                },
                callbackSent: data.callbackSent,
                lastActivity: data.conversationHistory.length > 0 
                    ? data.conversationHistory[data.conversationHistory.length - 1].timestamp 
                    : null
            });
        });
        
        res.json({
            totalSessions: sessions.length,
            sessions: sessions.sort((a, b) => (b.lastActivity || 0) - (a.lastActivity || 0))
        });
    } catch (error) {
        console.error("❌ Sessions retrieval error:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve sessions"
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: 'production',
        platform: 'vercel',
        version: '2.0.0',
        ollama: ollamaAvailable ? 'available' : 'unavailable'
    });
});

// Root endpoint
app.all('/', (req, res) => {
    res.json({
        message: "Agentic Honey-Pot for Scam Detection",
        status: "operational",
        ollama: ollamaAvailable ? 'enabled' : 'disabled (using fallback)'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
});

export default app;
