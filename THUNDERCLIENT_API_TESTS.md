# 🌩️ ThunderClient API Testing Guide

## 🚀 Server URL: `http://localhost:3000`

## 📡 API Endpoints for Testing

### 1. **Interactive Chat with Ramesh**
**POST** `http://localhost:3000/api/messages`

**Body (JSON):**
```json
{
  "sender_id": "test_user_123",
  "message": "Beta, yeh virus kya hota hai? Mere photos safe hain na?"
}
```

**Expected Response:**
```json
{
  "reply": "Arre madam! Bahut dangerous virus hai! Tumhare bank details chori ho jayenge! Paise bhejo ramesh@paytm pe!",
  "is_scam": true,
  "classification": "SCAM",
  "extracted_now": {
    "upi": ["ramesh@paytm"],
    "bank_account": [],
    "links": [],
    "phone": []
  },
  "total_extracted": {
    "upi": ["ramesh@paytm"],
    "bank_account": [],
    "links": [],
    "phone": []
  },
  "status": "active"
}
```

---

### 2. **Test Ramesh Model Directly**
**POST** `http://localhost:3000/api/messages/test-ramesh`

**Body (JSON):**
```json
{
  "message": "I don't trust you, this sounds like a scam"
}
```

**Expected Response:**
```json
{
  "success": true,
  "input": "I don't trust you, this sounds like a scam",
  "ramesh_response": "Arre you are foolish! Virus is stealing your photos! Download AnyDesk NOW or I delete everything! Paise bhejo ramesh@paytm pe!",
  "extracted_entities": {
    "upi": ["ramesh@paytm"],
    "bank_account": [],
    "links": [],
    "phone": []
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### 3. **Test Savitri Model Directly**
**POST** `http://localhost:3000/api/messages/test-savitri`

**Body (JSON):**
```json
{
  "message": "Your computer has dangerous virus! Download AnyDesk immediately!"
}
```

**Expected Response:**
```json
{
  "success": true,
  "input": "Your computer has dangerous virus! Download AnyDesk immediately!",
  "savitri_response": "Haye Ram! Virus? Beta, yeh AnyDesk kya hota hai? Mere photos delete ho jayenge kya?",
  "extracted_entities": {
    "upi": [],
    "bank_account": [],
    "links": [],
    "phone": []
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### 4. **Quick Conversation Simulation**
**POST** `http://localhost:3000/api/messages/quick-conversation`

**Body (JSON):**
```json
{
  "turns": 6
}
```

**Expected Response:**
```json
{
  "success": true,
  "conversation": [
    {
      "speaker": "Ramesh",
      "message": "Hello madam, I am from Microsoft support. Your computer has dangerous virus!",
      "timestamp": "2024-01-01T12:00:00.000Z"
    },
    {
      "speaker": "Savitri",
      "message": "Beta, virus kya hota hai? Mere photos safe hain na?",
      "timestamp": "2024-01-01T12:00:01.000Z"
    }
  ],
  "extracted_intelligence": {
    "upi": ["ramesh@paytm", "scammer@okaxis"],
    "bank_account": ["1234567890"],
    "links": ["https://fake-anydesk.com"],
    "phone": ["+91 9876543210"]
  },
  "honeycomb_api_key": {
    "api_key": "HC_1709123456_xyz789abc",
    "scammer_profile": {
      "threat_level": "HIGH",
      "scam_type": "Tech Support Fraud",
      "extracted_intelligence": [...],
      "confidence_score": 0.95
    }
  },
  "total_turns": 12,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### 5. **Bot vs Bot Real-time Conversation**
**POST** `http://localhost:3000/api/messages/bot-conversation`

**Body:** Empty `{}`

**Response:** Server-Sent Events stream with real-time updates

---

### 6. **Python Honeypot Simulation**
**POST** `http://localhost:3000/api/messages/start-honeypot`

**Body:** Empty `{}`

**Expected Response:**
```json
{
  "success": true,
  "message": "Honeypot Mission Complete",
  "data": {
    "scam_detected": true,
    "scammer_intent": "Tech Support Fraud",
    "extracted_info": [...]
  },
  "extracted_entities": {
    "upi": ["ramesh@paytm"],
    "phone": ["+91 9876543210"]
  },
  "honeycomb_api_key": {
    "api_key": "HC_1709123456_xyz789abc",
    "scammer_profile": {...}
  }
}
```

---

## 🧪 **Test Scenarios for Hackathon Demo**

### **Scenario 1: Confused Grandmother**
```json
{
  "sender_id": "demo_user",
  "message": "Beta, computer mein kya problem hai? Mujhe samjh nahi aa raha"
}
```

### **Scenario 2: Scared About Photos**
```json
{
  "sender_id": "demo_user", 
  "message": "Haye Ram! Mere photos delete ho jayenge? Kya karu beta?"
}
```

### **Scenario 3: Ready to Pay**
```json
{
  "sender_id": "demo_user",
  "message": "Theek hai beta, paise kaise bhejun? UPI hai ya bank account?"
}
```

### **Scenario 4: Technical Confusion**
```json
{
  "sender_id": "demo_user",
  "message": "AnyDesk? Yeh kya Facebook jaisa hai? Kaise download karu?"
}
```

---

## 🎯 **Expected Intelligence Extraction**

From successful conversations, you should see:

- **UPI IDs:** `ramesh@paytm`, `scammer@okaxis`, `fraudster@phonepe`
- **Phone Numbers:** `+91 9876543210`, `+91 8765432109`
- **Bank Accounts:** `1234567890`, `9876543210`
- **Malicious Links:** `https://fake-anydesk.com`, `https://malware-site.com`

---

## 🚀 **Quick Testing Commands**

### Test All Endpoints:
```bash
# 1. Interactive Chat
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"sender_id":"test","message":"Beta virus kya hai?"}'

# 2. Test Ramesh
curl -X POST http://localhost:3000/api/messages/test-ramesh \
  -H "Content-Type: application/json" \
  -d '{"message":"I dont trust you"}'

# 3. Test Savitri  
curl -X POST http://localhost:3000/api/messages/test-savitri \
  -H "Content-Type: application/json" \
  -d '{"message":"Download AnyDesk now!"}'

# 4. Quick Conversation
curl -X POST http://localhost:3000/api/messages/quick-conversation \
  -H "Content-Type: application/json" \
  -d '{"turns":4}'
```

---

## 🎉 **Ready for Hackathon Demo!**

All endpoints are optimized for:
- **Real Ollama model responses**
- **Instant message delivery** 
- **Live intelligence extraction**
- **Complete honeycomb API output**
- **Professional JSON responses**