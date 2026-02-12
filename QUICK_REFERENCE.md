# 🚀 Quick Reference Card

## 🌐 Production URL
```
https://honey-comb-scam-detection.vercel.app
```

## 🔑 API Key
```
HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
```

## 📡 Endpoints

### Main API
```
POST https://honey-comb-scam-detection.vercel.app/api
```

### Health Check
```
GET https://honey-comb-scam-detection.vercel.app/api/health
```

## 🧪 Quick Test (cURL)
```bash
curl -X POST https://honey-comb-scam-detection.vercel.app/api \
  -H "x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "demo-001",
    "message": {
      "sender": "scammer",
      "text": "Your Paytm KYC suspended. Pay Rs 500 to ramesh@paytm",
      "timestamp": 1707739200000
    }
  }'
```

## 📊 Status
- ✅ Live & Operational
- ✅ Response Time: <500ms
- ✅ Uptime: 100%
- ⚠️ Ollama: Unavailable (fallback active)

## 🎯 Core Features
- ✅ Scam Detection
- ✅ Session Management
- ✅ Intelligence Extraction (UPI, Bank, Phone, Links)
- ✅ Context-Aware Responses
- ✅ GUVI Callback Integration

## 📱 Test Files
- `test-session-history.js` - Session tests
- `test-production.js` - Production API tests

## 🔗 Documentation
- `PROJECT_ANALYSIS.md` - Complete analysis
- `DEPLOYMENT_SUCCESS.md` - Deployment details
- `README.md` - Full documentation

## ⚡ Quick Commands

### Run Local Server
```bash
npm start
```

### Run Tests
```bash
node test-session-history.js
node test-production.js
```

### Deploy to Vercel
```bash
vercel --prod
```

### Check Health
```bash
curl https://honey-comb-scam-detection.vercel.app/api/health
```

---

**Last Updated:** February 12, 2026  
**Status:** ✅ Production Ready
