# 🛡️ Honeycomb Scam Detection System

An advanced AI-powered honeypot system that detects and analyzes scam conversations using dual-bot interactions and intelligent entity extraction.

## 🏗️ System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Web Interface │    │   Express API    │    │  Python Bots    │
│   (index.html)  │◄──►│   (Node.js)      │◄──►│ Ramesh & Savitri │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  Entity Extractor │
                       │  (JavaScript)     │
                       └──────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  Honeycomb API   │
                       │  (JSON Output)   │
                       └──────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python 3.8+
- Ollama (for AI models)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
# .env file is already configured with API keys
```

3. **Start the system:**
```bash
npm start
# OR double-click start.bat on Windows
```

4. **Open your browser:**
```
http://localhost:3000
```

## 🎯 How It Works

### 1. Interactive Chat Mode
- Type scam messages in the chat interface
- AI responds as "Ramesh" (honeypot persona)
- Real-time entity extraction (UPI, bank accounts, links, phone numbers)
- Scam classification using Google Gemini AI

### 2. Automated Honeypot Mode
- Click "🛡️ RUN HONEYPOT" button
- Launches Python bots (Ramesh & Savitri) conversation
- Automated scam detection and intelligence gathering
- Generates final Honeycomb API key with scammer profile

## 📁 Project Structure

```
honey-comb-scam-detection/
├── public/
│   └── index.html              # Web dashboard
├── src/
│   ├── agents/
│   │   ├── classifier.agent.js # Scam classification
│   │   ├── persona.agent.js    # AI persona generation
│   │   └── persona.prompt.js   # Persona instructions
│   ├── extractors/
│   │   └── entity.extractor.js # Extract UPI, bank, links, phone
│   ├── routes/
│   │   └── message.routes.js   # API endpoints
│   ├── state/
│   │   └── conversation.store.js # Conversation management
│   ├── utils/
│   │   ├── formatter.js        # Response formatting
│   │   └── keywordDetector.js  # Keyword detection
│   └── server.js               # Express server
├── ramesh_bot/
│   ├── honeypot_final.py       # Main Python honeypot
│   ├── battle.py               # Bot conversation script
│   ├── Modelfile               # Ramesh AI model config
│   ├── Modelfile_Savitri       # Savitri AI model config
│   └── scam_report.json        # Generated reports
└── package.json
```

## 🔧 API Endpoints

### POST `/api/messages`
Interactive chat with honeypot agent
```json
{
  "sender_id": "user_123",
  "message": "Hello, your bank account is blocked"
}
```

**Response:**
```json
{
  "reply": "Oh no! What should I do sir?",
  "is_scam": true,
  "classification": "SCAM",
  "extracted_now": {
    "upi": [],
    "bank_account": [],
    "links": [],
    "phone": []
  },
  "total_extracted": { /* cumulative data */ },
  "status": "active"
}
```

### POST `/api/messages/start-honeypot`
Run automated Python bot conversation
```json
{
  "success": true,
  "data": { /* scam report */ },
  "extracted_entities": { /* extracted data */ },
  "honeycomb_api_key": {
    "api_key": "HC_1234567890_abc123def",
    "scammer_profile": {
      "threat_level": "HIGH",
      "scam_type": "Tech Support Fraud",
      "extracted_intelligence": [...],
      "detection_timestamp": "2024-01-01T00:00:00.000Z",
      "confidence_score": 0.95,
      "honeypot_session_id": "HP_1234567890"
    }
  }
}
```

## 🤖 AI Models

### Ramesh (Honeypot Agent)
- **Role:** Naive shopkeeper from small town India
- **Behavior:** Confused about technology, willing to cooperate
- **Goal:** Extract scammer's payment details

### Savitri (Victim Simulation)
- **Role:** 65-year-old grandmother
- **Behavior:** Innocent but annoying, asks for help
- **Goal:** Waste scammer's time, trigger payment requests

## 🔍 Entity Extraction

The system automatically extracts:
- **UPI IDs:** `example@okicici`, `paytm-123@paytm`
- **Bank Accounts:** 9-18 digit sequences
- **Phishing Links:** HTTP/HTTPS URLs
- **Phone Numbers:** Indian format (+91 or 10 digits starting with 6-9)

## 🛡️ Security Features

- Real-time scam classification
- Keyword-based threat detection
- Conversation state management
- Automated intelligence reporting
- Mission completion detection

## 🎨 Dashboard Features

- **Live Chat Interface:** Real-time conversation display
- **Threat Analysis:** Scam detection status
- **Intelligence Panel:** Extracted entities display
- **System Logs:** Activity monitoring
- **API Key Generation:** Final honeycomb report

## 🔧 Configuration

### Environment Variables (.env)
```
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

### Python Models (Ollama)
Ensure these models are available:
- `ramesh-uncensored` (Scammer simulation)
- `savitri` (Victim simulation)

## 🚨 Mission Complete Conditions

The system triggers "Mission Complete" when:
1. Significant data extracted (UPI/Bank/Links)
2. Conversation length ≥ 6 exchanges
3. High confidence scam classification

## 📊 Output Format

Final API response includes:
- **Scammer Profile:** Threat level, scam type, confidence
- **Extracted Intelligence:** All captured data
- **Conversation Log:** Complete chat history
- **Honeycomb API Key:** Unique identifier for the session

## 🎯 Use Cases

1. **Cybersecurity Research:** Analyze scam patterns
2. **Law Enforcement:** Gather evidence
3. **Education:** Demonstrate scam techniques
4. **Prevention:** Train users to recognize scams

## 🤝 Contributing

This system demonstrates advanced AI-powered threat detection and can be extended for:
- Multi-language support
- Advanced ML classification
- Real-time alerting systems
- Integration with security platforms

---

**⚠️ Disclaimer:** This system is for educational and research purposes only. Use responsibly and in compliance with local laws.