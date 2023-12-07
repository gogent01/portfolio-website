'use client';

import * as React from 'react';
import classNames from 'classnames';
import { motion, LayoutGroup } from 'framer-motion';
import GridContainer from '@/components/GridContainer';
import { GithubIcon, LinkedInIcon, MailIcon } from '@/assets/icons';
import { Red_Hat_Display } from 'next/font/google';

const heroFont = Red_Hat_Display({
  subsets: ['latin'],
});

function SlidingName({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative pointer-events-none select-none"
      style={{ width: 'calc(100vw - 2 * var(--gutter))' }}
    >
      <div
        className={classNames(
          'w-full select-auto',
          'h-16',
          'sm:h-19.5',
          'md:h-26',
          'lg:h-35',
          'xl:h-44'
        )}
      >
        <motion.h1
          initial={{ transform: 'translateY(100%)' }}
          animate={{ transform: 'translateY(0%)' }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.75 }}
          className={classNames(
            'text-gray-900 font-bold tracking-wide',
            'text-6xl',
            'sm:text-7xl',
            'md:text-8xl',
            'lg:text-9xl',
            'xl:text-10xl',
            heroFont.className
          )}
        >
          {children}
        </motion.h1>
      </div>
      <div
        className={classNames(
          'absolute w-full bg-white',
          '-bottom-16 h-16',
          'sm:-bottom-19.5 sm:h-19.5',
          'md:-bottom-26 md:h-26',
          'lg:-bottom-35 lg:h-35',
          'xl:-bottom-44 xl:h-44'
        )}
      ></div>
    </div>
  );
}

function SlidingRole({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative pointer-events-none select-none"
      // style={{ width: 'calc(100vw - 2 * var(--gutter))' }}
      style={{ minWidth: 'min(max-content, calc(100vw - var(--gutter)))' }}
    >
      <div
        className={classNames(
          'w-full select-auto',
          'h-10',
          'sm:h-12',
          'xl:h-16'
        )}
      >
        <motion.h2
          initial={{ transform: 'translateY(100%)' }}
          animate={{ transform: 'translateY(0%)' }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 2.25 }}
          className={classNames(
            'text-gray-900 font-light',
            'text-3xl',
            'sm:text-4xl sm:leading-tight',
            'xl:text-5xl xl:leading-tight',
            heroFont.className
          )}
        >
          {children}
        </motion.h2>
      </div>
      <div
        className={classNames(
          'absolute w-full bg-white',
          '-bottom-10 h-10',
          'sm:-bottom-12 sm:h-12',
          'xl:-bottom-16 xl:h-16'
        )}
      ></div>
    </div>
  );
}

const MotionGithubIcon = motion(GithubIcon);
const MotionLinkedInIcon = motion(LinkedInIcon);
const MotionMailIcon = motion(MailIcon);
function HeroIcons({ ...delegated }: React.ComponentProps<'div'>) {
  const [hoverClass, setHoverClass] = React.useState('');
  React.useEffect(() => {
    setTimeout(() => {
      setHoverClass(
        'transition-transform ease-in-out duration-500 hover:rotate-6 hover:translate-x-1 hover:-translate-y-2'
      );
    }, 8000);
  }, []);

  return (
    <div
      {...delegated}
      className={classNames('flex gap-12', delegated.className)}
    >
      <MotionGithubIcon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut', delay: 5 }}
        className={classNames(
          'text-gray-900 transition-transform ease-in-out duration-500 hover:rotate-6 hover:translate-x-1 hover:-translate-y-2',
          'h-16 w-16',
          'lg:h-auto lg:w-full'
        )}
        style={{ maxWidth: '6rem' }}
      />
      <MotionLinkedInIcon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut', delay: 4.5 }}
        className={classNames(
          'text-gray-900 transition-transform ease-in-out duration-500 hover:rotate-6 hover:translate-x-1 hover:-translate-y-2 hover:translate-z-0',
          'h-16 w-16',
          'lg:h-auto lg:w-full'
        )}
        style={{ maxWidth: '6rem' }}
      />
      <MotionMailIcon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut', delay: 4 }}
        className={classNames(
          'text-gray-900 transition-transform ease-in-out duration-500 hover:rotate-6 hover:translate-x-1 hover:-translate-y-2',
          'h-16 w-16',
          'lg:h-auto lg:w-full'
        )}
        style={{ maxWidth: '6rem' }}
      />
    </div>
  );
}

function Hero() {
  return (
    <GridContainer className="py-16 items-end" style={{ minHeight: '100svh' }}>
      <div
        className={classNames(
          'col-start-1 col-span-3',
          'md:col-span-7',
          'lg:col-span-11'
        )}
      >
        <SlidingName>Georgy</SlidingName>
        <SlidingName>Mishurovsky</SlidingName>
        <div className="flex flex-wrap">
          <SlidingRole>Full&nbsp;Stack&nbsp;Developer</SlidingRole>
          <SlidingRole>&nbsp;･&nbsp;Front‑end&nbsp;Developer</SlidingRole>
        </div>
      </div>

      <HeroIcons
        className={classNames(
          'h-full flex-col justify-center items-center',
          'col-start-4',
          'md:col-start-8',
          'lg:col-start-12'
        )}
      />
    </GridContainer>
  );
}

export default Hero;
