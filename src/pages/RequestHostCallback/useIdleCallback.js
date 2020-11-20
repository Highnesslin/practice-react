import { useEffect, useRef, useState } from 'react';

export default function () {
  const lastTime = useRef(Date.now());
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    requestAnimationFrame(frameWork);
    requestIdleCallback(idleWork);
  }, []);

  const frameWork = () => {
    const nowTime = Date.now();
    if (nowTime - lastTime.current < 100) {
      if (isWorking) {
        setIsWorking(false);
      }
    } else {
      if (!isWorking) {
        setIsWorking(true);
      }
    }
    requestAnimationFrame(frameWork);
  };

  const idleWork = deadline => {
    if (deadline.timeRemaining() > 0) {
      lastTime.current = Date.now();
    }
    requestIdleCallback(idleWork);
  };

  return [isWorking];
}
