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
        'relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 px-4 md:px-8 lg:px-12 xl:px-16 gap-x-4 2xl:gap-x-6',
        delegated.className
      )}
    >
      {children}
    </div>
  );
}

export default React.forwardRef(GridContainer);
