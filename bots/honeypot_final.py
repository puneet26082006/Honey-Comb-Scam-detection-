import ollama
import time
import json
import os

# --- CONFIGURATION ---
# Ensure these models are created in Ollama before running!
# Run: ollama create ramesh-uncensored -f Modelfile
# Run: ollama create savitri -f Modelfile_Savitri
SCAMMER_MODEL = "ramesh-uncensored"
VICTIM_MODEL = "savitri"

# Output file path (Save it in the same directory)
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), 'scam_report.json')

history = [
    {"role": "user", "content": "HELLO! I am calling from Windows Support. Your computer has a ZEUS VIRUS. Download AnyDesk NOW!"}
]

captured_data = {
    "scam_detected": True,
    "scammer_intent": "Tech Support Fraud",
    "extracted_info": [],
    "chat_log": []
}

# Run 4 turns of conversation
for i in range(4):
    # --- SAVITRI (The Victim) ---
    if i < 2:
        system_prompt = "You are Savitri. Act confused. Ask 'Is this Facebook?'. Waste time."
    else:
        system_prompt = "You are Savitri. ACT SCARED but AGREE. Say: 'Okay beta, I will pay. Give me your UPI ID fast!'"

    response_savitri = ollama.chat(model=VICTIM_MODEL, messages=[
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': history[-1]['content']}
    ])
    savitri_reply = response_savitri['message']['content']
    history.append({"role": "assistant", "content": savitri_reply})
    captured_data['chat_log'].append(f"👵 SAVITRI: {savitri_reply}")

    # --- RAMESH (The Scammer) ---
    if i == 2:
        ramesh_prompt = "You are Ramesh. The victim wants to PAY! Give her a FAKE UPI ID (like ramesh@axis) and demand money."
    else:
        ramesh_prompt = "You are Ramesh. Be angry. Threaten the user."

    response_ramesh = ollama.chat(model=SCAMMER_MODEL, messages=[
        {'role': 'system', 'content': ramesh_prompt},
        {'role': 'user', 'content': savitri_reply}
    ])
    ramesh_reply = response_ramesh['message']['content']
    history.append({"role": "user", "content": ramesh_reply})
    captured_data['chat_log'].append(f"👹 RAMESH: {ramesh_reply}")

    # Trap Logic: Capture the UPI ID
    if i == 2:
        captured_data['extracted_info'].append(ramesh_reply)

# --- SAVE REPORT ---
with open(OUTPUT_FILE, "w", encoding='utf-8') as f:
    json.dump(captured_data, f, indent=4)

print(json.dumps(captured_data)) # Print to stdout so Node.js can read it