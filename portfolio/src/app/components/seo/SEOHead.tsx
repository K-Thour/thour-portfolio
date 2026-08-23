import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useLocation } from 'react-router';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'profile' | 'article';
  canonicalUrl?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  jsonLd,
}) => {
  const { userData, loading } = useUser();
  const location = useLocation();

  const siteOrigin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://karanveerthour.com';
  const currentPath = location.pathname;
  const canonical =
    canonicalUrl || `${siteOrigin}${currentPath === '/' ? '' : currentPath}`;

  const userName = userData?.name || 'Karanveer Thour';
  const userRole = 'Senior Full Stack Developer & AI Engineer';

  // Format dynamic document title
  const computedTitle =
    title ||
    (loading
      ? 'Loading...'
      : currentPath === '/'
        ? `${userName} - ${userRole} | Portfolio`
        : `${userName} Portfolio`);

  const computedDescription =
    description ||
    `Official portfolio of ${userName}, ${userRole}. Explore featured projects, engineering services, tech stack, and interactive AI assistant.`;

  const computedKeywords =
    keywords ||
    `${userName}, Full Stack Developer, React, Node.js, TypeScript, Next.js, Cloud Architecture, AI Engineer, Web Portfolio`;

  const computedImage =
    ogImage || userData?.image || `${siteOrigin}/favicon.png`;

  useEffect(() => {
    // 1. Update Title
    if (computedTitle) {
      document.title = computedTitle;
    }

    // Helper to update or create meta tags
    const setMetaTag = (
      selector: string,
      attrName: string,
      attrValue: string,
      content: string,
    ) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper for link tags (e.g. canonical)
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Primary Meta Tags
    setMetaTag(
      'meta[name="description"]',
      'name',
      'description',
      computedDescription,
    );
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', computedKeywords);
    setMetaTag('meta[name="author"]', 'name', 'author', userName);
    setMetaTag(
      'meta[name="robots"]',
      'name',
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
    setLinkTag('canonical', canonical);

    // 3. Open Graph Tags
    setMetaTag(
      'meta[property="og:title"]',
      'property',
      'og:title',
      computedTitle,
    );
    setMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      computedDescription,
    );
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMetaTag(
      'meta[property="og:image"]',
      'property',
      'og:image',
      computedImage,
    );
    setMetaTag(
      'meta[property="og:site_name"]',
      'property',
      'og:site_name',
      `${userName} Portfolio`,
    );

    // 4. Twitter Card Tags
    setMetaTag(
      'meta[name="twitter:card"]',
      'name',
      'twitter:card',
      'summary_large_image',
    );
    setMetaTag(
      'meta[name="twitter:title"]',
      'name',
      'twitter:title',
      computedTitle,
    );
    setMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      computedDescription,
    );
    setMetaTag(
      'meta[name="twitter:image"]',
      'name',
      'twitter:image',
      computedImage,
    );

    // 5. JSON-LD Structured Data Schema (Person, WebSite, Breadcrumbs)
    const sameAsList = [
      userData?.GitHubURL,
      userData?.LinkedInURL,
      userData?.InstagramURL,
    ].filter(Boolean) as string[];

    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: userName,
      jobTitle: userRole,
      url: siteOrigin,
      image: computedImage,
      email: userData?.email || 'karan@thour.com',
      description: computedDescription,
      sameAs: sameAsList.length > 0 ? sameAsList : undefined,
      knowsAbout: [
        'React',
        'TypeScript',
        'Node.js',
        'Express',
        'MongoDB',
        'PostgreSQL',
        'Cloud Architecture',
        'REST APIs',
        'Artificial Intelligence',
        'Next.js',
      ],
    };

    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${userName} Portfolio`,
      url: siteOrigin,
      description: computedDescription,
      author: {
        '@type': 'Person',
        name: userName,
      },
    };

    const schemasToInject = jsonLd
      ? Array.isArray(jsonLd)
        ? jsonLd
        : [jsonLd]
      : [personSchema, websiteSchema];

    const jsonLdId = 'seo-structured-data-script';
    let scriptTag = document.getElementById(
      jsonLdId,
    ) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(
      schemasToInject.length === 1 ? schemasToInject[0] : schemasToInject,
    );
  }, [
    computedTitle,
    computedDescription,
    computedKeywords,
    computedImage,
    canonical,
    ogType,
    userName,
    userRole,
    userData,
    jsonLd,
  ]);

  return null;
};
