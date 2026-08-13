import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

interface User {
  id: number;
  name: string;
  x: number;
  y: number;
  emoji: string;
}

export const VirtualRoomPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'You', x: 400, y: 300, emoji: '🦸' },
    { id: 2, name: 'Alice', x: 200, y: 200, emoji: '👩' },
    { id: 3, name: 'Bob', x: 600, y: 400, emoji: '👨' },
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 400, y: 300 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        // Update user positions proportionally
        setUsers(prev => prev.map(u => ({
          ...u,
          x: (u.x / 800) * rect.width,
          y: (u.y / 600) * rect.height,
        })));
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // GSAP float animation
    const tl = gsap.timeline({
      defaults: { duration: 2, ease: 'sine.inOut' },
      repeat: -1,
      yoyo: true,
    });

    users.forEach((user, index) => {
      tl.to(`.avatar-${user.id}`, {
        y: -20 + (index * 5),
        duration: 2 + index * 0.3,
      }, 0);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      tl.kill();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    drawScene();
  }, [users, mousePos]);

  const drawScene = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw floor grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw users
    users.forEach((user) => {
      const isYou = user.id === 1;
      const x = user.x + (isYou ? (mousePos.x - user.x) * 0.05 : 0);
      const y = user.y + (isYou ? (mousePos.y - user.y) * 0.05 : 0);

      // Update user position if it's "You"
      if (isYou) {
        user.x = x;
        user.y = y;
      }

      // Draw glow
      const gradient = ctx.createRadialGradient(x, y - 10, 10, x, y - 10, 50);
      gradient.addColorStop(0, 'rgba(118, 75, 162, 0.15)');
      gradient.addColorStop(1, 'rgba(118, 75, 162, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y - 10, 50, 0, Math.PI * 2);
      ctx.fill();

      // Draw avatar circle
      ctx.beginPath();
      ctx.arc(x, y - 10, 35, 0, Math.PI * 2);
      ctx.fillStyle = isYou ? 'rgba(118, 75, 162, 0.3)' : 'rgba(255, 255, 255, 0.1)';
      ctx.fill();
      ctx.strokeStyle = isYou ? 'rgba(118, 75, 162, 0.5)' : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw emoji
      ctx.font = '40px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(user.emoji, x, y - 15);

      // Draw name
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillText(user.name, x, y + 40);
    });

    animationRef.current = requestAnimationFrame(drawScene);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Virtual Party Room 🥳</h1>
      <p className={styles.subtitle}>Move your mouse to walk around!</p>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};