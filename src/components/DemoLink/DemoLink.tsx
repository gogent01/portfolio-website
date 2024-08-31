import * as React from 'react';
import classNames from 'classnames';
import { NewTabIcon } from '@/assets/icons';
import LinkButton from '@/components/LinkButton';

function DemoLink({ href }: { href?: string }) {
  if (!href) return;

  return (
    <LinkButton type="tertiary" href={href} target="_blank">
      Live preview
      <NewTabIcon className={classNames('h-4 w-4', 'md:h-5 md:w-5')} />
    </LinkButton>
  );
}

export default DemoLink;
