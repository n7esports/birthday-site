import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles.module.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  icon: string;
}

const events: TimelineEvent[] = [
  { year: 1995, title: 'Born', description: 'The journey begins', icon: '👶' },
  { year: 2000, title: 'First Steps', description: 'Walking into the world', icon: '🚶' },
  { year: 2010, title: 'Teen Years', description: 'Discovering passions', icon: '🎸' },
  { year: 2020, title: 'Adulting', description: 'Building a future', icon: '💼' },
  { year: 2023, title: 'Today', description: 'Celebrating you!', icon: '🎂' },
];

export const TimelinePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });

    itemsRef.current.forEach((item, index) => {
      if (item) {
        tl.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 0.5 },
          index * 0.15
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Life Timeline</h1>
      <div className={styles.timeline}>
        {events.map((event, index) => (
          <div
            key={event.year}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`${styles.event} ${index % 2 === 0 ? styles.left : styles.right}`}
          >
            <div className={styles.icon}>{event.icon}</div>
            <div className={styles.year}>{event.year}</div>
            <h3 className={styles.eventTitle}>{event.title}</h3>
            <p className={styles.description}>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};