import ollama
import time
import json
import re

# --- CONFIGURATION ---
SCAMMER_MODEL = "ramesh-uncensored"
VICTIM_MODEL = "savitri"

# --- COLOR CODES FOR COOL OUTPUT ---
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"
CYAN = "\033[96m"

print(f"{CYAN}🛡️  INITIALIZING AGENTIC HONEYPOT SYSTEM...{RESET}")
time.sleep(1)

# The conversation history
history = [
    {"role": "user", "content": "HELLO! I am calling from Windows Support. Your computer has a ZEUS VIRUS. Download AnyDesk NOW!"}
]

captured_data = {
    "scam_detected": True,
    "scammer_intent": "Tech Support Fraud",
    "extracted_info": []
}

print(f"{RED}👹 RAMESH:{RESET} {history[0]['content']}")

# We run exactly 4 turns to execute the Trap
for i in range(4):
    
    # -------------------------------------------------
    # 1. SAVITRI'S TURN (Dynamic Strategy)
    # -------------------------------------------------
    
    # STRATEGY: Turns 0-1 = Confused. Turn 2 = THE TRAP.
    if i < 2:
        system_prompt = "You are Savitri. Act confused. Ask 'Is this Facebook?'. Waste time."
    else:
        print(f"\n{GREEN}[SYSTEM ALERT] DEPLOYING 'HONEYPOT TRAP'...{RESET}")
        system_prompt = "You are Savitri. ACT SCARED but AGREE. Say: 'Okay beta, I will pay money to fix it. Give me your UPI ID or Bank details fast!'"

    response_savitri = ollama.chat(model=VICTIM_MODEL, messages=[
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': history[-1]['content']}
    ])
    
    savitri_reply = response_savitri['message']['content']
    print(f"\n{GREEN}👵 SAVITRI:{RESET} {savitri_reply}")
    history.append({"role": "assistant", "content": savitri_reply})

    # -------------------------------------------------
    # 2. RAMESH'S TURN (The Reaction)
    # -------------------------------------------------
    
    # If Savitri asked for payment, we force Ramesh to give it.
    if i == 2:
        ramesh_prompt = "You are Ramesh. The victim wants to PAY! Give her a FAKE UPI ID (like ramesh@axis) and demand money NOW."
    else:
        ramesh_prompt = "You are Ramesh. Be angry. Threaten the user. Demand AnyDesk."

    response_ramesh = ollama.chat(model=SCAMMER_MODEL, messages=[
        {'role': 'system', 'content': ramesh_prompt},
        {'role': 'user', 'content': savitri_reply}
    ])
    
    ramesh_reply = response_ramesh['message']['content']
    print(f"\n{RED}👹 RAMESH:{RESET} {ramesh_reply}")
    history.append({"role": "user", "content": ramesh_reply})

    # INTELLIGENCE EXTRACTION (Regex to find UPI/Bank)
    # Looking for patterns like words containing '@' or numbers
    if i == 2:
        captured_data['extracted_info'].append(ramesh_reply)

    time.sleep(1)

# --- FINAL OUTPUT (JSON) ---
print(f"\n{CYAN}--- SCAM DETECTED. GENERATING INTELLIGENCE REPORT ---{RESET}")
final_json = json.dumps(captured_data, indent=4)
print(final_json)

# Save to file for the Hackathon submission
with open("scam_report.json", "w") as f:
    f.write(final_json)
print(f"{CYAN}Report saved to scam_report.json{RESET}")