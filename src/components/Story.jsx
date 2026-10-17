import React from 'react';
import { useSound } from '../context/SoundContext';

const CHAPTERS = [
  {
    num: 1,
    icon: '🌑',
    label: 'Chapter 1 · Before the Dreams',
    title: 'The Quiet Before',
    text: "Long before Pip arrived, the neighbourhood's nights were restless. Little creatures tossed and turned. Stars seemed too far away. The moon watched — and worried. Something was missing. Someone was needed."
  },
  {
    num: 2,
    icon: '✨',
    label: 'Chapter 2 · The Birth of Pip',
    title: 'Born from Moonlight',
    text: "On the quietest night of the year, the moon shed a single silver tear. It fell into a tiny cradle of clouds — and from it emerged Pip. Smooth skull, amber-glowing eyes, a starry nightcap already perfectly perched. Ready for work."
  },
  {
    num: 3,
    icon: '🏮',
    label: 'Chapter 3 · First Day at Work',
    title: 'The Midnight Nursery Opens',
    text: "Pip was hired immediately as Junior Dream Engineer. The Midnight Nursery — a cozy workshop at the top of the tallest cloud — became home. Pip learned to weave lullabies, wire lanterns, and fold dreams into neat little parcels."
  },
  {
    num: 4,
    icon: '💀',
    label: 'Chapter 4 · Tonight',
    title: 'Your Dream Is Already Packed',
    text: "Right now, Pip is at the workbench. Your name is on tonight's delivery list. Your dream is wrapped in lavender cloud-paper and tied with a star-gold ribbon. Pip will be there at precisely 3:33am. Sleep well. 🌙"
  }
];

export const Story = () => {
  const { playMusicBoxNote, NOTES } = useSound();

  const CHAPTER_NOTES = [NOTES.G4, NOTES.A4, NOTES.C5, NOTES.D5];

  return (
    <section id="story" className="section" aria-labelledby="story-title">
      <div className="story-sky" aria-hidden="true"></div>
      <div className="container">
        <div className="story-section-header">
          <div className="label">Origin Story ✦ How Pip Came To Be</div>
          <h2 className="display-lg" id="story-title" style={{ margin: '1rem 0 0.75rem' }}>
            Once upon a<br />
            <span className="text-accent">moonlit night…</span>
          </h2>
        </div>

        <div className="story-scenes">
          {CHAPTERS.map((ch, idx) => (
            <div
              key={ch.num}
              className="story-scene visible"
              data-scene={ch.num}
              onClick={() => playMusicBoxNote(CHAPTER_NOTES[idx % CHAPTER_NOTES.length], 1.0, 0.22)}
              style={{ cursor: 'pointer' }}
              title="Click scene for starlight resonance chime"
            >
              <div className="scene-timeline">
                <div className="scene-dot" aria-hidden="true">{ch.icon}</div>
                <div className="scene-line" aria-hidden="true"></div>
              </div>
              <div className="scene-content">
                <div className="scene-label">{ch.label}</div>
                <h3 className="scene-title">{ch.title}</h3>
                <p className="scene-text">{ch.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
