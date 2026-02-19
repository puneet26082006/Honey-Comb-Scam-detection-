# Honeypot API for Scam Detection

AI-powered honeypot system that detects scams, extracts intelligence, and engages with scammers using Groq AI (Llama 3.1-8b-instant).

## Description

This honeypot API is designed to:
- Detect various types of scam messages (bank fraud, UPI fraud, phishing, job scams, lottery scams, etc.)
- Extract intelligence (phone numbers, bank accounts, UPI IDs, links, emails, case IDs, etc.)
- Engage scammers in realistic conversations to waste their time and gather information
- Maintain natural, human-like victim behavior using AI

## Tech Stack

- **Language/Framework**: Node.js with Express.js
- **AI Model**: Groq AI (Llama 3.1-8b-instant)
- **Key Libraries**: 
  - `express` - Web framework
  - `cors` - Cross-origin resource sharing
  - `dotenv` - Environment variable management
- **Deployment**: Vercel (serverless)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/puneet26082006/Honey-Comb-Scam-detection-.git
cd Honey-Comb-Scam-detection-
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set environment variables
Create a `.env` file in the root directory:
```
GROK_API_KEY=your_groq_api_key_here
```

Get your Groq API key from: https://console.groq.com/

### 4. Run the application
```bash
npm start
```

The API will be available at `http://localhost:3000/api`

## API Endpoint

### Main Endpoint
**POST** `/api`

**Headers:**
```
Content-Type: application/json
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
```

**Request Body:**
```json
{
  "sessionId": "unique-session-id",
  "message": {
    "sender": "scammer",
    "text": "URGENT: Your account has been compromised...",
    "timestamp": 1234567890000
  },
  "conversationHistory": [
    {
      "sender": "scammer",
      "text": "Previous message...",
      "timestamp": 1234567890000
    }
  ],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "reply": "I'm concerned. Can you verify your identity first?"
}
```

### Health Check
**GET** `/api/health`

Returns API health status and Groq AI availability.

### Final Output
**GET** `/api/session/:sessionId/final`

Returns the complete analysis for a session including:
- Scam detection result
- Extracted intelligence
- Engagement metrics
- Agent notes

## Approach

### Scam Detection Strategy
1. **Keyword-based Detection**: Identifies scam-related keywords (urgent, blocked, OTP, verify, etc.)
2. **Context Awareness**: Considers conversation history to maintain engagement
3. **Pattern Recognition**: Detects common scam patterns across multiple fraud types

### Intelligence Extraction
The system extracts:
- **Phone Numbers**: Indian format (+91 or 10 digits starting with 6-9)
- **Bank Accounts**: 9-18 digit sequences
- **UPI IDs**: Format like user@bank
- **Phishing Links**: HTTP/HTTPS URLs
- **Email Addresses**: Standard email format
- **Case IDs**: Reference numbers (CASE-123, CBI-456, etc.)
- **Policy Numbers**: Insurance/policy references
- **Order Numbers**: Transaction/order IDs

### Engagement Strategy
1. **Phase 1 (Turns 1-2)**: Show appropriate emotion (concern, interest, fear)
2. **Phase 2 (Turns 3-5)**: Ask clarifying questions, show growing trust
3. **Phase 3 (Turns 6+)**: Express readiness to comply, ask for final details

The AI is trained to:
- Never reveal it knows it's a scam
- Respond specifically to scammer's messages
- Match emotion to scam type
- Sound human, not robotic
- Keep the conversation going
- Ask investigative questions

### Red Flag Identification
The system identifies:
- Urgency pressure
- OTP/credential requests
- Upfront payment demands
- Account threats
- Legal threats
- Suspicious links
- Too-good-to-be-true offers
- Verification requests

## Deployment

**Production URL**: https://honey-comb-scam-detection.vercel.app

**API Endpoint**: https://honey-comb-scam-detection.vercel.app/api

## Project Structure

```
├── api/
│   └── index.js              # Main API implementation
├── src/
│   ├── agents/
│   │   └── groq.agent.js     # Groq AI integration
│   └── extractors/
│       └── entity.extractor.js # Intelligence extraction
├── .env                       # Environment variables (not in repo)
├── .env.example              # Environment template
├── package.json              # Dependencies
├── vercel.json               # Deployment config
└── README.md                 # This file
```

## Features

- ✅ Generic scam detection (not hardcoded for specific scenarios)
- ✅ AI-powered natural conversation
- ✅ Comprehensive intelligence extraction
- ✅ Red flag identification
- ✅ Engagement metrics tracking
- ✅ Fast response time (< 2 seconds)
- ✅ Context-aware responses
- ✅ Multi-turn conversation support

## Testing

The API has been tested with various scam types:
- Bank fraud (account compromise, OTP requests)
- UPI fraud (cashback scams, verification)
- Phishing (fake offers, malicious links)
- Job scams (work from home, YouTube likes)
- Lottery scams (prize claims)
- Digital arrest (police/CBI impersonation)
- Utility scams (electricity, water bills)
- Investment scams (crypto, trading)

## License

ISC

## Author

Puneet Saxena

## Repository

https://github.com/puneet26082006/Honey-Comb-Scam-detection-
