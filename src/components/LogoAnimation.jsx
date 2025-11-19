import React, { useState, useEffect } from 'react';

export default function LogoAnimation() {
  const fullText = "emmanueledurante";
  const [display, setDisplay] = useState("e14e");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleAnimation = () => {
      setIsExpanded(prev => !prev);
    };

    const interval = setInterval(toggleAnimation, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 8; // Number of steps to expand
    const speed = 50; // ms per frame

    const animate = () => {
      if (isExpanded) {
        // Expanding: e14e -> emmanueledurante
        if (frame <= totalFrames) {
          const count = frame; // 0 to 7
          // Calculate how many chars to show from start and end
          // fullText length is 16. inner part is 14.
          // we want to reveal 1 char from left and 1 from right per step?
          // step 0: e (1) ... 14 ... e (1)
          // step 1: em (2) ... 12 ... te (2)
          
          const revealedChars = count; // chars to reveal on each side (excluding the first/last 'e' which are static-ish)
          // Actually 'e' is index 0.
          
          const leftPart = fullText.slice(0, 1 + count);
          const rightPart = fullText.slice(fullText.length - (1 + count));
          
          const remainingCount = 14 - (count * 2);
          
          if (remainingCount > 0) {
            setDisplay(`${leftPart}${remainingCount}${rightPart}`);
          } else {
            setDisplay(fullText);
          }
          
          frame++;
          setTimeout(animate, speed);
        }
      } else {
        // Collapsing: emmanueledurante -> e14e
        if (frame <= totalFrames) {
          const count = totalFrames - frame; // 7 down to 0
          
          const leftPart = fullText.slice(0, 1 + count);
          const rightPart = fullText.slice(fullText.length - (1 + count));
          
          const remainingCount = 14 - (count * 2);
          
          if (remainingCount > 0) {
            setDisplay(`${leftPart}${remainingCount}${rightPart}`);
          } else {
             setDisplay(fullText); // Should be e14e at the very end but logic says fullText if count < 0
             // Wait, if remainingCount > 0 we show number.
             // if count is 0, remaining is 14. -> e14e
          }
          
          // Fix for the last frame of collapsing
          if (count === 0) {
             setDisplay("e14e");
          }

          frame++;
          setTimeout(animate, speed);
        }
      }
    };

    animate();
  }, [isExpanded]);

  return (
    <a href="/" className="text-2xl font-display font-bold text-white tracking-wider flex items-center min-w-[100px] h-8">
      <span className="font-mono">{display}</span>
      <span className="text-accent-orange">.</span>
    </a>
  );
}
