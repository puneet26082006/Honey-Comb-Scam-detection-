import pandas as pd
import os
from groq import Groq
import json
import random
from dotenv import load_dotenv

# 1. SETUP
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    print("❌ ERROR: Key missing in .env")
    exit(1)

client = Groq(api_key=api_key)

# 2. FUNCTION TO FIND THE BEST MODEL
def get_best_model():
    print("🔍 Checking available models...")
    try:
        models = client.models.list()
        available_ids = [m.id for m in models.data]
        
        print(f"✅ Found {len(available_ids)} models available to your key:")
        for m_id in available_ids:
            print(f"   - {m_id}")
            
        # PRIORITY LIST (Best to Fastest)
        priority_list = [
            "llama-3.3-70b-versatile",  # Best quality (Newest)
            "llama-3.1-70b-versatile",  # High quality
            "llama-3.1-8b-instant",     # Fastest
            "llama3-70b-8192",          # Older stable
        ]
        
        # Pick the first one that exists in the user's list
        for model in priority_list:
            if model in available_ids:
                print(f"\n🏆 Selected Best Model: {model}")
                return model
        
        # Fallback if none match
        fallback = available_ids[0]
        print(f"\n⚠️ Priority models not found. Using fallback: {fallback}")
        return fallback

    except Exception as e:
        print(f"❌ Error fetching models: {e}")
        exit(1)

# GET THE MODEL ONCE
SELECTED_MODEL = get_best_model()

# 3. LOAD CSV DATA
csv_path = os.path.join("ml_training", "spam.csv")
try:
    df = pd.read_csv(csv_path, encoding="latin-1")
    real_scam_hooks = df[df['v1'] == 'spam']['v2'].tolist()
    print(f"✅ Loaded {len(real_scam_hooks)} real scam messages from CSV.")
except Exception as e:
    print(f"❌ Error loading CSV: {e}")
    exit(1)

# 4. SIMULATION LOOP
def simulate_chat_from_hook(real_hook):
    
    ramesh_system = f"""
    You are Ramesh, a 50-year-old shopkeeper from India.
    Language: Hinglish (Hindi + Broken English).
    Context: You received: "{real_hook}"
    Reply in Hinglish. Act confused. Max 15 words.
    """

    scammer_system = f"""
    You are a scammer. The victim replied to your hook: "{real_hook}".
    Continue the scam. Be urgent.
    """

    history = []
    try:
        # 1. RAMESH
        ramesh_reply = client.chat.completions.create(
            messages=[{"role": "system", "content": ramesh_system}],
            model=SELECTED_MODEL
        ).choices[0].message.content

        history.append({
            "instruction": f"You are Ramesh. Reply to: {real_hook}",
            "input": "",
            "output": ramesh_reply
        })

        # 2. SCAMMER
        scammer_reply = client.chat.completions.create(
            messages=[
                {"role": "system", "content": scammer_system},
                {"role": "user", "content": ramesh_reply}
            ],
            model=SELECTED_MODEL
        ).choices[0].message.content

        # 3. RAMESH AGAIN
        ramesh_final = client.chat.completions.create(
            messages=[
                {"role": "system", "content": ramesh_system},
                {"role": "user", "content": f"Scammer said: {scammer_reply}"}
            ],
            model=SELECTED_MODEL
        ).choices[0].message.content

        history.append({
            "instruction": f"You are Ramesh. Reply to: {scammer_reply}",
            "input": "",
            "output": ramesh_final
        })
        return history

    except Exception as e:
        print(f"⚠️ API Error: {e}")
        return []

# 5. EXECUTE
all_training_data = []
# Generate 200 conversations
selected_hooks = random.sample(real_scam_hooks, 200) 

print(f"🚀 Starting Generation using {SELECTED_MODEL}...")

for i, hook in enumerate(selected_hooks):
    if i % 10 == 0: print(f"⏳ Generated {i}/200...")
    chat_logs = simulate_chat_from_hook(hook)
    all_training_data.extend(chat_logs)

# 6. SAVE
output_file = os.path.join("ml_training", "ramesh_hinglish_data.jsonl")
pd.DataFrame(all_training_data).to_json(output_file, orient="records", lines=True)
print(f"✅ DONE! Saved {len(all_training_data)} rows to {output_file}")