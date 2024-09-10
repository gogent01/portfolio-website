import classNames from 'classnames';
import { GithubIcon } from '@/assets/icons';
import LinkButton from '@/components/landing/LinkButton';

function GithubLink({ href }: { href?: string }) {
  if (!href) return;

  return (
    <LinkButton type="tertiary" href={href} target="_blank">
      Github
      <GithubIcon className={classNames('h-5 w-5', 'md:h-6 md:w-6')} />
    </LinkButton>
  );
}

export default GithubLink;
