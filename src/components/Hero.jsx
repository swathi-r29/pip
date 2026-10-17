import React, { useState, useRef } from 'react';
import { useSound } from '../context/SoundContext';

export const Hero = () => {
  const { playMicroClick, playMusicBoxNote, NOTES } = useSound();
  const avatarRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handlePipClick = () => {
    playMusicBoxNote(NOTES.G4, 0.6, 0.25);
    setTimeout(() => playMusicBoxNote(NOTES.B4, 0.6, 0.22), 140);
    setTimeout(() => playMusicBoxNote(NOTES.D5, 0.9, 0.2), 280);
  };

  const handleMouseMove = (e) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const tiltX = -(y / (rect.height / 2)) * 12;
    const tiltY = (x / (rect.width / 2)) * 12;
    setTiltStyle({
      transform: `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <>
      <section id="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Copy */}
            <div className="hero-content">
              <div className="hero-kicker" aria-label="Location and role">
                <span>✦</span>
                <span>Midnight Nursery · Dream Dept.</span>
                <span>✦</span>
              </div>

              <h1 className="hero-title" id="hero-title">
                Hi, I'm
                <span className="line-2">Pip.</span>
              </h1>

              <p className="hero-subtitle">
                Junior Dream Engineer at Midnight Nursery. I craft the lullabies, lanterns,
                and cozy stories that help the whole neighbourhood drift off to sleep. ✨
              </p>

              <div className="hero-actions">
                <a
                  href="#projects"
                  onClick={playMicroClick}
                  className="btn btn-primary"
                >
                  See my work →
                </a>
                <a
                  href="#story"
                  onClick={playMicroClick}
                  className="btn btn-ghost"
                >
                  My origin story
                </a>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-num" id="dreams-counter">2,847</div>
                  <div className="hero-stat-label">Dreams Delivered</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-num">∞</div>
                  <div className="hero-stat-label">Lullabies Composed</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-num">★ 5.0</div>
                  <div className="hero-stat-label">Sleeper Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column: Pip Avatar Showcase */}
            <div
              className="pip-showcase"
              ref={avatarRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handlePipClick}
              title="Click Pip for a gentle chime!"
            >
              <span className="pip-orb orb-star orb-1" aria-hidden="true">⭐</span>
              <span className="pip-orb orb-star orb-2" aria-hidden="true">✨</span>
              <span className="pip-orb orb-star orb-3" aria-hidden="true">🌙</span>

              <div className="pip-cloud-wrap" id="pip-hero" style={tiltStyle}>
                <img
                  src="/assets/pip_avatar_cloud.png"
                  alt="Pip the Skull Baby floating on a sleepy cloud, wearing a starry nightcap with a pink bow, waving gently"
                  id="pip-avatar-img"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        <a href="#about" onClick={playMicroClick} className="scroll-cue" aria-label="Scroll to learn about Pip">
          <span className="arrow">↓</span>
          <span>scroll to meet pip</span>
        </a>
      </section>

      {/* Marquee Ticker */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-inner" id="marquee">
          <span className="marquee-item">✦ Dream Engineer</span>
          <span className="marquee-item">☆ Midnight Nursery</span>
          <span className="marquee-item">✦ Lullaby Composer</span>
          <span className="marquee-item">☆ Nightlight Designer</span>
          <span className="marquee-item">✦ Story Teller</span>
          <span className="marquee-item">☆ Route Navigator</span>
          <span className="marquee-item">✦ Toy Inventor</span>
          <span className="marquee-item">☆ Sleep Guardian</span>
          {/* Duplicate for seamless infinite loop */}
          <span className="marquee-item">✦ Dream Engineer</span>
          <span className="marquee-item">☆ Midnight Nursery</span>
          <span className="marquee-item">✦ Lullaby Composer</span>
          <span className="marquee-item">☆ Nightlight Designer</span>
          <span className="marquee-item">✦ Story Teller</span>
          <span className="marquee-item">☆ Route Navigator</span>
          <span className="marquee-item">✦ Toy Inventor</span>
          <span className="marquee-item">☆ Sleep Guardian</span>
        </div>
      </div>
    </>
  );
};
