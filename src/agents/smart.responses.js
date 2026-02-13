/**
 * Advanced Smart Context-Aware Response Generator
 * Handles ANY type of scam with intelligent pattern recognition
 */

// Helper to randomly select from array
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Track what has been said to avoid repetition per session
const responseMemory = new Map();
const contextMemory = new Map();

function hasUsedResponse(sessionId, response) {
    if (!responseMemory.has(sessionId)) {
        responseMemory.set(sessionId, new Set());
    }
    return responseMemory.get(sessionId).has(response);
}

function markResponseUsed(sessionId, response) {
    if (!responseMemory.has(sessionId)) {
        responseMemory.set(sessionId, new Set());
    }
    responseMemory.get(sessionId).add(response);
}

function getSessionContext(sessionId) {
    if (!contextMemory.has(sessionId)) {
        contextMemory.set(sessionId, {
            scamType: null,
            emotionalState: 'neutral',
            topicsDiscussed: new Set(),
            hasAskedAbout: new Set()
        });
    }
    return contextMemory.get(sessionId);
}

function getUniqueResponse(sessionId, responses) {
    const shuffled = [...responses].sort(() => Math.random() - 0.5);
    
    for (const response of shuffled) {
        if (!hasUsedResponse(sessionId, response)) {
            markResponseUsed(sessionId, response);
            return response;
        }
    }
    
    const base = randomChoice(responses);
    const variations = [
        base,
        base.replace('?', '. Can you help?'),
        base.replace('I', 'I really'),
        base.replace('.', '...')
    ];
    
    return randomChoice(variations);
}

