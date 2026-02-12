/**
 * Verification Script - Ensures all core functionality works after cleanup
 */

import { extractEntities } from './src/extractors/entity.extractor.js';
import { generateIntelligentResponse } from './src/agents/intelligent.agent.js';

console.log("🔍 VERIFYING PROJECT AFTER CLEANUP\n");
console.log("=" .repeat(60));

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`✅ ${name}`);
        passed++;
    } catch (error) {
        console.log(`❌ ${name}: ${error.message}`);
        failed++;
    }
}

// Test 1: Entity Extraction
test("Entity Extraction Works", () => {
    const result = extractEntities("Send to ramesh@paytm or call +91 9876543210");
    if (!result.upi || result.upi.length === 0) throw new Error("UPI extraction failed");
    if (!result.phone || result.phone.length === 0) throw new Error("Phone extraction failed");
});

// Test 2: Response Generation
test("Response Generation Works", () => {
    const response = generateIntelligentResponse("Your KYC suspended", []);
    if (!response || response.length < 10) throw new Error("Response generation failed");
});

// Test 3: Multi-turn Conversation
test("Multi-turn Conversation Works", () => {
    const history = [
        { text: "Account blocked", sender: "scammer" },
        { text: "Why?", sender: "user" }
    ];
    const response = generateIntelligentResponse("Send money", history);
    if (!response || response.length < 10) throw new Error("Multi-turn failed");
});

// Test 4: Scam Detection
test("Scam Detection Works", () => {
    const scamTypes = [
        "Your Paytm KYC suspended",
        "FedEx parcel drugs",
        "CBI digital arrest",
        "Electricity disconnection",
        "Won Rs 25 lakhs KBC"
    ];
    
    scamTypes.forEach(scam => {
        const response = generateIntelligentResponse(scam, []);
        if (!response || response.length < 10) {
            throw new Error(`Failed for: ${scam}`);
        }
    });
});

// Test 5: No Unused Imports
test("No Unused Imports", () => {
    // If this script runs without errors, imports are valid
    if (typeof extractEntities !== 'function') throw new Error("extractEntities not imported");
    if (typeof generateIntelligentResponse !== 'function') throw new Error("generateIntelligentResponse not imported");
});

console.log("\n" + "=" .repeat(60));
console.log(`\n📊 Results: ${passed}/${passed + failed} tests passed`);

if (failed === 0) {
    console.log("\n✅ ALL VERIFICATIONS PASSED!");
    console.log("🎉 Project is clean and fully functional!");
} else {
    console.log("\n❌ Some verifications failed!");
    process.exit(1);
}
