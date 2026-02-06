# 🛡️ Honeycomb Scam Detection System

An advanced AI-powered honeypot system that detects and analyzes scam conversations using intelligent bot interactions and real-time entity extraction.

## 🌐 **Live Demo**

- **Web Interface:** [https://your-domain.com](https://your-domain.com)
- **API Endpoint:** `https://your-domain.com/api/messages`
- **Health Check:** `https://your-domain.com/api/messages/health`

## 🚀 **Quick Start**

### **Local Development:**
```bash
npm install
npm start
# Open http://localhost:3000
```

### **Production Deployment:**
```bash
# Option 1: Vercel
npm install -g vercel
vercel --prod

# Option 2: Docker
docker-compose up -d

# Option 3: Railway
# Push to GitHub and connect at railway.app
```

## 🎯 **Features**

### **🤖 AI-Powered Conversation**
- **Ramesh Bot:** Intelligent scammer simulation
- **Savitri Bot:** Honeypot victim persona
- **Real-time chat:** Interactive scammer engagement
- **Context-aware responses:** Meaningful conversation flow

### **🔍 Intelligence Extraction**
- **UPI IDs:** `ramesh@paytm`, `scammer@okaxis`
- **Bank Accounts:** `1234567890`
- **Phone Numbers:** `+91 9876543210`
- **Malicious Links:** `https://fake-anydesk.com`

### **📊 Professional API**
- **RESTful endpoints:** Complete API suite
- **JSON responses:** Structured data output
- **Real-time processing:** Live conversation analysis
- **Honeycomb reports:** Complete scammer profiles

## 🔧 **API Endpoints**

### **Interactive Chat**
```bash
POST /api/messages
{
  "sender_id": "user_123",
  "message": "Beta, virus kya hai?"
}
```

### **Test Models**
```bash
POST /api/messages/test-ramesh
{
  "message": "aage kya karna hai?"
}
```

### **Quick Conversation**
```bash
POST /api/messages/quick-conversation
{
  "turns": 6
}
```

## 📱 **Web Interface**

### **Features:**
- **Real-time chat:** Instagram-style messaging
- **Live intelligence:** Entity extraction display
- **Professional dashboard:** Cybersecurity interface
- **Mobile responsive:** Works on all devices

### **Usage:**
1. Open the web interface
2. Type as Savitri (confused grandmother)
3. Watch Ramesh (scammer) respond intelligently
4. See real-time intelligence extraction
5. Get complete honeycomb API report

## 🎭 **AI Personalities**

### **Ramesh (Scammer):**
- **Helpful but urgent:** Provides specific next steps
- **Trust building:** Acts as Microsoft expert
- **Payment extraction:** Gradually asks for money
- **Realistic dialogue:** Natural Hinglish conversation

### **Savitri (Victim):**
- **Confused but willing:** Asks for guidance
- **Intelligence gathering:** Extracts scammer details
- **Trust building:** Shows willingness to pay
- **Honeypot strategy:** Keeps scammers engaged

## 🔑 **Sample API Response**

```json
{
  "reply": "Arre madam, pehle aap Google Chrome browser kholo. Phir anydesk.com website pe jao. Main aapko step by step guide karunga!",
  "is_scam": true,
  "classification": "SCAM",
  "extracted_now": {
    "upi": [],
    "bank_account": [],
    "links": ["anydesk.com"],
    "phone": []
  },
  "total_extracted": {
    "upi": ["ramesh@paytm"],
    "bank_account": ["1234567890"],
    "links": ["anydesk.com", "https://fake-anydesk.com"],
    "phone": ["+91 9876543210"]
  },
  "status": "active",
  "conversation_length": 6,
  "next_phase": "TECHNICAL_GUIDANCE"
}
```

## 🏆 **Honeycomb Intelligence Report**

```json
{
  "api_key": "HC_1709123456_xyz789abc",
  "scammer_profile": {
    "threat_level": "HIGH",
    "scam_type": "Tech Support Fraud",
    "extracted_intelligence": [
      "ramesh@paytm",
      "+91 9876543210",
      "https://fake-anydesk.com"
    ],
    "detection_timestamp": "2024-01-01T12:00:00.000Z",
    "confidence_score": 0.95,
    "honeypot_session_id": "HP_1709123456"
  }
}
```

## 🛠️ **Technology Stack**

- **Backend:** Node.js, Express.js
- **AI Models:** Ollama (Llama 3)
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Deployment:** Railway, Vercel, Docker
- **APIs:** RESTful architecture

## 📊 **Use Cases**

- **Cybersecurity Research:** Analyze scam patterns
- **Law Enforcement:** Gather evidence
- **Education:** Demonstrate scam techniques
- **Prevention:** Train users to recognize scams

## 🔒 **Security Features**

- **CORS protection:** Secure cross-origin requests
- **Input validation:** Prevent malicious input
- **Error handling:** Graceful failure management
- **Rate limiting:** Prevent abuse
- **Security headers:** Production-ready security

## 📖 **Documentation**

- **Deployment Guide:** See `DEPLOYMENT_GUIDE.md`
- **API Testing:** Use ThunderClient/Postman
- **Local Setup:** Follow Quick Start guide

## 🎯 **Demo Script**

### **For Judges/Presentations:**

1. **Web Demo (2 minutes):**
   - Open live URL
   - Chat as Savitri: "Beta, virus kya hai?"
   - Show real AI responses
   - Point out live intelligence extraction

2. **API Demo (2 minutes):**
   - Use ThunderClient/Postman
   - Test `/api/messages/test-ramesh`
   - Show JSON response with extracted data

3. **Bot vs Bot (1 minute):**
   - Click "🤖 BOT vs BOT" button
   - Watch automated conversation
   - Show final honeycomb API key

## 🏅 **Awards & Recognition**

This system demonstrates:
- **Technical Excellence:** Real AI integration
- **Practical Application:** Actual scam detection
- **Professional Quality:** Production-ready deployment
- **Innovation:** Intelligent honeypot strategy

## 📞 **Support**

For questions or issues:
- **GitHub Issues:** Create an issue
- **Documentation:** Check deployment guide
- **API Testing:** Use provided endpoints

---

**🛡️ Honeycomb Scam Detection - Protecting users through intelligent AI honeypots**

*Built for cybersecurity professionals, researchers, and law enforcement*