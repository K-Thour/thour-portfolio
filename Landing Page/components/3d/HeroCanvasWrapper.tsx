'use client';

import dynamic from 'next/dynamic';

const InteractiveHeroCanvas = dynamic(
  () => import('./InteractiveHeroCanvas'),
  { ssr: false }
);

export function HeroCanvasWrapper() {
  return <InteractiveHeroCanvas />;
}

export default HeroCanvasWrapper;

