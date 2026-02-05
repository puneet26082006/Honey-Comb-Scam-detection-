# 🤖 Ollama Bot Integration - Complete Guide

## ✅ System Updated Successfully!

Your honeycomb scam detection system now uses **your actual Ollama bots** instead of Gemini API:

- **Ramesh Bot** (ramesh-uncensored) - The aggressive scammer
- **Savitri Bot** (savitri) - The confused grandmother
- **No more API limits or quota errors!**

## 🚀 Setup Instructions

### Step 1: Install Ollama Models
```bash
# Run this once to set up your models:
setup-ollama.bat
```

This will:
- Create `ramesh-uncensored` model from your Modelfile
- Create `savitri` model from your Modelfile_Savitri
- Test both models

### Step 2: Start the System
```bash
# Start the honeycomb system:
start.bat
# OR
npm start
```

### Step 3: Open Browser
```
http://localhost:3000
```

## 🎯 Two Interaction Modes

### Mode 1: Chat with Ramesh Bot
- **You play Savitri's role** (or chat normally)
- Type messages like: "Beta, virus kya hota hai?" (Child, what is virus?)
- **Ramesh responds** using your Ollama model
- Real-time entity extraction from both messages

### Mode 2: Automated Bot vs Bot
- Click **"🤖 BOT vs BOT"** button
- Watch **Ramesh vs Savitri** conversation automatically
- System generates Savitri's responses strategically
- Ramesh responds using your Ollama model
- Final honeycomb API key with extracted intelligence

## 🔧 How It Works Now

### Interactive Chat Flow:
```
1. User types message (as Savitri)
   ↓
2. System calls: ollama run ramesh-uncensored "user_message"
   ↓
3. Ramesh responds in Hinglish (aggressive scammer style)
   ↓
4. Entity extraction from both messages
   ↓
5. Display in chat interface
```

### Bot vs Bot Flow:
```
1. System generates Savitri response (strategic)
   ↓
2. Calls Ramesh via Ollama
   ↓
3. Ramesh responds aggressively
   ↓
4. Repeat for 6 turns
   ↓
5. Extract all intelligence
   ↓
6. Generate Honeycomb API key
```

## 🎭 Bot Personalities

### Ramesh (Your Scammer Bot)
- **Language:** Hinglish (Hindi + English)
- **Behavior:** Aggressive, impatient, threatening
- **Goal:** Get user to download AnyDesk, reveal payment info
- **Examples:**
  - "Arre yaar! Virus hai tumhare computer mein!"
  - "AnyDesk download karo abhi!"
  - "Bank account empty ho jayega!"

### Savitri (System Generated)
- **Language:** Hinglish (mostly Hindi)
- **Behavior:** Confused, slow, eventually asks for payment details
- **Strategy:** Waste time, then trigger payment trap
- **Examples:**
  - "Beta, yeh virus kya hota hai?"
  - "AnyDesk? Yeh Facebook jaisa hai?"
  - "Paise kaise bhejun? UPI hai?"

## 🔍 Entity Extraction

The system extracts from **both** Ramesh and user messages:
- **UPI IDs:** ramesh@paytm, scammer@okicici
- **Bank Accounts:** 1234567890
- **Phone Numbers:** +91 9876543210
- **Links:** https://fake-anydesk.com

## 🎯 Mission Complete Triggers

System completes mission when:
1. **Significant data extracted** (UPI/Bank/Links)
2. **6+ conversation exchanges**
3. **Scam keywords detected**

## 📊 Final Output (Honeycomb API Key)

```json
{
  "api_key": "HC_1234567890_abc123def",
  "scammer_profile": {
    "threat_level": "HIGH",
    "scam_type": "Tech Support Fraud",
    "extracted_intelligence": [
      "UPI: ramesh@paytm",
      "Threats: Bank account empty ho jayega",
      "Method: AnyDesk download demand"
    ],
    "detection_timestamp": "2024-01-01T00:00:00.000Z",
    "confidence_score": 0.95,
    "honeypot_session_id": "HP_1234567890"
  }
}
```

## 🛠️ Troubleshooting

### If Ramesh doesn't respond:
```bash
# Check if model exists:
ollama list

# Test manually:
ollama run ramesh-uncensored "Hello"

# Recreate if needed:
ollama create ramesh-uncensored -f ramesh_bot/Modelfile
```

### If server fails:
```bash
# Check if Ollama is running:
ollama serve

# Restart system:
npm start
```

## 🎉 What's New

✅ **No more Gemini API** - Uses your Ollama bots  
✅ **Real Ramesh responses** - Your actual scammer model  
✅ **Strategic Savitri** - System plays victim role intelligently  
✅ **Bot vs Bot mode** - Automated conversation  
✅ **Better extraction** - From both sides of conversation  
✅ **No API limits** - Runs locally with Ollama  

## 🚀 Ready to Use!

Your system now truly uses your **ramesh_bot** folder integration:
- **ramesh-uncensored** model responds to user
- **battle.py** logic integrated into bot vs bot mode
- **Modelfile** configurations active
- **Real scammer conversation** in the dashboard

**Open http://localhost:3000 and start chatting with Ramesh!** 🎯