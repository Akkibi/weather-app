import { useState, useEffect, useRef } from 'react';

interface ScrambleOptions {
  scrambleChars?: string;
  scrambleDuration?: number;
  scrambleSpeed?: number;
}

export const useScrambleText = (
  text: string,
  isAnimating: boolean,
  options: ScrambleOptions = {}
) => {
  const {
    scrambleChars = '!<>-_\\/[]{}—=+*^?#________',
    scrambleDuration = 10,
    scrambleSpeed = 1000 / 35
  } = options;

  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef(0);
  const queueRef = useRef<Array<{
    from: string;
    to: string;
    start: number;
    end: number;
    char?: string;
  }>>([]);

  const getRandomChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  };

  useEffect(() => {
    if (isAnimating) {
      // Initialize the queue
      const length = Math.max(displayText.length, text.length);
      queueRef.current = [];

      for (let i = 0; i < length; i++) {
        const from = displayText[i] || '';
        const to = text[i] || '';
        const start = Math.floor(Math.random() * scrambleDuration);
        const end = start + Math.floor(Math.random() * scrambleDuration);
        queueRef.current.push({ from, to, start, end });
      }

      frameRef.current = 0;

      const update = () => {
        let output = '';
        let complete = 0;

        for (let i = 0; i < queueRef.current.length; i++) {
          let { from, to, start, end, char } = queueRef.current[i];

          if (frameRef.current >= end) {
            complete++;
            output += to;
          } else if (frameRef.current >= start) {
            if (!char || Math.random() < 0.28) {
              char = getRandomChar();
              queueRef.current[i].char = char;
            }
            output += char;
          } else {
            output += from;
          }
        }

        setDisplayText(output);

        if (complete === queueRef.current.length) {
          return;
        }

        frameRef.current++;
        setTimeout(update, scrambleSpeed);
      };

      update();
    }
  }, [isAnimating, text, scrambleChars, scrambleDuration, scrambleSpeed]);

  return displayText;
};
