import {useState, useEffect, useRef} from 'react';

export const useDebounce = <T>(value: T, milliSeconds: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    timer.current = setTimeout(() => setDebouncedValue(value), milliSeconds);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};
