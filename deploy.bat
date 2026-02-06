@echo off
echo 🚀 Honeycomb Scam Detection - Deployment Script
echo.

echo Choose deployment option:
echo 1. Clean project for deployment
echo 2. Deploy to Vercel
echo 3. Deploy to Railway (GitHub)
echo 4. Build Docker container
echo 5. Test production build locally
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo 🧹 Cleaning project...
    call cleanup-project.bat
    echo ✅ Project cleaned for deployment!
    goto end
)

if "%choice%"=="2" (
    echo 🌐 Deploying to Vercel...
    npm install -g vercel
    vercel --prod
    echo ✅ Deployed to Vercel!
    goto end
)

if "%choice%"=="3" (
    echo 📡 Preparing for Railway deployment...
    echo Make sure your code is pushed to GitHub
    echo Then connect your repo at: https://railway.app
    echo ✅ Railway deployment guide ready!
    goto end
)

if "%choice%"=="4" (
    echo 🐳 Building Docker container...
    docker build -t honeycomb-scam-detection .
    echo ✅ Docker image built!
    echo Run with: docker-compose up -d
    goto end
)

if "%choice%"=="5" (
    echo 🧪 Testing production build locally...
    set NODE_ENV=production
    npm start
    goto end
)

echo ❌ Invalid choice!

:end
echo.
echo 📖 See DEPLOYMENT_GUIDE.md for detailed instructions
pause