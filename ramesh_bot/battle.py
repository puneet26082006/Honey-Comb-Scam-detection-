import ollama
import time
import random

# --- CONFIGURATION ---
SCAMMER_MODEL = "ramesh-uncensored"
VICTIM_MODEL = "savitri"

# --- SYSTEM PROMPTS (The Brains) ---
# We inject these strictly into every turn to keep them on track.

RAMESH_INSTRUCTION = """
SYSTEM: You are Ramesh, an aggressive scammer from Delhi.
Current Status: The user is an old lady who is wasting your time.
INSTRUCTIONS:
1. Do NOT explain technical details. She doesn't understand.
2. SCARE HER. Say "Your Bank Account is EMPTY" or "Police is coming".
3. Demand she download 'AnyDesk' immediately.
4. Keep responses SHORT (1-2 sentences) and ANGRY.
5. Speak in Hinglish (Hindi slang + English).
"""

SAVITRI_INSTRUCTION = """
SYSTEM: You are Savitri, a 65-year-old grandmother.
Current Status: A man is yelling at you about a virus.
INSTRUCTIONS:
1. Do NOT say "I don't understand" every time. Use different excuses.
2. Variety of Excuses:
   - "My grandson handles the computer."
   - "Is this the button for Facebook?"
   - "I cannot find my glasses."
   - "Why are you shouting beta?"
   - "My tea is boiling, wait one minute."
3. Act innocent but annoying.
"""

# Initial Trigger
history = [
    {"role": "user", "content": "HELLO! I am calling from Microsoft. Your computer is sending virus signals. Download AnyDesk NOW!"}
]

print("📞 --- CALL CONNECTED --- 📞")
print(f"👹 RAMESH: {history[0]['content']}")

# Run for 8 turns
for i in range(8):
    try:
        # -------------------------------------------------
        # 1. SAVITRI'S TURN (The Victim)
        # -------------------------------------------------
        print(f"\n... Savitri is confused ({i+1}/8) ...")
        
        # We give her the chat history + Her Instructions
        response_savitri = ollama.chat(model=VICTIM_MODEL, messages=[
            {'role': 'system', 'content': SAVITRI_INSTRUCTION},
            {'role': 'user', 'content': history[-1]['content']} 
        ])
        
        savitri_reply = response_savitri['message']['content']
        print(f"👵 SAVITRI: {savitri_reply}")
        
        # Add to history
        history.append({"role": "assistant", "content": savitri_reply})

        # -------------------------------------------------
        # 2. RAMESH'S TURN (The Scammer)
        # -------------------------------------------------
        print(f"\n... Ramesh is getting angry ({i+1}/8) ...")
        
        response_ramesh = ollama.chat(model=SCAMMER_MODEL, messages=[
            {'role': 'system', 'content': RAMESH_INSTRUCTION},
            {'role': 'user', 'content': savitri_reply}
        ])
        
        ramesh_reply = response_ramesh['message']['content']
        print(f"👹 RAMESH: {ramesh_reply}")

        # Add to history
        history.append({"role": "user", "content": ramesh_reply})
        
        time.sleep(2) # Wait 2 seconds so you can read it

    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        break

print("\n📞 --- CALL DISCONNECTED --- 📞")