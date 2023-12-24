import * as React from 'react';
import { cubicBezier, useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import classNames from 'classnames';

function TextDiscovery({
  children,
  ...delegated
}: { children: React.ReactNode } & React.ComponentProps<'p'>) {
  const [scope, animate] = useAnimate();
  const easing = cubicBezier(0.23, 1, 0.32, 1);

  useEffect(() => {
    const enterAnimation = async () => {
      if (!scope.current) return;

      animate([
        ['#black-bar', { x: '-50%', scaleX: 0 }, { duration: 0 }],
        ['#white-bar', { x: '0%', scaleX: 1 }, { duration: 0 }],
        [
          '#black-bar',
          { x: '0%', scaleX: 1 },
          { duration: 0.45, ease: easing },
        ],
        ['#white-bar', { x: '50%', scaleX: 0 }, { duration: 0 }],
        [
          '#black-bar',
          { x: '50%', scaleX: 0 },
          { duration: 0.45, ease: easing },
        ],
      ]);
    };
    enterAnimation();
  }, [children]);

  return (
    <div ref={scope} className={classNames('relative max-w-max')}>
      <div
        id="black-bar"
        className={classNames('absolute w-full h-full bg-gray-900 scale-0')}
      ></div>
      <div
        id="white-bar"
        className={classNames('absolute w-full h-full bg-white')}
      ></div>
      <p {...delegated}>{children}</p>
    </div>
  );
}

export default TextDiscovery;
