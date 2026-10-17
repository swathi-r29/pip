import React, { useState, useEffect } from 'react';

export const Odometer = () => {
  const [count, setCount] = useState(() => {
    try {
      const stored = parseInt(localStorage.getItem('pip-visit-count') || '0', 10);
      const next = stored + 1;
      localStorage.setItem('pip-visit-count', String(next));
      return next + 2847;
    } catch {
      return 2848;
    }
  });

  const digits = String(count).padStart(6, '0').split('');

  return (
    <div style={{ marginTop: '3.5rem', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto' }}>
      <div className="visitor-counter-wrap">
        <div className="counter-label">Dreams Delivered Tonight</div>
        <div className="odometer" id="odometer" aria-label="Dream delivery counter" aria-live="polite">
          {digits.map((digit, i) => (
            <div key={i} className="odometer-digit" style={{ animationDelay: `${i * 0.1}s` }}>
              {digit}
            </div>
          ))}
        </div>
        <div className="counter-label" style={{ color: 'var(--star)', marginTop: '0.5rem' }}>
          ✦ and counting ✦
        </div>
      </div>
    </div>
  );
};
