
import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  xVel: number;
  yVel: number;
  rotVel: number;
}

interface ConfettiProps {
  duration?: number;
  pieces?: number;
}

export const ConfettiEffect: React.FC<ConfettiProps> = ({ 
  duration = 3000,
  pieces = 100 
}) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [active, setActive] = useState(true);
  
  useEffect(() => {
    // Generate confetti pieces
    const colors = ['#f97316', '#8b5cf6', '#ec4899', '#10b981', '#3b82f6', '#fbbf24'];
    const newConfetti: ConfettiPiece[] = [];
    
    for (let i = 0; i < pieces; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        size: 5 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        xVel: -5 + Math.random() * 10,
        yVel: 3 + Math.random() * 7,
        rotVel: -3 + Math.random() * 6
      });
    }
    
    setConfetti(newConfetti);
    
    // Set timeout to remove confetti after duration
    const timeout = setTimeout(() => {
      setActive(false);
    }, duration);
    
    return () => clearTimeout(timeout);
  }, [pieces, duration]);
  
  useEffect(() => {
    if (!active) return;
    
    let animationFrame: number;
    let lastTime = performance.now();
    
    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 16; // normalize to ~60fps
      lastTime = time;
      
      setConfetti(prev => 
        prev.map(piece => ({
          ...piece,
          y: piece.y + piece.yVel * deltaTime,
          x: piece.x + piece.xVel * deltaTime,
          rotation: piece.rotation + piece.rotVel * deltaTime,
          // Add gravity effect
          yVel: piece.yVel + 0.1 * deltaTime
        })).filter(piece => piece.y < window.innerHeight + 50)
      );
      
      if (active) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [active]);
  
  if (!active || confetti.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: Math.max(0, Math.min(1, 1 - piece.y / window.innerHeight)),
            transition: 'opacity 0.5s'
          }}
        />
      ))}
    </div>
  );
};
