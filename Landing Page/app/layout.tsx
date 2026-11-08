import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { ToastContainer } from '@/components/ui/Toast';
import { DynamicFavicon } from '@/components/ui/DynamicFavicon';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { Navigation } from '@/components/navigation/Navigation';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Karanveer Thour | Senior Full-Stack Engineer & Cloud Architect',
  description:
    'Official portfolio of Karanveer Thour. High-performance Next.js developer portfolio showcasing scalable web applications, distributed backend systems, and fluid Apple-grade user interfaces.',
  keywords: [
    'Karanveer Thour',
    'Karan Thour',
    'Full Stack Engineer',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'TypeScript',
    'Cloud Architect',
    'Software Engineer Portfolio',
    'AI Engineer',
  ],
  authors: [{ name: 'Karanveer Thour', url: 'https://karanveerthour.com' }],
  metadataBase: new URL('https://karanveerthour.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Karanveer Thour | Senior Full-Stack Engineer & Cloud Architect',
    description:
      'Official portfolio of Karanveer Thour. High-performance Next.js developer portfolio showcasing scalable web applications, distributed backend systems, and fluid Apple-grade user interfaces.',
    type: 'website',
    locale: 'en_US',
    url: 'https://karanveerthour.com',
    siteName: 'Karanveer Thour Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karanveer Thour | Senior Full-Stack Engineer & Cloud Architect',
    description:
      'Official portfolio of Karanveer Thour. High-performance Next.js developer portfolio showcasing scalable web applications, distributed backend systems, and fluid Apple-grade user interfaces.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const themeInitScript = `
  (function() {
    try {
      var stored = localStorage.getItem('portfolio-theme') || localStorage.getItem('theme');
      var theme = (stored === 'avengers' || stored === 'dark')
        ? 'avengers'
        : (stored === 'godofwar' || stored === 'norse' || stored === 'light')
        ? 'godofwar'
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'avengers' : 'godofwar');
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'avengers') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    } catch (e) {}
  })();
`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://karanveerthour.com/#person',
      name: 'Karanveer Thour',
      alternateName: 'Karan Thour',
      jobTitle: 'Senior Full-Stack Engineer & Cloud Architect',
      url: 'https://karanveerthour.com',
      image: 'https://karanveerthour.com/favicon.png',
      sameAs: [
        'https://github.com/karanveerthour',
        'https://linkedin.com/in/karanveerthour',
      ],
      knowsAbout: [
        'Next.js App Router',
        'React',
        'TypeScript',
        'Node.js',
        'Distributed Systems',
        'Cloud Architecture',
        'Three.js 3D Graphics',
        'MongoDB',
        'PostgreSQL',
      ],
      description:
        'Senior Full-Stack Engineer specializing in high-throughput distributed backends, Next.js SSR Architectures, and Apple-grade fluid user interfaces.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://karanveerthour.com/#website',
      url: 'https://karanveerthour.com',
      name: 'Karanveer Thour Portfolio',
      publisher: { '@id': 'https://karanveerthour.com/#person' },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="avengers" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            <DynamicFavicon />
            <div className="relative min-h-screen flex flex-col overflow-x-hidden pt-16">
              <CursorGlow />
              <Navigation />
              {children}
              <ToastContainer />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
