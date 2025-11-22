import RpgGame from "./components/rpg-game";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-950">
      
      <h1 className="text-3xl font-bold text-emerald-500 mb-8 tracking-widest uppercase font-mono opacity-80">
        AI Dungeon Master
      </h1>

      {/* Memanggil Component Game */}
      <RpgGame />

      <p className="mt-8 text-xs text-slate-600 font-mono">
        Powered by Next.js & Google Gemini
      </p>
      
    </main>
  );
}