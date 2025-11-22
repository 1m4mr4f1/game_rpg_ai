'use client';

import { Heart, Backpack, Send, Sparkles, Skull, Volume2, VolumeX, Play } from 'lucide-react';
// Import Logic yang sudah kita pisah
import { useGameController } from '../hooks/useGameController';

export default function RpgGame() {
  // Panggil Controller
  const {
    gameState,
    loading,
    customInput,
    setCustomInput,
    hasStarted,
    isMuted,
    audioRef,
    startGame,
    toggleAudio,
    handleAction,
    resetGame,
    getHpColor
  } = useGameController();

  // --- LAYAR 1: START SCREEN ---
  if (!hasStarted) {
    return (
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-10 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
        {/* Audio Element (Hidden) */}
        <audio ref={audioRef} loop src="/sound/misteri_sound.mp3" />

        <div className="p-4 bg-emerald-900/20 rounded-full animate-pulse">
          <Sparkles className="w-12 h-12 text-emerald-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white tracking-widest uppercase">
          RPG AI ADVENTURE
        </h1>
        
        <p className="text-slate-400 max-w-md">
          Siapkan nyalimu. Klik tombol di bawah untuk masuk ke dunia kegelapan.
          (Pastikan volume menyala)
        </p>

        <button 
          onClick={startGame}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-emerald-600 font-mono rounded-lg hover:bg-emerald-500 hover:scale-105"
        >
          <Play className="w-5 h-5 mr-2 fill-current" />
          MULAI PETUALANGAN
        </button>
      </div>
    );
  }

  // --- LAYAR 2: GAMEPLAY ---
  return (
    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Audio Element */}
        <audio ref={audioRef} loop src="/sound/misteri_sound.mp3" />

        {/* HUD (Status Bar) */}
        <div className="bg-slate-950/80 backdrop-blur-md p-4 border-b border-slate-800 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className={`w-5 h-5 ${gameState.hp < 30 ? 'text-red-500 animate-bounce' : 'text-emerald-400'}`} fill="currentColor" />
              <div className="w-32 h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${getHpColor(gameState.hp)}`} 
                  style={{ width: `${Math.max(0, gameState.hp)}%` }}
                />
              </div>
              <span className="font-mono text-sm font-bold text-white">{gameState.hp}/100</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tombol Mute */}
            <button 
              onClick={toggleAudio}
              className={`p-2 rounded-full transition-colors border ${isMuted ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-emerald-900/30 text-emerald-400 border-emerald-500/50'}`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <Backpack className="w-4 h-4" />
              <span>{gameState.inventory ? gameState.inventory.length : 0} Items</span>
            </div>
          </div>
        </div>

        {/* STAGE AREA */}
        <div className="p-6 min-h-[300px] flex flex-col justify-center relative bg-slate-900">
          {loading && (
            <div className="absolute inset-0 bg-slate-900/80 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
              <p className="text-emerald-400 animate-pulse font-mono text-sm">AI sedang merancang takdir...</p>
            </div>
          )}

          {gameState.status === 'DEAD' || gameState.hp <= 0 ? (
            <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500 relative z-10">
              <Skull className="w-20 h-20 text-red-600 mx-auto mb-4 animate-pulse" />
              <h2 className="text-4xl font-bold text-red-600 tracking-widest uppercase">YOU DIED</h2>
              <p className="text-slate-400 italic border-t border-slate-800 pt-4">"{gameState.narrative}"</p>
              <button 
                onClick={resetGame}
                className="bg-red-700 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all mt-6 shadow-lg shadow-red-900/50"
              >
                MAIN LAGI
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
              <p className="text-lg leading-relaxed text-slate-100 border-l-4 border-emerald-500 pl-4 py-2">
                {gameState.narrative}
              </p>
              
              {gameState.hpChange !== 0 && (
                <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-lg text-sm font-bold ${gameState.hpChange > 0 ? 'text-emerald-400 bg-emerald-950/50 border border-emerald-800' : 'text-red-400 bg-red-950/50 border border-red-800'}`}>
                  {gameState.hpChange > 0 ? '+' : ''}{gameState.hpChange} HP
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-slate-800/50">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 opacity-50">Inventory</p>
                <div className="flex flex-wrap gap-2">
                  {gameState.inventory && gameState.inventory.map((item: string, idx: number) => (
                    <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 hover:border-emerald-500 transition-colors cursor-help">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CONTROLS AREA */}
        {gameState.status !== 'DEAD' && gameState.hp > 0 && (
          <div className="bg-slate-950 p-4 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {gameState.options.map((opt: string, idx: number) => (
                <button
                  key={idx}
                  disabled={loading}
                  onClick={() => handleAction(opt)}
                  className="bg-slate-800 hover:bg-emerald-900 hover:text-emerald-100 text-slate-300 text-sm py-4 px-4 rounded-xl transition-all border border-slate-700 hover:border-emerald-500 text-left disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  <span className="block text-xs text-emerald-500 font-bold mb-1">OPSI {idx + 1}</span>
                  {opt}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAction(customInput)}
                placeholder="Ketik tindakan nekatmu di sini..."
                disabled={loading}
                className="w-full bg-slate-900 text-white border border-slate-700 rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
              />
              <button
                onClick={() => handleAction(customInput)}
                disabled={!customInput || loading}
                className="absolute right-2 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 rounded-lg disabled:opacity-50 transition-all font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
    </div>
  );
}