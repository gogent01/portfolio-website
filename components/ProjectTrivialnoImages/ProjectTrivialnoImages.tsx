import * as React from 'react';
import { CurrentViewContext } from '@/components/CurrentViewProvider';
import useDeviceDims from '@/hooks/UseDeviceDims';
import { HW_RATIO_PHONE, HW_RATIO_TABLET } from '@/config/variables';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import useObserver from '@/hooks/UseObserver';
import classNames from 'classnames';
import Image from 'next/image';

function ProjectTrivialnoImages() {
  const { setCurrentView } = React.useContext(CurrentViewContext);
  const wrapperRef = React.useRef(null);
  const [tabletHeight, tabletWidth] = useDeviceDims(
    wrapperRef,
    HW_RATIO_TABLET,
    'landscape'
  );
  const [phoneHeight, phoneWidth] = useDeviceDims(wrapperRef, HW_RATIO_PHONE);
  const { scrollY } = useScroll({ target: wrapperRef });

  useObserver(wrapperRef, () => setCurrentView('trivialno'), { threshold: 0 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!document) return;
    if (!wrapperRef.current) return;

    const viewHeight = document.documentElement.clientHeight;
    const container = wrapperRef.current as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const delta = viewHeight * 1.5 - rect.top;
    const [image1, image2, image3, image4] =
      container.children as unknown as HTMLElement[];

    image1.style.transform = `translateY(-${delta * 0.5}px)`;
    image2.style.transform = `translateY(-${delta * 2.5}px)`;
    image3.style.transform = `translateY(-${delta * 1.25}px)`;
    image4.style.transform = `translateY(-${delta * 1.9}px)`;
  });

  return (
    <div
      ref={wrapperRef}
      className={classNames('relative w-full grid')}
      style={{ height: '25vh' }}
    >
      <Image
        src="/images/trivialno-online-lesson.png"
        alt=""
        height={tabletHeight}
        width={tabletWidth}
        className={classNames('absolute')}
        style={{
          top: -tabletHeight * 0.05 + 'px',
          left: 0,
          zIndex: 1,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/trivialno-select-tutor.png"
        alt=""
        height={phoneHeight * 0.9}
        width={phoneWidth * 0.9}
        className={classNames('absolute')}
        style={{
          top: tabletHeight * 3.5 + 'px',
          right: '1vw',
          zIndex: 2,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/trivialno-study-schedule.png"
        alt=""
        height={phoneHeight * 0.75}
        width={phoneWidth * 0.75}
        className={classNames('absolute')}
        style={{
          top: tabletHeight * 2 + 'px',
          left: '2vw',
          transformOrigin: 'left top',
          zIndex: 3,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/trivialno-sign-up.png"
        alt=""
        height={phoneHeight * 0.7}
        width={phoneWidth * 0.7}
        className={classNames('absolute')}
        style={{
          top: tabletHeight * 3.75 + 'px',
          right: tabletWidth * 0.15 + 'px',
          transformOrigin: 'right top',
          zIndex: 4,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
    </div>
  );
}

export default ProjectTrivialnoImages;
