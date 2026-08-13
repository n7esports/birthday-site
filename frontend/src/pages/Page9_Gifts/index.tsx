import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

interface Gift {
  id: number;
  name: string;
  price: string;
  image: string;
  claimed: boolean;
  emoji: string;
}

const initialGifts: Gift[] = [
  { id: 1, name: 'Smart Watch', price: '$299', image: '⌚', claimed: false, emoji: '⌚' },
  { id: 2, name: 'Book Collection', price: '$75', image: '📚', claimed: false, emoji: '📚' },
  { id: 3, name: 'Gaming Console', price: '$499', image: '🎮', claimed: false, emoji: '🎮' },
  { id: 4, name: 'Spa Package', price: '$150', image: '🧖', claimed: false, emoji: '🧖' },
  { id: 5, name: 'Camera', price: '$899', image: '📷', claimed: false, emoji: '📷' },
  { id: 6, name: 'Vinyl Record', price: '$45', image: '🎵', claimed: false, emoji: '🎵' },
];

export const GiftsPage: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  const claimedCount = gifts.filter((g) => g.claimed).length;
  const progress = (claimedCount / gifts.length) * 100;

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'back.out(1.7)', duration: 0.6 },
    });

    cardRefs.current.forEach((item, index) => {
      if (item) {
        tl.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1 },
          index * 0.08
        );
      }
    });

    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { width: 0 },
        { width: `${progress}%`, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, [progress]);

  const handleClaim = (id: number) => {
    setGifts((prev) =>
      prev.map((gift) =>
        gift.id === id ? { ...gift, claimed: !gift.claimed } : gift
      )
    );
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Gift Registry 🎁</h1>
      <div className={styles.progressBar}>
        <div ref={progressRef} className={styles.progressFill} />
        <span className={styles.progressText}>
          {claimedCount} / {gifts.length} claimed
        </span>
      </div>
      <div className={styles.giftGrid}>
        {gifts.map((gift, index) => (
          <div
            key={gift.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`${styles.giftCard} ${gift.claimed ? styles.claimed : ''}`}
          >
            <div className={styles.giftEmoji}>{gift.emoji}</div>
            <h3 className={styles.giftName}>{gift.name}</h3>
            <p className={styles.giftPrice}>{gift.price}</p>
            <button
              className={styles.claimButton}
              onClick={() => handleClaim(gift.id)}
            >
              {gift.claimed ? '✓ Claimed' : 'Claim This Gift'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
