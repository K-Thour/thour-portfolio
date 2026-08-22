/**
 * Utility functions for dynamic browser tab favicon management with circular avatar rendering
 * and theme-adaptive animated loading spinners.
 */

export function updateFavicon(href: string) {
  if (typeof document === 'undefined') return;

  const linkSelectors = [
    "link[rel*='icon']",
    "link[rel='shortcut icon']",
    "link[rel='apple-touch-icon']",
  ];

  let links = document.querySelectorAll<HTMLLinkElement>(
    linkSelectors.join(','),
  );

  if (links.length === 0) {
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    document.head.appendChild(newLink);
    links = document.querySelectorAll<HTMLLinkElement>("link[rel='icon']");
  }

  links.forEach((link) => {
    link.href = href;
    if (href.startsWith('data:image/svg+xml')) {
      link.type = 'image/svg+xml';
    } else if (href.startsWith('data:image/png')) {
      link.type = 'image/png';
    }
  });
}

export function getLoadingFaviconSvg(isDark = true): string {
  const primary = isDark ? '#ef4444' : '#2563eb';
  const secondary = isDark ? '#eab308' : '#60a5fa';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="28" fill="none" stroke="${primary}" stroke-width="6" stroke-dasharray="125 50" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="0.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="32" cy="32" r="16" fill="none" stroke="${secondary}" stroke-width="4" stroke-dasharray="55 35" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" from="360 32 32" to="0 32 32" dur="0.55s" repeatCount="indefinite"/>
    </circle>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function createCircularAvatarFavicon(
  imageUrl: string,
  isDark = true,
): Promise<string> {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve('/favicon.png');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      try {
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(imageUrl);
          return;
        }

        const radius = size / 2;
        const borderPadding = 2;
        const clipRadius = radius - borderPadding;

        // Circular clipping
        ctx.beginPath();
        ctx.arc(radius, radius, clipRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // Calculate aspect-ratio cover crop
        const aspect = img.width / img.height;
        let drawWidth = size;
        let drawHeight = size;
        let offsetX = 0;
        let offsetY = 0;

        if (aspect > 1) {
          drawWidth = size * aspect;
          offsetX = -(drawWidth - size) / 2;
        } else {
          drawHeight = size / aspect;
          offsetY = -(drawHeight - size) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // Circular Accent Border
        ctx.beginPath();
        ctx.arc(radius, radius, clipRadius, 0, Math.PI * 2, true);
        ctx.lineWidth = 3;
        ctx.strokeStyle = isDark ? '#ef4444' : '#2563eb';
        ctx.stroke();

        resolve(canvas.toDataURL('image/png'));
      } catch (e) {
        console.warn('Canvas favicon conversion fallback:', e);
        resolve(imageUrl);
      }
    };

    img.onerror = () => {
      resolve('/favicon.png');
    };
  });
}
