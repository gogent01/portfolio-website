import GridContainer from '@/components/landing/GridContainer';
import LinkButton from '@/components/landing/LinkButton';
import classNames from 'classnames';

export default function NotFound() {
  return (
    <GridContainer
      className="pt-8 pb-24 items-center"
      style={{ minHeight: '100svh' }}
    >
      <div
        className={classNames(
          '',
          'col-start-1 col-span-4',
          'md:col-start-2 md:col-span-6',
          'lg:col-start-3 lg:col-span-6',
          'xl:col-start-4 xl:col-span-6'
        )}
      >
        <h2 className="text-4xl text-gray-900 font-semibold sm:text-5xl md:text-6xl">
          404
        </h2>
        <p className="text-lg text-gray-900 leading-snug sm:text-xl md:text-2xl">
          The page you requested does not exist
        </p>
        <div className="mt-6 flex flex-wrap gap-3 items-baseline sm:mt-8">
          <LinkButton
            type="primary"
            href="/"
            className="flex-grow justify-center sm:flex-grow-0"
          >
            Go to Homepage
          </LinkButton>
          <p className="hidden text-base text-gray-900 font-semibold sm:block lg:text-lg xl:text-xl">
            or
          </p>
          <LinkButton
            type="secondary"
            href="/blog"
            className="flex-grow justify-center sm:flex-grow-0"
          >
            Read the Blog
          </LinkButton>
        </div>
      </div>
    </GridContainer>
  );
}
