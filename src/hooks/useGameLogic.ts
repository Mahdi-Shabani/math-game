
import { useState, useEffect, useCallback } from 'react';
import { Level } from '../types';

export const useGameLogic = (level: Level | null, onComplete: (score: number, success: boolean) => void) => {
  const [question, setQuestion] = useState({ text: '', answer: 0, options: [] as number[] });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(level?.timeLimit || 60);
  const [isGameOver, setIsGameOver] = useState(false);

  const generateQuestion = useCallback(() => {
    if (!level) return;

    const op = level.operations[Math.floor(Math.random() * level.operations.length)];
    const n1 = Math.floor(Math.random() * (level.maxNumber - level.minNumber + 1)) + level.minNumber;
    const n2 = Math.floor(Math.random() * (level.maxNumber - level.minNumber + 1)) + level.minNumber;

    let ans = 0;
    let text = '';

    switch (op) {
      case '+': 
        ans = n1 + n2; 
        text = `${n1} + ${n2}`;
        break;
      case '-': 
        const max = Math.max(n1, n2);
        const min = Math.min(n1, n2);
        ans = max - min;
        text = `${max} - ${min}`;
        break;
      case '*': 
        ans = n1 * n2;
        text = `${n1} × ${n2}`;
        break;
      case '/':
        // Ensure integer result: n2 * ans = n1
        const divider = Math.floor(Math.random() * 9) + 2; // 2 to 10
        const result = Math.floor(Math.random() * (level.maxNumber / divider)) + 1;
        ans = result;
        text = `${divider * result} ÷ ${divider}`;
        break;
      default: 
        ans = n1 + n2;
        text = `${n1} + ${n2}`;
    }

    // Generate options
    const options = new Set<number>([ans]);
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 10) - 5;
      const wrongAns = ans + offset;
      if (wrongAns >= 0 && wrongAns !== ans) {
        options.add(wrongAns);
      } else {
        options.add(ans + options.size + 1);
      }
    }

    setQuestion({
      text,
      answer: ans,
      options: Array.from(options).sort(() => Math.random() - 0.5)
    });
  }, [level]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  useEffect(() => {
    if (timeLeft <= 0 || lives <= 0) {
      setIsGameOver(true);
      onComplete(score, score >= (level?.targetScore || 5));
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, lives, score, level, onComplete]);

  const checkAnswer = (selected: number) => {
    if (selected === question.answer) {
      setScore(prev => prev + 1);
      generateQuestion();
      // Level success check
      if (score + 1 >= (level?.targetScore || 5)) {
        // We can either finish early or let them get more points
        // For now, let's keep playing until time/lives run out or target reached
      }
    } else {
      setLives(prev => prev - 1);
      if (lives - 1 > 0) {
        generateQuestion();
      }
    }
  };

  return { question, score, lives, timeLeft, checkAnswer, isGameOver };
};
