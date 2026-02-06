# 🚀 Honeycomb Scam Detection - Deployment Guide

## 🌐 **Live Deployment Options**

### **Option 1: Railway (Recommended) 🚂**

Railway is perfect for Node.js apps with AI models.

#### **Steps:**
1. **Create Railway Account:** https://railway.app
2. **Connect GitHub:** Link your repository
3. **Deploy:**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```
4. **Configure Environment:**
   - Add environment variables in Railway dashboard
   - Set `NODE_ENV=production`
5. **Deploy:** Railway auto-deploys from GitHub

#### **Live URL:** `https://your-app-name.railway.app`

---

### **Option 2: Render 🎨**

Great for full-stack applications.

#### **Steps:**
1. **Create Render Account:** https://render.com
2. **New Web Service:** Connect GitHub repo
3. **Configure:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `NODE_ENV=production`
4. **Deploy:** Automatic deployment

#### **Live URL:** `https://your-app-name.onrender.com`

---

### **Option 3: Vercel (Frontend + API) ⚡**

Perfect for serverless deployment.

#### **Steps:**
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```
2. **Deploy:**
   ```bash
   vercel --prod
   ```
3. **Configure:** Follow prompts

#### **Live URL:** `https://your-app-name.vercel.app`

---

### **Option 4: Docker Container 🐳**

For custom server deployment.

#### **Steps:**
1. **Build Image:**
   ```bash
   docker build -t honeycomb-scam-detection .
   ```
2. **Run Container:**
   ```bash
   docker-compose up -d
   ```
3. **Deploy to Cloud:** AWS, GCP, Azure

---

## 🔑 **Live API Endpoints**

Once deployed, your live API will be available at:

### **Base URL:** `https://your-domain.com/api/messages`

### **Available Endpoints:**

#### **1. Health Check**
```
GET https://your-domain.com/api/messages/health
```

#### **2. Interactive Chat**
```
POST https://your-domain.com/api/messages
Body: {
  "sender_id": "user_123",
  "message": "Beta, virus kya hai?"
}
```

#### **3. Test Ramesh Model**
```
POST https://your-domain.com/api/messages/test-ramesh
Body: {
  "message": "aage kya karna hai?"
}
```

#### **4. Test Savitri Model**
```
POST https://your-domain.com/api/messages/test-savitri
Body: {
  "message": "Your computer has virus!"
}
```

#### **5. Quick Conversation**
```
POST https://your-domain.com/api/messages/quick-conversation
Body: {
  "turns": 6
}
```

#### **6. Bot vs Bot Conversation**
```
POST https://your-domain.com/api/messages/bot-conversation
Body: {}
```

---

## 🎯 **Production Configuration**

### **Environment Variables:**
```env
NODE_ENV=production
PORT=3000
GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key
```

### **Security Features:**
- ✅ CORS protection
- ✅ Request size limits
- ✅ Security headers
- ✅ Error handling
- ✅ Health checks

---

## 🧪 **Testing Live Deployment**

### **ThunderClient/Postman Tests:**

#### **Test 1: Health Check**
```
GET https://your-domain.com/api/messages/health
```
**Expected:** `{"status": "healthy", "timestamp": "..."}`

#### **Test 2: Interactive Chat**
```
POST https://your-domain.com/api/messages
{
  "sender_id": "demo_user",
  "message": "aage kya karna hai?"
}
```
**Expected:** Intelligent Ramesh response with next steps

#### **Test 3: Quick Demo**
```
POST https://your-domain.com/api/messages/quick-conversation
{
  "turns": 4
}
```
**Expected:** Complete conversation with honeycomb API key

---

## 📱 **Mobile-Friendly Interface**

Your deployed app includes:
- ✅ Responsive design
- ✅ Touch-friendly interface
- ✅ Mobile chat experience
- ✅ Real-time updates

---

## 🔧 **Deployment Checklist**

### **Before Deployment:**
- [ ] Clean up test files: `cleanup-project.bat`
- [ ] Test locally: `npm start`
- [ ] Check all endpoints work
- [ ] Verify models are working

### **After Deployment:**
- [ ] Test health endpoint
- [ ] Verify chat functionality
- [ ] Test API endpoints
- [ ] Check mobile responsiveness

---

## 🎉 **Your Live Honeycomb System**

Once deployed, you'll have:

### **🌐 Live Web Interface:**
- Professional cybersecurity dashboard
- Real-time chat with AI scammer
- Live intelligence extraction
- Mobile-responsive design

### **🔑 Live API Endpoints:**
- RESTful API for integration
- JSON responses
- Real-time conversation processing
- Complete honeycomb intelligence reports

### **📊 Production Features:**
- Health monitoring
- Error handling
- Security headers
- Performance optimization

---

## 🚀 **Quick Deploy Commands**

### **Railway:**
```bash
git add . && git commit -m "Deploy to Railway" && git push
```

### **Vercel:**
```bash
vercel --prod
```

### **Docker:**
```bash
docker-compose up -d
```

---

## 🎯 **Live Demo URLs**

After deployment, share these URLs for your hackathon:

- **Web Interface:** `https://your-domain.com`
- **API Documentation:** `https://your-domain.com/api/messages/health`
- **Live Chat Demo:** `https://your-domain.com`

**Your honeycomb scam detection system is now ready for live deployment! 🏆**