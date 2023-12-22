'use client';

import * as React from 'react';
import classNames from 'classnames';
import {
  motion,
  LayoutGroup,
  useScroll,
  MotionValue,
  useTransform,
  HTMLMotionProps,
  useMotionValueEvent,
  useAnimate,
  useSpring,
} from 'framer-motion';
import GridContainer from '@/components/GridContainer';
import { GithubIcon, LinkedInIcon, MailIcon } from '@/assets/icons';
import { Red_Hat_Display } from 'next/font/google';
import { StyleHTMLAttributes } from 'react';

const heroFont = Red_Hat_Display({
  subsets: ['latin'],
});

function SlidingName({
  children,
  ...delegated
}: { children: React.ReactNode } & React.ComponentProps<'div'>) {
  return (
    <div
      className={classNames(
        'relative pointer-events-none select-none',
        'translate-y-12',
        'sm:translate-y-12',
        'md:translate-y-12',
        'lg:translate-y-8',
        'xl:translate-y-4',
        delegated.className
      )}
      style={{
        width: 'calc(100vw - 2 * var(--gutter))',
      }}
    >
      <div
        className={classNames(
          'w-full select-auto',
          'h-13',
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
            'text-5xl',
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
      className={classNames(
        'relative pointer-events-none select-none',
        'translate-y-14',
        'sm:translate-y-14',
        'md:translate-y-12',
        'lg:translate-y-8',
        'xl:translate-y-4'
      )}
      style={{
        minWidth: 'min(max-content, calc(100vw - var(--gutter)))',
      }}
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

function HeroIcon({
  Icon,
  link,
  text,
  delay,
  ...delegated
}: {
  Icon: React.ComponentType<{ className: string; style: React.CSSProperties }>;
  link: string;
  text: string;
  delay: number;
} & React.ComponentProps<'a'>) {
  return (
    <motion.a
      href={link}
      target="_blank"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: 'easeOut', delay }}
      className={classNames(delegated.className)}
    >
      <Icon
        className={classNames(
          'text-gray-900 transition-transform ease-in-out duration-500 hover:rotate-6 hover:translate-x-1 hover:-translate-y-2 hover:translate-z-0',
          'h-16 w-16',
          'lg:h-auto lg:w-full'
        )}
        style={{ maxWidth: '6rem' }}
      />
      <span className="sr-only">{text}</span>
    </motion.a>
  );
}

function HeroIcons({ ...delegated }: React.ComponentProps<'div'>) {
  const { scrollY } = useScroll();
  const [scope, animate] = useAnimate();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    animate(
      scope.current,
      { transform: `translateY(${-latest * 0.1}%)` },
      { duration: 0 }
    );
  });

  return (
    <div
      ref={scope}
      {...delegated}
      className={classNames('flex gap-12', delegated.className)}
    >
      <HeroIcon
        Icon={GithubIcon}
        link={'https://github.com/gogent01'}
        text={'Github'}
        delay={5}
      />
      <HeroIcon
        Icon={LinkedInIcon}
        link={'https://www.linkedin.com/in/gamishurovsky'}
        text={'LinkedIn'}
        delay={4.5}
      />
      <HeroIcon
        Icon={MailIcon}
        link={'mailto:gamishurovskiy@gmail.com'}
        text={'E-mail'}
        delay={4}
        className="-mt-1.5"
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
        <SlidingName className="-ml-0.25 sm:-ml-0.5 md:-ml-1 lg:-ml-1.5">
          Georgy
        </SlidingName>
        <SlidingName className="-ml-0.25 sm:-ml-0.5 md:-ml-1 lg:-ml-1.5">
          Mishurovsky
        </SlidingName>
        <div className="flex flex-wrap">
          <SlidingRole>Full&nbsp;Stack&nbsp;</SlidingRole>
          <SlidingRole>&&nbsp;Frontend&nbsp;Developer</SlidingRole>
        </div>
      </div>

      <HeroIcons
        className={classNames(
          'h-full flex-col justify-start items-end',
          'col-start-4',
          'md:col-start-8',
          'lg:col-start-12'
        )}
      />
    </GridContainer>
  );
}

export default Hero;
