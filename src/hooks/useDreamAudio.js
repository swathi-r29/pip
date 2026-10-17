import { useCallback, useEffect, useRef, useState } from 'react';

// freq (Hz), beats. 0 = rest. Original 20-step pentatonic lullaby:
// G4 (392), B4 (494), D5 (587), C5 (523), A4 (440), E4 (330), D4 (294)
export const MELODY = [
  [392, 1], [494, 1], [587, 2], [523, 1], [494, 1], [440, 2], [392, 1], [440, 1], [494, 1], [392, 3],
  [330, 1], [392, 1], [440, 2], [392, 1], [330, 1], [294, 2], [330, 1], [392, 1], [294, 3], [0, 2]
];

export const BEAT = 0.62; // seconds per beat

const getAC = () => (typeof window === 'undefined' ? null : window.AudioContext || window.webkitAudioContext || null);

/**
 * Pure Web Audio API algorithmic synthesis hook.
 * Zero external audio files, zero load times, and zero audio popping.
 * Starts muted by default to honor browser autoplay policies.
 * Instantiates AudioContext lazily upon first user interaction.
 */
export function useDreamAudio() {
  const supported = typeof window !== 'undefined' && !!getAC();
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [activeNote, setActiveNote] = useState(-1);

  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const timerRef = useRef(null);
  const playingRef = useRef(false);
  const idxRef = useRef(0);
  const mutedRef = useRef(true);
  mutedRef.current = muted;

  // Lazy AudioContext initialization
  const ensure = useCallback(() => {
    const AC = getAC();
    if (!AC) return null;
    if (!ctxRef.current) {
      try {
        const c = new AC();
        const g = c.createGain();
        g.gain.value = 0.7;
        g.connect(c.destination);
        ctxRef.current = c;
        masterRef.current = g;
      } catch {
        return null;
      }
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }, []);

  /**
   * Plucked music box tine tone:
   * Fundamental sine wave + subtle triangle octave overtone (2 * freq @ 25% mix).
   * Fast 15ms exponential attack, exponential decay. No audio clicking.
   */
  const tone = useCallback(
    (freq, dur = 0.85, vol = 0.18) => {
      const c = ensure();
      if (!c || !freq) return;
      try {
        const t = c.currentTime;
        const env = c.createGain();
        env.gain.setValueAtTime(0.0001, t);
        env.gain.exponentialRampToValueAtTime(vol, t + 0.015);
        env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        env.connect(masterRef.current);

        [[freq, 'sine', 1], [freq * 2, 'triangle', 0.25]].forEach(([f, type, mix]) => {
          const o = c.createOscillator();
          const og = c.createGain();
          o.type = type;
          o.frequency.setValueAtTime(f, t);
          og.gain.setValueAtTime(mix, t);
          o.connect(og);
          og.connect(env);
          o.start(t);
          o.stop(t + dur + 0.05);
        });
      } catch {
        // Audio safely caught
      }
    },
    [ensure]
  );

  const stopLullaby = useCallback(() => {
    playingRef.current = false;
    clearTimeout(timerRef.current);
    setPlaying(false);
    setActiveNote(-1);
    const c = ctxRef.current;
    const m = masterRef.current;
    if (c && m) {
      // Smooth linear ramp prevents stop click
      const t = c.currentTime;
      m.gain.cancelScheduledValues(t);
      m.gain.setValueAtTime(m.gain.value, t);
      m.gain.linearRampToValueAtTime(0, t + 0.12);
    }
  }, []);

  const playLullaby = useCallback(() => {
    const c = ensure();
    if (!c) return false;
    // Pressing play on the music box is an explicit sound request, so unmute
    setMuted(false);
    mutedRef.current = false;
    const t = c.currentTime;
    masterRef.current.gain.cancelScheduledValues(t);
    masterRef.current.gain.setValueAtTime(0.7, t);
    playingRef.current = true;
    setPlaying(true);
    idxRef.current = 0;

    const step = () => {
      if (!playingRef.current) return;
      const i = idxRef.current;
      const [f, b] = MELODY[i];
      if (f > 0) {
        tone(f, b * BEAT * 1.5, 0.22);
      }
      setActiveNote(i);
      idxRef.current = (i + 1) % MELODY.length;
      timerRef.current = setTimeout(step, b * BEAT * 1000);
    };

    step();
    return true;
  }, [ensure, tone]);

  const toggleMute = useCallback(() => {
    const next = !muted;
    setMuted(next);
    mutedRef.current = next;
    if (next) {
      stopLullaby();
    } else {
      ensure();
    }
  }, [muted, stopLullaby, ensure]);

  // Micro-click: subtle, quiet tap (740 Hz, 90ms duration, 5% volume)
  const click = useCallback(() => {
    if (mutedRef.current || !supported) return;
    tone(740, 0.09, 0.05);
  }, [tone, supported]);

  // Single musical note (used for lanterns, piano keys, map stops)
  const note = useCallback(
    (freq, dur = 0.9, vol = 0.18) => {
      if (mutedRef.current || !supported) return;
      tone(freq, dur, vol);
    },
    [tone, supported]
  );

  // Theme toggle arpeggio: ascending 4 notes (523, 659, 784, 1047 Hz)
  const chime = useCallback(() => {
    if (mutedRef.current || !supported) return;
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => tone(f, 0.8, 0.14), i * 140);
    });
  }, [tone, supported]);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      playingRef.current = false;
      ctxRef.current?.close?.().catch(() => {});
      ctxRef.current = null;
    };
  }, []);

  return {
    supported,
    muted,
    playing,
    activeNote,
    toggleMute,
    playLullaby,
    stopLullaby,
    click,
    note,
    chime,
    MELODY,
  };
}
