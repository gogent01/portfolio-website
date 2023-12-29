import * as React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

function HeroIcon({
  Icon,
  link,
  text,
  delay,
  ...delegated
}: {
  Icon: React.ComponentType<{ className: string; style: React.CSSProperties }>;
  link: string;
  text: string;
  delay: number;
} & React.ComponentProps<'a'>) {
  const ease = [0.33, 1, 0.68, 1];

  return (
    <motion.a
      href={link}
      target="_blank"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4, ease, delay }}
      className={classNames(delegated.className)}
    >
      <Icon
        className={classNames(
          'text-gray-900 transition-transform ease-in-out duration-500 hover:rotate-6 hover:translate-x-1 hover:-translate-y-2 hover:translate-z-0',
          'h-16 w-16',
          'lg:h-auto lg:w-full'
        )}
        style={{ maxWidth: '6rem' }}
      />
      <span className="sr-only">{text}</span>
    </motion.a>
  );
}

export default HeroIcon;
