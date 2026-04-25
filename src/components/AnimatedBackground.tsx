'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vr: number;
  type: 'note' | 'star' | 'heart' | 'cross';
  opacity: number;
}

interface Scribble {
  points: { x: number; y: number }[];
  opacity: number;
  life: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const particles = useRef<Particle[]>([]);
  const scribbles = useRef<Scribble[]>([]);
  const lastPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Initialize some static particles
    const initParticles = () => {
      const types: Particle['type'][] = ['note', 'star', 'heart', 'cross'];
      for (let i = 0; i < 40; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 15 + Math.random() * 20,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.02,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: 0.1 + Math.random() * 0.2,
        });
      }
    };
    initParticles();

    const drawDoodle = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#2d2d2d';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const s = p.size / 2;

      ctx.beginPath();
      switch (p.type) {
        case 'cross':
          ctx.moveTo(-s, -s); ctx.lineTo(s, s);
          ctx.moveTo(s, -s); ctx.lineTo(-s, s);
          break;
        case 'star':
          for (let i = 0; i < 5; i++) {
            const angle = (i * 0.8 * Math.PI) - Math.PI / 2;
            const x = Math.cos(angle) * s;
            const y = Math.sin(angle) * s;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          break;
        case 'note':
          ctx.moveTo(-s/2, s);
          ctx.arc(-s, s, s/2, 0, Math.PI * 2);
          ctx.moveTo(-s/2, s);
          ctx.lineTo(-s/2, -s);
          ctx.lineTo(s/2, -s * 1.2);
          break;
        case 'heart':
          ctx.moveTo(0, s/2);
          ctx.bezierCurveTo(-s, -s/2, -s, -s*1.5, 0, -s);
          ctx.bezierCurveTo(s, -s*1.5, s, -s/2, 0, s/2);
          break;
      }
      ctx.stroke();
      ctx.restore();
    };

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Scribbles
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#2d2d2d';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      scribbles.current.forEach((s, idx) => {
        if (s.points.length < 2) return;
        ctx.beginPath();
        ctx.globalAlpha = s.opacity * (s.life / 100);
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (let i = 1; i < s.points.length; i++) {
          ctx.lineTo(s.points[i].x, s.points[i].y);
        }
        ctx.stroke();
        s.life -= 1.5;
      });
      scribbles.current = scribbles.current.filter(s => s.life > 0);

      // 2. Update & Draw Particles
      particles.current.forEach(p => {
        // Natural float
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;

        // Wrap around
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        // Interaction
        if (mouse.current.active) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            p.vx -= (dx / dist) * force * 0.5;
            p.vy -= (dy / dist) * force * 0.5;
            p.vr += (force * 0.05);
            p.opacity = Math.min(0.6, p.opacity + 0.05);
          } else {
            p.opacity = Math.max(0.15, p.opacity - 0.01);
            p.vx *= 0.98;
            p.vy *= 0.98;
          }
        }

        drawDoodle(ctx, p);
      });

      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;

      // Create scribble points
      const dist = Math.sqrt(Math.pow(e.clientX - lastPoint.current.x, 2) + Math.pow(e.clientY - lastPoint.current.y, 2));
      if (dist > 5) {
        if (scribbles.current.length === 0 || scribbles.current[scribbles.current.length - 1].life < 90) {
          scribbles.current.push({ points: [{ x: e.clientX, y: e.clientY }], opacity: 0.3, life: 100 });
        } else {
          const lastScribble = scribbles.current[scribbles.current.length - 1];
          lastScribble.points.push({ x: e.clientX, y: e.clientY });
          if (lastScribble.points.length > 20) lastScribble.points.shift();
        }
        lastPoint.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
