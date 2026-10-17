import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useSound, NOTES } from '../context/SoundContext';

const PIANO_KEYS = [
  { label: 'G4', freq: NOTES.G4 },
  { label: 'A4', freq: NOTES.A4 },
  { label: 'B4', freq: NOTES.B4 },
  { label: 'C5', freq: NOTES.C5 },
  { label: 'D5', freq: NOTES.D5 },
  { label: 'E5', freq: NOTES.E5 },
];

const LANTERN_THEMES = [
  { id: 'honey', name: 'Honey Moon', note: '392 Hz', color: '#f5c842' },
  { id: 'berry', name: 'Berry', note: '440 Hz', color: '#d4708f' },
  { id: 'blue', name: 'Lullaby Blue', note: '523 Hz', color: '#93c5fd' },
  { id: 'mint', name: 'Mint', note: '587 Hz', color: '#a8d5c4' },
];

export const Projects = () => {
  const {
    playMusicBoxNote,
    playLanternChime,
    isPlayingLullaby,
    lullabyStep,
    toggleLullaby,
  } = useSound();

  const [activeKey, setActiveKey] = useState(null);
  const [selectedLantern, setSelectedLantern] = useState('honey');
  const [projectorWound, setProjectorWound] = useState(false);

  const handleKeyClick = (k) => {
    playMusicBoxNote(k.freq, 0.9, 0.28);
    setActiveKey(k.label);
    setTimeout(() => setActiveKey(null), 200);
  };

  const handleLanternSelect = (themeId) => {
    setSelectedLantern(themeId);
    playLanternChime(themeId);
  };

  const handleWindUp = (e) => {
    playLanternChime('blue');
    setTimeout(() => playLanternChime('mint'), 160);
    setProjectorWound(true);
    setTimeout(() => setProjectorWound(false), 900);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { x, y },
        colors: ['#f5c842', '#fde68a', '#c4a8e0', '#d4708f', '#a8d5c4'],
        shapes: ['star', 'circle'],
      });
    } catch {
      // fallback
    }
  };

  const currentTheme = LANTERN_THEMES.find((t) => t.id === selectedLantern) || LANTERN_THEMES[0];

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-header">
          <div className="label">Showcase Projects ✦ Pip's Portfolio</div>
          <h2 className="display-lg" id="projects-title" style={{ margin: '1rem 0 0.75rem' }}>
            Dreams made<br />
            <span className="text-accent">by hand.</span>
          </h2>
          <p>
            Pure Web Audio API synthesis: zero audio popping, authentic music-box harmonics, and interactive sleep inventions.
          </p>
        </div>

        <div className="projects-grid">
          {/* PROJECT 1: The Lullaby Lab */}
          <article className="project-card" id="lullaby-lab-card" aria-label="Project: The Lullaby Lab">
            <div className="project-number">Project 01 · Algorithmic Audio</div>

            <div className="project-img-wrap">
              <img
                src="/assets/pip_lullaby_box.png"
                alt="A pastel music box with golden winding key and floating star chimes"
                loading="eager"
                style={{
                  transform: isPlayingLullaby ? 'scale(1.06)' : undefined,
                  transition: 'transform 0.4s ease',
                }}
              />
              <span className="project-tag">
                {isPlayingLullaby ? `Playing Step ${lullabyStep >= 0 ? lullabyStep + 1 : 1}/20 🎵` : 'Interactive Synth'}
              </span>
            </div>

            <h3 className="project-title">The Lullaby Lab 🎵</h3>
            <p className="project-desc">
              Algorithmic music-box synthesizer blending a pure sine fundamental with a 25% triangle octave overtone.
              Play individual keys or loop Pip's 20-step bedtime melody.
            </p>

            {/* Loop Toggle Button */}
            <button
              type="button"
              onClick={toggleLullaby}
              className={`btn ${isPlayingLullaby ? 'btn-primary' : 'btn-ghost'}`}
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                alignSelf: 'flex-start',
                marginBottom: '0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>{isPlayingLullaby ? '⏸ Pause Lullaby' : '▶ Play 20-Step Lullaby'}</span>
            </button>

            {/* Playable Piano Keys */}
            <div className="lullaby-keys" id="lullaby-keys" role="group" aria-label="Play lullaby notes">
              {PIANO_KEYS.map((k) => (
                <button
                  key={k.label}
                  className={`lullaby-key ${activeKey === k.label ? 'pressed' : ''}`}
                  onClick={() => handleKeyClick(k)}
                  aria-label={`Play note ${k.label}`}
                >
                  {k.label}
                </button>
              ))}
            </div>

            <div className="project-action" aria-hidden="true">
              Click keys to compose ♪ →
            </div>
          </article>

          {/* PROJECT 2: Nightlight Collection */}
          <article className="project-card" id="nightlight-card" aria-label="Project: Nightlight Collection">
            <div className="project-number">Project 02 · Light & Harmonic Chimes</div>

            <div className="project-img-wrap" id="lantern-wrap">
              <img
                src="/assets/pip_dream_lantern.png"
                alt="A glowing crescent moon porcelain lamp with brass handle — Dream Nightlight Lantern"
                loading="eager"
                id="lantern-img"
                style={{
                  filter: `drop-shadow(0 0 25px ${currentTheme.color}) drop-shadow(0 0 50px rgba(245,200,66,0.3)) brightness(1.15)`,
                  transform: 'scale(1.05)',
                  transition: 'filter 0.4s ease, transform 0.4s ease',
                }}
              />
              <span className="project-tag" style={{ background: currentTheme.color, color: '#332014' }}>
                {currentTheme.name} · {currentTheme.note}
              </span>
            </div>

            <h3 className="project-title">Nightlight Collection 🏮</h3>
            <p className="project-desc">
              Each lantern is tuned to a distinct acoustic frequency to calm sleepy minds.
              Select a color theme to illuminate the porcelain lamp and trigger its harmonic chime.
            </p>

            {/* 4 Lantern Themes */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {LANTERN_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleLanternSelect(theme.id)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: selectedLantern === theme.id ? `2px solid ${theme.color}` : '1px solid var(--border)',
                    background: selectedLantern === theme.id ? 'var(--accent-glow)' : 'var(--bg-deep)',
                    color: 'var(--text)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: theme.color }} />
                  {theme.name}
                </button>
              ))}
            </div>

            <div className="project-action" aria-hidden="true">
              Click lanterns to chime 🔔 →
            </div>
          </article>

          {/* PROJECT 3: The Starlight Projector */}
          <article
            className="project-card"
            id="starlight-projector-card"
            aria-label="Project: The Starlight Projector"
            onClick={handleWindUp}
            title="Click to wind up starlight!"
            style={{ cursor: 'pointer' }}
          >
            <div className="project-number">Project 03 · Celestial Invention</div>

            <div className="project-img-wrap" id="projector-wrap">
              <img
                src="/assets/pip_starlight_projector.png"
                alt="A magical 3D clay starlight dream projector with golden winding key, casting miniature clouds and stars"
                loading="eager"
                id="projector-img"
                style={{
                  transform: projectorWound ? 'scale(1.12) rotate(3deg)' : undefined,
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              />
              <span className="project-tag">Wind-up Stars ✦</span>
            </div>

            <h3 className="project-title">The Starlight Projector ✨</h3>
            <p className="project-desc">
              Turned with a golden brass key, it projects soothing pastel clouds and warm golden constellations
              across nursery ceilings with ascending resonant tones.
            </p>

            <div className="project-action" aria-hidden="true">
              {projectorWound ? 'Projecting constellations! ⭐' : 'Wind up stars ✨ →'}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
