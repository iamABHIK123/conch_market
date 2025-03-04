import { useRef } from "react";

export function useThrottle(callback, limit) {
  const throttleRef = useRef(false);

  return (...args) => {
    if (!throttleRef.current) {
      callback(...args);
      throttleRef.current = true;

      setTimeout(() => {
        throttleRef.current = false;
      }, limit);
    }
  };
}
