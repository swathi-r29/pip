import React, { useState } from 'react';
import { useSound } from '../context/SoundContext';

const SKILLS = [
  { label: 'Dream Crafting', pct: 95, stars: '★★★★★' },
  { label: 'Lullaby Compose', pct: 90, stars: '★★★★★' },
  { label: 'Night Navigation', pct: 85, stars: '★★★★☆' },
  { label: 'Light Design', pct: 78, stars: '★★★★☆' },
  { label: 'Toy Engineering', pct: 70, stars: '★★★☆☆' },
];

const TRAITS = [
  '💤 Perpetually Sleepy',
  '🎵 Hums Constantly',
  '✨ Gentle & Kind',
  '🌙 Night Owl',
  '📦 Detail-Obsessed',
  '🍼 Loves Cozy Things',
  '⭐ Star-Gazer',
  '🎀 Bow Collector',
];

export const About = () => {
  const { playMicroClick, playMusicBoxNote, NOTES } = useSound();
  const [activeTrait, setActiveTrait] = useState(null);

  const handleTraitClick = (trait) => {
    setActiveTrait(trait);
    playMicroClick();
  };

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          {/* Portrait Card */}
          <div className="pip-portrait-wrap">
            <div
              className="pip-portrait-card"
              onClick={() => playMusicBoxNote(NOTES.C5, 1.2, 0.25)}
              title="Click to greet Pip!"
            >
              <img
                src="/assets/pip_portrait.png"
                alt="Official full-body portrait of Pip the Skull Baby, holding the Dream Nightlight Lantern"
                loading="lazy"
              />
              <div className="pip-id-tag">Employee ID · #0001</div>
              <div className="pip-id-details">
                <div className="pip-id-row">
                  <span>Name</span>
                  <strong>Pip</strong>
                </div>
                <div className="pip-id-row">
                  <span>Species</span>
                  <strong>Skull Baby</strong>
                </div>
                <div className="pip-id-row">
                  <span>Role</span>
                  <strong>Jr. Dream Engineer</strong>
                </div>
                <div className="pip-id-row">
                  <span>Dept.</span>
                  <strong>Midnight Nursery</strong>
                </div>
                <div className="pip-id-row">
                  <span>Shift</span>
                  <strong>🌙 Night Only</strong>
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="about-content">
            <div className="label">Character Profile ✦ Track 1</div>
            <h2 className="display-lg" id="about-title" style={{ margin: '1rem 0 1.5rem' }}>
              Small skull,<br />
              <span className="text-accent">big dreams.</span>
            </h2>

            <p style={{ color: 'var(--text-soft)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
              Pip is a sleepy, gentle skull baby with huge soft eye sockets, a tiny crooked smile,
              and an oversized starry nightcap with a pink bow. Pip never frightens — only soothes.
            </p>

            <p style={{ color: 'var(--text-soft)', lineHeight: 1.9, marginBottom: '2rem' }}>
              As Junior Dream Engineer, Pip personally oversees the lullabies, glowing nightlights,
              and bedtime stories that help the neighbourhood's little creatures sleep. Every night,
              Pip floats across rooftops delivering custom-made dreams in tiny woven pouches. 🌙
            </p>

            {/* Personality Traits */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div className="label" style={{ marginBottom: '0.75rem' }}>Personality Traits</div>
              <div className="about-traits">
                {TRAITS.map((trait, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTraitClick(trait)}
                    className={`trait-pill ${activeTrait === trait ? 'active' : ''}`}
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      transform: activeTrait === trait ? 'scale(1.08)' : 'scale(1)',
                      transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    {trait}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills / Growth Chart */}
            <div className="skills-chart" id="skills-chart" aria-label="Pip's skill chart">
              <div className="skills-chart-title">📏 Pip's Growth Chart (Skills)</div>
              {SKILLS.map((skill, index) => (
                <div key={index} className="skill-row animated">
                  <span className="skill-label">{skill.label}</span>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: `${skill.pct}%`,
                        transform: 'scaleX(1)',
                        transition: `width 1.2s ease-out ${index * 0.15}s`
                      }}
                    />
                  </div>
                  <span className="skill-value">{skill.stars}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
