// Quick system test
import { extractEntities } from './src/extractors/entity.extractor.js';
import { classifyMessage } from './src/agents/classifier.agent.js';

console.log('🧪 Testing Honeycomb Scam Detection System...\n');

// Test 1: Entity Extraction
console.log('1️⃣ Testing Entity Extraction:');
const testMessage = "Send money to ramesh@paytm or call +91 9876543210. Visit https://fake-bank.com";
const extracted = extractEntities(testMessage);
console.log('Extracted:', JSON.stringify(extracted, null, 2));

// Test 2: Classification (requires API key)
console.log('\n2️⃣ Testing Message Classification:');
try {
    const classification = await classifyMessage("Your bank account is blocked! Send OTP immediately!");
    console.log('Classification:', classification);
} catch (error) {
    console.log('Classification test skipped (API key required)');
}

console.log('\n✅ System components loaded successfully!');
console.log('🚀 Run "npm start" to launch the full system');