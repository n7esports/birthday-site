import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

export const LandingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1.2 },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100, rotationX: 45 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.5 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=0.5'
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const handleConfetti = async () => {
    try {
      const wasm = await import('../../wasm/particles');
      wasm.burstConfetti(500);
    } catch (error) {
      console.error('WASM not loaded:', error);
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.hero}>
        <h1 ref={titleRef} className={styles.title}>
          Happy Birthday
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Celebrating an amazing journey
        </p>
        <button ref={buttonRef} className={styles.button} onClick={handleConfetti}>
          🎉 Start Celebration
        </button>
      </div>
    </div>
  );
};