import { useContext, useRef } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';

import { HW_RATIO_TABLET } from '@/config/variables';
import { useDeviceDims } from '@/hooks/useDeviceDims';
import { useObserver } from '@/hooks/useObserver';
import { CurrentViewContext } from '@/components/landing/CurrentViewProvider';

function ProjectTrialBiImages() {
  const { setCurrentView } = useContext(CurrentViewContext);
  const wrapperRef = useRef(null);
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

    image1.style.transform = `translateY(-${delta * 1.2}px)`;
    image2.style.transform = `translateY(-${delta * 0.4}px)`;
  });

  return (
    <div
      ref={wrapperRef}
      className={classNames('relative w-full grid')}
      style={{ height: '25vh' }}
    >
      <Image
        src="/images/trial-bi-main-h.png"
        alt="Data screen with filtering, sorting and aggregating tools, tablet view"
        height={height}
        width={width}
        style={{
          position: 'absolute',
          top: '40vh',
          left: 0,
          zIndex: 1,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
      <Image
        src="/images/trial-bi-query-v.png"
        alt="Data query builder screen, tablet view"
        height={width * 0.9}
        width={height * 0.9}
        style={{
          position: 'absolute',
          top: height * 0.3 + 'px',
          right: '1vw',
          zIndex: 2,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
    </div>
  );
}

export default ProjectTrialBiImages;
