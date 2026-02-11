# 🧪 Complete Postman/Thunder Client Testing Guide

## 📡 API Endpoint Information

### **Base URL:**
```
https://honey-comb-scam-detection.vercel.app/api
```

### **Authentication Header:**
```
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
```

### **Content Type:**
```
Content-Type: application/json
```

---

## 🚀 Quick Setup in Postman/Thunder Client

### **Step 1: Create New Request**
1. Open Postman or Thunder Client
2. Click "New Request" or "+"
3. Set method to **POST**
4. Enter URL: `https://honey-comb-scam-detection.vercel.app/api`

### **Step 2: Add Headers**
Add these two headers:
```
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
Content-Type: application/json
```

### **Step 3: Add Body**
- Select "Body" tab
- Choose "raw" and "JSON" format
- Paste test case JSON (see below)

### **Step 4: Send Request**
- Click "Send"
- View response in the response panel

---

## 📋 Complete Test Cases Collection

### **Test Case 1: Bank Account Blocking Scam (First Message)**

**Request:**
```json
{
  "sessionId": "test-session-001",
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

**Expected Response:**
```json
{
  "status": "success",
  "reply": "Oh no! Why is my account being suspended? I haven't done anything wrong. Can you please explain what happened?"
}
```

---

### **Test Case 2: UPI Verification Scam (Follow-up)**

**Request:**
```json
{
  "sessionId": "test-session-001",
  "message": {
    "sender": "scammer",
    "text": "Share your UPI ID to avoid account suspension.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {
      "sender": "scammer",
      "text": "Your bank account will be blocked today. Verify immediately.",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "Why will my account be blocked?",
      "timestamp": 1770005528731
    }
  ],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```

**Expected Response:**
```json
{
  "status": "success",
  "reply": "You need my bank details? Is this really from my bank? How do I know this is legitimate?"
}
```

---

### **Test Case 3: Prize/Lottery Scam**

**Request:**
```json
{
  "sessionId": "test-session-002",
  "message": {
    "sender": "scammer",
    "text": "Congratulations! You have won a lottery of Rs 10 lakhs. Claim now by clicking this link.",
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

**Expected Response:**
```json
{
  "status": "success",
  "reply": "Really? I won something? What did I win? I don't remember participating in any contest."
}
```

---

### **Test Case 4: Tech Support Scam**

**Request:**
```json
{
  "sessionId": "test-session-003",
  "message": {
    "sender": "scammer",
    "text": "Your computer has a dangerous virus. Download AnyDesk immediately to fix it.",
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

**Expected Response:**
```json
{
  "status": "success",
  "reply": "I'm not sure I understand. Can you explain what this is about? I'm a bit confused."
}
```

---

### **Test Case 5: Refund Scam**

**Request:**
```json
{
  "sessionId": "test-session-004",
  "message": {
    "sender": "scammer",
    "text": "You are eligible for a refund of Rs 5000. Verify your bank details to receive it.",
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

**Expected Response:**
```json
{
  "status": "success",
  "reply": "Refund for what? I don't remember making any purchase recently. Can you clarify?"
}
```

---

### **Test Case 6: Multi-Turn Conversation (3rd Message)**

**Request:**
```json
{
  "sessionId": "test-session-005",
  "message": {
    "sender": "scammer",
    "text": "Download this app urgently: http://fake-anydesk.com",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {
      "sender": "scammer",
      "text": "Your computer has virus",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "What should I do?",
      "timestamp": 1770005528731
    },
    {
      "sender": "scammer",
      "text": "I will help you fix it",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "How can you help?",
      "timestamp": 1770005528731
    }
  ],
  "metadata": {
    "channel": "Chat",
    "language": "English",
    "locale": "IN"
  }
}
```

**Expected Response:**
```json
{
  "status": "success",
  "reply": "You want me to download something? What is this software for? Is it safe?"
}
```

---

### **Test Case 7: Payment Request Scam**

**Request:**
```json
{
  "sessionId": "test-session-006",
  "message": {
    "sender": "scammer",
    "text": "Pay Rs 2999 to ramesh@paytm to unlock your account immediately.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {
      "sender": "scammer",
      "text": "Your account is blocked",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "Why is it blocked?",
      "timestamp": 1770005528731
    },
    {
      "sender": "scammer",
      "text": "Security issue detected",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "What should I do?",
      "timestamp": 1770005528731
    },
    {
      "sender": "scammer",
      "text": "You need to verify your identity",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "How do I verify?",
      "timestamp": 1770005528731
    }
  ],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```

**Expected Response:**
```json
{
  "status": "success",
  "reply": "This sounds very urgent. What exactly do I need to do right now? Will my account really get blocked?"
}
```

---

### **Test Case 8: Phone Number Extraction**

**Request:**
```json
{
  "sessionId": "test-session-007",
  "message": {
    "sender": "scammer",
    "text": "Call me immediately at +91 9876543210 to resolve this issue.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {
      "sender": "scammer",
      "text": "Urgent security alert",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "What happened?",
      "timestamp": 1770005528731
    }
  ],
  "metadata": {
    "channel": "WhatsApp",
    "language": "English",
    "locale": "IN"
  }
}
```

**Expected Response:**
```json
{
  "status": "success",
  "reply": "Should I call this number? What will happen when I call? Will there be any charges?"
}
```

---

### **Test Case 9: Late Stage Conversation (Ready to Comply)**

**Request:**
```json
{
  "sessionId": "test-session-008",
  "message": {
    "sender": "scammer",
    "text": "Send payment to account number 1234567890, IFSC: SBIN0001234",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {
      "sender": "scammer",
      "text": "Your account blocked",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "Why?",
      "timestamp": 1770005528731
    },
    {
      "sender": "scammer",
      "text": "Security issue",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "How to fix?",
      "timestamp": 1770005528731
    },
    {
      "sender": "scammer",
      "text": "Pay verification fee",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "How much?",
      "timestamp": 1770005528731
    },
    {
      "sender": "scammer",
      "text": "Rs 2999 only",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "Where to pay?",
      "timestamp": 1770005528731
    }
  ],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```

**Expected Response:**
```json
{
  "status": "success",
  "reply": "Alright, I trust you're trying to help. What specific details do you need from me? My UPI ID or bank account?"
}
```

---

### **Test Case 10: Non-Scam Message (Control Test)**

**Request:**
```json
{
  "sessionId": "test-session-009",
  "message": {
    "sender": "user",
    "text": "Hello, how are you today?",
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

**Expected Response:**
```json
{
  "status": "success",
  "reply": "I'm not sure what you're referring to. Could you provide more context?"
}
```

---

### **Test Case 11: Multiple Intelligence Extraction**

**Request:**
```json
{
  "sessionId": "test-session-010",
  "message": {
    "sender": "scammer",
    "text": "Transfer money to scammer@paytm or call +91 9876543210. Visit http://fake-bank.com for verification. Account: 9876543210123456",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {
      "sender": "scammer",
      "text": "Urgent action required",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "What action?",
      "timestamp": 1770005528731
    },
    {
      "sender": "scammer",
      "text": "Verify your account",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "How?",
      "timestamp": 1770005528731
    },
    {
      "sender": "scammer",
      "text": "Follow my instructions",
      "timestamp": 1770005528731
    },
    {
      "sender": "user",
      "text": "Tell me what to do",
      "timestamp": 1770005528731
    }
  ],
  "metadata": {
    "channel": "Email",
    "language": "English",
    "locale": "IN"
  }
}
```

**Expected Response:**
```json
{
  "status": "success",
  "reply": "This sounds very urgent. What exactly do I need to do right now? Will my account really get blocked?"
}
```

**Note:** This test case should extract:
- UPI: scammer@paytm
- Phone: +91 9876543210
- Link: http://fake-bank.com
- Bank Account: 9876543210123456

---

### **Test Case 12: Missing Required Fields (Error Test)**

**Request:**
```json
{
  "sessionId": "test-session-011",
  "conversationHistory": [],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```

**Expected Response:**
```json
{
  "status": "error",
  "reply": "Invalid request format. Missing sessionId or message."
}
```

---

## 🎯 Testing Workflow

### **Phase 1: Basic Functionality (Test Cases 1-5)**
Test different scam types to verify detection and appropriate responses.

### **Phase 2: Multi-Turn Conversations (Test Cases 6-9)**
Test conversation flow and context awareness across multiple messages.

### **Phase 3: Intelligence Extraction (Test Case 11)**
Verify that UPI IDs, phone numbers, links, and bank accounts are extracted.

### **Phase 4: Edge Cases (Test Cases 10, 12)**
Test non-scam messages and error handling.

---

## 📊 Expected Behavior Summary

| Test Case | Scam Type | Expected Detection | Response Phase |
|-----------|-----------|-------------------|----------------|
| 1 | Bank Blocking | ✅ Yes | Initial Contact |
| 2 | UPI Verification | ✅ Yes | Building Trust |
| 3 | Prize/Lottery | ✅ Yes | Initial Contact |
| 4 | Tech Support | ✅ Yes | Initial Contact |
| 5 | Refund | ✅ Yes | Initial Contact |
| 6 | Download Link | ✅ Yes | Building Trust |
| 7 | Payment Request | ✅ Yes | Growing Confidence |
| 8 | Phone Number | ✅ Yes | Building Trust |
| 9 | Bank Transfer | ✅ Yes | Ready to Comply |
| 10 | Normal Chat | ❌ No | Neutral |
| 11 | Multiple Intel | ✅ Yes | Growing Confidence |
| 12 | Invalid Request | N/A | Error |

---

## 🔍 How to Verify Success

### **✅ Successful Response Indicators:**
1. Status code: **200 OK**
2. Response contains: `"status": "success"`
3. Response contains: `"reply": "..."`
4. Reply is contextually appropriate
5. Reply maintains believable persona

### **❌ Error Indicators:**
1. Status code: **400** (Bad Request) or **401** (Unauthorized)
2. Response contains: `"status": "error"`
3. Error message explains the issue

---

## 🚀 Quick Test Script

Copy this into Postman/Thunder Client as a collection:

```json
{
  "info": {
    "name": "Honeycomb Scam Detection Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Test 1: Bank Blocking Scam",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "x-api-key",
            "value": "HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": "https://honey-comb-scam-detection.vercel.app/api",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"sessionId\": \"test-session-001\",\n  \"message\": {\n    \"sender\": \"scammer\",\n    \"text\": \"Your bank account will be blocked today. Verify immediately.\",\n    \"timestamp\": 1770005528731\n  },\n  \"conversationHistory\": [],\n  \"metadata\": {\n    \"channel\": \"SMS\",\n    \"language\": \"English\",\n    \"locale\": \"IN\"\n  }\n}"
        }
      }
    }
  ]
}
```

---

## 📝 Notes

- All test cases use the same API endpoint
- Authentication header is required for all requests
- Session IDs should be unique for each conversation
- Conversation history accumulates previous messages
- Response time should be < 500ms

**Your API is ready for comprehensive testing!** 🎉
