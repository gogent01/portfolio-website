import * as React from 'react';
import { cubicBezier, useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import classNames from 'classnames';

function TextDiscovery({
  fgBarClassName = 'bg-gray-900',
  bgBarClassName = 'bg-white',
  children,
  ...delegated
}: {
  fgBarClassName?: string;
  bgBarClassName?: string;
  children: React.ReactNode;
} & React.ComponentProps<'p'>) {
  const [scope, animate] = useAnimate();
  const easing = cubicBezier(0.23, 1, 0.32, 1);

  useEffect(() => {
    const enterAnimation = async () => {
      if (!scope.current) return;

      animate([
        ['#fg-bar', { x: '-50%', scaleX: 0 }, { duration: 0 }],
        ['#bg-bar', { x: '0%', scaleX: 1 }, { duration: 0 }],
        ['#fg-bar', { x: '0%', scaleX: 1 }, { duration: 0.45, ease: easing }],
        ['#bg-bar', { x: '50%', scaleX: 0 }, { duration: 0 }],
        ['#fg-bar', { x: '50%', scaleX: 0 }, { duration: 0.45, ease: easing }],
      ]);
    };
    enterAnimation();
  }, [children]);

  return (
    <div ref={scope} className={classNames('relative max-w-max')}>
      <div
        id="fg-bar"
        className={classNames(
          'absolute w-full h-full scale-0 z-20',
          fgBarClassName
        )}
      ></div>
      <div
        id="bg-bar"
        className={classNames('absolute w-full h-full z-10', bgBarClassName)}
      ></div>
      <p {...delegated}>{children}</p>
    </div>
  );
}

export default TextDiscovery;
