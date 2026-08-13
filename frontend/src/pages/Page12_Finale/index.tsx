import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

export const FinalePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const fireworksRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Big entrance animation
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1.2 },
    });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.5 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 100, rotationY: 90 },
        { opacity: 1, y: 0, rotationY: 0, duration: 1.5, ease: 'back.out(2)' },
        '-=0.5'
      )
      .fromTo(
        messageRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' },
        '-=0.3'
      );

    // Start fireworks
    startFireworks();

    // Trigger confetti explosion
    setTimeout(() => {
      import('../../wasm/particles')
        .then((wasm) => {
          wasm.burstConfetti(1000);
        })
        .catch(() => {
          console.log('WASM not loaded');
        });
    }, 1000);

    return () => {
      tl.kill();
    };
  }, []);

  const startFireworks = () => {
    const canvas = fireworksRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bcb'];

    class Firework {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      angle: number;
      color: string;
      size: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height * 0.6;
        this.speed = 2 + Math.random() * 3;
        const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        this.angle = angle;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = 3 + Math.random() * 3;
        this.life = 0;
        this.maxLife = 80 + Math.random() * 60;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life++;
        this.speed *= 0.99;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = 1 - this.life / this.maxLife;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (1 - this.life / this.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    let fireworks: Firework[] = [];

    const createFirework = () => {
      if (fireworks.length < 20) {
        fireworks.push(new Firework());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireworks = fireworks.filter((f) => f.life < f.maxLife);
      fireworks.forEach((f) => {
        f.update();
        f.draw(ctx);
      });

      if (Math.random() < 0.1) {
        createFirework();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas ref={fireworksRef} className={styles.fireworks} />
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          🎆 Happy Birthday! 🎆
        </h1>
        <p ref={messageRef} className={styles.message}>
          The best is yet to come!
        </p>
        <div className={styles.confetti} />
      </div>
    </div>
  );
};