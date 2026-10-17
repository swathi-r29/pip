import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useSound } from '../context/SoundContext';

export const EasterEggModal = ({ isOpen, onClose }) => {
  const { playSecretMelody } = useSound();

  useEffect(() => {
    if (isOpen) {
      playSecretMelody();

      // Confetti burst
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#a34063', '#f5c842', '#e8d5b7', '#fff8f1', '#c4a8e0', '#5c4033'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 120,
            origin: { x: 0.15, y: 0.6 },
            colors: ['#a34063', '#f5c842', '#c4a8e0'],
          });
        }, 400);
        setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 120,
            origin: { x: 0.85, y: 0.6 },
            colors: ['#a34063', '#f5c842', '#e8d5b7'],
          });
        }, 800);
      } catch {
        // confetti fallback
      }
    }
  }, [isOpen, playSecretMelody]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        id="easter-egg-backdrop"
        className="show"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        id="easter-egg-msg"
        className="show"
        role="dialog"
        aria-modal="true"
        aria-label="Secret discovered!"
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌙✨💀</div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            marginBottom: '0.75rem',
            color: 'var(--accent)'
          }}
        >
          Goodnight, Dream Traveller!
        </h3>
        <p style={{ color: 'var(--text-soft)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          You found Pip's secret! Every night at exactly 3:33am, Pip floats above your roof and leaves a tiny dream
          wrapped in starlight just for you. 🍼
        </p>
        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ margin: '0 auto', display: 'flex' }}
        >
          Close & Keep Dreaming ✨
        </button>
      </div>
    </>
  );
};
