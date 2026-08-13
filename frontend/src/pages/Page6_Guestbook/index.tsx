import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: string;
  emoji: string;
}

export const GuestbookPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, name: '🎉 Party Planner', message: 'Happy Birthday! Let the celebration begin!', timestamp: '2 min ago', emoji: '🎂' },
    { id: 2, name: '🌈 Best Friend', message: 'So proud of you! Have an amazing day!', timestamp: '15 min ago', emoji: '🌟' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [newName, setNewName] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.6 },
    });

    messagesRef.current.forEach((item, index) => {
      if (item) {
        tl.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          { opacity: 1, x: 0 },
          index * 0.1
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !newName.trim()) return;

    const message: Message = {
      id: Date.now(),
      name: newName,
      message: newMessage,
      timestamp: 'Just now',
      emoji: ['🎉', '🎈', '🎁', '🌟', '💝', '🎊', '🥳', '✨'][Math.floor(Math.random() * 8)],
    };

    setMessages((prev) => [message, ...prev]);
    setNewMessage('');
    setNewName('');
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Guestbook</h1>
      <div className={styles.content}>
        <div className={styles.messagesWrapper}>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                ref={(el) => {
                  messagesRef.current[index] = el;
                }}
                className={styles.messageCard}
              >
                <div className={styles.messageHeader}>
                  <span className={styles.messageEmoji}>{msg.emoji}</span>
                  <span className={styles.messageName}>{msg.name}</span>
                  <span className={styles.messageTime}>{msg.timestamp}</span>
                </div>
                <p className={styles.messageText}>{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={styles.input}
            required
          />
          <textarea
            placeholder="Write your birthday wish..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={styles.textarea}
            required
          />
          <button type="submit" className={styles.button}>
            💌 Send Wish
          </button>
        </form>
      </div>
    </div>
  );
};
