⚔️ AI Dungeon Master: Infinite Text-Based RPG

"Di mana takdirmu ditentukan oleh kecerdasan buatan."

(Ganti link gambar di atas dengan screenshot asli web kamu nanti)

📖 Tentang Proyek

AI Dungeon Master adalah sebuah web game RPG berbasis teks (Text-Based Adventure) yang dinamis dan tidak terbatas. Berbeda dengan game RPG konvensional yang ceritanya sudah ditulis mati (hardcoded), game ini menggunakan Generative AI (Llama 3 via Groq) sebagai "Game Master".

Setiap keputusan yang kamu ambil—mulai dari menyerang naga hingga bernegosiasi dengan goblin—akan diproses secara real-time oleh AI, menghasilkan konsekuensi unik yang tidak pernah sama setiap kali dimainkan.

✨ Fitur Utama

🧠 AI Narrator (Llama 3): Cerita yang dibuat secara generatif, adaptif, dan terkadang... kejam.

❤️ Real Health System: Sistem HP yang dihitung secara matematika (bukan halusinasi AI).

🎒 Dynamic Inventory: AI akan memberikan atau menghancurkan item berdasarkan konteks cerita.

🎵 Immersive Audio: Backsound misteri yang menyala otomatis saat petualangan dimulai.

🛡️ Offline Fallback Mode: Sistem anti-crash yang tetap menjalankan game meski API AI bermasalah.

🎨 Modern UI: Dibangun dengan Next.js & Tailwind CSS dengan nuansa Dark Fantasy.

🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan stack modern untuk menjamin performa dan skalabilitas:

Frontend: Next.js 14 (App Router), React, TypeScript.

Styling: Tailwind CSS + Lucide React (Icons).

AI Engine: Groq API (Model: Llama 3.3 70B Versatile) via Vercel AI SDK.

Architecture: MVC Pattern (View terpisah dari Logic Controller).

🚀 Cara Menjalankan (Localhost)

Ikuti langkah ini untuk menjalankan game di komputer kamu:

1. Clone Repository

git clone [https://github.com/username-kamu/rpg-ai.git](https://github.com/username-kamu/rpg-ai.git)
cd rpg-ai


2. Install Dependencies

npm install


3. Setup Environment Variables

Buat file .env.local di folder root proyek, lalu tambahkan API Key Groq kamu.
(Dapatkan API Key gratis di console.groq.com)

GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx


Catatan: Jika kamu menggunakan hardcode key di game.actions.ts untuk testing, langkah ini opsional tapi tidak disarankan untuk production.

4. Jalankan Server

npm run dev


Buka browser dan akses: http://localhost:3000

📂 Struktur Folder

Proyek ini menggunakan struktur folder Next.js App Router yang rapi:

src/
├── app/
│   ├── actions/       # Server Actions (Backend Logic & AI Call)
│   ├── components/    # UI Components (View)
│   ├── hooks/         # Custom Hooks (Controller/State Logic)
│   ├── layout.tsx     # Root Layout
│   └── page.tsx       # Entry Point
└── public/
    └── sound/         # Aset Audio


📸 Screenshot

| Start Screen | Gameplay |
|Data | Data |
|  |  |

(Jangan lupa upload screenshot asli ke folder public atau issue github, lalu ganti link di atas)

🤝 Kontribusi

Proyek ini terbuka untuk kontribusi! Jika kamu punya ide fitur baru (misal: sistem Level Up atau Leaderboard), silakan:

Fork repository ini.

Buat branch fitur baru (git checkout -b fitur-keren).

Commit perubahanmu (git commit -m 'Menambah fitur keren').

Push ke branch (git push origin fitur-keren).

Buat Pull Request.

📝 Lisensi

Distributed under the MIT License. See LICENSE for more information.

<p align="center">
Dibuat dengan ❤️ dan ☕ oleh [Rafii aja]
</p>