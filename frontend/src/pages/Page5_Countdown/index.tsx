import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const flipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const confettiTriggered = useRef(false);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 1);
    targetDate.setMonth(0);
    targetDate.setDate(1);
    targetDate.setHours(0, 0, 0, 0);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      
      if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        if (!confettiTriggered.current) {
          confettiTriggered.current = true;
          import('../../wasm/particles').then((wasm) => {
            wasm.burstConfetti(1000);
          }).catch(() => {
            console.log('WASM not loaded');
          });
        }
      }
    }, 1000);

    // Initial animation
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const elements = flipRefs.current.filter(el => el !== null);
    if (elements.length > 0) {
      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'back.out(1.7)' },
      });
      
      elements.forEach((el, index) => {
        if (el) {
          tl.fromTo(
            el,
            { scale: 0.5, opacity: 0, rotationY: 90 },
            { scale: 1, opacity: 1, rotationY: 0 },
            index * 0.1
          );
        }
      });
    }
  }, [timeLeft]);

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Countdown to the Big Day</h1>
      <div className={styles.flipClock}>
        <div className={styles.flipUnit}>
          <div ref={(el) => (flipRefs.current[0] = el)} className={styles.flipCard}>
            <span className={styles.flipNumber}>{String(timeLeft.days).padStart(2, '0')}</span>
          </div>
          <span className={styles.flipLabel}>Days</span>
        </div>
        <div className={styles.flipUnit}>
          <div ref={(el) => (flipRefs.current[1] = el)} className={styles.flipCard}>
            <span className={styles.flipNumber}>{String(timeLeft.hours).padStart(2, '0')}</span>
          </div>
          <span className={styles.flipLabel}>Hours</span>
        </div>
        <div className={styles.flipUnit}>
          <div ref={(el) => (flipRefs.current[2] = el)} className={styles.flipCard}>
            <span className={styles.flipNumber}>{String(timeLeft.minutes).padStart(2, '0')}</span>
          </div>
          <span className={styles.flipLabel}>Minutes</span>
        </div>
        <div className={styles.flipUnit}>
          <div ref={(el) => (flipRefs.current[3] = el)} className={styles.flipCard}>
            <span className={styles.flipNumber}>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
          <span className={styles.flipLabel}>Seconds</span>
        </div>
      </div>
      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <div className={styles.celebration}>
          <h2>🎉 Happy Birthday! 🎉</h2>
        </div>
      )}
    </div>
  );
};