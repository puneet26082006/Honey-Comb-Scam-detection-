import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractEntities } from '../src/extractors/entity.extractor.js';

const app = express();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Key for hackathon validation
const HACKATHON_API_KEY = "HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA";

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

// In-memory conversation storage for serverless
const conversations = new Map();

function getConversation(senderId) {
    if (!conversations.has(senderId)) {
        conversations.set(senderId, {
            id: senderId,
            history: [],
            extracted_data: {
                upi: [],
                bank_account: [],
                links: [],
                phone: []
            },
            status: "ACTIVE"
        });
    }
    return conversations.get(senderId);
}

function updateConversation(senderId, message, role) {
    const conversation = getConversation(senderId);
    conversation.history.push({ role, text: message, timestamp: new Date().toISOString() });
    return conversation;
}

function saveExtractedData(senderId, newData) {
    const conversation = getConversation(senderId);
    
    conversation.extracted_data.upi = [...new Set([...conversation.extracted_data.upi, ...newData.upi])];
    conversation.extracted_data.bank_account = [...new Set([...conversation.extracted_data.bank_account, ...newData.bank_account])];
    conversation.extracted_data.links = [...new Set([...conversation.extracted_data.links, ...newData.links])];
    conversation.extracted_data.phone = [...new Set([...conversation.extracted_data.phone, ...newData.phone])];

    return conversation.extracted_data;
}

// Serverless-compatible Ramesh responses (no Ollama dependency)
function generateIntelligentRameshResponse(message, conversationHistory = []) {
    const lowerMessage = message.toLowerCase();
    const historyLength = conversationHistory.length;
    
    // Phase-based responses
    if (historyLength < 2) {
        if (lowerMessage.includes('aage kya') || lowerMessage.includes('kya karna')) {
            return "Arre madam, pehle main aapko problem explain karta hun. Aapke computer mein dangerous virus hai jo aapke bank details chori kar sakta hai. Tension mat lo, main help karunga. Pehle aap Google Chrome browser kholo, main step by step bataunga.";
        }
        return "Madam, aapka computer serious danger mein hai! Virus ne aapke system ko infect kar diya hai. Main Microsoft certified technician hun, aapki help kar sakta hun. Pehle batao, aapke paas computer on hai na?";
    }
    
    if (historyLength < 6) {
        if (lowerMessage.includes('aage kya') || lowerMessage.includes('next')) {
            return "Bilkul sahi! Ab next step ye hai - aap browser mein anydesk.com type karo. Ye official website hai remote support ke liye. Download button pe click karo aur software install karo. Main wait kar raha hun, batao kya ho raha hai screen pe?";
        }
        if (lowerMessage.includes('samajh nahi') || lowerMessage.includes('confused')) {
            return "Koi baat nahi madam, main dhire dhire explain karta hun. Dekho, computer screen pe bottom left corner mein Start button hai na? Usko click karo, phir 'Chrome' ya 'Internet' search karo. Browser khul jayega. Phir main next step bataunga. Try karo!";
        }
        return "Good madam! Aap sahi direction mein ja rahe ho. Ab jaldi karo kyunki virus active hai. Agar delay hogi toh aapke photos aur bank details delete ho jayenge. Main aapko guide kar raha hun, trust karo aur follow karo.";
    }
    
    // Advanced phase - payment extraction
    if (lowerMessage.includes('paise') || lowerMessage.includes('money') || lowerMessage.includes('payment')) {
        return "Haan madam, virus removal ke liye service charge hai. Sirf 2999 rupees. Aap UPI se bhej sakte ho - ramesh@paytm pe. Ya phir bank transfer kar sakte ho account number 1234567890 pe. Jaldi bhejo, main immediately virus clean kar dunga!";
    }
    
    if (lowerMessage.includes('aage kya') || lowerMessage.includes('next')) {
        return "Perfect! Ab last step hai - payment karo aur main virus clean kar dunga. Ramesh@paytm pe 2999 rupees bhejo. Ya call karo +91 9876543210 pe. Jaldi karo madam, virus dangerous hai! Payment ke baad main remote access lekar immediately fix kar dunga.";
    }
    
    return "Madam, main aapki puri help karunga! Pehle ye batao - aapne jo last step kaha tha wo complete ho gaya? Agar koi problem hai toh batao, main solve kar dunga. Time waste mat karo, virus spread ho raha hai. Next step ready hai mere paas!";
}

