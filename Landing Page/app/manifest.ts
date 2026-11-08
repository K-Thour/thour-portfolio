import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Karanveer Thour - Senior Full Stack Developer & AI Engineer',
    short_name: 'Karan Thour',
    description: 'Portfolio of Karanveer Thour - Senior Full Stack Developer & AI Engineer specializing in Next.js, React, Node.js, and Cloud Architecture.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#00d4ff',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

