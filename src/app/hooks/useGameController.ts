'use client';

import { useState, useRef, useEffect } from 'react';
// Pastikan path import ini sesuai dengan lokasi file action Anda
import { playTurn } from '../actions/game.actions';

const INITIAL_STATE = {
  hp: 100,
  inventory: ['Pedang Kayu', 'Potion Kecil'],
  lastNarrative: "Kamu berdiri di gerbang hutan terlarang. Kabut tebal menyelimuti pepohonan.",
  narrative: "Selamat datang, Petualang. Hutan ini penuh misteri. Suara lolongan serigala terdengar di kejauhan...",
  options: ["Masuk ke dalam hutan", "Cari kayu bakar", "Periksa tas perbekalan"],
  status: 'ALIVE',
  hpChange: 0
};

export function useGameController() {
  const [gameState, setGameState] = useState<any>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [customInput, setCustomInput] = useState('');
  
  // State Logika Game
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Setup Audio saat pertama load
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume 50%
      
      // Deteksi error jika file audio hilang
      audioRef.current.addEventListener('error', (e) => {
        console.error("❌ ERROR AUDIO: File MP3 tidak ditemukan di public/sound/misteri_sound.mp3", e);
      });
    }
  }, []);

  // Fungsi Mulai Game (Pemicu Audio Legal)
  const startGame = () => {
    setHasStarted(true);
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsMuted(false))
          .catch((e) => console.log("Autoplay dicegah browser, perlu interaksi lagi.", e));
      }
    }
  };

  // Fungsi Toggle Audio Mute/Unmute
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play();
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  // Fungsi Utama Menangani Aksi User
  const handleAction = async (action: string) => {
    if (!action) return;
    setLoading(true);
    setCustomInput('');

    // Pastikan audio tetap jalan jika user berinteraksi
    if (audioRef.current && audioRef.current.paused && !isMuted) {
       audioRef.current.play().catch(() => {});
    }

    // Panggil Backend AI
    const result = await playTurn(gameState, action);

    if (result.success && result.data) {
      // LOGIKA MATEMATIKA HP:
      // Hitung HP baru = HP Lama + Perubahan
      // Math.max(0, ...) -> Supaya tidak minus
      // Math.min(100, ...) -> Supaya tidak lebih dari 100
      const newHp = Math.max(0, Math.min(100, gameState.hp + result.data.hpChange));

      setGameState({
        ...gameState,      // Copy data lama
        ...result.data,    // Timpa dengan data baru dari AI
        hp: newHp,         // Timpa HP dengan hasil hitungan kita
        lastNarrative: result.data.narrative,
        status: newHp <= 0 ? 'DEAD' : result.data.status // Paksa DEAD jika HP habis
      });
    } else {
      alert(`Gagal: ${result.error}`);
    }
    setLoading(false);
  };

  // Fungsi Reset Game (Main Lagi)
  const resetGame = () => {
    setGameState(INITIAL_STATE);
    // Kita tidak perlu setHasStarted(false) agar musik tidak mati
    setLoading(false);
  };

  // Helper Warna HP
  const getHpColor = (hp: number) => {
    if (hp > 70) return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
    if (hp > 30) return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]';
    return 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)] animate-pulse';
  };

  // Return semua "alat" yang dibutuhkan oleh Tampilan (View)
  return {
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
  };
}