import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

let isInitialized = false;

export const initMixpanel = (): void => {
  if (isInitialized || typeof window === 'undefined') return;
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token not configured');
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: !IS_PRODUCTION,
    track_pageview: false, // We'll handle this manually
    persistence: 'localStorage',
    ignore_dnt: false,
  });

  isInitialized = true;
};

export const trackEvent = (event: string, properties?: Record<string, unknown>): void => {
  if (!isInitialized) return;
  mixpanel.track(event, properties);
};

export const trackPageView = (pageName: string, properties?: Record<string, unknown>): void => {
  trackEvent('Page View', { page: pageName, ...properties });
};

export const identify = (userId: string): void => {
  if (!isInitialized) return;
  mixpanel.identify(userId);
};

export { mixpanel };
