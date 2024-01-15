import { useEffect, useRef, useState } from 'react';

export function Crab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCrabActive, setIsCrabActive] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Draw the crab
    if (ctx) {
      ctx.fillStyle = 'white'; // Blue color for the crab
      ctx.fillRect(0, 0, 12, 8);
      ctx.fillRect(2, 8, 2, 2);
      ctx.fillRect(8, 8, 2, 2);
      if (isCrabActive) {
        ctx.fillRect(0, 10, 12, 2);
      }
      ctx.fillStyle = 'black'; // Black color for the eyes
      ctx.fillRect(2, 2, 2, 2); // Left left
      ctx.fillRect(8, 2, 2, 2); // Right eye
    }

    return () => {
      clearInterval(crabLoop);
    };
  }, [isCrabActive]);

  return (
    <canvas
      ref={canvasRef}
      width={40}
      height={40}
      style={{ paddingTop: '30px' }}
    ></canvas>
  );
}
