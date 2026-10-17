import React, { createContext, useContext, useCallback } from 'react';
import { useDreamAudio, MELODY } from '../hooks/useDreamAudio';
import { AppContext } from '../AppContext';

const SoundContext = createContext();

// Core frequencies (Hz)
export const NOTES = {
  D4: 293.66,
  E4: 329.63,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G5: 783.99,
  C6: 1046.50,
};

export const SoundProvider = ({ children }) => {
  const audio = useDreamAudio();

  const playMusicBoxNote = useCallback(
    (freq, duration = 0.85, volume = 0.22) => {
      audio.note(freq, duration, volume);
    },
    [audio]
  );

  const playMicroClick = useCallback(() => {
    audio.click();
  }, [audio]);

  const playThemeArpeggio = useCallback(() => {
    audio.chime();
  }, [audio]);

  const playLanternChime = useCallback(
    (themeName) => {
      switch (themeName) {
        case 'honey':
          audio.note(NOTES.G4, 1.1, 0.24); // 392 Hz
          break;
        case 'berry':
          audio.note(NOTES.A4, 1.1, 0.24); // 440 Hz
          break;
        case 'blue':
        case 'mist':
          audio.note(NOTES.C5, 1.1, 0.24); // 523 Hz
          break;
        case 'mint':
          audio.note(NOTES.D5, 1.1, 0.24); // 587 Hz
          break;
        default:
          audio.note(NOTES.C5, 1.1, 0.24);
      }
    },
    [audio]
  );

  const toggleLullaby = useCallback(() => {
    if (audio.playing) {
      audio.stopLullaby();
    } else {
      audio.playLullaby();
    }
  }, [audio]);

  const contextValue = {
    audio,
    supported: audio.supported,
    isMuted: audio.muted,
    toggleMute: audio.toggleMute,
    playMusicBoxNote,
    playMicroClick,
    playClickSound: playMicroClick,
    playThemeArpeggio,
    playLanternChime,
    isPlayingLullaby: audio.playing,
    lullabyStep: audio.activeNote,
    startLullaby: audio.playLullaby,
    stopLullaby: audio.stopLullaby,
    toggleLullaby,
    MELODY,
    NOTES,
  };

  return (
    <SoundContext.Provider value={contextValue}>
      <AppContext.Provider value={{ audio, ...contextValue }}>
        {children}
      </AppContext.Provider>
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
export default SoundContext;
