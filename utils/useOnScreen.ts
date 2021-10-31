import { useState, useEffect } from 'react';

export default function useOnScreen(ref: any) {
  const [isIntersecting, setIntersecting] = useState(false);

  let observer: any = null;

  useEffect(() => {
    observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      {
        threshold: [1],
      }
    );
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}
