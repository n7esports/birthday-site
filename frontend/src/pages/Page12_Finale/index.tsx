import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

export const FinalePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Big entrance animation
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1.2 },
    });

    if (containerRef.current) {
      tl.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.5 }
      );
    }
    
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, rotationY: 90 },
        { opacity: 1, y: 0, rotationY: 0, duration: 1.5, ease: 'back.out(2)' },
        '-=0.5'
      );
    }
    
    if (messageRef.current) {
      tl.fromTo(
        messageRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }

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

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          🎆 Happy Birthday! 🎆
        </h1>
        <p ref={messageRef} className={styles.message}>
          The best is yet to come!
        </p>
      </div>
    </div>
  );
};
