'use client';

import { ReactNode, useEffect } from 'react';

export default function BodyBackground(props: { children: ReactNode }) {
  const { children } = props;

  useEffect(() => {
    const body = document.querySelector('body');
    body!.classList.add(
      'bg-white',
      'dark:bg-zinc-900',
      'lg:bg-zinc-100',
      'lg:dark:bg-zinc-950'
    );
  }, []);

  return <>{children}</>;
}
