'use client';

import * as React from 'react';
import classNames from 'classnames';
import SlidingTitle from '@/components/SlidingTitle';
import GridContainer from '@/components/GridContainer';
import { CvIcon, GithubIcon, LinkedInIcon, MailIcon } from '@/assets/icons';
import ContactIcon from '@/components/ContactIcon';

function Title({ children }: { children: React.ReactNode }) {
  return (
    <SlidingTitle
      level={'h1'}
      topTarget={0.5}
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
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <GridContainer
      ref={ref}
      className="overflow-hidden pb-8 sm:pb-32"
      style={{ minHeight: '100vh' }}
    >
      <Title>Get in Touch</Title>
      <ContactIcons />
    </GridContainer>
  );
}

export default Contacts;
