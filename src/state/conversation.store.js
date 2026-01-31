// src/state/conversation.store.js
const conversations = new Map();

export const getConversation = (senderId) => {
    if (!conversations.has(senderId)) {
        conversations.set(senderId, {
            id: senderId,
            history: [],
            extracted_data: {  // <--- This is where we store the loot
                upi: [],
                bank_account: [],
                links: [],
                phone: []
            },
            status: "ACTIVE"
        });
    }
    return conversations.get(senderId);
};

export const updateConversation = (senderId, message, role) => {
    const conversation = getConversation(senderId);
    conversation.history.push({ role, text: message });
    return conversation;
};

// NEW FUNCTION: Merge new data into existing data
export const saveExtractedData = (senderId, newData) => {
    const conversation = getConversation(senderId);
    
    // Merge arrays and remove duplicates
    conversation.extracted_data.upi = [...new Set([...conversation.extracted_data.upi, ...newData.upi])];
    conversation.extracted_data.bank_account = [...new Set([...conversation.extracted_data.bank_account, ...newData.bank_account])];
    conversation.extracted_data.links = [...new Set([...conversation.extracted_data.links, ...newData.links])];
    conversation.extracted_data.phone = [...new Set([...conversation.extracted_data.phone, ...newData.phone])];

    return conversation.extracted_data;
};