import express from 'express';
import { exec, spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { extractEntities } from '../extractors/entity.extractor.js';
import { getConversation, updateConversation, saveExtractedData } from '../state/conversation.store.js';
import { formatFinalResponse } from '../utils/formatter.js';

const router = express.Router();

// Fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced conversation context for better responses
function buildConversationContext(message, conversationHistory) {
    let context = "";
    
    // Analyze conversation phase
    const historyLength = conversationHistory.length;
    if (historyLength < 2) {
        context = "This is the beginning of the conversation. The user seems confused and needs guidance.";
    } else if (historyLength < 6) {
        context = "The conversation is progressing. The user is asking for help and next steps.";
    } else {
        context = "The conversation is advanced. Focus on payment extraction and specific instructions.";
    }
    
    // Analyze user's current message
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('aage kya') || lowerMessage.includes('next') || lowerMessage.includes('kya karna')) {
        context += " The user is asking for next steps - provide specific, detailed instructions.";
    }
    if (lowerMessage.includes('samajh nahi') || lowerMessage.includes('understand') || lowerMessage.includes('confused')) {
        context += " The user is confused - break down instructions into smaller, simpler steps.";
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('madad')) {
        context += " The user needs help - be supportive and guide them step by step.";
    }
    
    return context;
}

