import clsx from 'clsx';
import { Link } from './link';

type TextProps = {
  as?: 'p' | 'div';
} & React.ComponentPropsWithoutRef<'p' | 'div'>;

export function Text(props: TextProps) {
  const { as: Element = 'p', className, ...delegated } = props;

  return (
    <Element
      data-slot="text"
      {...delegated}
      className={clsx(
        className,
        'text-base text-zinc-900 dark:text-zinc-300/90 md:text-lg'
      )}
    />
  );
}

export function TextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        'text-zinc-950 underline decoration-zinc-950/50 data-[hover]:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-[hover]:decoration-white'
      )}
    />
  );
}

export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'strong'>) {
  return (
    <strong
      {...props}
      className={clsx(className, 'font-medium text-zinc-950 dark:text-white')}
    />
  );
}

export function Code({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        'rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white'
      )}
    />
  );
}
