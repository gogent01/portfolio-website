'use client';

import { ComponentProps, ReactNode } from 'react';
import classNames from 'classnames';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useAnimate,
} from 'framer-motion';

import GridContainer from '@/components/landing/GridContainer';
import HeroIcon from '@/components/landing/HeroIcon';
import { GithubIcon, LinkedInIcon, MailIcon } from '@/assets/icons';
import { Red_Hat_Display } from 'next/font/google';

const heroFont = Red_Hat_Display({
  subsets: ['latin'],
});

function SlidingName({
  children,
  ...delegated
}: { children: ReactNode } & ComponentProps<'div'>) {
  const easeOutCubic = [0.33, 1, 0.68, 1];

  return (
    <div
      className={classNames(
        'relative pointer-events-none select-none',
        'translate-y-12',
        'sm:translate-y-12',
        'md:translate-y-12',
        'lg:translate-y-8',
        '2xl:translate-y-4',
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
          '2xl:h-44'
        )}
      >
        <motion.h1
          initial={{ y: '100%' }}
          animate={{ y: '0' }}
          transition={{ duration: 1.5, ease: easeOutCubic, delay: 0.5 }}
          className={classNames(
            'text-gray-900 font-bold tracking-wide',
            'text-5xl',
            'sm:text-7xl',
            'md:text-8xl',
            'lg:text-9xl',
            '2xl:text-10xl',
            heroFont.className
          )}
          style={{ transform: 'translateZ(0)' }}
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
          '2xl:-bottom-44 2xl:h-44'
        )}
      ></div>
    </div>
  );
}

function SlidingRole({ children }: { children: ReactNode }) {
  const easeOutCubic = [0.33, 1, 0.68, 1];

  return (
    <div
      className={classNames(
        'relative pointer-events-none select-none',
        'translate-y-14',
        'sm:translate-y-14',
        'md:translate-y-12',
        'lg:translate-y-8',
        '2xl:translate-y-4'
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
          '2xl:h-16'
        )}
      >
        <motion.h2
          initial={{ y: '100%' }}
          animate={{ y: '0' }}
          transition={{ duration: 1.375, ease: easeOutCubic, delay: 1.375 }}
          className={classNames(
            'text-gray-900 font-light',
            'text-3xl',
            'sm:text-4xl sm:leading-tight',
            '2xl:text-5xl 2xl:leading-tight',
            heroFont.className
          )}
          style={{ transform: 'translateZ(0)' }}
        >
          {children}
        </motion.h2>
      </div>
      <div
        className={classNames(
          'absolute w-full bg-white',
          '-bottom-10 h-10',
          'sm:-bottom-12 sm:h-12',
          '2xl:-bottom-16 2xl:h-16'
        )}
      ></div>
    </div>
  );
}

function HeroIcons({ ...delegated }: ComponentProps<'div'>) {
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
      className={classNames('flex gap-8', 'sm:gap-12', delegated.className)}
    >
      <HeroIcon
        Icon={GithubIcon}
        link={'https://github.com/gogent01'}
        text={'Github'}
        delay={3.125}
      />
      <HeroIcon
        Icon={LinkedInIcon}
        link={'https://www.linkedin.com/in/gamishurovsky'}
        text={'LinkedIn'}
        delay={2.75}
      />
      <HeroIcon
        Icon={MailIcon}
        link={'mailto:gamishurovskiy@gmail.com'}
        text={'E-mail'}
        delay={2.375}
        className="-mt-1.5"
      />
    </div>
  );
}

function Hero() {
  return (
    <GridContainer
      className="pt-8 pb-16 items-end sm:py-16"
      style={{ minHeight: '100svh' }}
    >
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
