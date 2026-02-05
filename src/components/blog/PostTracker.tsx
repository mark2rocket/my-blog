'use client';

import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useReadingTime } from '@/hooks/useReadingTime';

interface PostTrackerProps {
  slug: string;
}

export function PostTracker({ slug }: PostTrackerProps) {
  useScrollTracking(slug);
  useReadingTime(slug);

  return null; // Invisible tracking component
}
