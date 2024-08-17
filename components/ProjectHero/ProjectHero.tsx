import * as React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

type ProjectHeroProps = {
  title: string;
  description: string;
  className?: string;
};

function ProjectHero({ title, description, className }: ProjectHeroProps) {
  return (
    <header className={classNames('pb-20', className)}>
      <Link href="/" className="underline hover:no-underline">
        {'<'} Back to Projects
      </Link>
      <h1
        className={classNames('text-gray-900 font-semibold', 'mt-20 text-5xl')}
      >
        {title}
      </h1>
    </header>
  );
}

export default ProjectHero;
