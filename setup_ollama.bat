@echo off
echo ========================================
echo Setting up Ollama Model for Honeypot
echo ========================================
echo.

echo Step 1: Checking if Ollama is installed...
ollama --version
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Ollama is not installed!
    echo Please install Ollama from: https://ollama.com/download
    echo.
    pause
    exit /b 1
)

echo.
echo Step 2: Pulling base model (llama3.2)...
ollama pull llama3.2

echo.
echo Step 3: Creating custom victim model...
ollama create honeypot-victim -f Modelfile_Victim

echo.
echo Step 4: Testing the model...
echo Testing with sample scam message...
echo.
ollama run honeypot-victim "Your Paytm KYC has been suspended. Call immediately."

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Model Name: honeypot-victim
echo.
echo To test the model:
echo   ollama run honeypot-victim "Your message here"
echo.
echo To use in API, the model will be called automatically.
echo.
pause
