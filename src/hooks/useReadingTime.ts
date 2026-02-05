'use client';

import { useEffect, useRef } from 'react';

export function useReadingTime(postSlug: string) {
  const startTime = useRef<number>(Date.now());
  const isVisible = useRef<boolean>(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible.current = false;
      } else {
        isVisible.current = true;
      }
    };

    const trackReadingTime = async () => {
      if (!isVisible.current) return;

      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);

      const { trackEvent } = await import('@/lib/mixpanel');
      trackEvent('Reading Time', {
        post: postSlug,
        seconds: timeSpent,
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track when user leaves
    const handleBeforeUnload = () => {
      trackReadingTime();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Also track periodically (every 30 seconds)
    const interval = setInterval(trackReadingTime, 30000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(interval);
      trackReadingTime(); // Track on unmount
    };
  }, [postSlug]);
}
