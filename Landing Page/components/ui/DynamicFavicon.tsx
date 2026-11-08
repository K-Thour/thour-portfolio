'use client';

import { useEffect } from 'react';
import { updateFavicon, createCircularAvatarFavicon } from '@/utils/favicon';
import { userService } from '@/services/userService';

interface DynamicFaviconProps {
  avatarUrl?: string;
}

/**
 * Sets dynamic circular avatar favicon from backend public user profile image
 */
export function DynamicFavicon({ avatarUrl }: DynamicFaviconProps) {
  useEffect(() => {
    let active = true;

    async function syncFavicon() {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'avengers' ||
        document.documentElement.classList.contains('dark');

      let targetUrl = avatarUrl;

      if (!targetUrl) {
        try {
          const user = await userService.getPublicUser();
          if (user?.image) {
            targetUrl = typeof user.image === 'string' ? user.image : user.image.url;
          }
        } catch {
          // Gracefully keep current/fallback favicon
        }
      }

      if (targetUrl) {
        try {
          const faviconDataUrl = await createCircularAvatarFavicon(targetUrl, isDark);
          if (active) {
            updateFavicon(faviconDataUrl);
          }
        } catch {
          // fallback
        }
      }
    }

    syncFavicon();

    // Listen to theme changes to re-accent favicon
    const observer = new MutationObserver(() => {
      syncFavicon();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [avatarUrl]);

  return null;
}

export default DynamicFavicon;

