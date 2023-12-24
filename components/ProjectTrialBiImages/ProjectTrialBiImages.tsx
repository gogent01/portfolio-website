import * as React from 'react';
import { CurrentViewContext } from '@/components/CurrentViewProvider';
import useDeviceDims from '@/hooks/UseDeviceDims';
import { HW_RATIO_TABLET } from '@/config/variables';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import useObserver from '@/hooks/UseObserver';
import classNames from 'classnames';
import Image from 'next/image';

function ProjectTrialBiImages() {
  const { setCurrentView } = React.useContext(CurrentViewContext);
  const wrapperRef = React.useRef(null);
  const [height, width] = useDeviceDims(
    wrapperRef,
    HW_RATIO_TABLET,
    'landscape'
  );

  const { scrollY } = useScroll({ target: wrapperRef });

  useObserver(wrapperRef, () => setCurrentView('trialBi'), { threshold: 0 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!wrapperRef.current) return;

    const viewHeight = document.documentElement.clientHeight;
    const container = wrapperRef.current as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const delta = viewHeight * 1.5 - rect.top;
    const [image1, image2] = container.children as unknown as HTMLElement[];
    // console.log({ latest, top: rect.top, delta });
    image1.style.transform = `translateY(-${delta * 1.25}px)`;
    image2.style.transform = `translateY(-${delta * 0.5}px)`;
  });

  return (
    <div
      ref={wrapperRef}
      className={classNames('relative w-full grid')}
      style={{ height: '25vh' }}
    >
      <Image
        src="/images/trial-bi-main-h.png"
        alt=""
        height={height}
        width={width}
        className={classNames('absolute')}
        style={{
          top: '40vh',
          left: 0,
          zIndex: 1,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
      <Image
        src="/images/trial-bi-query-v.png"
        alt=""
        height={width * 0.9}
        width={height * 0.9}
        className={classNames('absolute')}
        style={{
          top: height * 0.3 + 'px',
          right: '1vw',
          zIndex: 2,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      ></Image>
    </div>
  );
}

export default ProjectTrialBiImages;
