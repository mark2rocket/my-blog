'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function MixpanelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInitialized = useRef(false);

  useEffect(() => {
    // Defer initialization to after hydration and idle time
    const initAnalytics = async () => {
      if (isInitialized.current) return;

      // Wait for idle callback to not block main thread
      if ('requestIdleCallback' in window) {
        requestIdleCallback(async () => {
          const { initMixpanel } = await import('@/lib/mixpanel');
          initMixpanel();
          isInitialized.current = true;
        }, { timeout: 2000 });
      } else {
        // Fallback for Safari
        setTimeout(async () => {
          const { initMixpanel } = await import('@/lib/mixpanel');
          initMixpanel();
          isInitialized.current = true;
        }, 1000);
      }
    };

    initAnalytics();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!isInitialized.current) return;

    const trackPage = async () => {
      const { trackPageView } = await import('@/lib/mixpanel');
      trackPageView(pathname);
    };

    // Delay to ensure Mixpanel is ready
    const timer = setTimeout(trackPage, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
