import { useContext, useRef } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';

import { HW_RATIO_PHONE, HW_RATIO_TABLET } from '@/config/variables';
import useObserver from '@/hooks/UseObserver';
import useDeviceDims from '@/hooks/UseDeviceDims';
import { CurrentViewContext } from '@/components/landing/CurrentViewProvider';

function ProjectTrivialnoImages() {
  const { setCurrentView } = useContext(CurrentViewContext);
  const wrapperRef = useRef(null);
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

    image1.style.transform = `translateY(-${delta * 1.75}px)`;
    image2.style.transform = `translateY(-${delta * 2.625}px)`;
    image3.style.transform = `translateY(-${delta * 1.65}px)`;
    image4.style.transform = `translateY(-${delta * 1.25}px)`;
  });

  return (
    <div
      ref={wrapperRef}
      className={classNames('relative w-full grid')}
      style={{ height: '25vh' }}
    >
      <Image
        src="/images/trivialno-online-lesson.png"
        alt="Live online lesson screen, tablet view"
        height={tabletHeight}
        width={tabletWidth}
        priority={true}
        style={{
          position: 'absolute',
          top: tabletHeight * 1.5 + 'px',
          left: 0,
          zIndex: 1,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
      <Image
        src="/images/trivialno-select-tutor.png"
        alt="Tutor selection screen, smartphone view"
        height={phoneHeight * 0.85}
        width={phoneWidth * 0.85}
        priority={true}
        style={{
          position: 'absolute',
          top: tabletHeight * 3.625 + 'px',
          right: '1vw',
          zIndex: 4,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
      <Image
        src="/images/trivialno-study-schedule.png"
        alt="Study scheduler screen, smartphone view"
        height={phoneHeight * 0.75}
        width={phoneWidth * 0.75}
        priority={true}
        style={{
          position: 'absolute',
          top: tabletHeight * 2.8 + 'px',
          left: '2vw',
          transformOrigin: 'left top',
          zIndex: 3,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
      <Image
        src="/images/trivialno-sign-up.png"
        alt="Login screen, smartphone view"
        height={phoneHeight * 0.7}
        width={phoneWidth * 0.7}
        priority={true}
        style={{
          position: 'absolute',
          top: tabletHeight * 2.625 + 'px',
          right: tabletWidth * 0.1 + 'px',
          transformOrigin: 'right top',
          zIndex: 2,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
    </div>
  );
}

export default ProjectTrivialnoImages;
