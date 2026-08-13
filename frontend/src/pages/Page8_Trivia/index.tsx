import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What year was the birthday person born?',
    options: ['1990', '1995', '2000', '1985'],
    correct: 1,
  },
  {
    id: 2,
    question: 'What is their favorite color?',
    options: ['Blue', 'Red', 'Purple', 'Green'],
    correct: 2,
  },
  {
    id: 3,
    question: 'What is their zodiac sign?',
    options: ['Leo', 'Virgo', 'Libra', 'Scorpio'],
    correct: 0,
  },
  {
    id: 4,
    question: 'What is their favorite hobby?',
    options: ['Reading', 'Gaming', 'Music', 'Sports'],
    correct: 2,
  },
];

export const TriviaPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, rotationX: 15 },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [currentQuestion, showScore]);

  const handleAnswer = (selected: number) => {
    if (answered) return;
    setAnswered(true);

    const isCorrect = selected === questions[currentQuestion].correct;
    if (isCorrect) setScore(score + 1);

    const btn = optionRefs.current[selected];
    if (btn) {
      gsap.to(btn, {
        scale: isCorrect ? 1.1 : 0.9,
        backgroundColor: isCorrect ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)',
        duration: 0.3,
      });
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(false);
        optionRefs.current = [];
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setShowScore(false);
    optionRefs.current = [];
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Birthday Trivia 🧠</h1>
      <div ref={cardRef} className={styles.card}>
        {showScore ? (
          <div className={styles.scoreContainer}>
            <h2 className={styles.scoreTitle}>🎉 Quiz Complete!</h2>
            <p className={styles.scoreText}>
              You scored <span className={styles.scoreNumber}>{score}</span> out of{' '}
              {questions.length}
            </p>
            <button className={styles.resetButton} onClick={resetQuiz}>
              🔄 Play Again
            </button>
          </div>
        ) : (
          <>
            <div className={styles.progress}>
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <h2 className={styles.question}>{questions[currentQuestion].question}</h2>
            <div className={styles.options}>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  ref={(el) => (optionRefs.current[index] = el)}
                  className={styles.option}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};