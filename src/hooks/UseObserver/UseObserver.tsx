import * as React from 'react';

type UseObserverOptions = {
  threshold: number;
};

function useObserver(
  ref: React.RefObject<HTMLElement>,
  callback: React.EffectCallback,
  options: UseObserverOptions = { threshold: 0 }
) {
  const { threshold } = options;

  React.useEffect(() => {
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
