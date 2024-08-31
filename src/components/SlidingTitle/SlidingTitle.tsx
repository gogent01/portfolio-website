'use client';
import * as React from 'react';
import classnames from 'classnames';
import {
  motion,
  useAnimate,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Red_Hat_Display } from 'next/font/google';
import classNames from 'classnames';
import { useEffect } from 'react';
import { debounce } from '@/utils';

const titleFont = Red_Hat_Display({
  subsets: ['latin'],
});

type SlidingTitleProps = {
  level: 'h1' | 'h2' | 'h3';
  topTarget?: number;
  stop?: boolean;
  offsetTop?: number;
  pause?: number;
  origin?: 'left' | 'right';
  children: React.ReactNode;
} & React.ComponentProps<'h1'>;

function SlidingTitle({
  level,
  topTarget = 0,
  stop = false,
  offsetTop = 1,
  pause = 0,
  origin = 'left',
  children,
  ...delegated
}: SlidingTitleProps) {
  const DETECTION_PADDING_PX = 50;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const Tag = level;

  function updateTitlePositionX() {
    const container = containerRef.current;
    if (!container) return;
    const title = container.children[0];
    if (!(title instanceof HTMLElement)) return;

    const clientHeight = document.documentElement.clientHeight;
    const clientWidth = document.documentElement.clientWidth;
    const rect: DOMRect = container.getBoundingClientRect();

    const isOnPageLevel =
      rect.top < clientHeight + DETECTION_PADDING_PX &&
      rect.bottom > 0 - DETECTION_PADDING_PX;
    const offsetXToHide =
      origin === 'left'
        ? -(rect.left + rect.width)
        : clientWidth - rect.right + rect.width;

    if (!isOnPageLevel) return;

    const targetX =
      origin === 'left'
        ? Math.max(topTarget * clientWidth, rect.left)
        : Math.min(topTarget * clientWidth, rect.left);
    const distanceX =
      origin === 'left'
        ? targetX - offsetXToHide - rect.left
        : targetX - offsetXToHide - rect.width - rect.left;
    const scrollPercent =
      (clientHeight - rect.bottom) / (clientHeight - rect.height);
    const thresholdedPercent =
      Math.max(0, scrollPercent - (1 - offsetTop)) / offsetTop;

    const pausePosition = -offsetXToHide / distanceX;
    const pauseStart = pausePosition - pause * pausePosition;
    const pauseEnd = pausePosition + pause * (1 - pausePosition);
    const velocity = 1 / (1 - pause);

    let positionX: number;
    if (thresholdedPercent < pauseStart) {
      positionX = offsetXToHide + distanceX * thresholdedPercent * velocity;
    } else if (
      thresholdedPercent >= pauseStart &&
      thresholdedPercent <= pauseEnd
    ) {
      positionX = 0;
    } else {
      const lagX = pause * distanceX * velocity;
      positionX =
        offsetXToHide - lagX + distanceX * thresholdedPercent * velocity;
    }

    if (stop)
      positionX =
        origin === 'left' ? Math.min(positionX, 0) : Math.max(positionX, 0);

    title.style.transform = `translateX(${positionX}px)`;
  }

  useEffect(() => {
    updateTitlePositionX();
    window.addEventListener('scroll', updateTitlePositionX);

    return () => window.removeEventListener('scroll', updateTitlePositionX);
  }, []);

  return (
    <div className={classNames('flex', classNames(delegated.className))}>
      <div ref={containerRef} className="relative w-full h-12">
        <Tag
          className={classnames(
            'absolute font-bold tracking-wider',
            titleFont.className
          )}
          style={{
            transform:
              origin === 'left' ? 'translateX(-100vw)' : 'translateX(100vw)',
          }}
        >
          {children}
        </Tag>
      </div>
    </div>
  );
}

export default SlidingTitle;
