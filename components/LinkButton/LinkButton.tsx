import * as React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

function LinkButton({
  type,
  href,
  target,
  children,
}: {
  type: ButtonType;
  href: string;
  target?: string;
  children: React.ReactNode;
}) {
  const styles: Record<ButtonType, string> = {
    primary: classnames(
      'flex items-center bg-gray-800 border border-transparent rounded-md shadow-sm font-semibold text-white transition-colors hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800',
      'gap-1 px-5 py-3 text-base',
      'sm:gap-2 sm:px-5 sm:py-3 sm:text-base',
      'md:gap-2 md:px-5 md:py-2.5 md:text-base',
      'lg:gap-2 lg:px-6 lg:py-3 lg:text-lg',
      'xl:gap-2 xl:px-6 xl:py-3 xl:text-xl'
    ),
    secondary: classnames(
      'flex items-center bg-white border border-gray-700 rounded-md shadow-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700',
      'gap-1 px-5 py-3 text-base',
      'sm:gap-1.5 sm:px-5 sm:py-3 sm:text-base',
      'md:gap-2 md:px-5 md:py-2.5 md:text-base',
      'lg:gap-2 lg:px-5 lg:py-3 lg:text-lg',
      'xl:gap-2 xl:px-6 xl:py-3 xl:text-xl'
    ),
    tertiary: classnames(
      'flex items-center rounded-md text-gray-800 underline transition-colors font-light decoration-1 underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700',
      'gap-1 text-base',
      'sm:gap-1.5 sm:text-base',
      'md:gap-2 md:text-base',
      'lg:gap-2 lg:text-lg',
      'xl:gap-2 xl:text-xl'
    ),
  };

  return (
    <Link href={href} target={target} className={styles[type]}>
      {children}
    </Link>
  );
}

export default LinkButton;