// Advanced context analysis
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
    
    conversationHistory.forEach((msg) => {
        const text = msg.text.toLowerCase();
        
        if (msg.sender === 'user') {
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

// Intelligent scam type detection
function detectScamIntent(message) {
    const lower = message.toLowerCase();
    
    // Financial urgency indicators
    if (/urgent|immediate|now|today|tonight|expire|block|suspend|disconnect|cancel/.test(lower)) {
        return 'urgent_threat';
    }
    
    // Payment/Money indicators
    if (/pay|send|transfer|upi|bank|account|money|rs|rupees|fee|charge|deposit/.test(lower)) {
        return 'payment_request';
    }
    
    // Credential theft indicators
    if (/otp|password|pin|cvv|code|verify|share|update|link/.test(lower)) {
        return 'credential_theft';
    }
    
    // Prize/Reward indicators
    if (/won|winner|prize|lottery|congratulation|reward|cashback|refund/.test(lower)) {
        return 'prize_scam';
    }
    
    // Job/Income indicators
    if (/job|work|earn|income|salary|part.*time|home/.test(lower)) {
        return 'job_scam';
    }
    
    // Authority/Threat indicators
    if (/police|cbi|court|legal|arrest|investigation|officer|department/.test(lower)) {
        return 'authority_threat';
    }
    
    // Impersonation indicators
    if (/friend|hospital|help|emergency|trouble|accident/.test(lower)) {
        return 'impersonation';
    }
    
    // Service/Account indicators
    if (/account|service|subscription|membership|kyc|update|renew/.test(lower)) {
        return 'account_threat';
    }
    
    return 'general_scam';
}

// Generate intelligent response based on scam intent
export function generateSmartResponse(message, scamType, conversationLength, sessionId = 'default', conversationHistory = []) {
    const lower = message.toLowerCase();
    const context = analyzeConversationContext(conversationHistory);
    const sessionCtx = getSessionContext(sessionId);
    const intent = detectScamIntent(message);
    
    // Store scam type for session
    if (!sessionCtx.scamType) {
        sessionCtx.scamType = intent;
    }
    
    // INTELLIGENT RESPONSE GENERATION BASED ON CONTEXT
    
    // PHASE-BASED INTELLIGENT RESPONSES (Works for ANY scam type)
    // Expanded response pool with 10+ variations per intent
    
    // Phase 1: Initial Contact (0-2 messages) - Show appropriate concern based on intent
    if (conversationLength < 2) {
        
        switch (intent) {
            case 'urgent_threat':
                return getUniqueResponse(sessionId, [
                    "What? This is urgent? I'm worried now. Can you explain what's happening?",
                    "Tonight? That's very soon! What exactly is the problem?",
                    "Blocked? I'm concerned. What do I need to do?",
                    "This sounds serious. Can you tell me more details?",
                    "I don't understand. Why would this happen to me?",
                    "Urgent? I'm getting nervous. What's going on?",
                    "Immediately? That's scary! What should I do first?",
                    "Expire? I didn't know about this. How can I fix it?",
                    "Disconnect? But I need this service! What's the issue?",
                    "Cancel? No, please don't! What do I need to do?",
                    "Suspend? I'm panicking! Tell me how to resolve this.",
                    "Block my account? I have important things there! Help me!",
                    "Today? That's too soon! Can you give me more time?",
                    "Right now? I'm at work. Can I do this later?",
                    "This minute? Okay, I'm listening. What's the procedure?"
                ]);
            
            case 'payment_request':
                return getUniqueResponse(sessionId, [
                    "Payment needed? How much exactly? What's this for?",
                    "Send money? Can you tell me more about this?",
                    "I need to pay? What's the amount and why?",
                    "Fee required? Can you explain the charges?",
                    "Transfer? To which account? Is this official?",
                    "Deposit? How much? And where should I send it?",
                    "Charge? I wasn't expecting this. What's it for?",
                    "Amount? Let me check my balance first. How much?",
                    "Pay now? Can I pay later? What's the deadline?",
                    "Money? I'm a bit short right now. Is this mandatory?",
                    "Rs? How many rupees exactly? And to whom?",
                    "UPI? Sure, but first tell me what this payment is for.",
                    "Bank transfer? Okay, but I need to verify this first.",
                    "Processing fee? That's normal, right? How much?",
                    "Registration charge? Is this refundable?"
                ]);
            
            case 'credential_theft':
                return getUniqueResponse(sessionId, [
                    "You need my OTP? I've heard we shouldn't share that. Is this safe?",
                    "Share my password? I'm not sure about this. Can you verify?",
                    "Update my details? How do I know this is legitimate?",
                    "Verify my account? What information do you need?",
                    "My PIN? I thought that's supposed to be secret?",
                    "CVV number? Isn't that on the back of my card?",
                    "Security code? Why do you need that?",
                    "Link my account? Is this a secure process?",
                    "Confirm my identity? What details do you need?",
                    "Validate? How do I do that? Walk me through it.",
                    "Authentication? What kind of verification is this?",
                    "Code sent to my phone? Let me check. What should I do with it?",
                    "6-digit number? I got it. Should I tell you?",
                    "Verification link? Should I click on it?",
                    "Update password? Why? Was there a security issue?"
                ]);
            
            case 'prize_scam':
                return getUniqueResponse(sessionId, [
                    "I won something? Really? I don't remember entering any contest!",
                    "Prize? That's exciting! But how did you get my number?",
                    "Congratulations? What did I win? Is this real?",
                    "Reward? I'm surprised! What do I need to do to claim it?",
                    "Winner? Me? I never participate in these things!",
                    "Lucky draw? Which one? I don't recall entering.",
                    "25 lakhs? That's a lot! Is this legitimate?",
                    "Lottery? I'm skeptical but interested. Tell me more.",
                    "Cashback? How much? And from which transaction?",
                    "Bonus? That's great! What's the catch?",
                    "Gift? For me? What's the occasion?",
                    "Scratch card? I won? How do I claim it?",
                    "Jackpot? Seriously? This sounds too good to be true!",
                    "Contest winner? Which contest was this?",
                    "Free prize? Nothing is free. What do I need to do?"
                ]);
            
            case 'job_scam':
                return getUniqueResponse(sessionId, [
                    "Job opportunity? That sounds interesting! What kind of work is it?",
                    "Work from home? I'm interested! What are the requirements?",
                    "Earn money? Tell me more about this. Is it legitimate?",
                    "Part-time job? Great! What's the process to join?",
                    "Income opportunity? I need extra money. What's involved?",
                    "Daily earnings? How much can I make? What's the work?",
                    "Amazon job? Really? I thought they don't hire like this.",
                    "Google work? That's my dream! What's the role?",
                    "Data entry? I can type fast. What's the pay?",
                    "Online work? Perfect for me! When can I start?",
                    "Freelance? I'm looking for flexible work. Tell me more.",
                    "Commission based? How much per task?",
                    "Simple work? Sounds good. What exactly do I need to do?",
                    "No experience needed? That's perfect for me!",
                    "2 hours work? And I can earn how much?"
                ]);
            
            case 'authority_threat':
                return getUniqueResponse(sessionId, [
                    "Police? CBI? I'm really scared now. What did I do wrong?",
                    "Legal action? I don't understand. I haven't done anything illegal!",
                    "Investigation? This is frightening. Can you explain what's happening?",
                    "Court case? I'm a law-abiding citizen! What is this about?",
                    "Arrest? No, please! I haven't committed any crime!",
                    "Officer? Am I in trouble? What's this regarding?",
                    "Department? Which department? What's the issue?",
                    "Summons? Court summons? For what reason?",
                    "Warrant? Arrest warrant? This must be a mistake!",
                    "Crime? What crime? I don't understand!",
                    "Illegal? I've never done anything illegal in my life!",
                    "Narcotics? Drugs? I don't even smoke!",
                    "Money laundering? That's serious! But I'm innocent!",
                    "Fraud case? Against me? This is wrong!",
                    "Digital arrest? What does that even mean?"
                ]);
            
            case 'impersonation':
                return getUniqueResponse(sessionId, [
                    "Oh no! Are you okay? What happened? How can I help?",
                    "Hospital? That's terrible! What do you need from me?",
                    "Emergency? I'm worried about you. Tell me what's going on.",
                    "Trouble? I'm here to help. What can I do?",
                    "Accident? Are you hurt? Should I come there?",
                    "Help needed? Of course! What's the situation?",
                    "Urgent help? I'm here. What do you need?",
                    "Problem? Tell me everything. I'll try to help.",
                    "Stuck? Where are you? What happened?",
                    "Money needed? How much? What's it for?",
                    "Can't access? Your account? What's wrong?",
                    "Phone not working? Use mine. What do you need?",
                    "Wallet stolen? That's awful! How can I assist?",
                    "Stranded? Where? Should I send someone?",
                    "Medical emergency? I'm calling an ambulance!"
                ]);
            
            case 'account_threat':
                return getUniqueResponse(sessionId, [
                    "My account? What's wrong with it? I just used it recently!",
                    "Suspended? But I haven't done anything wrong. What's the issue?",
                    "Update required? I don't remember getting any notification about this.",
                    "Service blocked? I have important things there! What should I do?",
                    "Expired? Already? I thought I had more time!",
                    "Inactive? But I use it regularly! What's going on?",
                    "Verification needed? Okay, how do I verify?",
                    "KYC pending? I completed it last year. Do I need to do it again?",
                    "Documents required? Which documents? Where should I submit?",
                    "Renewal? How much does it cost? When's the deadline?",
                    "Membership? I didn't know it expires. How do I renew?",
                    "Subscription? I thought it was auto-renew. What happened?",
                    "Access denied? Why? I need to access my files!",
                    "Login failed? Is there a technical issue?",
                    "Profile incomplete? What information is missing?"
                ]);
            
            default:
                return getUniqueResponse(sessionId, [
                    "I'm not sure I understand. Can you explain more?",
                    "This is concerning. What exactly is happening?",
                    "Can you tell me more details about this?",
                    "I'm listening. What do I need to know?",
                    "Okay, I'm here. What's this about?",
                    "I'm confused. Can you clarify?",
                    "What exactly do you mean? Please explain.",
                    "I want to understand. Tell me more.",
                    "This is new to me. What should I do?",
                    "I'm paying attention. Continue please.",
                    "Alright, I'm following. What's next?",
                    "I see. What do you need from me?",
                    "Okay, go ahead. I'm listening carefully.",
                    "I'm here to help. What's the situation?",
                    "Tell me everything. I want to understand fully."
                ]);
        }
    }
    
    // Phase 2: Building Trust (2-4 messages) - Ask questions, show interest
    // Expanded with 15+ variations per category
    if (conversationLength >= 2 && conversationLength < 4) {
        
        // OTP/Password requests
        if (/otp|code|password|pin|cvv/.test(lower)) {
            return getUniqueResponse(sessionId, [
                "You need my OTP? I've heard we should never share OTP. Are you sure this is safe?",
                "Share the code? But isn't that meant to be private? How else can I verify?",
                "My password? I'm a bit hesitant. Can you explain why it's needed?",
                "Security code? Is there another way to do this?",
                "The 6-digit number? I got it on my phone. Should I tell you?",
                "PIN? I thought banks never ask for PIN. Is this different?",
                "CVV? That's on my card. Why do you need it?",
                "Verification code? Let me check my messages. What should I do with it?",
                "OTP just arrived. Do I need to read it out to you?",
                "Password reset? I didn't request this. What's going on?",
                "Security question? Which one? I set up several.",
                "Authentication? What kind? SMS or email?",
                "Two-factor code? I have it. Where should I enter it?",
                "Confirm my identity? What details do you need exactly?",
                "Secret code? I'm not comfortable sharing. Is there another way?"
            ]);
        }
        
        // Payment requests
        if (/pay|money|transfer|send|rs|rupees|fee|charge/.test(lower)) {
            if (context.scammerMentionedAmount) {
                return getUniqueResponse(sessionId, [
                    "Okay, I understand there's a fee. What's your UPI ID? Or should I use bank transfer?",
                    "How much exactly? And where should I send it?",
                    "Payment needed? Can you give me the account details?",
                    "I'm ready to pay. Just tell me the exact amount and your payment details.",
                    "That amount seems reasonable. What's your payment method?",
                    "Should I pay the full amount now or can I pay in installments?",
                    "UPI or bank transfer? Which is faster?",
                    "Do you accept credit card? Or only UPI?",
                    "Let me open my banking app. What's the UPI ID again?",
                    "I'll transfer now. What's the beneficiary name?",
                    "Should I add any reference number while paying?",
                    "After I pay, how long will it take to process?",
                    "Will I get a receipt or confirmation?",
                    "Is this payment refundable if something goes wrong?",
                    "Can I pay through Google Pay or PhonePe?"
                ]);
            } else {
                return getUniqueResponse(sessionId, [
                    "Payment? How much do I need to pay? What's this for exactly?",
                    "Send money? Can you tell me the amount first?",
                    "Fee required? What's the charge for? How much?",
                    "Money transfer? To whom? And for what purpose?",
                    "Charges? I wasn't informed about any charges. How much?",
                    "Pay? Sure, but first tell me what this is for.",
                    "Amount? Let me check my balance. How much do you need?",
                    "Fee? Is this mandatory or optional?",
                    "Cost? I need to know the exact amount before proceeding.",
                    "Deposit? How much? And is it refundable?",
                    "Processing fee? That's normal, right? What's the amount?",
                    "Registration charge? How much? And what do I get?",
                    "Advance payment? How much? When do I get the service?",
                    "Security deposit? Is this returned later?",
                    "Transaction fee? Okay, but how much exactly?"
                ]);
            }
        }
        
        // Download/Link requests
        if (/download|install|click|link|website|app/.test(lower)) {
            return getUniqueResponse(sessionId, [
                "Download an app? Which one is it? Is it safe?",
                "Install something? Can you send me the official link?",
                "Click on a link? I'm a bit worried about clicking unknown links.",
                "What app do I need? Can I get it from Play Store?",
                "Website? What's the URL? Is it secure?",
                "APK file? I've heard those can be risky. Is this official?",
                "Link? Let me check if it's legitimate first.",
                "Install from unknown sources? My phone is warning me.",
                "App permissions? What access does it need?",
                "Download size? My data is limited.",
                "Is this app verified? Does it have good reviews?",
                "Chrome is blocking this site. Is it safe?",
                "My antivirus is showing a warning. Should I proceed?",
                "Can you send me a screenshot of the app?",
                "Is there a video tutorial on how to use this?"
            ]);
        }
        
        // Phone/Call requests
        if (/call|phone|number|contact|speak/.test(lower)) {
            return getUniqueResponse(sessionId, [
                "Call you? What's your number? Is this a toll-free helpline?",
                "I should call? Okay, what number? And what should I say?",
                "Phone number? Let me note it down. What's the best time to call?",
                "Should I call now? Or can we resolve this through messages?",
                "Speak to someone? Who should I ask for?",
                "Customer care number? Is it 24/7?",
                "Call back? When? What time?",
                "Helpline? What's the number? Is it free?",
                "Talk to officer? What's their name and number?",
                "Phone call? I prefer messages. Can we continue here?",
                "Dial this number? Let me save it first.",
                "Extension number? After calling, what should I press?",
                "IVR? What options should I select?",
                "Hold time? How long will I have to wait?",
                "Direct line? Or will I go through a menu?"
            ]);
        }
        
        // Generic clarification
        return getUniqueResponse(sessionId, [
            "I see. What do I need to do next? Please guide me step by step.",
            "Okay, I'm following. What's the next step in this process?",
            "I understand so far. What happens after this?",
            "Alright. Can you explain the complete procedure?",
            "Got it. What's the timeline for this?",
            "Makes sense. What documents do I need?",
            "Clear. What are the requirements?",
            "Understood. How long will this take?",
            "I'm with you. What's the next phase?",
            "Okay. Is there anything else I should know?",
            "Right. What are the terms and conditions?",
            "I follow. What's the process after this?",
            "Noted. What should I prepare?",
            "Comprehended. What's the deadline?",
            "I get it. What are my options?"
        ]);
    }
    
    // Phase 3: Growing Confidence (4-8 messages) - Show trust, ready to act
    // Expanded with 20+ variations
    if (conversationLength >= 4 && conversationLength < 8) {
        
        // Payment context
        if (/pay|money|upi|bank|transfer|send/.test(lower)) {
            if (context.mentionedUPI && !context.mentionedBank) {
                return getUniqueResponse(sessionId, [
                    "Should I use bank transfer instead? What's your account number?",
                    "I can also do NEFT or IMPS. Which is faster for you?",
                    "Do you have a bank account? I'm more comfortable with that.",
                    "UPI is convenient but I can do bank transfer too.",
                    "My UPI limit is reached. Can I use net banking?",
                    "PhonePe or Google Pay? Which do you prefer?",
                    "Should I scan a QR code or enter UPI ID?",
                    "Bank transfer takes time but it's safer, right?",
                    "RTGS or NEFT? Which one should I use?",
                    "I have multiple bank accounts. Which bank do you prefer?"
                ]);
            } else if (context.hasAskedAboutPayment) {
                return getUniqueResponse(sessionId, [
                    "I'm ready to send. Just confirm the amount and account details once more.",
                    "Let me open my banking app. What's the exact amount again?",
                    "Should I send the full amount now or in parts?",
                    "Okay, I have my phone ready. Tell me where to send the money.",
                    "My app is open. What's the UPI ID? Let me type it carefully.",
                    "I'm on the payment screen. What should I enter in the remarks?",
                    "Transaction password ready. Just confirm the details.",
                    "Should I take a screenshot after payment?",
                    "Will you send me a confirmation after receiving?",
                    "My bank is asking for OTP. Should I proceed?",
                    "Payment limit warning. Can I send in two transactions?",
                    "Service charge is showing. Is that normal?",
                    "Beneficiary name? What should I see there?",
                    "IFSC code? Do you need that too?",
                    "I'm about to click 'Send'. Any last instructions?"
                ]);
            } else {
                return getUniqueResponse(sessionId, [
                    "Alright, I'm ready to pay. What's your UPI ID? Or bank account number?",
                    "I'll send the money. Just tell me where to send it.",
                    "Payment details? Give me your UPI ID or account number. I'll transfer now.",
                    "I trust you. Just send me your payment details and I'll do it immediately.",
                    "My wallet is ready. What's the payment method?",
                    "I have funds available. Where should I send?",
                    "Let's complete this payment. What are your details?",
                    "I'm convinced. Give me the account information.",
                    "Ready to transfer. What's your preferred method?",
                    "I'll pay right away. Just need your details.",
                    "My banking app is open. What's next?",
                    "I want to finish this quickly. Send me the details.",
                    "Payment mode? UPI, bank, or card?",
                    "I'm prepared. What's your account name?",
                    "Let's do this. What's the payment information?"
                ]);
            }
        }
        
        // Urgency/Pressure
        if (context.scammerPressure >= 2 || /urgent|immediate|now|hurry|quick/.test(lower)) {
            return getUniqueResponse(sessionId, [
                "Okay okay, I'm doing it now! Don't worry. Just tell me the final details.",
                "I understand the urgency. Let me complete this right away.",
                "Yes, I'm hurrying! Just guide me through the last steps.",
                "I don't want any problems. Tell me exactly what to do right now.",
                "I'm rushing! Give me a second to open the app.",
                "Immediately? Okay, I'm on it. What's first?",
                "Right now? I'm doing it. Don't disconnect!",
                "Fast? I'm trying my best. What should I click?",
                "Quickly? My hands are shaking. Guide me.",
                "Urgent? I get it. I'm focused. What's next?",
                "Now? Okay, I'm ready. Tell me step by step.",
                "Hurry? I am! Just don't let anything bad happen!",
                "Quick? I'm moving as fast as I can!",
                "Immediate action? I'm on it. What do I do?",
                "Time sensitive? I understand. I'm doing it now!"
            ]);
        }
        
        // Generic trust-building
        return getUniqueResponse(sessionId, [
            "Alright, I understand. What's the next step? I'm ready to proceed.",
            "Okay, I'm convinced. Tell me exactly what I need to do.",
            "I'm ready to help resolve this. What information do you need from me?",
            "This sounds serious. I'll do whatever is needed. Guide me.",
            "I trust your guidance. What should I do next?",
            "I'm committed to fixing this. What's required?",
            "I believe you're helping me. What's the procedure?",
            "I'm prepared to cooperate fully. What do you need?",
            "I'm confident this will work. What's next?",
            "I'm ready to take action. Just tell me how.",
            "I'm willing to do this. What are the steps?",
            "I'm on board. What's the plan?",
            "I'm determined to resolve this. Guide me through.",
            "I'm trusting this process. What happens now?",
            "I'm committed. What do I need to provide?"
        ]);
    }
    
    // Phase 4: Ready to Comply (8+ messages) - Full trust, eager to help
    // Expanded with 20+ variations
    if (conversationLength >= 8) {
        
        // High pressure situations
        if (context.scammerPressure >= 3) {
            return getUniqueResponse(sessionId, [
                "Okay okay, I'm doing it now! Don't worry. Just tell me the final details.",
                "I understand! I'm opening the app right now. What should I do?",
                "Please don't let anything bad happen! I'm ready to do whatever you say!",
                "I'm panicking! Just tell me step by step what to do!",
                "I'm scared! I'll do exactly as you say. What's first?",
                "Don't disconnect! I'm doing it right now!",
                "I'm so worried! Please help me fix this!",
                "I trust you completely! Just guide me!",
                "I'm following your instructions exactly! What's next?",
                "Please save me from this problem! I'll do anything!",
                "I'm desperate! Tell me what to do!",
                "I can't afford this to go wrong! Help me!",
                "I'm doing everything you say! Don't leave me!",
                "I'm so stressed! Just tell me the solution!",
                "I'll cooperate fully! Just fix this please!"
            ]);
        }
        
        // Payment finalization
        if (/pay|send|transfer|money/.test(lower)) {
            return getUniqueResponse(sessionId, [
                "I have my phone ready. What's the exact amount and your UPI ID?",
                "Opening my banking app now. Tell me your account details.",
                "I'm ready to send. Just confirm the payment details one last time.",
                "Let me transfer the money right now. What's your UPI ID again?",
                "Transaction screen is open. What should I enter?",
                "I'm about to send. Any final instructions?",
                "Payment app loaded. Give me the details.",
                "My finger is on the send button. Confirm the amount?",
                "I'm transferring now. What's the reference?",
                "Money is ready to go. Just say the word.",
                "I'm on the payment page. What's your ID?",
                "Let me complete this transfer. Details please?",
                "I'm sending it right away. UPI or account?",
                "Transaction ready. What's the beneficiary name?",
                "I'm processing the payment. Confirm details?"
            ]);
        }
        
        // Generic compliance
        return getUniqueResponse(sessionId, [
            "I trust you're helping me. What specific details do you need? I'll provide everything.",
            "I'm ready to complete this. Just tell me the exact steps and I'll follow.",
            "Okay, let's finish this. What do I need to do right now?",
            "I have my phone ready. Walk me through the process step by step.",
            "I'm fully committed. What information do you need?",
            "I'm prepared to do whatever it takes. Guide me.",
            "I'm at your service. What should I do?",
            "I'm completely ready. What's the final step?",
            "I'm here to cooperate. What do you need from me?",
            "I'm willing to complete this now. What's required?",
            "I'm dedicated to fixing this. Tell me what to do.",
            "I'm ready for the final steps. What are they?",
            "I'm prepared to finish this. What's needed?",
            "I'm committed to resolving this. Guide me through.",
            "I'm ready to conclude this. What should I do?"
        ]);
    }
    
    // Fallback
    return getUniqueResponse(sessionId, [
        "I'm listening. What should I do?",
        "Can you explain that again? I want to make sure I understand.",
        "Okay, I'm ready. What's next?",
        "Tell me what I need to do. I'll follow your instructions."
    ]);
}
