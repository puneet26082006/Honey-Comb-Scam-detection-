@echo off
echo 🛡️ Starting Honeycomb Scam Detection System...
echo.
echo 📋 Prerequisites:
echo   - Node.js installed ✓
echo   - Python installed ✓
echo   - Ollama running with ramesh-uncensored and savitri models
echo.

echo 🔍 Checking Ollama models...
ollama list | findstr "ramesh-uncensored" >nul
if %errorlevel% neq 0 (
    echo ❌ ramesh-uncensored model not found!
    echo 💡 Run setup-ollama.bat first to create the models
    pause
    exit /b 1
)

echo ✅ Ollama models ready!
echo.
echo 🚀 Starting server...
npm start
pause
