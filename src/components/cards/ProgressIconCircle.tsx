'use client';

import { useEffect, useState } from 'react';
import { CardProgressRange } from '@/types';

type ProgressIconCircleProps = {
  progress: CardProgressRange;
  size?: number;
  variant?: 'base' | 'accent';
};

export default function ProgressIconCircle(props: ProgressIconCircleProps) {
  const { progress } = props;
  const size = props.size ?? 16;
  const variant = props.variant ?? 'base';

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  let barColor: { light: string; dark: string };
  switch (variant) {
    case 'accent':
      barColor = { light: '#16a34a', dark: '#22c55e' };
      break;
    case 'base':
    default:
      barColor = { light: '#3f3f46', dark: '#d4d4d8' };
  }

  const arcLength = 176;
  let arcPercent: number;
  switch (progress) {
    case 0:
      arcPercent = 0;
      break;
    case 1:
      arcPercent = 17.5;
      break;
    case 2:
      arcPercent = 39;
      break;
    case 3:
      arcPercent = 65.5;
      break;
    case 4:
      arcPercent = 100;
      break;
    default:
      arcPercent = 0;
  }

  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className="text-zinc-100 dark:text-zinc-800"
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 32 4 A 28 28 0 1 1 31.99 4"
          stroke={isDarkMode ? barColor.dark : barColor.light}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={arcLength}
          strokeDashoffset={arcLength - (arcLength * arcPercent) / 100}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
        <path
          d="M 20 32 L 31 40 L 42 25"
          stroke={isDarkMode ? barColor.dark : barColor.light}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'opacity 0.2s ease-out 0.5s' }}
          className={arcPercent === 100 ? 'opacity-100' : 'opacity-0'}
        />
      </svg>
    </div>
  );
}