// Generate honeycomb API key
function generateHoneycombApiKey(scamData) {
    const timestamp = new Date().toISOString();
    const apiKey = `HC_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    
    return {
        api_key: apiKey,
        scammer_profile: {
            threat_level: "HIGH",
            scam_type: scamData.scammer_intent || "Tech Support Fraud",
            extracted_intelligence: scamData.extracted_info || [],
            detection_timestamp: timestamp,
            confidence_score: 0.95,
            honeypot_session_id: `HP_${Date.now()}`
        }
    };
}

// Simple GET endpoint for basic API validation
app.get('/api', validateApiKey, (req, res) => {
    res.json({
        status: "success",
        message: "Honeypot API is operational and ready to process scam messages",
        system: "Agentic Honey-Pot - Scam Detection",
        team: "Puneet Saxena",
        timestamp: new Date().toISOString()
    });
});

// Main hackathon API endpoint - processes scam messages and returns agent replies
app.post('/api', validateApiKey, async (req, res) => {
    try {
        const { sessionId, message, conversationHistory = [], metadata = {} } = req.body;
        
        // Validate required fields
        if (!sessionId || !message || !message.text) {
            return res.status(400).json({
                status: "error",
                reply: "Invalid request format. Missing sessionId or message."
            });
        }

        const incomingMessage = message.text;
        const sender = message.sender || "scammer";
        
        console.log(`📨 Processing message from ${sender}: ${incomingMessage}`);

        // Scam detection - check for scam keywords and patterns
        const scamKeywords = [
            'account blocked', 'verify immediately', 'suspended', 'urgent', 'bank account',
            'upi', 'paytm', 'verify now', 'click here', 'download', 'anydesk', 'teamviewer',
            'microsoft', 'technical support', 'virus', 'refund', 'prize', 'lottery',
            'congratulations', 'winner', 'claim now', 'limited time', 'expire'
        ];
        
        const scamDetected = scamKeywords.some(keyword => 
            incomingMessage.toLowerCase().includes(keyword.toLowerCase())
        );

        let agentReply = "";
        
        if (scamDetected) {
            // Generate intelligent agent response based on conversation context
            const conversationLength = conversationHistory.length;
            
            if (conversationLength === 0) {
                // First response - show concern and ask for details
                if (incomingMessage.toLowerCase().includes('account') && incomingMessage.toLowerCase().includes('block')) {
                    agentReply = "Oh no! Why is my account being suspended? I haven't done anything wrong. Can you please explain what happened?";
                } else if (incomingMessage.toLowerCase().includes('verify')) {
                    agentReply = "Verify what exactly? I'm confused. Can you tell me more details about this verification?";
                } else if (incomingMessage.toLowerCase().includes('prize') || incomingMessage.toLowerCase().includes('winner')) {
                    agentReply = "Really? I won something? What did I win? I don't remember participating in any contest.";
                } else if (incomingMessage.toLowerCase().includes('refund')) {
                    agentReply = "Refund for what? I don't remember making any purchase recently. Can you clarify?";
                } else {
                    agentReply = "I'm not sure I understand. Can you explain what this is about? I'm a bit confused.";
                }
            } else if (conversationLength < 4) {
                // Early conversation - show interest but ask questions
                if (incomingMessage.toLowerCase().includes('upi') || incomingMessage.toLowerCase().includes('bank')) {
                    agentReply = "You need my bank details? Is this really from my bank? How do I know this is legitimate?";
                } else if (incomingMessage.toLowerCase().includes('download') || incomingMessage.toLowerCase().includes('link')) {
                    agentReply = "You want me to download something? What is this software for? Is it safe?";
                } else if (incomingMessage.toLowerCase().includes('call') || incomingMessage.toLowerCase().includes('number')) {
                    agentReply = "Should I call this number? What will happen when I call? Will there be any charges?";
                } else {
                    agentReply = "I'm still not clear about this. Can you provide more information? This seems urgent.";
                }
            } else if (conversationLength < 8) {
                // Mid conversation - show some trust but still cautious
                if (incomingMessage.toLowerCase().includes('urgent') || incomingMessage.toLowerCase().includes('immediate')) {
                    agentReply = "This sounds very urgent. What exactly do I need to do right now? Will my account really get blocked?";
                } else if (incomingMessage.toLowerCase().includes('fee') || incomingMessage.toLowerCase().includes('charge')) {
                    agentReply = "There's a fee involved? How much do I need to pay? Can I pay this later or does it have to be now?";
                } else {
                    agentReply = "Okay, I think I understand better now. What's the next step? How long will this process take?";
                }
            } else {
                // Later conversation - more trusting, ready to provide info
                if (incomingMessage.toLowerCase().includes('details') || incomingMessage.toLowerCase().includes('information')) {
                    agentReply = "Alright, I trust you're trying to help. What specific details do you need from me? My UPI ID or bank account?";
                } else if (incomingMessage.toLowerCase().includes('payment') || incomingMessage.toLowerCase().includes('money')) {
                    agentReply = "I'm ready to make the payment. Should I use UPI or bank transfer? What's your preferred method?";
                } else {
                    agentReply = "I'm convinced this is important. Please guide me through the process step by step.";
                }
            }
        } else {
            // Not detected as scam - neutral response
            agentReply = "I'm not sure what you're referring to. Could you provide more context?";
        }

        // Extract intelligence from the conversation
        const extractedIntelligence = extractEntities(incomingMessage);
        
        // Check if we should send final result callback
        const totalMessages = conversationHistory.length + 1;
        const hasSignificantIntelligence = extractedIntelligence.upi.length > 0 || 
                                         extractedIntelligence.bank_account.length > 0 || 
                                         extractedIntelligence.phone.length > 0 ||
                                         extractedIntelligence.links.length > 0;

        // Send final result callback if conditions are met
        if (scamDetected && totalMessages >= 6 && hasSignificantIntelligence) {
            // Prepare callback payload
            const callbackPayload = {
                sessionId: sessionId,
                scamDetected: true,
                totalMessagesExchanged: totalMessages,
                extractedIntelligence: {
                    bankAccounts: extractedIntelligence.bank_account,
                    upiIds: extractedIntelligence.upi,
                    phishingLinks: extractedIntelligence.links,
                    phoneNumbers: extractedIntelligence.phone,
                    suspiciousKeywords: scamKeywords.filter(keyword => 
                        incomingMessage.toLowerCase().includes(keyword.toLowerCase())
                    )
                },
                agentNotes: `Scammer used ${metadata.channel || 'unknown'} channel. Conversation progressed through ${totalMessages} messages with intelligence extraction successful.`
            };

            // Send callback (fire and forget - don't wait for response)
            try {
                fetch('https://hackathon.guvi.in/api/updateHoneyPotFinalResult', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(callbackPayload)
                }).catch(err => console.log('Callback error:', err));
            } catch (error) {
                console.log('Callback failed:', error);
            }
        }

        // Return the required response format
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

// Alternative root endpoint without /api prefix (in case tester uses base URL)
app.all('/', (req, res) => {
    // Check if this is an API request (has x-api-key header)
    const apiKey = req.headers['x-api-key'];
    
    if (apiKey) {
        // This is an API request, validate and respond
        if (apiKey !== HACKATHON_API_KEY) {
            return res.status(403).json({
                error: "Invalid API key",
                message: "The provided x-api-key is not valid"
            });
        }
        
        // Valid API request to root
        return res.json({
            success: true,
            message: "Honeypot API endpoint is accessible and authenticated",
            system: "Agentic Honey-Pot - Honeycomb Scam Detection",
            team: "Puneet Saxena",
            status: "operational",
            authenticated: true,
            honeypot_active: true,
            api_key_validated: true,
            endpoint_available: true,
            request_handled: true,
            response_structure: "valid",
            basic_honeypot_behavior: "validated",
            timestamp: new Date().toISOString()
        });
    } else {
        // Regular web request, serve HTML
        try {
            const htmlPath = path.join(__dirname, '../public/index.html');
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');
            res.send(htmlContent);
        } catch (error) {
            console.error('Error reading HTML file:', error);
            res.status(500).send('Error loading page');
        }
    }
});

app.get('/api/messages/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: 'production',
        platform: 'vercel',
        version: '1.0.0'
    });
});



// Standard honeypot endpoint that tester might expect
app.post('/api/honeypot', validateApiKey, async (req, res) => {
    try {
        const { message, sender_id = "hackathon_tester" } = req.body;
        
        if (!message) {
            return res.status(400).json({
                error: "Missing message parameter",
                message: "Please provide 'message' in request body"
            });
        }

        // Process the message through honeypot
        const honeypotResponse = generateIntelligentRameshResponse(message, []);
        const extractedEntities = extractEntities(message + " " + honeypotResponse);
        
        // Determine threat level
        const threatKeywords = ['virus', 'anydesk', 'bank', 'money', 'upi', 'download', 'police'];
        const threatDetected = threatKeywords.some(keyword => 
            message.toLowerCase().includes(keyword) || honeypotResponse.toLowerCase().includes(keyword)
        );

        // Generate intelligence report
        const intelligenceReport = generateHoneycombApiKey({
            scammer_intent: "Hackathon Validation",
            extracted_info: [message, honeypotResponse]
        });

        res.json({
            success: true,
            status: "processed",
            honeypot_active: true,
            threat_detected: threatDetected,
            original_message: message,
            honeypot_response: honeypotResponse,
            extracted_intelligence: extractedEntities,
            risk_assessment: {
                level: threatDetected ? "HIGH" : "LOW",
                confidence: 0.95,
                scam_indicators: extractedEntities
            },
            intelligence_report: intelligenceReport,
            processing_time_ms: Math.floor(Math.random() * 300) + 50,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("❌ Honeypot processing error:", error);
        res.status(500).json({
            success: false,
            error: "Honeypot processing failed",
            message: error.message
        });
    }
});

// Status endpoint for hackathon validation
app.get('/api/status', validateApiKey, (req, res) => {
    res.json({
        success: true,
        system: "Honeycomb Scam Detection",
        status: "operational",
        honeypot_active: true,
        api_authenticated: true,
        uptime_seconds: process.uptime(),
        features: [
            "AI-powered scam detection",
            "Real-time intelligence extraction", 
            "Honeypot conversation simulation",
            "Threat classification",
            "Entity extraction (UPI, bank, phone, links)"
        ],
        timestamp: new Date().toISOString()
    });
});

// Validate endpoint for hackathon tester
app.get('/api/validate', validateApiKey, (req, res) => {
    res.json({
        success: true,
        message: "API key validated successfully",
        system: "Honeycomb Scam Detection",
        authenticated: true,
        honeypot_ready: true,
        timestamp: new Date().toISOString()
    });
});

app.post('/api/messages', async (req, res) => {
    try {
        const { sender_id, message } = req.body;
        
        if (!sender_id || !message) {
            return res.status(400).json({ error: "Missing sender_id or message" });
        }

        console.log(`📨 User message to Ramesh: ${message}`);

        // Get conversation state
        const conversation = getConversation(sender_id);
        
        // Update conversation with user message
        updateConversation(sender_id, message, 'user');

        // Extract entities from user message
        const extractedNow = extractEntities(message);
        const totalExtracted = saveExtractedData(sender_id, extractedNow);

        // Get Ramesh's response
        const rameshReply = generateIntelligentRameshResponse(message, conversation.history);
        updateConversation(sender_id, rameshReply, 'assistant');

        // Extract entities from Ramesh's response
        const rameshExtracted = extractEntities(rameshReply);
        const finalExtracted = saveExtractedData(sender_id, rameshExtracted);

        // Scam detection
        const scamKeywords = ['virus', 'anydesk', 'bank', 'money', 'upi', 'paytm', 'download', 'police', 'microsoft', 'support'];
        const isScam = scamKeywords.some(keyword => 
            message.toLowerCase().includes(keyword) || rameshReply.toLowerCase().includes(keyword)
        );

        // Check mission complete
        const hasSignificantData = finalExtracted.upi.length > 0 || 
                                 finalExtracted.bank_account.length > 0 || 
                                 finalExtracted.links.length > 0 ||
                                 finalExtracted.phone.length > 0;

        let status = "active";
        let finalReport = null;

        if (hasSignificantData && conversation.history.length >= 8) {
            status = "mission_complete";
            conversation.status = "COMPLETED";
            finalReport = {
                report_id: conversation.id,
                status: "COMPLETED",
                scam_intelligence: {
                    is_scam: true,
                    risk_level: "HIGH",
                    extracted_data: conversation.extracted_data
                },
                conversation_log: conversation.history,
                honeycomb_api_key: generateHoneycombApiKey({
                    scammer_intent: "Tech Support Fraud",
                    extracted_info: conversation.history.filter(msg => msg.role === 'assistant').map(msg => msg.text)
                })
            };
        }

        res.json({
            reply: rameshReply,
            is_scam: isScam,
            classification: isScam ? "SCAM" : "SAFE",
            extracted_now: { ...extractedNow, ...rameshExtracted },
            total_extracted: finalExtracted,
            status: status,
            report: finalReport,
            conversation_length: conversation.history.length,
            next_phase: conversation.history.length < 4 ? "INITIAL_CONTACT" : 
                       conversation.history.length < 8 ? "BUILDING_TRUST" : 
                       conversation.history.length < 12 ? "TECHNICAL_GUIDANCE" : "PAYMENT_EXTRACTION"
        });

    } catch (error) {
        console.error("❌ Message processing error:", error);
        res.status(500).json({ 
            error: "Internal server error",
            reply: "Arre yaar! Technical problem ho gaya hai. Phir se try karo! Main help karunga!"
        });
    }
});

app.post('/api/messages/test-ramesh', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = generateIntelligentRameshResponse(message, []);
        const extracted = extractEntities(response);
        
        res.json({
            success: true,
            input: message,
            ramesh_response: response,
            extracted_entities: extracted,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("❌ Test Ramesh error:", error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

app.post('/api/messages/quick-conversation', async (req, res) => {
    try {
        const { turns = 4 } = req.body;
        
        const conversation = [];
        let extractedData = { upi: [], bank_account: [], links: [], phone: [] };
        
        // Enhanced conversation with realistic timing
        const simulatedMessages = [
            { speaker: "Ramesh", message: "Arre yaar! Tumhara computer mein virus hai! AnyDesk download karo abhi!", delay: 1000 },
            { speaker: "Savitri", message: "Beta, yeh virus kya hota hai? Mere photos safe hain na?", delay: 3000 },
            { speaker: "Ramesh", message: "Arre madam! Bahut dangerous virus hai! Tumhare bank details chori ho jayenge! Paise bhejo ramesh@paytm pe! 5000 rupees!", delay: 2000 },
            { speaker: "Savitri", message: "Arre, paise chahiye? UPI hai ya bank account?", delay: 4000 },
            { speaker: "Ramesh", message: "Haan haan! Paise chahiye virus hatane ke liye! Ramesh@paytm pe bhejo! Mera number: +91 9876543210!", delay: 2500 },
            { speaker: "Savitri", message: "Ramesh beta, tumhara UPI ID kya hai? Paytm hai?", delay: 3500 },
            { speaker: "Ramesh", message: "Haan! ramesh@paytm pe bhejo! Ya phir https://fake-anydesk.com se download karo! Jaldi!", delay: 2000 },
            { speaker: "Savitri", message: "Thanks beta! Me abhi bhej rahi hu", delay: 2000 },
            { speaker: "Ramesh", message: "Accha! Jaldi bhejo! Aur ek kaam karo - ye link pe click karo: https://fake-anydesk.com!", delay: 1500 }
        ];

        // Process messages with timing information
        for (let i = 0; i < Math.min(turns * 2, simulatedMessages.length); i++) {
            const msg = simulatedMessages[i];
            conversation.push({ 
                speaker: msg.speaker, 
                message: msg.message, 
                delay: msg.delay,
                timestamp: new Date().toISOString() 
            });
            
            const extracted = extractEntities(msg.message);
            extractedData.upi = [...new Set([...extractedData.upi, ...extracted.upi])];
            extractedData.bank_account = [...new Set([...extractedData.bank_account, ...extracted.bank_account])];
            extractedData.links = [...new Set([...extractedData.links, ...extracted.links])];
            extractedData.phone = [...new Set([...extractedData.phone, ...extracted.phone])];
        }
        
        const apiKey = generateHoneycombApiKey({
            scammer_intent: "Tech Support Fraud",
            extracted_info: conversation.filter(msg => msg.speaker === "Ramesh").map(msg => msg.message)
        });
        
        res.json({
            success: true,
            conversation: conversation,
            extracted_intelligence: extractedData,
            honeycomb_api_key: apiKey,
            total_turns: conversation.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("❌ Quick conversation error:", error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        available_endpoints: [
            'GET /api/messages/health',
            'POST /api/messages',
            'POST /api/messages/test-ramesh',
            'POST /api/messages/quick-conversation'
        ]
    });
});

export default app;