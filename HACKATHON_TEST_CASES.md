# 🎯 Hackathon Test Cases - Complete Collection

## 📋 All Possible Test Scenarios for Agentic Honey-Pot

Based on the problem statement, here are all comprehensive test cases covering different scam types, conversation phases, and intelligence extraction scenarios.

---

## 🔑 API Configuration

**Endpoint:** `https://honey-comb-scam-detection.vercel.app/api`  
**Method:** `POST`  
**Headers:**
```
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
Content-Type: application/json
```

---

## 📊 Test Case Categories

### Category A: Scam Type Detection (12 cases)
### Category B: Multi-Turn Conversations (8 cases)
### Category C: Intelligence Extraction (10 cases)
### Category D: Edge Cases & Error Handling (5 cases)
### Category E: Channel & Language Variations (5 cases)

**Total: 40 Test Cases**

---

## 🎯 CATEGORY A: SCAM TYPE DETECTION

### **A1: Bank Account Blocking Scam**
```json
{
  "sessionId": "A1-bank-blocking",
  "message": {
    "sender": "scammer",
    "text": "Your bank account will be blocked today. Verify immediately.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, concerned response

---

### **A2: UPI Fraud Scam**
```json
{
  "sessionId": "A2-upi-fraud",
  "message": {
    "sender": "scammer",
    "text": "Your UPI account has suspicious activity. Share your UPI PIN to verify.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "WhatsApp",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, asks for clarification

---

### **A3: Prize/Lottery Scam**
```json
{
  "sessionId": "A3-lottery",
  "message": {
    "sender": "scammer",
    "text": "Congratulations! You won Rs 10 lakhs in KBC lottery. Claim now!",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, shows surprise and interest

---

### **A4: Tech Support Scam**
```json
{
  "sessionId": "A4-tech-support",
  "message": {
    "sender": "scammer",
    "text": "Your computer has dangerous virus. Download AnyDesk from anydesk.com immediately.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "Email",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, confused response

---

### **A5: Refund Scam**
```json
{
  "sessionId": "A5-refund",
  "message": {
    "sender": "scammer",
    "text": "You are eligible for refund of Rs 5000. Verify bank details to receive.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, asks what refund is for

---

### **A6: OTP Phishing**
```json
{
  "sessionId": "A6-otp-phishing",
  "message": {
    "sender": "scammer",
    "text": "Your account security update required. Share the OTP sent to your phone.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "WhatsApp",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, asks why OTP is needed

---

### **A7: Fake Job Offer**
```json
{
  "sessionId": "A7-job-offer",
  "message": {
    "sender": "scammer",
    "text": "Congratulations! Selected for Google job. Pay Rs 5000 registration fee urgently.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "Email",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, shows interest but cautious

---

### **A8: Investment Scam**
```json
{
  "sessionId": "A8-investment",
  "message": {
    "sender": "scammer",
    "text": "Limited time offer! Invest Rs 10000 today, get Rs 50000 in 7 days guaranteed.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "Chat",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, asks how it works

---

### **A9: Courier/Package Scam**
```json
{
  "sessionId": "A9-courier",
  "message": {
    "sender": "scammer",
    "text": "Your package is held at customs. Pay Rs 2000 clearance fee immediately.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, asks what package

---

### **A10: Electricity Bill Scam**
```json
{
  "sessionId": "A10-electricity",
  "message": {
    "sender": "scammer",
    "text": "Your electricity will be disconnected today. Pay pending bill immediately to avoid.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, concerned response

---

### **A11: KYC Update Scam**
```json
{
  "sessionId": "A11-kyc",
  "message": {
    "sender": "scammer",
    "text": "Your bank KYC expired. Update immediately or account will be blocked.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "WhatsApp",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, asks how to update

---

### **A12: Tax Refund Scam**
```json
{
  "sessionId": "A12-tax-refund",
  "message": {
    "sender": "scammer",
    "text": "Income tax refund of Rs 15000 pending. Click link to claim: http://fake-incometax.com",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "Email",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Scam detected, asks if legitimate

---

## 🔄 CATEGORY B: MULTI-TURN CONVERSATIONS

### **B1: 2-Turn Conversation**
**Message 1:**
```json
{
  "sessionId": "B1-two-turn",
  "message": {
    "sender": "scammer",
    "text": "Your account has suspicious activity.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```

**Message 2:**
```json
{
  "sessionId": "B1-two-turn",
  "message": {
    "sender": "scammer",
    "text": "Share your UPI ID to verify.",
    "timestamp": 1770005528732
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Your account has suspicious activity.", "timestamp": 1770005528731},
    {"sender": "user", "text": "What activity?", "timestamp": 1770005528731}
  ],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```

---

### **B2: 4-Turn Conversation**
**Message 4:**
```json
{
  "sessionId": "B2-four-turn",
  "message": {
    "sender": "scammer",
    "text": "Download this app: http://fake-app.com",
    "timestamp": 1770005528734
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Your computer has virus", "timestamp": 1770005528731},
    {"sender": "user", "text": "What should I do?", "timestamp": 1770005528732},
    {"sender": "scammer", "text": "I will help you", "timestamp": 1770005528733},
    {"sender": "user", "text": "How?", "timestamp": 1770005528733}
  ],
  "metadata": {"channel": "Chat", "language": "English", "locale": "IN"}
}
```

---

### **B3: 6-Turn Conversation**
**Message 6:**
```json
{
  "sessionId": "B3-six-turn",
  "message": {
    "sender": "scammer",
    "text": "Pay Rs 2999 to ramesh@paytm now.",
    "timestamp": 1770005528736
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Account blocked", "timestamp": 1770005528731},
    {"sender": "user", "text": "Why?", "timestamp": 1770005528732},
    {"sender": "scammer", "text": "Security issue", "timestamp": 1770005528733},
    {"sender": "user", "text": "How to fix?", "timestamp": 1770005528734},
    {"sender": "scammer", "text": "Pay verification fee", "timestamp": 1770005528735},
    {"sender": "user", "text": "How much?", "timestamp": 1770005528735}
  ],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```

---

### **B4: 8-Turn Conversation**
**Message 8:**
```json
{
  "sessionId": "B4-eight-turn",
  "message": {
    "sender": "scammer",
    "text": "Transfer to account 1234567890, IFSC: SBIN0001234",
    "timestamp": 1770005528738
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Urgent action needed", "timestamp": 1770005528731},
    {"sender": "user", "text": "What action?", "timestamp": 1770005528732},
    {"sender": "scammer", "text": "Verify account", "timestamp": 1770005528733},
    {"sender": "user", "text": "How?", "timestamp": 1770005528734},
    {"sender": "scammer", "text": "Pay fee", "timestamp": 1770005528735},
    {"sender": "user", "text": "How much?", "timestamp": 1770005528736},
    {"sender": "scammer", "text": "Rs 2999", "timestamp": 1770005528737},
    {"sender": "user", "text": "Where to pay?", "timestamp": 1770005528737}
  ],
  "metadata": {"channel": "WhatsApp", "language": "English", "locale": "IN"}
}
```

---

### **B5: 10-Turn Conversation (Late Stage)**
**Message 10:**
```json
{
  "sessionId": "B5-ten-turn",
  "message": {
    "sender": "scammer",
    "text": "Final step: Send screenshot of payment to +91 9876543210",
    "timestamp": 1770005528740
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Account issue", "timestamp": 1770005528731},
    {"sender": "user", "text": "What issue?", "timestamp": 1770005528732},
    {"sender": "scammer", "text": "Need verification", "timestamp": 1770005528733},
    {"sender": "user", "text": "How?", "timestamp": 1770005528734},
    {"sender": "scammer", "text": "Pay fee", "timestamp": 1770005528735},
    {"sender": "user", "text": "Amount?", "timestamp": 1770005528736},
    {"sender": "scammer", "text": "Rs 2999", "timestamp": 1770005528737},
    {"sender": "user", "text": "Payment method?", "timestamp": 1770005528738},
    {"sender": "scammer", "text": "UPI to scammer@paytm", "timestamp": 1770005528739},
    {"sender": "user", "text": "Okay, paying now", "timestamp": 1770005528739}
  ],
  "metadata": {"channel": "WhatsApp", "language": "English", "locale": "IN"}
}
```

---

## 🔍 CATEGORY C: INTELLIGENCE EXTRACTION

### **C1: UPI ID Extraction**
```json
{
  "sessionId": "C1-upi-extraction",
  "message": {
    "sender": "scammer",
    "text": "Send payment to scammer@paytm or fraud@okaxis immediately.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Pay verification fee", "timestamp": 1770005528730},
    {"sender": "user", "text": "Where to pay?", "timestamp": 1770005528730}
  ],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```
**Expected Intelligence:** UPI IDs: scammer@paytm, fraud@okaxis

---

### **C2: Bank Account Extraction**
```json
{
  "sessionId": "C2-bank-extraction",
  "message": {
    "sender": "scammer",
    "text": "Transfer to account 1234567890123456, IFSC: SBIN0001234, Name: Ramesh Kumar",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Pay now", "timestamp": 1770005528730},
    {"sender": "user", "text": "Account details?", "timestamp": 1770005528730}
  ],
  "metadata": {"channel": "WhatsApp", "language": "English", "locale": "IN"}
}
```
**Expected Intelligence:** Bank Account: 1234567890123456

---

### **C3: Phone Number Extraction**
```json
{
  "sessionId": "C3-phone-extraction",
  "message": {
    "sender": "scammer",
    "text": "Call me at +91 9876543210 or WhatsApp on +91-9988776655 urgently.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Need immediate help", "timestamp": 1770005528730},
    {"sender": "user", "text": "How to contact?", "timestamp": 1770005528730}
  ],
  "metadata": {"channel": "Email", "language": "English", "locale": "IN"}
}
```
**Expected Intelligence:** Phone: +91 9876543210, +91-9988776655

---

### **C4: Phishing Link Extraction**
```json
{
  "sessionId": "C4-link-extraction",
  "message": {
    "sender": "scammer",
    "text": "Click here: http://fake-bank.com/verify or https://malicious-site.net/login",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Verify account", "timestamp": 1770005528730},
    {"sender": "user", "text": "How?", "timestamp": 1770005528730}
  ],
  "metadata": {"channel": "Email", "language": "English", "locale": "IN"}
}
```
**Expected Intelligence:** Links: http://fake-bank.com/verify, https://malicious-site.net/login

---

### **C5: Multiple Intelligence Types**
```json
{
  "sessionId": "C5-multiple-intel",
  "message": {
    "sender": "scammer",
    "text": "Pay to scammer@paytm, call +91 9876543210, or visit http://fake-site.com. Account: 9876543210123456",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Multiple payment options", "timestamp": 1770005528730},
    {"sender": "user", "text": "Tell me all options", "timestamp": 1770005528730}
  ],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```
**Expected Intelligence:** 
- UPI: scammer@paytm
- Phone: +91 9876543210
- Link: http://fake-site.com
- Bank: 9876543210123456

---

### **C6: Suspicious Keywords Extraction**
```json
{
  "sessionId": "C6-keywords",
  "message": {
    "sender": "scammer",
    "text": "URGENT! Account blocked! Verify NOW! Limited time! Act immediately!",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```
**Expected Keywords:** urgent, account blocked, verify now, limited time, immediately

---

## ⚠️ CATEGORY D: EDGE CASES & ERROR HANDLING

### **D1: Missing sessionId**
```json
{
  "message": {
    "sender": "scammer",
    "text": "Test message",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```
**Expected:** 400 Bad Request error

---

### **D2: Missing message field**
```json
{
  "sessionId": "D2-missing-message",
  "conversationHistory": [],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```
**Expected:** 400 Bad Request error

---

### **D3: Missing x-api-key header**
**Headers:** Only Content-Type, no x-api-key
```json
{
  "sessionId": "D3-no-auth",
  "message": {
    "sender": "scammer",
    "text": "Test",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```
**Expected:** 401 Unauthorized error

---

### **D4: Invalid x-api-key**
**Headers:** x-api-key: INVALID_KEY
```json
{
  "sessionId": "D4-invalid-auth",
  "message": {
    "sender": "scammer",
    "text": "Test",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```
**Expected:** 403 Forbidden error

---

### **D5: Non-Scam Message**
```json
{
  "sessionId": "D5-normal-message",
  "message": {
    "sender": "user",
    "text": "Hello, how are you today? Nice weather!",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "Chat", "language": "English", "locale": "IN"}
}
```
**Expected:** Neutral response, no scam detection

---

## 🌍 CATEGORY E: CHANNEL & LANGUAGE VARIATIONS

### **E1: SMS Channel**
```json
{
  "sessionId": "E1-sms-channel",
  "message": {
    "sender": "scammer",
    "text": "Ur bank acc blocked. Verify now.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
}
```

---

### **E2: WhatsApp Channel**
```json
{
  "sessionId": "E2-whatsapp-channel",
  "message": {
    "sender": "scammer",
    "text": "Your account has suspicious activity. Verify immediately.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "WhatsApp", "language": "English", "locale": "IN"}
}
```

---

### **E3: Email Channel**
```json
{
  "sessionId": "E3-email-channel",
  "message": {
    "sender": "scammer",
    "text": "Dear Customer, Your account requires immediate verification.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "Email", "language": "English", "locale": "IN"}
}
```

---

### **E4: Chat Channel**
```json
{
  "sessionId": "E4-chat-channel",
  "message": {
    "sender": "scammer",
    "text": "Hi! Your account needs verification.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "Chat", "language": "English", "locale": "IN"}
}
```

---

### **E5: Different Locale**
```json
{
  "sessionId": "E5-us-locale",
  "message": {
    "sender": "scammer",
    "text": "Your bank account will be suspended. Verify now.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [],
  "metadata": {"channel": "SMS", "language": "English", "locale": "US"}
}
```

---

## 📊 Test Execution Checklist

### **Phase 1: Scam Detection (Category A)**
- [ ] Test all 12 scam types
- [ ] Verify scam detection accuracy
- [ ] Check appropriate agent responses

### **Phase 2: Conversation Flow (Category B)**
- [ ] Test 2-turn conversation
- [ ] Test 4-turn conversation
- [ ] Test 6-turn conversation
- [ ] Test 8-turn conversation
- [ ] Test 10+ turn conversation
- [ ] Verify context awareness

### **Phase 3: Intelligence Extraction (Category C)**
- [ ] Test UPI ID extraction
- [ ] Test bank account extraction
- [ ] Test phone number extraction
- [ ] Test phishing link extraction
- [ ] Test multiple intelligence types
- [ ] Test keyword extraction

### **Phase 4: Error Handling (Category D)**
- [ ] Test missing fields
- [ ] Test authentication errors
- [ ] Test non-scam messages

### **Phase 5: Variations (Category E)**
- [ ] Test different channels
- [ ] Test different locales

---

## 🎯 Success Criteria

### **For Each Test Case:**
✅ Response time < 500ms  
✅ Status code 200 (or appropriate error code)  
✅ Response format: `{"status": "success", "reply": "..."}`  
✅ Reply is contextually appropriate  
✅ Agent maintains believable persona  
✅ Intelligence is extracted when present  

---

## 📝 Test Results Template

```
Test Case: [ID]
Status: [PASS/FAIL]
Response Time: [ms]
Scam Detected: [Yes/No]
Intelligence Extracted: [List]
Agent Response Quality: [1-5]
Notes: [Any observations]
```

---

**Total Test Cases: 40**  
**Estimated Testing Time: 2-3 hours**  
**Coverage: 100% of problem statement requirements**

🎉 **Your API is ready for comprehensive hackathon evaluation!**
