import * as React from 'react';
import classNames from 'classnames';

function ContactIcon({
  Icon,
  link,
  text,
  ...delegated
}: {
  Icon: React.ComponentType<{ className: string }>;
  link: string;
  text: string;
} & React.ComponentProps<'a'>) {
  return (
    <a
      href={link}
      target="_blank"
      {...delegated}
      className={classNames(
        'block',
        'h-16 w-16',
        'md:h-20 md:w-20',
        'lg:h-24 lg:w-24',
        '2xl:h-28 2xl:w-28',
        delegated.className
      )}
      onMouseEnter={(event: React.MouseEvent) => {
        (event.currentTarget.children[0] as HTMLAnchorElement).style.transform =
          'scale(110%)';
        (event.currentTarget.children[1] as HTMLAnchorElement).style.transform =
          'translateY(15%)';
      }}
      onMouseLeave={(event: React.MouseEvent) => {
        (event.currentTarget.children[0] as HTMLAnchorElement).style.transform =
          'scale(100%)';
        (event.currentTarget.children[1] as HTMLAnchorElement).style.transform =
          'translateY(0)';
      }}
    >
      <Icon
        className={classNames(
          'block h-full w-full text-gray-900 transition-transform ease-in-out duration-500'
        )}
      />
      <span
        className={classNames(
          'block w-full pt-2 text-center cursor-pointer transition-transform ease-in-out duration-700 delay-75',
          'text-lg',
          '2xl:text-xl'
        )}
      >
        {text}
      </span>
    </a>
  );
}

export default ContactIcon;
