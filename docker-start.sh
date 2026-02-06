#!/bin/bash

echo "🚀 Starting Honeycomb Scam Detection System..."

# Start Ollama service in background
ollama serve &
OLLAMA_PID=$!

# Wait for Ollama to be ready
echo "⏳ Waiting for Ollama to start..."
sleep 10

# Create models if they don't exist
echo "🤖 Setting up AI models..."
if ! ollama list | grep -q "ramesh-uncensored"; then
    echo "Creating Ramesh model..."
    ollama create ramesh-uncensored -f /app/ramesh_bot/Modelfile
fi

if ! ollama list | grep -q "savitri"; then
    echo "Creating Savitri model..."
    ollama create savitri -f /app/ramesh_bot/Modelfile_Savitri
fi

echo "✅ Models ready!"

# Start the Node.js application
echo "🌐 Starting web server..."
npm start