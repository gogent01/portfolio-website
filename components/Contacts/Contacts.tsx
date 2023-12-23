'use client';

import * as React from 'react';
import classNames from 'classnames';
import { motion, useInView } from 'framer-motion';
import SlidingTitle from '@/components/SlidingTitle';
import GridContainer from '@/components/GridContainer';
import { CurrentViewContext } from '@/components/CurrentViewProvider';
import { CvIcon, GithubIcon, LinkedInIcon, MailIcon } from '@/assets/icons';

function Title({ children }: { children: React.ReactNode }) {
  return (
    <SlidingTitle
      level={'h1'}
      topTarget={0.7}
      offsetTop={0.95}
      pause={0.5}
      origin={'left'}
      stop={true}
      className={classNames(
        'self-end text-gray-900',
        'text-4xl col-start-1 col-span-4',
        'md:text-5xl md:col-start-2 md:col-span-6',
        'lg:text-6xl lg:col-start-2 lg:col-span-8',
        'xl:text-7xl xl:col-start-2 xl:col-span-7'
      )}
    >
      {children}
    </SlidingTitle>
  );
}

function ContactIcon({
  Icon,
  link,
  text,
  ...delegated
}: {
  Icon: React.ComponentType<{ className: string }>;
  link: string;
  text: string;
} & React.ComponentProps<'a'>) {
  return (
    <a
      href={link}
      target="_blank"
      {...delegated}
      className={classNames(
        'block',
        'h-16 w-16',
        'md:h-20 md:w-20',
        'lg:h-24 lg:w-24',
        'xl:h-28 xl:w-28',
        delegated.className
      )}
      onMouseEnter={(event: React.MouseEvent) => {
        (event.currentTarget.children[0] as HTMLAnchorElement).style.transform =
          'scale(110%)';
        (event.currentTarget.children[1] as HTMLAnchorElement).style.transform =
          'translateY(15%)';
      }}
      onMouseLeave={(event: React.MouseEvent) => {
        (event.currentTarget.children[0] as HTMLAnchorElement).style.transform =
          'scale(100%)';
        (event.currentTarget.children[1] as HTMLAnchorElement).style.transform =
          'translateY(0)';
      }}
    >
      <Icon
        className={classNames(
          'block h-full w-full text-gray-900 transition-transform ease-in-out duration-500'
        )}
      />
      <span
        className={classNames(
          'block w-full pt-2 text-center cursor-pointer transition-transform ease-in-out duration-700 delay-75',
          'text-lg'
        )}
      >
        {text}
      </span>
    </a>
  );
}

function ContactIcons() {
  return (
    <div
      className={classNames(
        'w-full flex flex-wrap justify-center col-start-1 col-span-full self-start',
        'mt-16 gap-x-12 gap-y-16',
        'md:mt-24 md:gap-20',
        'lg:mt-28 lg:gap-24',
        'xl:mt-32 xl:gap-28'
      )}
    >
      <ContactIcon
        Icon={GithubIcon}
        link={'https://github.com/gogent01'}
        text={'Github'}
      />
      <ContactIcon
        Icon={LinkedInIcon}
        link={'https://www.linkedin.com/in/gamishurovsky'}
        text={'LinkedIn'}
      />
      <ContactIcon
        Icon={MailIcon}
        link={'mailto:gamishurovskiy@gmail.com'}
        text={'E-mail'}
      />

      <ContactIcon
        Icon={CvIcon}
        link={'https://bit.ly/cv-georgy-mishurovsky'}
        text={'CV'}
        style={{ transform: 'translateX(-16.67%)' }}
        className="hidden sm:block"
      />
      <ContactIcon
        Icon={CvIcon}
        link={'https://bit.ly/cv-georgy-mishurovsky'}
        text={'CV'}
        className="block sm:hidden"
      />
    </div>
  );
}

function Contacts() {
  const { setCurrentView } = React.useContext(CurrentViewContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const hasComeIntoView = useInView(ref, { once: true, amount: 0.8 });
  const isInView = useInView(ref, { amount: 0.5 });

  // React.useEffect(() => {
  //   if (isInView) setCurrentView('contacts');
  // }, [isInView]);

  return (
    <GridContainer
      ref={ref}
      className="overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <Title>Contact Me</Title>
      <ContactIcons />
    </GridContainer>
  );
}

export default Contacts;
