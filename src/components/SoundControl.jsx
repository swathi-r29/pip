import React from 'react';
import { useSound } from '../context/SoundContext';

export const SoundControl = ({ className = '', showLabel = true }) => {
  const { isMuted, toggleMute, playMicroClick, supported } = useSound();

  const handleClick = () => {
    playMicroClick();
    toggleMute();
  };

  return (
    <button
      type="button"
      id="mute-toggle"
      className={`sound-control-btn ${isMuted ? 'muted' : 'unmuted'} ${className}`}
      onClick={handleClick}
      disabled={!supported}
      aria-pressed={!isMuted}
      aria-label={isMuted ? 'Sound is off. Click to turn on music box audio.' : 'Sound is on. Click to mute audio.'}
      title={
        !supported
          ? 'Web Audio not supported in this browser'
          : isMuted
            ? 'Sound is muted (polite default). Click to turn on ♪'
            : 'Sound is active ♪ Click to mute'
      }
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.45rem 0.85rem',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border)',
        background: isMuted ? 'var(--bg-deep)' : 'var(--accent-glow)',
        color: isMuted ? 'var(--text-muted)' : 'var(--accent)',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        transition: 'all 0.25s ease',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '1.05rem', lineHeight: 1 }}>
        {isMuted ? '🔇' : '🔊'}
      </span>
      {showLabel && (
        <span className="sound-text">
          Sound: {isMuted ? 'Off' : 'On'}
        </span>
      )}
      <span className="sr-only">{isMuted ? 'is muted' : 'is active'}</span>
    </button>
  );
};

export default SoundControl;
