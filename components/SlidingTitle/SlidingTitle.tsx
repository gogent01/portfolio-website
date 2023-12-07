'use client';
import * as React from 'react';
import classnames from 'classnames';
import { motion, useScroll } from 'framer-motion';
import { Red_Hat_Display } from 'next/font/google';

const titleFont = Red_Hat_Display({
  subsets: ['latin'],
});

type SlidingTitleProps = {
  level: 'h1' | 'h2' | 'h3';
  scrollStart: number;
  scrollEnd: number;
  offset: number;
  velocity: number;
  children: React.ReactNode;
} & React.ComponentProps<'h1'>;

function SlidingTitle({
  level,
  scrollStart,
  scrollEnd,
  offset,
  velocity,
  children,
  ...delegated
}: SlidingTitleProps) {
  const [scrollPercent, setScrollPercent] = React.useState(0);
  const { scrollY } = useScroll();

  function handleScroll(event: Event) {
    const sd = document.documentElement.scrollTop;
    const sp =
      (sd /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)) *
      100;

    if (sp >= scrollStart && sp <= scrollEnd) {
      setScrollPercent(sp);
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Tag = level;
  const x = Math.min(-offset + scrollPercent * velocity, 0);
  // console.log({ x, scrollPercent });
  return (
    <Tag
      {...delegated}
      className={classnames(
        'absolute font-bold tracking-wider transition-transform ease-out',
        titleFont.className,
        delegated.className
      )}
      style={{
        transform: `translateX(${x}vw)`,
      }}
    >
      {children}
    </Tag>
  );
}

export default SlidingTitle;
