/**
 * Smart Context-Aware Response Generator
 * Generates highly specific responses based on exact scam type and context
 */

// Helper to randomly select from array
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Track what has been said to avoid repetition per session
const responseMemory = new Map();
const topicMemory = new Map();

function hasUsedResponse(sessionId, response) {
    if (!responseMemory.has(sessionId)) {
        responseMemory.set(sessionId, new Set());
    }
    const used = responseMemory.get(sessionId);
    return used.has(response);
}

function markResponseUsed(sessionId, response) {
    if (!responseMemory.has(sessionId)) {
        responseMemory.set(sessionId, new Set());
    }
    responseMemory.get(sessionId).add(response);
}

function hasDiscussedTopic(sessionId, topic) {
    if (!topicMemory.has(sessionId)) {
        topicMemory.set(sessionId, new Set());
    }
    return topicMemory.get(sessionId).has(topic);
}

function markTopicDiscussed(sessionId, topic) {
    if (!topicMemory.has(sessionId)) {
        topicMemory.set(sessionId, new Set());
    }
    topicMemory.get(sessionId).add(topic);
}

function getUniqueResponse(sessionId, responses) {
    // Shuffle responses for variety
    const shuffled = [...responses].sort(() => Math.random() - 0.5);
    
    // Try to find an unused response
    for (const response of shuffled) {
        if (!hasUsedResponse(sessionId, response)) {
            markResponseUsed(sessionId, response);
            return response;
        }
    }
    
    // If all used, return a modified version
    const base = randomChoice(responses);
    const variations = [
        base,
        base.replace('?', '. Can you help?'),
        base.replace('I', 'I really'),
        base.replace('.', '...')
    ];
    
    return randomChoice(variations);
}

// Analyze conversation history for deep context
function analyzeConversationContext(conversationHistory) {
    const context = {
        hasAskedAboutPayment: false,
        hasAskedAboutOTP: false,
        hasAskedAboutDetails: false,
        hasExpressedConcern: false,
        hasExpressedTrust: false,
        hasExpressedConfusion: false,
        hasAskedForProof: false,
        mentionedUPI: false,
        mentionedBank: false,
        mentionedPhone: false,
        scammerPressure: 0,
        scammerMentionedAmount: false,
        scammerMentionedUrgency: false,
        lastUserEmotion: 'neutral',
        topicsDiscussed: []
    };
    
    conversationHistory.forEach((msg, idx) => {
        const text = msg.text.toLowerCase();
        
        if (msg.sender === 'user') {
            // Track what user has said
            if (/payment|pay|send|transfer|money/.test(text)) {
                context.hasAskedAboutPayment = true;
                context.topicsDiscussed.push('payment');
            }
            if (/otp|code|password|pin/.test(text)) {
                context.hasAskedAboutOTP = true;
                context.topicsDiscussed.push('otp');
            }
            if (/details|information|account|number/.test(text)) {
                context.hasAskedAboutDetails = true;
                context.topicsDiscussed.push('details');
            }
            if (/worried|scared|concerned|afraid/.test(text)) {
                context.hasExpressedConcern = true;
                context.lastUserEmotion = 'concerned';
            }
            if (/trust|okay|ready|convinced|understand/.test(text)) {
                context.hasExpressedTrust = true;
                context.lastUserEmotion = 'trusting';
            }
            if (/confused|don't understand|what|why|how/.test(text)) {
                context.hasExpressedConfusion = true;
                context.lastUserEmotion = 'confused';
            }
            if (/prove|verify|legitimate|real|sure/.test(text)) {
                context.hasAskedForProof = true;
            }
            if (/upi/.test(text)) context.mentionedUPI = true;
            if (/bank|account/.test(text)) context.mentionedBank = true;
            if (/phone|call|number/.test(text)) context.mentionedPhone = true;
        }
        
        if (msg.sender === 'scammer') {
            // Track scammer tactics
            if (/urgent|immediate|now|quickly|hurry|fast/.test(text)) {
                context.scammerPressure++;
                context.scammerMentionedUrgency = true;
            }
            if (/rs|rupees|\d+|amount|fee|charge/.test(text)) {
                context.scammerMentionedAmount = true;
            }
        }
    });
    
    return context;
}

