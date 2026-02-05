@echo off
echo 🤖 Setting up Ollama models for Honeycomb Scam Detection...
echo.

echo 📥 Creating Ramesh model from Modelfile...
cd ramesh_bot
ollama create ramesh-uncensored -f Modelfile

echo.
echo 📥 Creating Savitri model from Modelfile_Savitri...
ollama create savitri -f Modelfile_Savitri

echo.
echo ✅ Models created! Testing...
echo.

echo 🧪 Testing Ramesh model:
ollama run ramesh-uncensored "Hello, I need help with my computer"

echo.
echo 🧪 Testing Savitri model:
ollama run savitri "Download AnyDesk now!"

echo.
echo 🎉 Setup complete! You can now run the honeycomb system.
echo 💡 Run: npm start
pause