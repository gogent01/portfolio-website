export function debounce(
  fn: (...args: any[]) => any,
  delay: number
): (...args: Parameters<typeof fn>) => ReturnType<typeof fn> {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<typeof fn>): ReturnType<typeof fn> {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function kebabToTitleCase(str: string): string {
  const particles = new Set([
    'a',
    'an',
    'and',
    'as',
    'at',
    'but',
    'by',
    'for',
    'if',
    'in',
    'nor',
    'of',
    'on',
    'or',
    'so',
    'the',
    'to',
    'up',
    'yet',
    'with',
    'about',
    'after',
    'along',
    'among',
    'around',
    'because',
    'before',
    'behind',
    'below',
    'beneath',
    'beside',
    'besides',
    'between',
    'beyond',
    'despite',
    'during',
    'except',
    'from',
    'inside',
    'into',
    'near',
    'onto',
    'out',
    'outside',
    'over',
    'since',
    'through',
    'under',
    'until',
    'upon',
    'via',
    'without',
    'within',
  ]);

  const words = str.replaceAll('--', ',-').split('-');

  const titleCased = words.map((word, index) => {
    const lowerCaseWord = word.toLowerCase();
    const isFirstWord = index === 0;
    const isParticle = particles.has(lowerCaseWord);

    if (isFirstWord || !isParticle) {
      return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
    }

    return lowerCaseWord;
  });

  return titleCased.join(' ');
}
