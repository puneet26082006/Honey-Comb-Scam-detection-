# Honey-Pot Scam Detection API

AI-powered honeypot system for detecting and engaging with scammers using Groq AI (Llama 3.1).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
GROK_API_KEY=your_groq_api_key_here
```

3. Start the server:
```bash
npm start
```

## API Endpoint

**POST** `/api`

Headers:
```
x-api-key: HC_HONEYPOT_2024_SCAM_DETECTION_API_KEY_PUNEET_SAXENA
Content-Type: application/json
```

Request Body:
```json
{
  "sessionId": "unique-session-id",
  "message": {
    "sender": "scammer",
    "text": "Your message here",
    "timestamp": 1234567890
  },
  "conversationHistory": []
}
```

Response:
```json
{
  "status": "success",
  "reply": "AI-generated response"
}
```

## Deployment

Deployed on Vercel: https://honey-comb-scam-detection.vercel.app

## Features

- Groq AI-powered responses
- Comprehensive scam type detection
- Intelligence extraction (phone, bank accounts, UPI IDs, links)
- Engagement metrics tracking
- Automatic callback to evaluation platform