// Generate highly context-specific responses based on scam type and conversation flow
export function generateSmartResponse(message, scamType, conversationLength, sessionId = 'default', conversationHistory = []) {
    const lower = message.toLowerCase();
    const context = analyzeConversationContext(conversationHistory);
    
    // INTELLIGENT RESPONSE GENERATION BASED ON CONTEXT
    
    // PRIORITY: Check for specific scam patterns FIRST before generic greetings
    
    // Electricity/Utility Bill Scams - HIGHEST PRIORITY
    if (/electricity|power|disconnect|bill|utility/i.test(lower) && conversationLength < 2) {
        if (!hasDiscussedTopic(sessionId, 'electricity-initial')) {
            markTopicDiscussed(sessionId, 'electricity-initial');
            return getUniqueResponse(sessionId, [
                "Power will be cut tonight? But I paid last month's bill! Can you check again?",
                "Disconnection? That's strange. I have auto-pay set up. What's the pending amount?",
                "My electricity bill? I thought it was paid. How much do I owe?",
                "Tonight at 9:30 PM? That's very soon! How can I pay immediately?"
            ]);
        }
    }
    
    // KYC/Banking Scams - HIGH PRIORITY
    if (/kyc|paytm|phonepe|gpay|wallet/i.test(lower) && conversationLength < 2) {
        if (!hasDiscussedTopic(sessionId, 'kyc-initial')) {
            markTopicDiscussed(sessionId, 'kyc-initial');
            return getUniqueResponse(sessionId, [
                "KYC suspended? But I just used my Paytm yesterday. What exactly is the problem?",
                "My KYC expired? I don't remember getting any notification. How do I update it?",
                "Wait, my wallet will be blocked? I have money in there! What should I do?",
                "KYC issue? Can you tell me which documents I need to submit?"
            ]);
        }
    }
    
    // Police/CBI/Digital Arrest - HIGH PRIORITY
    if (/police|cbi|ncb|arrest|investigation|crime/i.test(lower) && conversationLength < 2) {
        if (!hasDiscussedTopic(sessionId, 'police-initial')) {
            markTopicDiscussed(sessionId, 'police-initial');
            return getUniqueResponse(sessionId, [
                "CBI? Digital arrest? I don't understand what that means. What did I do wrong?",
                "Police investigation? I'm a law-abiding citizen! What is this about?",
                "Arrest? I'm really scared now. Can you please explain what's happening?",
                "Investigation against me? For what? I haven't done anything illegal!"
            ]);
        }
    }
    
    // FedEx/Courier Scams - HIGH PRIORITY
    if (/fedex|bluedart|dhl|courier|parcel/i.test(lower) && /drug|illegal|passport|custom/i.test(lower) && conversationLength < 2) {
        if (!hasDiscussedTopic(sessionId, 'fedex-initial')) {
            markTopicDiscussed(sessionId, 'fedex-initial');
            return getUniqueResponse(sessionId, [
                "Drugs in my parcel? That's impossible! I didn't order anything. Who sent this package?",
                "Wait, what? I never ordered any parcel. Can you tell me the sender's name?",
                "This must be a mistake. I don't even know anyone abroad. What's the tracking number?",
                "Illegal items? I'm scared now. What should I do? Should I go to the police station?"
            ]);
        }
    }
    
    // Job Offers - HIGH PRIORITY
    if (/job|work.*home|earn|part.*time|amazon|google|flipkart/i.test(lower) && /daily|income|salary/i.test(lower) && conversationLength < 2) {
        if (!hasDiscussedTopic(sessionId, 'job-initial')) {
            markTopicDiscussed(sessionId, 'job-initial');
            return getUniqueResponse(sessionId, [
                "Rs 5000 daily? That sounds amazing! What kind of work is it? Is it legitimate?",
                "Part-time job at Amazon? Really? What are the requirements? Do I need experience?",
                "Work from home? I'm interested! How many hours per day? What's the process to join?",
                "Earn money daily? That's great! But how do I know this is not a scam?"
            ]);
        }
    }
    
    // Lottery/Prize Scams - HIGH PRIORITY
    if (/won|lottery|prize|kbc|lakh|congratulation|winner/i.test(lower) && conversationLength < 2) {
        if (!hasDiscussedTopic(sessionId, 'lottery-initial')) {
            markTopicDiscussed(sessionId, 'lottery-initial');
            return getUniqueResponse(sessionId, [
                "I won 25 lakhs? Really? But I don't remember entering any lottery. How is this possible?",
                "KBC lucky draw? I never participated in KBC. Are you sure you have the right person?",
                "Won a prize? This is exciting! But how did you get my number? What do I need to do?",
                "25 lakhs! That's a lot of money! Is this real? How do I claim it?"
            ]);
        }
    }
    
    // Tax Refund - HIGH PRIORITY
    if (/tax|refund|income tax|itr|return/i.test(lower) && conversationLength < 2) {
        if (!hasDiscussedTopic(sessionId, 'tax-initial')) {
            markTopicDiscussed(sessionId, 'tax-initial');
            return getUniqueResponse(sessionId, [
                "Tax refund? I did file my returns. How long does it take to get the money?",
                "Income Tax refund? That's good news! Do I need to verify my bank account?",
                "Refund pending? I wasn't expecting this. Is this from last year's ITR?",
                "Tax refund? Great! What documents do I need to provide?"
            ]);
        }
    }
    
    // Traffic Challan - HIGH PRIORITY
    if (/challan|fine|traffic|violation|penalty/i.test(lower) && conversationLength < 2) {
        if (!hasDiscussedTopic(sessionId, 'challan-initial')) {
            markTopicDiscussed(sessionId, 'challan-initial');
            return getUniqueResponse(sessionId, [
                "Traffic challan? I don't remember any violation. What's this about?",
                "Pending fine? Can you tell me when and where this happened?",
                "Traffic penalty? I'm confused. What did I do wrong?",
                "Challan? I always follow traffic rules. Are you sure this is for me?"
            ]);
        }
    }
    
    // ONLY AFTER checking all scam patterns, handle casual greetings
    if (conversationLength === 0 || conversationLength === 1) {
        
        // Pure casual greetings with NO scam keywords
        if (/^(hello|hi|hey|good morning|good evening|good afternoon|greetings)[\s\?\!]*$/i.test(lower.trim())) {
            return getUniqueResponse(sessionId, [
                "Hello! I'm good, thank you. How can I help you?",
                "Hi there! I'm doing well. What's this about?",
                "Hello! Yes, I'm fine. Is there something you need?",
                "Hi! I'm okay. What can I do for you?"
            ]);
        }
        
        // "How are you" type messages
        if (/^how are you|how r u|how do you do[\s\?\!]*$/i.test(lower.trim())) {
            return getUniqueResponse(sessionId, [
                "I'm good, thank you! What's this regarding?",
                "I'm fine, thanks for asking. How can I help you?",
                "I'm doing well. Is there something you wanted to discuss?",
                "I'm okay. What did you want to talk about?"
            ]);
        }
    }
    
    // Phase 1: Initial Contact (0-2 messages) - Show confusion and concern
    if (conversationLength < 2) {
        
        // Generic urgent/block messages (if not caught by specific patterns above)
        if (/urgent|immediate|block|suspend|expire/i.test(lower)) {
            return getUniqueResponse(sessionId, [
                "What? Why is this so urgent? Can you explain what's happening?",
                "Blocked? I'm worried now. What exactly is the issue?",
                "This sounds serious. Can you tell me more details?",
                "I don't understand. Why would this happen to me?"
            ]);
        }
    }
    
    // Phase 2: Building Trust (2-4 messages) - Ask questions, show interest
    if (conversationLength >= 2 && conversationLength < 4) {
        
        // OTP/Password requests - Show concern but interest
        if (/otp|code|password|pin|cvv/.test(lower) && !hasDiscussedTopic(sessionId, 'otp-concern')) {
            markTopicDiscussed(sessionId, 'otp-concern');
            return getUniqueResponse(sessionId, [
                "You need my OTP? I've heard we should never share OTP. Are you sure this is safe?",
                "Share the code? But isn't OTP meant to be private? How else can I verify?",
                "OTP for verification? Can't you verify from your system? Why do you need my OTP?",
                "I'm a bit hesitant to share OTP. Can you explain why it's needed?"
            ]);
        }
        
        // Payment requests - Show willingness but ask for details
        if (/pay|money|transfer|send|rs|rupees/.test(lower) && !hasDiscussedTopic(sessionId, 'payment-details')) {
            markTopicDiscussed(sessionId, 'payment-details');
            
            if (context.scammerMentionedAmount) {
                return getUniqueResponse(sessionId, [
                    "Okay, I understand there's a fee. What's your UPI ID? Or should I use bank transfer?",
                    "How much exactly? And where should I send it? UPI or bank account?",
                    "Payment needed? Can you give me the account details? Is there a reference number?",
                    "I'm ready to pay. Just tell me the exact amount and your payment details."
                ]);
            } else {
                return getUniqueResponse(sessionId, [
                    "Payment? How much do I need to pay? What's this for exactly?",
                    "Send money? Can you tell me the amount first? And why is this needed?",
                    "I need to pay something? What's the charge for? How much?"
                ]);
            }
        }
        
        // Download/Link requests
        if (/download|install|click|link|website|app/.test(lower) && !hasDiscussedTopic(sessionId, 'download')) {
            markTopicDiscussed(sessionId, 'download');
            return getUniqueResponse(sessionId, [
                "Download an app? Which app is it? Is it safe? Where do I get it from?",
                "Install something? Can you send me the official link? I want to make sure it's legitimate.",
                "Click on a link? I'm a bit worried about clicking unknown links. Is this official?",
                "What app do I need? Can I get it from Play Store?"
            ]);
        }
        
        // Phone/Call requests
        if (/call|phone|number|contact|speak/.test(lower) && !hasDiscussedTopic(sessionId, 'phone')) {
            markTopicDiscussed(sessionId, 'phone');
            return getUniqueResponse(sessionId, [
                "Call you? What's your number? Is this a toll-free helpline?",
                "I should call? Okay, what number? And what should I say when I call?",
                "Phone number? Let me note it down. What's the best time to call?",
                "Should I call now? Or can we resolve this through messages?"
            ]);
        }
        
        // Generic clarification
        return getUniqueResponse(sessionId, [
            "I see. What do I need to do next? Please guide me step by step.",
            "Okay, I'm following. What's the next step in this process?",
            "I understand so far. What happens after this?",
            "Alright. Can you explain the complete procedure?"
        ]);
    }
    
    // Phase 3: Growing Confidence (4-8 messages) - Show trust, ready to act
    if (conversationLength >= 4 && conversationLength < 8) {
        
        // Payment context - Show readiness
        if (/pay|money|upi|bank|transfer|send/.test(lower)) {
            
            if (context.mentionedUPI && !context.mentionedBank) {
                return getUniqueResponse(sessionId, [
                    "Should I use bank transfer instead? What's your account number?",
                    "I can also do NEFT or IMPS. Which is faster for you?",
                    "Do you have a bank account? I'm more comfortable with that.",
                    "UPI or bank transfer - which do you prefer? I can do both."
                ]);
            } else if (context.hasAskedAboutPayment) {
                return getUniqueResponse(sessionId, [
                    "I'm ready to send. Just confirm the amount and account details once more.",
                    "Let me open my banking app. What's the exact amount again?",
                    "Should I send the full amount now or in parts?",
                    "Okay, I have my phone ready. Tell me where to send the money."
                ]);
            } else {
                return getUniqueResponse(sessionId, [
                    "Alright, I'm ready to pay. What's your UPI ID? Or bank account number?",
                    "I'll send the money. Just tell me where to send it. UPI or bank transfer?",
                    "Payment details? Give me your UPI ID or account number. I'll transfer now.",
                    "I trust you. Just send me your payment details and I'll do it immediately."
                ]);
            }
        }
        
        // Urgency/Pressure - Show compliance
        if (context.scammerPressure >= 2 || /urgent|immediate|now|hurry|quick/.test(lower)) {
            return getUniqueResponse(sessionId, [
                "Okay okay, I'm doing it now! Don't worry. Just tell me the final details.",
                "I understand the urgency. Let me complete this right away.",
                "Yes, I'm hurrying! Just guide me through the last steps.",
                "I don't want any problems. Tell me exactly what to do right now."
            ]);
        }
        
        // Generic trust-building
        return getUniqueResponse(sessionId, [
            "Alright, I understand. What's the next step? I'm ready to proceed.",
            "Okay, I'm convinced. Tell me exactly what I need to do.",
            "I'm ready to help resolve this. What information do you need from me?",
            "This sounds serious. I'll do whatever is needed. Guide me."
        ]);
    }
    
    // Phase 4: Ready to Comply (8+ messages) - Full trust, eager to help
    if (conversationLength >= 8) {
        
        // High pressure situations
        if (context.scammerPressure >= 3) {
            return getUniqueResponse(sessionId, [
                "Okay okay, I'm doing it now! Don't worry. Just tell me the final details.",
                "I understand! I'm opening the app right now. What should I do?",
                "Please don't block my account! I'm ready to do whatever you say!",
                "I'm panicking! Just tell me step by step what to do!"
            ]);
        }
        
        // Payment finalization
        if (/pay|send|transfer|money/.test(lower)) {
            return getUniqueResponse(sessionId, [
                "I have my phone ready. What's the exact amount and your UPI ID?",
                "Opening my banking app now. Tell me your account details.",
                "I'm ready to send. Just confirm the payment details one last time.",
                "Let me transfer the money right now. What's your UPI ID again?"
            ]);
        }
        
        // Generic compliance
        return getUniqueResponse(sessionId, [
            "I trust you're helping me. What specific details do you need? I'll provide everything.",
            "I'm ready to complete this. Just tell me the exact steps and I'll follow.",
            "Okay, let's finish this. What do I need to do right now?",
            "I have my phone ready. Walk me through the process step by step."
        ]);
    }
    
    // Fallback - should rarely reach here
    return getUniqueResponse(sessionId, [
        "I'm listening. What should I do?",
        "Can you explain that again? I want to make sure I understand.",
        "Okay, I'm ready. What's next?",
        "Tell me what I need to do. I'll follow your instructions."
    ]);
}
