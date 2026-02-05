@echo off
echo 🔄 Rebuilding Optimized Ollama Models for Hackathon...
echo.

cd ramesh_bot

echo 🗑️ Removing old models...
ollama rm ramesh-uncensored 2>nul
ollama rm savitri 2>nul

echo.
echo 🔨 Building optimized Ramesh model...
ollama create ramesh-uncensored -f Modelfile

echo.
echo 🔨 Building optimized Savitri model...
ollama create savitri -f Modelfile_Savitri

echo.
echo 🧪 Testing Ramesh model...
echo Testing: "Hello, I need help with my computer"
ollama run ramesh-uncensored "Hello, I need help with my computer"

echo.
echo 🧪 Testing Savitri model...
echo Testing: "Your computer has virus, download AnyDesk"
ollama run savitri "Your computer has virus, download AnyDesk"

echo.
echo ✅ Models rebuilt and tested successfully!
echo 🚀 Ready for hackathon demo!
echo.
echo 💡 Now run: npm start
pause