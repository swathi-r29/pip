import React, { useMemo } from 'react';

export const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${(i * 17.3 + 7) % 100}%`,
      top: `${(i * 23.7 + 13) % 100}%`,
      size: `${(i % 3) + 1.5}px`,
      duration: `${3 + (i % 5)}s`,
      delay: `${(i * 0.3) % 4}s`,
    }));
  }, []);

  return (
    <div id="star-field" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-dot"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
};
