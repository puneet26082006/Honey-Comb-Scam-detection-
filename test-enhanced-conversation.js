// Test the enhanced conversation system
import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3000/api/messages';
const senderId = 'test_enhanced_' + Date.now();

async function testConversation() {
    console.log('🧪 Testing Enhanced Conversation System...\n');
    
    const testMessages = [
        "aage kya karna hai?",
        "mujhe samajh nahi aa raha",
        "computer kaise kholu?",
        "browser kahan hai?",
        "download kaise karu?",
        "paise kitne chahiye?",
        "UPI ID kya hai?"
    ];
    
    for (let i = 0; i < testMessages.length; i++) {
        const message = testMessages[i];
        console.log(`\n📨 Message ${i+1}: "${message}"`);
        
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender_id: senderId, message })
            });
            
            const data = await response.json();
            
            console.log(`🤖 Ramesh: "${data.reply}"`);
            console.log(`📊 Phase: ${data.next_phase}`);
            console.log(`🔍 Extracted: ${JSON.stringify(data.total_extracted)}`);
            
            // Wait between messages for realistic conversation
            await new Promise(resolve => setTimeout(resolve, 2000));
            
        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
        }
    }
    
    console.log('\n✅ Enhanced conversation test completed!');
}

// Run the test
testConversation().catch(console.error);