import { CardProgressRange } from '@/types';

type ProgressIconSquaresProps = {
  progress: CardProgressRange;
};

export default function ProgressIconDots(props: ProgressIconSquaresProps) {
  const { progress } = props;

  return (
    <svg
      viewBox="0 0 32 24"
      height="16"
      width="12"
      className="inline text-zinc-900 opacity-50 dark:text-zinc-300/90"
    >
      <g
        style={{
          transition:
            progress < 4
              ? 'opacity 0.3s ease-out 1s'
              : 'opacity 0.3s ease-out 0.3s',
        }}
        className={progress < 4 ? 'opacity-100' : 'opacity-0'}
      >
        <circle
          cx="4"
          cy="20"
          r="4"
          fill="currentColor"
          style={{ transition: 'opacity 0.3s ease-out 0.3s' }}
          className={progress >= 1 ? 'opacity-100' : 'opacity-0'}
        />
        <circle
          cx="15"
          cy="4"
          r="4"
          fill="currentColor"
          style={{ transition: 'opacity 0.3s ease-out 0.3s' }}
          className={progress >= 2 ? 'opacity-100' : 'opacity-0'}
        />
        <circle
          cx="26"
          cy="20"
          r="4"
          fill="currentColor"
          style={{ transition: 'opacity 0.3s ease-out 0.3s' }}
          className={progress >= 3 ? 'opacity-100' : 'opacity-0'}
        />
      </g>

      <path
        d="M 4 12 L 14 20 L 28 4"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition:
            progress === 4
              ? 'opacity 0.3s ease-out 1s'
              : 'opacity 0.3s ease-out 0.3s',
        }}
        className={progress === 4 ? 'opacity-100' : 'opacity-0'}
      />
    </svg>
  );
}
