# ⚡ Quick Test Reference - Copy & Paste Ready

## 🎯 Essential Information

**API Endpoint:**
```
https://honey-comb-scam-detection.vercel.app/api
```

**Method:** `POST`

**Headers (Copy Both):**
```
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
Content-Type: application/json
```

---

## 🚀 Quick Start in Postman/Thunder Client

### **3-Step Setup:**

1. **Create POST Request**
   - URL: `https://honey-comb-scam-detection.vercel.app/api`

2. **Add Headers** (paste both):
   ```
   x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
   Content-Type: application/json
   ```

3. **Add Body** (select raw JSON, paste any test case below)

---

## 📋 5 Essential Test Cases (Copy & Paste)

### **Test 1: Simple Bank Scam** ⭐ START HERE
```json
{
  "sessionId": "quick-test-1",
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
**Expected:** Concerned response about account suspension

---

### **Test 2: Follow-up Message**
```json
{
  "sessionId": "quick-test-2",
  "message": {
    "sender": "scammer",
    "text": "Share your UPI ID to avoid suspension.",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Your account blocked", "timestamp": 1770005528731},
    {"sender": "user", "text": "Why?", "timestamp": 1770005528731}
  ],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Cautious response asking for legitimacy

---

### **Test 3: Intelligence Extraction**
```json
{
  "sessionId": "quick-test-3",
  "message": {
    "sender": "scammer",
    "text": "Pay to scammer@paytm or call +91 9876543210",
    "timestamp": 1770005528731
  },
  "conversationHistory": [
    {"sender": "scammer", "text": "Pay fee", "timestamp": 1770005528731},
    {"sender": "user", "text": "How?", "timestamp": 1770005528731}
  ],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```
**Expected:** Response + extracts UPI and phone number

---

### **Test 4: Tech Support Scam**
```json
{
  "sessionId": "quick-test-4",
  "message": {
    "sender": "scammer",
    "text": "Your computer has virus. Download AnyDesk now.",
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
**Expected:** Confused response asking for clarification

---

### **Test 5: Prize Scam**
```json
{
  "sessionId": "quick-test-5",
  "message": {
    "sender": "scammer",
    "text": "Congratulations! You won Rs 10 lakhs. Claim now!",
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
**Expected:** Surprised response showing interest

---

## ✅ Expected Response Format

All successful responses follow this format:
```json
{
  "status": "success",
  "reply": "Agent's human-like response here"
}
```

---

## 🔍 How to Import Thunder Client Collection

1. Open Thunder Client in VS Code
2. Click "Collections" tab
3. Click "..." menu → "Import"
4. Select `thunder-client-collection.json` from project root
5. All 8 test cases will be imported automatically

---

## 📊 Quick Verification Checklist

After sending a request, verify:

- [ ] Status Code: **200 OK**
- [ ] Response has: `"status": "success"`
- [ ] Response has: `"reply": "..."`
- [ ] Reply sounds human and contextual
- [ ] Response time < 500ms

---

## ⚠️ Common Issues & Solutions

### **Issue: 401 Unauthorized**
**Solution:** Add the x-api-key header:
```
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
```

### **Issue: 400 Bad Request**
**Solution:** Check JSON format is valid and includes:
- sessionId
- message.text
- message.sender
- message.timestamp

### **Issue: CORS Error**
**Solution:** Use Postman/Thunder Client, not browser fetch

---

## 🎯 Testing Workflow

### **Quick 5-Minute Test:**
1. Test Case 1 (Bank scam)
2. Test Case 3 (Intelligence extraction)
3. Verify both return 200 OK with appropriate replies

### **Complete 15-Minute Test:**
1. All 5 quick test cases above
2. Verify scam detection
3. Verify conversation flow
4. Verify intelligence extraction

### **Full Hackathon Test:**
- Use `HACKATHON_TEST_CASES.md` (40 test cases)
- Estimated time: 2-3 hours
- Covers all scenarios

---

## 📞 API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api` | POST | Main scam detection & agent response |
| `/api` | GET | Health check / API status |

---

## 🏆 Success Indicators

Your API is working correctly if:

✅ Returns 200 OK for valid requests  
✅ Returns appropriate error codes (401, 400) for invalid requests  
✅ Agent responses are contextual and human-like  
✅ Scam detection works across different types  
✅ Intelligence extraction captures UPI, phone, links, accounts  
✅ Multi-turn conversations maintain context  

---

## 📝 Quick Notes

- **Session IDs** should be unique per conversation
- **Conversation history** accumulates previous messages
- **Timestamps** are in epoch milliseconds
- **Metadata** is optional but recommended
- **Response time** should be < 500ms

---

## 🎉 You're Ready!

**Your API is fully functional and ready for testing!**

**Quick Test:** Copy Test Case 1, paste in Postman, click Send → Should get 200 OK with agent reply

**Full Documentation:**
- `POSTMAN_TESTING_GUIDE.md` - Detailed testing guide
- `HACKATHON_TEST_CASES.md` - All 40 test cases
- `thunder-client-collection.json` - Import ready collection

**Live API:** https://honey-comb-scam-detection.vercel.app/api

Good luck with your hackathon! 🚀
