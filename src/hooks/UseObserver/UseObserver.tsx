'use client';

import { EffectCallback, RefObject, useEffect } from 'react';

type UseObserverOptions = {
  threshold: number;
};

function useObserver(
  ref: RefObject<HTMLElement>,
  callback: EffectCallback,
  options: UseObserverOptions = { threshold: 0 }
) {
  const { threshold } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) callback();
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, callback]);
}

export default useObserver;
