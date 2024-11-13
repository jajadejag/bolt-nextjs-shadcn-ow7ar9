"use client";

import { useCallback, useRef } from 'react';

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((soundUrl: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(soundUrl);
      audioRef.current = audio;
      audio.play().catch(console.error);
    } catch (error) {
      console.error('Failed to play sound:', error);
    }
  }, []);

  return { playSound };
}