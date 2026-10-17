import React, { useState } from 'react';
import { useSound } from '../context/SoundContext';

export const Footer = ({ onTriggerEasterEgg }) => {
  const { playMicroClick } = useSound();
  const [skullClicks, setSkullClicks] = useState(0);

  const handleSkullClick = () => {
    playMicroClick?.();
    const next = skullClicks + 1;
    setSkullClicks(next);

    if (next >= 5) {
      setSkullClicks(0);
      onTriggerEasterEgg();
    }
  };

  return (
    <footer id="footer" role="contentinfo">
      <div className="container">
        <div
          className="footer-skull"
          id="pip-footer-skull"
          aria-label="Pip sleeping — click 5 times for a surprise!"
          tabIndex={0}
          role="button"
          onClick={handleSkullClick}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSkullClick()}
          title="Psst... click me 5 times 👀"
          style={{
            transform: skullClicks > 0 ? `scale(${1 + skullClicks * 0.1}) rotate(${skullClicks * 12}deg)` : undefined,
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          💀
        </div>

        <div className="footer-text">Sweet dreams from Pip & the Midnight Nursery</div>
        <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem', margin: '0.75rem 0 1rem' }}>
          <em>"Every dream delivered is a promise kept."</em>
        </p>

        <div className="footer-credits">
          Made with 🌙 for haX.baby "Baby's First Website" Hackathon 2026 · Track 1 · Pip the Skull Baby<br />
          Assets:{' '}
          <a
            href="https://hax.baby/baby/assets/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)' }}
          >
            hax.baby official asset pack
          </a>{' '}
          · Built with React & Vite · Audio: Web Audio API
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.65rem', color: 'var(--text-soft)', opacity: 0.25, fontFamily: 'var(--font-mono)' }}>
          psst — type "goodnight" or click 💀 five times…
        </p>
      </div>
    </footer>
  );
};
