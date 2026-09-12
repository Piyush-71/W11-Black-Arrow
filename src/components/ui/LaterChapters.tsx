'use client';

import dynamic from 'next/dynamic';

// Next requires the dynamic imports to sit in a client boundary for code splitting.
// SSR stays enabled so the full story also works without JavaScript.
const Drivers = dynamic(() => import('@/components/drivers/Drivers').then(m => m.Drivers));
const Season = dynamic(() => import('@/components/season/Season').then(m => m.Season));

export function LaterChapters({ children }: { children: React.ReactNode }) {
  return <><Drivers /><Season />{children}</>;
}
