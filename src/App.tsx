import './App.css';

import { useEffect, useState, useRef } from 'react';
import './App.css';

import { Crab } from './components/gameObjects/invaders/Crab/Crab';

interface InvaderProps {
  x: number;
  y: number;
}

interface BulletProps {
  x: number;
  y: number;
  isActive: boolean;
}

const App = () => {
  const [invaders, setInvaders] = useState<InvaderProps[]>([]);
  const [spaceship, setSpaceship] = useState<InvaderProps>({
    x: 250,
    y: 460,
  });
  const [bullet, setBullet] = useState<BulletProps>({
    x: spaceship.x,
    y: spaceship.y,
    isActive: false,
  });
  const [keyPressed, setKeyPressed] = useState<string>('');
  const [isInvaderActive, setIsInvaderActive] = useState<boolean>(false);
  const spaceshipRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    setKeyPressed(event.key);
  };

  const resetGame = () => {
    setInvaders([]);
    setSpaceship({ x: 250, y: 460 });
    setBullet({ x: spaceship.x, y: spaceship.y, isActive: false });
  };

  const moveBullet = () => {
    if (keyPressed === ' ' && !bullet.isActive) {
      setBullet({ x: spaceship.x + 15, y: spaceship.y, isActive: true });
    }
    if (!bullet.isActive) return;
    if (bullet.y === 0) {
      setBullet({ ...bullet, isActive: false });
      return;
    }
    setKeyPressed('');
    setBullet((prev) => ({ ...prev, y: prev.y - 5 }));
  };

  const moveInvaders = () => {
    if (invaders.length > 0 && invaders[0].y > 400) {
      setInvaders([]);
      alert('Game Over');
      resetGame();
      return;
    }
    setInvaders((prev) =>
      prev.map((invader) => ({ ...invader, y: invader.y + 1 }))
    );
    return;
  };

  const moveSpaceShip = () => {
    if (keyPressed === 'ArrowLeft' && spaceship.x > 0) {
      setSpaceship((prev) => ({ ...prev, x: prev.x - 10 }));
      setKeyPressed('');
    }
    if (keyPressed === 'ArrowRight' && spaceship.x < 450) {
      setSpaceship((prev) => ({ ...prev, x: prev.x + 10 }));
      setKeyPressed('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    const gameLoop = setInterval(() => {
      moveBullet();
      moveInvaders();
      moveSpaceShip();
      setIsInvaderActive((prev) => !prev);
    }, 600);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameLoop);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const newInvaders: InvaderProps[] = [];
    for (let i = 0; i < 10; i++) {
      newInvaders.push({ x: i * 50, y: 50 });
    }
    setInvaders(newInvaders);
  }, []);

  return (
    <div className='App'>
      <div
        ref={spaceshipRef}
        className='spaceship'
        style={{ left: spaceship.x, top: spaceship.y }}
      >
        🚀
      </div>
      {bullet.isActive && (
        <div className='bullet' style={{ left: bullet.x, top: bullet.y }}></div>
      )}
      {invaders.map((invader, index) => (
        <div
          key={index}
          className='invader'
          style={{ left: invader.x, top: invader.y }}
        >
          👾
        </div>
      ))}
      <Crab isCrabActive={isInvaderActive} />
    </div>
  );
};

export default App;
