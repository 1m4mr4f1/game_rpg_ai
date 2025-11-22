'use server';

import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

// --- SETUP GROQ (MODE AMAN) ---
// Kita kembali menggunakan process.env agar key tidak terbaca oleh GitHub
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY, // Pastikan Key ada di file .env.local
});

function cleanJSON(text: string) {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
}

export async function playTurn(previousContext: any, userAction: string) {
  // Validasi Key dari ENV (Server Side)
  if (!process.env.GROQ_API_KEY) {
    return { success: false, error: "API Key Groq tidak ditemukan di server (.env.local)." };
  }

  // PROMPT HARDCORE / AGRESIF
  const prompt = `
    Peran: Game Master RPG Dark Fantasy (Bahasa Indonesia).
    Sifat: KEJAM, MENANTANG, PENUH BAHAYA.
    
    Konteks Player:
    - HP: ${previousContext.hp} (Maks 100)
    - Inventory: ${previousContext.inventory.join(', ')}
    - Cerita Terakhir: "${previousContext.lastNarrative}"
    - Aksi User: "${userAction}"
    
    Tugas Utama:
    1. Evaluasi aksi user. Jika berisiko, lakukan "Roll Dadu". Jika gagal, BERIKAN DAMAGE (-10 s/d -30).
    2. Jika cerita tenang, munculkan MUSUH atau JEBAKAN.
    3. Jawab HANYA dengan JSON.
    
    Format JSON Wajib:
    {
      "narrative": "Deskripsi aksi (max 3 kalimat)...",
      "hpChange": 0, 
      "inventory": ["ItemA"], 
      "status": "ALIVE", 
      "options": ["Opsi A", "Opsi B", "Opsi C"]
    }
  `;

  try {
    // Panggil Model Llama 3.3
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'), 
      prompt: prompt,
      temperature: 0.8, 
    });

    const cleanedText = cleanJSON(text);
    const data = JSON.parse(cleanedText);

    return { success: true, data: data };

  } catch (error: any) {
    console.error("❌ ERROR:", error);
    
    // Fallback Anti-Crash
    return { 
      success: true, 
      data: {
        narrative: `(Gangguan Sinyal: ${error.message}) Tiba-tiba tanah berguncang hebat!`,
        hpChange: -5, 
        inventory: previousContext.inventory,
        status: "ALIVE",
        options: ["Bangkit", "Cari perlindungan", "Teriak"]
      } 
    };
  }
}