#!/bin/bash

# Start Ollama service in background
echo "🚀 Starting Ollama service..."
ollama serve &

# Wait for Ollama to be ready
echo "⏳ Waiting for Ollama to start..."
sleep 10

# Check if model exists, if not create it
echo "🔍 Checking for honeypot-victim model..."
if ! ollama list | grep -q "honeypot-victim"; then
    echo "📥 Pulling base model..."
    ollama pull llama3
    
    echo "🛠️ Creating honeypot-victim model..."
    if [ -f "Modelfile_Victim" ]; then
        ollama create honeypot-victim -f Modelfile_Victim
        echo "✅ Model created successfully"
    else
        echo "⚠️ Modelfile_Victim not found, using base llama3"
    fi
else
    echo "✅ Model already exists"
fi

# Start the Node.js application
echo "🚀 Starting Node.js application..."
exec npm start
