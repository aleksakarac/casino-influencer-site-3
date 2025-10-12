'use client';

import { useState, useEffect, useCallback } from 'react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isMounted: boolean;
}

export function useCountdown(endDate: string | Date): CountdownTime {
  const [isMounted, setIsMounted] = useState(false);

  const calculateTimeLeft = useCallback((): Omit<CountdownTime, 'isMounted'> => {
    const difference = new Date(endDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  }, [endDate]);

  const [timeLeft, setTimeLeft] = useState<Omit<CountdownTime, 'isMounted'>>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return { ...timeLeft, isMounted };
}
