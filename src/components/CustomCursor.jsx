import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor = () => {
  const { theme } = useTheme();
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if pointer device supports hover
    if (!window.matchMedia('(hover: hover)').matches) return;

    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const SYMBOLS = ['✦', '✧', '·', '⋆', '°', '☆', '★'];

    let cx = -100, cy = -100;
    let tx = -100, ty = -100;
    let lastSpawn = 0;
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleMouseMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;

      const now = Date.now();
      if (now - lastSpawn > 35) {
        const hue = theme === 'night'
          ? Math.random() * 60 + 260
          : Math.random() * 40 + 320;

        particles.push({
          x: e.clientX,
          y: e.clientY,
          alpha: 1,
          symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          size: Math.random() * 14 + 7,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.8,
          decay: Math.random() * 0.02 + 0.015,
          color: `hsl(${hue}, 80%, 70%)`
        });

        if (particles.length > 50) particles.shift();
        lastSpawn = now;
      }
    };

    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    };

    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .project-card, .lullaby-key, .trait-pill, input, textarea')) {
        cursor.classList.add('hovering');
      } else {
        cursor.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    const animate = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= p.decay;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.symbol, p.x, p.y);
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <>
      <div id="custom-cursor" ref={cursorRef} aria-hidden="true" />
      <canvas id="sparkle-canvas" ref={canvasRef} aria-hidden="true" />
    </>
  );
};
