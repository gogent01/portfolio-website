import * as React from 'react';
import classNames from 'classnames';

type GridContainerProps = {
  children: React.ReactNode;
} & React.ComponentProps<'div'>;

function GridContainer(
  { children, ...delegated }: GridContainerProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      {...delegated}
      className={classNames(
        'relative grid gap-x-4 grid-cols-4 px-4',
        'md:grid-cols-8 md:px-8',
        'lg:grid-cols-12  lg:px-12',
        '2xl:gap-x-6 2xl:px-16',
        delegated.className
      )}
    >
      {children}
    </div>
  );
}

export default React.forwardRef(GridContainer);
