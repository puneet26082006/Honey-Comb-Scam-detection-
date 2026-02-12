/**
 * Ollama-based AI Agent for Honeypot
 * Uses locally trained model for context-aware responses
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const OLLAMA_MODEL = 'honeypot-victim';
const TIMEOUT = 30000; // 30 seconds timeout

/**
 * Generate response using Ollama model
 * @param {string} message - The scam message
 * @param {Array} conversationHistory - Previous messages
 * @returns {Promise<string>} - AI-generated response
 */
export async function generateOllamaResponse(message, conversationHistory = []) {
    try {
        // Build context from conversation history
        let context = '';
        if (conversationHistory.length > 0) {
            context = 'Previous conversation:\n';
            conversationHistory.slice(-4).forEach(msg => {
                const role = msg.sender === 'scammer' ? 'Scammer' : 'You';
                context += `${role}: ${msg.text}\n`;
            });
            context += '\n';
        }
        
        // Prepare the prompt
        const prompt = `${context}Scammer: ${message}\n\nRespond naturally as a potential victim:`;
        
        // Escape special characters for command line
        const escapedPrompt = prompt.replace(/"/g, '\\"').replace(/\n/g, ' ');
        
        // Call Ollama
        const command = `ollama run ${OLLAMA_MODEL} "${escapedPrompt}"`;
        
        console.log(`🤖 Calling Ollama model: ${OLLAMA_MODEL}`);
        
        const { stdout, stderr } = await execAsync(command, {
            timeout: TIMEOUT,
            maxBuffer: 1024 * 1024 // 1MB buffer
        });
        
        if (stderr && !stderr.includes('pulling')) {
            console.warn('⚠️ Ollama warning:', stderr);
        }
        
        const response = stdout.trim();
        
        if (response && response.length > 10) {
            console.log(`✅ Ollama response generated (${response.length} chars)`);
            return response;
        }
        
        throw new Error('Empty or invalid response from Ollama');
        
    } catch (error) {
        console.error('❌ Ollama error:', error.message);
        throw error;
    }
}

/**
 * Check if Ollama is available and model is installed
 * @returns {Promise<boolean>}
 */
export async function checkOllamaAvailability() {
    try {
        const { stdout } = await execAsync('ollama list', { timeout: 5000 });
        return stdout.includes(OLLAMA_MODEL);
    } catch (error) {
        console.error('❌ Ollama not available:', error.message);
        return false;
    }
}

/**
 * Get model info
 * @returns {Promise<object>}
 */
export async function getModelInfo() {
    try {
        const { stdout } = await execAsync(`ollama show ${OLLAMA_MODEL}`, { timeout: 5000 });
        return {
            available: true,
            model: OLLAMA_MODEL,
            info: stdout
        };
    } catch (error) {
        return {
            available: false,
            model: OLLAMA_MODEL,
            error: error.message
        };
    }
}