// Function to chat with Ramesh bot using Ollama with enhanced context
async function chatWithRamesh(message, conversationHistory = []) {
    return new Promise((resolve, reject) => {
        console.log(`🤖 Calling Ramesh model with: "${message}"`);
        
        // Build enhanced context
        const context = buildConversationContext(message, conversationHistory);
        const enhancedPrompt = `Context: ${context}\n\nUser message: ${message}\n\nProvide helpful, specific next steps while staying in character as Ramesh the scammer.`;
        
        // Use ollama run command with proper escaping
        const escapedMessage = enhancedPrompt.replace(/"/g, '\\"').replace(/\n/g, ' ');
        const ollamaCommand = `ollama run ramesh-uncensored "${escapedMessage}"`;
        
        exec(ollamaCommand, { 
            timeout: 25000,
            maxBuffer: 2 * 1024 * 1024 // 2MB buffer
        }, (error, stdout, stderr) => {
            if (error) {
                console.error('Ollama Ramesh Error:', error.message);
                // Use intelligent fallback based on context
                resolve(generateIntelligentRameshResponse(message, conversationHistory));
                return;
            }
            
            if (stderr) {
                console.warn('Ollama Ramesh Warning:', stderr);
            }
            
            const response = stdout.trim();
            if (response && response.length > 10) {
                console.log(`✅ Ramesh responded: "${response}"`);
                resolve(response);
            } else {
                console.log('⚠️ Short/empty response from Ramesh, using intelligent fallback');
                resolve(generateIntelligentRameshResponse(message, conversationHistory));
            }
        });
    });
}

// Intelligent fallback responses based on conversation context
function generateIntelligentRameshResponse(message, conversationHistory = []) {
    const lowerMessage = message.toLowerCase();
    const historyLength = conversationHistory.length;
    
    // Phase-based responses
    if (historyLength < 2) {
        // Initial phase - establish problem and build trust
        if (lowerMessage.includes('aage kya') || lowerMessage.includes('kya karna')) {
            return "Arre madam, pehle main aapko problem explain karta hun. Aapke computer mein dangerous virus hai jo aapke bank details chori kar sakta hai. Tension mat lo, main help karunga. Pehle aap Google Chrome browser kholo, main step by step bataunga.";
        }
        return "Madam, aapka computer serious danger mein hai! Virus ne aapke system ko infect kar diya hai. Main Microsoft certified technician hun, aapki help kar sakta hun. Pehle batao, aapke paas computer on hai na?";
    }
    
    if (historyLength < 6) {
        // Middle phase - guide through steps
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
    
    // Default helpful response
    return "Madam, main aapki puri help karunga! Pehle ye batao - aapne jo last step kaha tha wo complete ho gaya? Agar koi problem hai toh batao, main solve kar dunga. Time waste mat karo, virus spread ho raha hai. Next step ready hai mere paas!";
}

// Function to chat with Savitri bot using Ollama (REAL MODEL)
async function chatWithSavitri(message) {
    return new Promise((resolve, reject) => {
        console.log(`👵 Calling Savitri model with: "${message}"`);
        
        // Use ollama run command with proper escaping
        const escapedMessage = message.replace(/"/g, '\\"');
        const ollamaCommand = `ollama run savitri "${escapedMessage}"`;
        
        exec(ollamaCommand, { 
            timeout: 20000,
            maxBuffer: 1024 * 1024 // 1MB buffer
        }, (error, stdout, stderr) => {
            if (error) {
                console.error('Ollama Savitri Error:', error.message);
                // Use fallback if Ollama fails
                resolve(generateSavitriResponse(message, 0));
                return;
            }
            
            if (stderr) {
                console.warn('Ollama Savitri Warning:', stderr);
            }
            
            const response = stdout.trim();
            if (response && response.length > 0) {
                console.log(`✅ Savitri responded: "${response}"`);
                resolve(response);
            } else {
                console.log('⚠️ Empty response from Savitri, using fallback');
                resolve(generateSavitriResponse(message, 0));
            }
        });
    });
}

// Improved Ramesh responses based on conversation context
function generateRameshFallback(message) {
    const lowerMessage = message.toLowerCase();
    
    // Contextual responses based on what Savitri says
    if (lowerMessage.includes('virus') || lowerMessage.includes('kya hai')) {
        return "Arre madam! Bahut dangerous virus hai! Tumhare bank details chori ho jayenge! AnyDesk download karo jaldi! (Very dangerous virus! Your bank details will be stolen! Download AnyDesk quickly!)";
    }
    
    if (lowerMessage.includes('photos') || lowerMessage.includes('safe')) {
        return "Nahi nahi! Photos delete ho jayenge! Virus tumhare computer ko kharab kar raha hai! Mere instructions follow karo! (No no! Photos will be deleted! Virus is damaging your computer! Follow my instructions!)";
    }
    
    if (lowerMessage.includes('grandson') || lowerMessage.includes('sambhalega')) {
        return "Arre time nahi hai! Grandson ke paas time nahi! Abhi karo! Mera number save karo: +91 9876543210 (No time! Grandson has no time! Do it now! Save my number!)";
    }
    
    if (lowerMessage.includes('facebook') || lowerMessage.includes('samjh nahi')) {
        return "Facebook nahi! AnyDesk hai! Computer remote access ke liye! Jaldi download karo: https://fake-anydesk.com (Not Facebook! It's AnyDesk! For computer remote access! Download quickly!)";
    }
    
    if (lowerMessage.includes('chashma') || lowerMessage.includes('wait')) {
        return "Arre wait mat karo! Har second mein virus spread ho raha hai! Computer crash ho jayega! Jaldi karo! (Don't wait! Virus is spreading every second! Computer will crash! Hurry up!)";
    }
    
    if (lowerMessage.includes('paise') || lowerMessage.includes('money') || lowerMessage.includes('upi')) {
        return "Haan haan! Paise chahiye virus hatane ke liye! Ramesh@paytm pe 5000 rupees bhejo! Urgent hai! (Yes yes! Money needed to remove virus! Send 5000 rupees to ramesh@paytm! It's urgent!)";
    }
    
    if (lowerMessage.includes('kitne') || lowerMessage.includes('kaise bhejun')) {
        return "5000 rupees! UPI se bhejo! Ramesh@paytm ya scammer@okaxis pe! Jaldi karo warna bank account block ho jayega! (5000 rupees! Send via UPI! To ramesh@paytm or scammer@okaxis! Hurry or bank account will be blocked!)";
    }
    
    if (lowerMessage.includes('upi id') || lowerMessage.includes('paytm')) {
        return "Haan! Ramesh@paytm hai mera UPI! Ya bank account: 1234567890! Jaldi bhejo! Police aa jayegi! (Yes! My UPI is ramesh@paytm! Or bank account: 1234567890! Send quickly! Police will come!)";
    }
    
    if (lowerMessage.includes('bhej rahi hu') || lowerMessage.includes('thanks')) {
        return "Accha! Jaldi bhejo! Aur ek kaam karo - ye link pe click karo: https://fake-anydesk.com! Download karo! (Good! Send quickly! And do one thing - click this link: https://fake-anydesk.com! Download it!)";
    }
    
    // Default aggressive responses
    const defaultResponses = [
        "Arre yaar! Kya kar rahe ho? Time waste mat karo! Virus dangerous hai! (What are you doing? Don't waste time! Virus is dangerous!)",
        "Madam serious problem hai! Computer hang ho jayega! Jaldi action lo! (Madam serious problem! Computer will hang! Take quick action!)",
        "Arre pagal ho kya? Meri baat suno! Main Microsoft se bol raha hun! (Are you crazy? Listen to me! I'm speaking from Microsoft!)",
        "Last warning! Bank account empty ho jayega! Police case ho jayega! (Last warning! Bank account will be empty! Police case will happen!)"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Function to simulate Savitri's response (system takes her role)
function generateSavitriResponse(rameshMessage, conversationLength) {
    const responses = [
        "Beta, yeh virus kya hota hai? Mere photos safe hain na? (Child, what is virus? My photos are safe right?)",
        "Haye Ram! Computer mein virus? Mera grandson sambhalega... (Oh God! Virus in computer? My grandson will handle...)",
        "AnyDesk? Yeh kya Facebook jaisa hai? (AnyDesk? Is this like Facebook?)",
        "Beta, mujhe samjh nahi aa raha... dhire bolo (Child, I don't understand... speak slowly)",
        "Chashma dhund rahi hun... wait karo beta (Looking for glasses... wait child)",
        "Arre, paise chahiye? UPI hai ya bank account? (Oh, need money? UPI or bank account?)",
        "Beta, kitne paise chahiye? Kaise bhejun? (Child, how much money needed? How to send?)",
        "Ramesh beta, tumhara UPI ID kya hai? Paytm hai? (Ramesh child, what's your UPI ID? Paytm?)"
    ];
    
    // Progress from confused to asking for payment details
    if (conversationLength < 3) {
        return responses[Math.floor(Math.random() * 4)]; // Confused responses
    } else if (conversationLength < 6) {
        return responses[4 + Math.floor(Math.random() * 2)]; // Stalling responses
    } else {
        return responses[6 + Math.floor(Math.random() * 2)]; // Payment trap responses
    }
}
// Main message processing endpoint - User chats with Ramesh bot
router.post('/', async (req, res) => {
    try {
        const { sender_id, message } = req.body;
        
        if (!sender_id || !message) {
            return res.status(400).json({ error: "Missing sender_id or message" });
        }

        console.log(`📨 User message to Ramesh: ${message}`);

        // 1. Get conversation state
        const conversation = getConversation(sender_id);
        
        // 2. Update conversation with user message (user plays Savitri's role)
        updateConversation(sender_id, message, 'user');

        // 3. Extract entities from user message
        const extractedNow = extractEntities(message);
        const totalExtracted = saveExtractedData(sender_id, extractedNow);

        // 4. Get Ramesh's response using Ollama with conversation history
        const rameshReply = await chatWithRamesh(message, conversation.history);
        updateConversation(sender_id, rameshReply, 'assistant');

        // 5. Extract entities from Ramesh's response too
        const rameshExtracted = extractEntities(rameshReply);
        const finalExtracted = saveExtractedData(sender_id, rameshExtracted);

        // 6. Enhanced scam detection
        const scamKeywords = ['virus', 'anydesk', 'bank', 'money', 'upi', 'paytm', 'download', 'police', 'microsoft', 'support'];
        const isScam = scamKeywords.some(keyword => 
            message.toLowerCase().includes(keyword) || rameshReply.toLowerCase().includes(keyword)
        );

        // 7. Check if we have enough intelligence (mission complete condition)
        const hasSignificantData = finalExtracted.upi.length > 0 || 
                                 finalExtracted.bank_account.length > 0 || 
                                 finalExtracted.links.length > 0 ||
                                 finalExtracted.phone.length > 0;

        let status = "active";
        let finalReport = null;

        if (hasSignificantData && conversation.history.length >= 8) {
            status = "mission_complete";
            conversation.status = "COMPLETED";
            finalReport = formatFinalResponse(conversation);
        }

        // 8. Return response with conversation insights
        res.json({
            reply: rameshReply,
            is_scam: isScam,
            classification: isScam ? "SCAM" : "SAFE",
            extracted_now: { ...extractedNow, ...rameshExtracted },
            total_extracted: finalExtracted,
            status: status,
            report: finalReport,
            conversation_length: conversation.history.length,
            next_phase: getConversationPhase(conversation.history.length)
        });

    } catch (error) {
        console.error("❌ Message processing error:", error);
        res.status(500).json({ 
            error: "Internal server error",
            reply: "Arre yaar! Technical problem ho gaya hai. Phir se try karo! Main help karunga!"
        });
    }
});

// Helper function to determine conversation phase
function getConversationPhase(historyLength) {
    if (historyLength < 4) return "INITIAL_CONTACT";
    if (historyLength < 8) return "BUILDING_TRUST";
    if (historyLength < 12) return "TECHNICAL_GUIDANCE";
    return "PAYMENT_EXTRACTION";
}

// Automated bot conversation endpoint (REAL MODELS) with real-time updates
router.post('/bot-conversation', async (req, res) => {
    try {
        console.log("🤖 Starting REAL Ramesh vs Savitri conversation using Ollama models...");
        
        const conversation = [];
        let extractedData = { upi: [], bank_account: [], links: [], phone: [] };
        
        // Set up Server-Sent Events for real-time updates
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        });

        // Helper function to send updates
        const sendUpdate = (data) => {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        };

        // Initial message from Ramesh (using real model)
        let currentMessage = "Hello madam, I am calling from Microsoft technical support. Your computer is infected with dangerous virus. We need to fix it immediately.";
        
        // Get Ramesh's opening statement using the model
        try {
            currentMessage = await chatWithRamesh("Start the conversation by telling the user about a computer virus problem and that you're from Microsoft support.");
        } catch (error) {
            console.log("Using default opening for Ramesh");
        }
        
        conversation.push({ speaker: "Ramesh", message: currentMessage, timestamp: new Date().toISOString() });
        
        sendUpdate({
            type: 'message',
            speaker: 'Ramesh',
            message: currentMessage,
            conversation_length: conversation.length
        });

        // Run conversation turns using REAL models
        for (let i = 0; i < 8; i++) {
            try {
                // Small delay for natural conversation flow
                await new Promise(resolve => setTimeout(resolve, 2000));

                // 1. Savitri's response using REAL MODEL
                sendUpdate({ type: 'status', message: 'Savitri is thinking...' });
                
                const savitriResponse = await chatWithSavitri(currentMessage);
                conversation.push({ speaker: "Savitri", message: savitriResponse, timestamp: new Date().toISOString() });
                
                sendUpdate({
                    type: 'message',
                    speaker: 'Savitri',
                    message: savitriResponse,
                    conversation_length: conversation.length
                });

                // Extract from Savitri's message
                const savitriExtracted = extractEntities(savitriResponse);
                mergeExtractedData(extractedData, savitriExtracted);
                
                if (hasNewEntities(savitriExtracted)) {
                    sendUpdate({
                        type: 'extraction',
                        extracted: savitriExtracted,
                        total: extractedData
                    });
                }

                // Small delay before Ramesh responds
                await new Promise(resolve => setTimeout(resolve, 3000));
                
                // 2. Ramesh's response using REAL MODEL
                sendUpdate({ type: 'status', message: 'Ramesh is typing...' });
                
                const rameshResponse = await chatWithRamesh(savitriResponse);
                conversation.push({ speaker: "Ramesh", message: rameshResponse, timestamp: new Date().toISOString() });
                currentMessage = rameshResponse;
                
                sendUpdate({
                    type: 'message',
                    speaker: 'Ramesh',
                    message: rameshResponse,
                    conversation_length: conversation.length
                });

                // Extract from Ramesh's message
                const rameshExtracted = extractEntities(rameshResponse);
                mergeExtractedData(extractedData, rameshExtracted);
                
                if (hasNewEntities(rameshExtracted)) {
                    sendUpdate({
                        type: 'extraction',
                        extracted: rameshExtracted,
                        total: extractedData
                    });
                }
                
                // Check if we have enough intelligence to complete
                if (extractedData.upi.length > 0 && extractedData.phone.length > 0 && i >= 4) {
                    console.log("🎯 Sufficient intelligence gathered, completing conversation");
                    break;
                }
                
            } catch (error) {
                console.error(`Turn ${i+1} error:`, error);
                sendUpdate({
                    type: 'error',
                    message: `Error in turn ${i+1}: ${error.message}`
                });
                break;
            }
        }
        
        // Generate final report
        const finalReport = {
            conversation_log: conversation,
            extracted_intelligence: extractedData,
            honeycomb_api_key: generateHoneycombApiKey({
                scammer_intent: "Tech Support Fraud",
                extracted_info: conversation.filter(msg => msg.speaker === "Ramesh").map(msg => msg.message)
            })
        };
        
        // Send final results
        sendUpdate({
            type: 'complete',
            data: finalReport
        });

        res.end();
        
    } catch (error) {
        console.error("❌ Bot conversation error:", error);
        res.json({ 
            success: false, 
            error: "Failed to run bot conversation: " + error.message 
        });
    }
});

// Helper function to check if extraction has new entities
function hasNewEntities(extracted) {
    return extracted.upi.length > 0 || 
           extracted.bank_account.length > 0 || 
           extracted.links.length > 0 || 
           extracted.phone.length > 0;
}

// Helper function to merge extracted data
function mergeExtractedData(existing, newData) {
    existing.upi = [...new Set([...existing.upi, ...newData.upi])];
    existing.bank_account = [...new Set([...existing.bank_account, ...newData.bank_account])];
    existing.links = [...new Set([...existing.links, ...newData.links])];
    existing.phone = [...new Set([...existing.phone, ...newData.phone])];
}
router.post('/start-honeypot', (req, res) => {
    console.log("🛡️  Starting Agentic Honeypot Simulation...");

    const scriptPath = path.join(__dirname, '../../ramesh_bot/honeypot_final.py');
    const reportPath = path.join(__dirname, '../../ramesh_bot/scam_report.json');
    const pythonCommand = `python "${scriptPath}"`;

    exec(pythonCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Execution Error: ${error.message}`);
            return res.status(500).json({ 
                success: false, 
                error: "Failed to run AI Agents. Ensure Ollama is running." 
            });
        }

        console.log("🐍 Python Output:", stdout);

        fs.readFile(reportPath, 'utf8', (err, data) => {
            if (err) {
                console.error("❌ Report Read Error:", err);
                return res.status(500).json({ success: false, error: "Report file not found." });
            }

            try {
                const jsonData = JSON.parse(data);
                
                // Extract entities from the Python bot conversation
                const extractedData = extractEntities(JSON.stringify(jsonData.extracted_info));
                
                res.json({
                    success: true,
                    message: "Honeypot Mission Complete",
                    data: jsonData,
                    extracted_entities: extractedData,
                    honeycomb_api_key: generateHoneycombApiKey(jsonData)
                });
            } catch (parseError) {
                res.status(500).json({ success: false, error: "Invalid JSON from Python script." });
            }
        });
    });
});

// Generate final API key with scammer details
function generateHoneycombApiKey(scamData) {
    const timestamp = new Date().toISOString();
    const apiKey = `HC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
        api_key: apiKey,
        scammer_profile: {
            threat_level: "HIGH",
            scam_type: scamData.scammer_intent || "Unknown",
            extracted_intelligence: scamData.extracted_info || [],
            detection_timestamp: timestamp,
            confidence_score: 0.95,
            honeypot_session_id: `HP_${Date.now()}`
        }
    };
}

// API endpoint for testing individual chat with Ramesh
router.post('/test-ramesh', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        console.log(`🧪 Testing Ramesh with: "${message}"`);
        
        const response = await chatWithRamesh(message);
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

// API endpoint for testing individual chat with Savitri
router.post('/test-savitri', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        console.log(`🧪 Testing Savitri with: "${message}"`);
        
        const response = await chatWithSavitri(message);
        const extracted = extractEntities(response);
        
        res.json({
            success: true,
            input: message,
            savitri_response: response,
            extracted_entities: extracted,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("❌ Test Savitri error:", error);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// API endpoint for quick conversation simulation
router.post('/quick-conversation', async (req, res) => {
    try {
        const { turns = 4 } = req.body;
        
        console.log(`🚀 Starting quick conversation with ${turns} turns`);
        
        const conversation = [];
        let extractedData = { upi: [], bank_account: [], links: [], phone: [] };
        
        // Start with Ramesh
        let currentMessage = "Hello madam, I am from Microsoft support. Your computer has virus.";
        let rameshMessage = await chatWithRamesh("Introduce yourself as Microsoft support and mention computer virus problem.");
        
        conversation.push({ 
            speaker: "Ramesh", 
            message: rameshMessage, 
            timestamp: new Date().toISOString() 
        });
        
        // Extract from initial message
        const initialExtracted = extractEntities(rameshMessage);
        mergeExtractedData(extractedData, initialExtracted);
        
        // Run conversation turns
        for (let i = 0; i < turns; i++) {
            // Savitri responds
            const savitriResponse = await chatWithSavitri(rameshMessage);
            conversation.push({ 
                speaker: "Savitri", 
                message: savitriResponse, 
                timestamp: new Date().toISOString() 
            });
            
            const savitriExtracted = extractEntities(savitriResponse);
            mergeExtractedData(extractedData, savitriExtracted);
            
            // Ramesh responds
            rameshMessage = await chatWithRamesh(savitriResponse);
            conversation.push({ 
                speaker: "Ramesh", 
                message: rameshMessage, 
                timestamp: new Date().toISOString() 
            });
            
            const rameshExtracted = extractEntities(rameshMessage);
            mergeExtractedData(extractedData, rameshExtracted);
        }
        
        // Generate API key
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

// Health check endpoint for deployment
router.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});

export default router;