import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

interface Song {
  id: number;
  title: string;
  artist: string;
  votes: number;
  emoji: string;
}

const initialSongs: Song[] = [
  { id: 1, title: 'Happy Birthday', artist: 'Traditional', votes: 15, emoji: '🎂' },
  { id: 2, title: 'Celebration', artist: 'Kool & The Gang', votes: 12, emoji: '🎉' },
  { id: 3, title: 'Can\'t Stop The Feeling', artist: 'Justin Timberlake', votes: 10, emoji: '💃' },
  { id: 4, title: 'Uptown Funk', artist: 'Bruno Mars', votes: 8, emoji: '🕺' },
  { id: 5, title: 'Happy', artist: 'Pharrell Williams', votes: 9, emoji: '😊' },
];

export const PlaylistPage: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const containerRef = useRef<HTMLDivElement>(null);
  const songRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.5 },
    });

    songRefs.current.forEach((item, index) => {
      if (item) {
        tl.fromTo(
          item,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0 },
          index * 0.08
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, [songs]);

  const handleVote = (id: number) => {
    setSongs((prev) =>
      prev.map((song) =>
        song.id === id ? { ...song, votes: song.votes + 1 } : song
      )
    );
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Party Playlist 🎵</h1>
      <div className={styles.playlist}>
        {songs.map((song, index) => (
          <div
            key={song.id}
            ref={(el) => (songRefs.current[index] = el)}
            className={styles.songCard}
          >
            <div className={styles.songInfo}>
              <span className={styles.songEmoji}>{song.emoji}</span>
              <div>
                <h3 className={styles.songTitle}>{song.title}</h3>
                <p className={styles.songArtist}>{song.artist}</p>
              </div>
            </div>
            <div className={styles.songActions}>
              <span className={styles.voteCount}>❤️ {song.votes}</span>
              <button className={styles.voteButton} onClick={() => handleVote(song.id)}>
                Vote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};