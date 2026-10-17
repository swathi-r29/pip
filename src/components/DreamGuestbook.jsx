import React, { useState, useEffect } from 'react';
import { useSound } from '../context/SoundContext';

const DREAMS_KEY = 'pip-dream-wall';

const SEED_DREAMS = [
  { id: 1, name: 'Luna', location: 'Mumbai', wish: 'I dream of flying over silver seas with Pip tonight!', time: '2 min ago', likes: 12 },
  { id: 2, name: 'Aiden', location: 'Delhi', wish: 'Tonight I dream of a library made entirely of clouds.', time: '5 min ago', likes: 8 },
  { id: 3, name: 'Priya', location: 'Bangalore', wish: 'I want to dream about a field of fireflies and warm tea.', time: '11 min ago', likes: 15 },
  { id: 4, name: 'Kai', location: 'Chennai', wish: 'Tonight, please bring me a dream of music that never ends.', time: '18 min ago', likes: 9 },
  { id: 5, name: 'Zara', location: 'Pune', wish: 'I dream of painting the night sky with Pip using stardust.', time: '25 min ago', likes: 14 },
  { id: 6, name: 'Milo', location: 'Kyoto', wish: 'I dream of sliding down a spiral rainbow made of star sprinkles.', time: '32 min ago', likes: 11 },
];

export const DreamGuestbook = ({ onWishAdded }) => {
  const { playMicroClick, playMusicBoxNote, NOTES } = useSound();
  const [dreams, setDreams] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [wish, setWish] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DREAMS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.length === 5) {
          setDreams(SEED_DREAMS);
          localStorage.setItem(DREAMS_KEY, JSON.stringify(SEED_DREAMS));
        } else {
          setDreams(parsed);
        }
      } else {
        setDreams(SEED_DREAMS);
        localStorage.setItem(DREAMS_KEY, JSON.stringify(SEED_DREAMS));
      }
    } catch {
      setDreams(SEED_DREAMS);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;

    playMusicBoxNote(NOTES.C5, 0.6, 0.25);
    setTimeout(() => playMusicBoxNote(NOTES.E5, 0.6, 0.22), 160);
    setTimeout(() => playMusicBoxNote(NOTES.G5, 1.0, 0.2), 320);

    const newDream = {
      id: Date.now(),
      name: name.trim(),
      location: location.trim() || '✦ Dreamland',
      wish: wish.trim(),
      time: 'just now',
      likes: 1
    };

    const updated = [newDream, ...dreams].slice(0, 24);
    setDreams(updated);
    try {
      localStorage.setItem(DREAMS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setName('');
    setLocation('');
    setWish('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    if (onWishAdded) onWishAdded();
  };

  const handleLike = (id) => {
    playMicroClick();
    setDreams(prev => {
      const next = prev.map(d => d.id === id ? { ...d, likes: (d.likes || 0) + 1 } : d);
      try {
        localStorage.setItem(DREAMS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <section id="guestbook" className="section" aria-labelledby="guestbook-title">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="label">Dream Wall ✦ Side Quest: Live Guestbook +2pts</div>
          <h2 className="display-lg" id="guestbook-title" style={{ margin: '1rem 0 0.75rem' }}>
            Leave a<br />
            <span className="text-accent">dream wish.</span>
          </h2>
          <p>Sign Pip's dream wall. Your wish will be delivered tonight. 🌙</p>
        </div>

        {/* Centered Form */}
        <div
          className="guestbook-form-wrap"
          style={{
            maxWidth: '560px',
            margin: '0 auto 3.5rem auto',
            width: '100%'
          }}
        >
          <form className="dream-form" onSubmit={handleSubmit} aria-label="Leave a dream wish">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="visitor-name">Your Name</label>
                <input
                  type="text"
                  id="visitor-name"
                  className="form-input"
                  placeholder="Little dreamer…"
                  maxLength={30}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="given-name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="visitor-location">Where From?</label>
                <input
                  type="text"
                  id="visitor-location"
                  className="form-input"
                  placeholder="City of dreams…"
                  maxLength={20}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="visitor-wish">Your Dream Wish</label>
              <textarea
                id="visitor-wish"
                className="form-textarea"
                placeholder="Tonight I dream of…"
                rows={3}
                maxLength={120}
                required
                value={wish}
                onChange={(e) => setWish(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              id="submit-wish"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              <span>✉️</span>
              <span>{submitted ? 'Wish Sent to Pip! ✨' : 'Send wish to Pip'}</span>
            </button>
          </form>
        </div>

        {/* Dream Wall Display - perfectly centered balanced grid */}
        <div style={{ marginTop: '3rem' }}>
          <div className="label" style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
            ✨ Dreams already in tonight's delivery bag
          </div>

          <div
            className="dream-wall"
            id="dream-wall"
            aria-live="polite"
            aria-label="Dream wall with visitor wishes"
          >
            {dreams.map((d) => (
              <div key={d.id || d.name + d.time} className="dream-card">
                <div className="dream-card-header">
                  <div className="dream-card-author">
                    <span className="dream-card-avatar" aria-hidden="true">🌙</span>
                    <div>
                      <div className="dream-card-name">{d.name}</div>
                      <div className="dream-card-location">from {d.location}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleLike(d.id)}
                    className="dream-card-like"
                    title="Send love to this dream"
                    aria-label={`Like ${d.name}'s dream, currently ${d.likes || 1} likes`}
                  >
                    <span className="heart-icon" aria-hidden="true">❤️</span>
                    <span className="like-count">{d.likes || 1}</span>
                  </button>
                </div>
                <div className="dream-card-wish">"{d.wish}"</div>
                <div className="dream-card-time">
                  <span aria-hidden="true">✨</span> {d.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
