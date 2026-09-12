import type Lenis from 'lenis';

let activeScroll: Lenis | null = null;

export function registerScroll(instance: Lenis) {
  activeScroll = instance;
  return () => { if (activeScroll === instance) activeScroll = null; };
}

// Keep explicit chapter/race jumps in sync with any smooth scroll in progress.
export function scrollToPosition(top: number) {
  if (activeScroll) activeScroll.scrollTo(top, { immediate: true, force: true });
  else window.scrollTo({ top, behavior: 'instant' });
}
