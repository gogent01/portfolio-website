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
        'md:text-5xl md:col-start-2 md:col-span-7',
        'lg:text-6xl lg:col-start-2 lg:col-span-11',
        '2xl:text-7xl 2xl:col-start-2 2xl:col-span-11'
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
        'w-full flex flex-wrap col-start-1 col-span-full self-start',
        'mt-16 justify-between gap-x-4 gap-y-16 px-2',
        'sm:mt-16 sm:justify-center sm:gap-16 sm:px-0',
        'md:mt-24 md:gap-20',
        'lg:mt-28 lg:gap-24',
        'xl:mt-28 xl:gap-24',
        '2xl:mt-32 2xl:gap-28'
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
        link={'/files/cv_georgy_mishurovsky.pdf'}
        text={'CV'}
        style={{ transform: 'translateX(-16.67%)' }}
        className="hidden sm:block"
      />
      <ContactIcon
        Icon={CvIcon}
        link={'/files/cv_georgy_mishurovsky.pdf'}
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
      className="overflow-hidden pb-16 sm:pb-32"
      style={{ minHeight: '100vh' }}
    >
      <Title>Get in Touch</Title>
      <ContactIcons />
    </GridContainer>
  );
}

export default Contacts;
