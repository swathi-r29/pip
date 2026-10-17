import React, { useState, useEffect } from 'react';

export const Loader = () => {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      setTimeout(() => setRemoved(true), 600);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  if (removed) return null;

  return (
    <div
      id="loader"
      className={hidden ? 'hidden' : ''}
      role="status"
      aria-label="Loading Pip's portfolio"
    >
      <div className="loader-skull" aria-hidden="true">💀</div>
      <div className="loader-text">Pip is brewing your dreams…</div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill"></div>
      </div>
    </div>
  );
};
