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
