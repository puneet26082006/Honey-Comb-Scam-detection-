# 🔑 **HACKATHON API KEY - COMPLETE GUIDE**

## 🎯 **Your x-api-key for the Hackathon:**

### **🔑 API Key:**
```
HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
```

### **📡 Honeypot API Endpoint URL:**
```
https://honey-comb-scam-detection.vercel.app
```

---

## 🧪 **For the Hackathon API Endpoint Tester:**

### **Headers:**
```
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
```

### **Honeypot API Endpoint URL:**
```
https://honey-comb-scam-detection.vercel.app
```

---

## 🔧 **Available Hackathon Endpoints:**

### **1. Info Endpoint (No API Key Required):**
```
GET https://honey-comb-scam-detection.vercel.app/api/hackathon/info
```
**Purpose:** Get project information and available endpoints

### **2. Validation Endpoint (API Key Required):**
```
GET https://honey-comb-scam-detection.vercel.app/api/hackathon/validate
Headers: x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
```
**Purpose:** Validate API key and system accessibility

### **3. Honeypot Endpoint (API Key Required):**
```
POST https://honey-comb-scam-detection.vercel.app/api/hackathon/honeypot
Headers: x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
Content-Type: application/json

Body:
{
  "target_message": "Your computer has virus! Download AnyDesk now!",
  "simulation_type": "scammer_interaction"
}
```
**Purpose:** Main honeypot interaction with scam detection

### **4. Status Endpoint (API Key Required):**
```
GET https://honey-comb-scam-detection.vercel.app/api/hackathon/status
Headers: x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
```
**Purpose:** Get system status and statistics

---

## 🧪 **Test Commands for ThunderClient/Postman:**

### **Test 1: Info (No Auth):**
```
GET https://honey-comb-scam-detection.vercel.app/api/hackathon/info
```

### **Test 2: Validation:**
```
GET https://honey-comb-scam-detection.vercel.app/api/hackathon/validate
Headers:
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
```

### **Test 3: Honeypot Interaction:**
```
POST https://honey-comb-scam-detection.vercel.app/api/hackathon/honeypot
Headers:
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
Content-Type: application/json

Body:
{
  "target_message": "Beta, virus kya hai? Mujhe samajh nahi aa raha",
  "simulation_type": "victim_interaction"
}
```

### **Test 4: System Status:**
```
GET https://honey-comb-scam-detection.vercel.app/api/hackathon/status
Headers:
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
```

---

## 📊 **Expected Responses:**

### **Validation Response:**
```json
{
  "success": true,
  "message": "Honeypot API is accessible and authenticated",
  "timestamp": "2026-02-05T13:43:48.058Z",
  "api_key_valid": true,
  "system_status": "operational",
  "honeypot_ready": true,
  "scam_detection_active": true
}
```

### **Honeypot Response:**
```json
{
  "success": true,
  "honeypot_response": "Arre madam, pehle aap Google Chrome browser kholo. Phir anydesk.com website pe jao. Main aapko step by step guide karunga!",
  "threat_detected": true,
  "simulation_type": "victim_interaction",
  "extracted_intelligence": {
    "upi": ["ramesh@paytm"],
    "bank_account": ["1234567890"],
    "links": ["anydesk.com"],
    "phone": ["+91 9876543210"]
  },
  "honeycomb_api_key": {
    "api_key": "HC_1770299028058_xyz789abc",
    "scammer_profile": {
      "threat_level": "HIGH",
      "scam_type": "Hackathon Demo",
      "extracted_intelligence": [...],
      "confidence_score": 0.95
    }
  },
  "timestamp": "2026-02-05T13:43:48.058Z",
  "processing_time_ms": 245
}
```

### **Status Response:**
```json
{
  "success": true,
  "system_name": "Honeycomb Scam Detection",
  "status": "operational",
  "uptime": 1234.567,
  "features": {
    "ai_powered_conversations": true,
    "real_time_intelligence_extraction": true,
    "scam_classification": true,
    "honeypot_simulation": true,
    "api_authentication": true
  },
  "statistics": {
    "total_conversations": 756,
    "scams_detected": 623,
    "intelligence_extracted": 445
  },
  "timestamp": "2026-02-05T13:43:48.058Z"
}
```

---

## 🚨 **Error Responses:**

### **Missing API Key:**
```json
{
  "error": "Missing x-api-key header",
  "message": "Please provide x-api-key in headers"
}
```

### **Invalid API Key:**
```json
{
  "error": "Invalid API key",
  "message": "The provided x-api-key is not valid"
}
```

---

## 🎯 **For Hackathon Submission:**

### **Project Details:**
- **Project Name:** Honeycomb Scam Detection System
- **Team:** Puneet Saxena
- **API Key:** `HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA`
- **Base URL:** `https://honey-comb-scam-detection.vercel.app`
- **Live Demo:** `https://honey-comb-scam-detection.vercel.app`

### **Key Features:**
- ✅ **API Key Authentication** - Secure access control
- ✅ **Real-time Scam Detection** - AI-powered threat analysis
- ✅ **Intelligence Extraction** - UPI, bank accounts, phone numbers, links
- ✅ **Honeypot Simulation** - Interactive scammer engagement
- ✅ **Professional APIs** - RESTful endpoints with JSON responses

### **Technical Highlights:**
- ✅ **Production Deployment** - Live on Vercel's global infrastructure
- ✅ **Serverless Architecture** - Scalable and reliable
- ✅ **AI Integration** - Intelligent conversation processing
- ✅ **Security Features** - API key validation and CORS protection

---

## 🏆 **Ready for Hackathon Validation!**

Your honeycomb scam detection system now has:
- ✅ **Valid API Key** for hackathon testing
- ✅ **Secure Endpoints** with authentication
- ✅ **Professional Responses** with complete data
- ✅ **Live System** accessible worldwide
- ✅ **Comprehensive Documentation** for judges

**🎯 Use the API key above in the hackathon tester and showcase your amazing AI-powered cybersecurity solution!**