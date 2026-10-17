import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { StarField } from './components/StarField';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Story } from './components/Story';
import { DreamGuestbook } from './components/DreamGuestbook';
import { Odometer } from './components/Odometer';
import { Footer } from './components/Footer';
import { EasterEggModal } from './components/EasterEggModal';

export function AppContent() {
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  useEffect(() => {
    let typedBuffer = '';

    const handleKeyPress = (e) => {
      // Don't trigger when typing in inputs or textareas
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      typedBuffer += e.key.toUpperCase();
      if (typedBuffer.includes('GOODNIGHT')) {
        setEasterEggOpen(true);
        typedBuffer = '';
      }
      if (typedBuffer.length > 25) {
        typedBuffer = typedBuffer.slice(-25);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Loading Screen */}
      <Loader />

      {/* Custom Cursor + Sparkles */}
      <CustomCursor />

      {/* Star Field Background */}
      <StarField />

      {/* Header & Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Story />
        <DreamGuestbook />
        <Odometer />
      </main>

      {/* Footer */}
      <Footer onTriggerEasterEgg={() => setEasterEggOpen(true)} />

      {/* Hidden Easter Egg Modal */}
      <EasterEggModal
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </ThemeProvider>
  );
}
