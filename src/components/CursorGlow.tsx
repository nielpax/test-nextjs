'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let raf: number;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const animate = () => {
      // Smooth lerp towards mouse
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      el.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Spotlight glow that follows cursor */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12] dark-glow"
        style={{
          background:
            'radial-gradient(circle, var(--accent) 0%, var(--secondary) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />

      {/* Static ambient orbs for depth */}
      <div
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float-orb 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[15%] right-[8%] w-[350px] h-[350px] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'float-orb 9s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
}
