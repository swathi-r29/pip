import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isMuted, toggleMute, playMicroClick, playThemeArpeggio } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    playMicroClick();
    setMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    playThemeArpeggio();
    toggleTheme();
  };

  return (
    <header id="navbar" className={scrolled ? 'scrolled' : ''} role="banner">
      <a href="#hero" className="nav-brand" onClick={playMicroClick} aria-label="Pip top of page">
        <span className="skull-icon" aria-hidden="true">💀</span>
        <span>Pip<span>.portfolio</span></span>
      </a>

      <nav aria-label="Main navigation" className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <a href="#about" onClick={handleNavClick} className="btn btn-ghost">About</a>
        <a href="#projects" onClick={handleNavClick} className="btn btn-ghost">Inventions</a>
        <a href="#story" onClick={handleNavClick} className="btn btn-ghost">Story</a>
        <a href="#guestbook" onClick={handleNavClick} className="btn btn-ghost">Dream Wall</a>
      </nav>

      <div className="nav-actions">
        {/* Sound toggle button */}
        <button
          id="mute-toggle"
          className={isMuted ? 'muted' : ''}
          onClick={() => {
            playMicroClick();
            toggleMute();
          }}
          aria-label={isMuted ? 'Unmute lullaby sound' : 'Mute lullaby sound'}
          aria-pressed={isMuted}
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        {/* Theme toggle button */}
        <button
          id="theme-toggle"
          onClick={handleThemeToggle}
          aria-label={theme === 'day' ? 'Switch to Midnight mode' : 'Switch to Day mode'}
          title={theme === 'day' ? 'Switch to Midnight mode' : 'Switch to Day mode'}
        >
          {theme === 'day' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};
