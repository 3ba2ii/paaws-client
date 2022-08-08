import { useRef, useState } from 'react';

const useTimer = () => {
  const [status, setStatus] = useState<'ON' | 'OFF'>('OFF');
  const [countdown, setCountdown] = useState(0);

  const intervalId = useRef<NodeJS.Timer | null>(null);

  const start = (durationInSeconds: number) => {
    if (status === 'ON' || intervalId.current !== null) {
      throw new Error('Timer is already running');
    }
    setCountdown(durationInSeconds);
    const newIntervalId = setInterval(() => {
      setCountdown(durationInSeconds - 1);

      if (--durationInSeconds < 0) {
        clear();
      }
    }, 1000);

    intervalId.current = newIntervalId;
    setStatus('ON');
    return { ok: true };
  };
  const clear = () => {
    if (intervalId.current === null && status === 'OFF') {
      return;
    }
    clearInterval(intervalId?.current as NodeJS.Timer);
    intervalId.current = null;
    setStatus('OFF');
    setCountdown(0);
    return { ok: true };
  };

  return { start, clear, countdown };
};

export default useTimer;
