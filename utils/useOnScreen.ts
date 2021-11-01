import { useState, useEffect } from 'react';

export default function useOnScreen(ref: any) {
  try {
    const [isIntersecting, setIntersecting] = useState(false);

    let observer: any = null;

    useEffect(() => {
      observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        {
          rootMargin: '0px 0px 200px 0px',
        }
      );

      if (ref.current) observer?.observe(ref.current);
      // Remove the observer as soon as the component is unmounted
      return () => {
        observer?.disconnect();
      };
    }, []);

    return isIntersecting;
  } catch (e) {
    console.error(e);
    return false;
  }
}
