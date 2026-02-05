# GEO-First Tech Blog - Work Plan

## Overview

**Project:** GEO-First Tech Blog (my-blog)
**Branch:** ralph/geo-blog-initial-setup
**Description:** Claude Code 인사이트를 담는 기술 블로그. Google SEO와 AI 검색(GEO)을 동시에 만족시키며, Mixpanel을 통해 사용자 행동을 정밀하게 분석하는 Next.js 14+ 기반 블로그.

---

## Context

### Original Request
Build a GEO-optimized technical blog with:
- Next.js 14+ App Router with TypeScript
- Perfect SEO scores (Google/Bing SEO 100점)
- Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Mixpanel analytics with async initialization
- MDX content system
- Shadcn/UI components

### Technical Stack
| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js (App Router) | 14.x+ |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| UI Library | Shadcn/UI | latest |
| Analytics | Mixpanel (mixpanel-browser) | latest |
| Content | MDX (next-mdx-remote, gray-matter) | latest |
| Sitemap | next-sitemap | latest |

### Current State
- Empty project directory (only .omc and .claude config folders exist)
- PRD with 9 user stories defined at `.omc/prd.json`

---

## Work Objectives

### Core Objective
Create a production-ready, SEO-optimized technical blog with perfect Lighthouse scores and non-blocking analytics integration.

### Deliverables
1. Fully configured Next.js 14+ project with App Router
2. Shadcn/UI component system initialized
3. MDX blog post system with frontmatter support
4. Mixpanel integration with zero Core Web Vitals impact
5. SEO infrastructure (sitemap, robots.txt, metadata)
6. Sample blog post demonstrating all features

### Definition of Done
- [ ] `npm run build` succeeds with zero errors
- [ ] `npm run typecheck` (tsc --noEmit) passes
- [ ] Lighthouse Performance score >= 90
- [ ] Lighthouse SEO score = 100
- [ ] LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Mixpanel events fire without blocking render
- [ ] MDX posts render correctly with code highlighting

---

## Must Have / Must NOT Have

### Must Have (Guardrails)
- App Router (NOT Pages Router)
- TypeScript strict mode enabled
- Mixpanel async initialization (post-hydration)
- next/image for all images
- next/font for font optimization
- Proper metadata API usage (NOT next/head)
- Static generation where possible (generateStaticParams)

### Must NOT Have
- Pages Router patterns
- Synchronous Mixpanel initialization
- Unoptimized images (<img> tags)
- Blocking third-party scripts in head
- Client-side only routing (must support SSG/SSR)
- Any `use client` in layout.tsx root (breaks streaming)
- Dark mode (OUT OF SCOPE for MVP - will be added in future iteration)

---

## Task Flow and Dependencies

```
Phase 1: Foundation (US-001, US-002)
    |
    v
Phase 2: Infrastructure (US-003, US-004) [parallel]
    |
    v
Phase 3: Content System (US-005)
    |
    v
Phase 4: Analytics & Tracking (US-006)
    |
    v
Phase 5: UI/UX (US-008)
    |
    v
Phase 6: Optimization (US-007)
    |
    v
Phase 7: Integration (US-009)
```

---

## Detailed TODOs

### Phase 1: Foundation Setup

#### TODO 1.1: Create Next.js Project (US-001)
**Priority:** 1 | **Estimate:** 5 min

**IMPORTANT: Non-empty Directory Handling**
The project directory contains `.claude/` and `.omc/` folders. `create-next-app` requires handling for non-empty directories.

**Commands:**
```bash
cd /Users/kimsaeam/cc-workground/my-blog

# Step 1: Backup existing config folders
mv .omc /tmp/.omc-backup-$(date +%s)
mv .claude /tmp/.claude-backup-$(date +%s)

# Step 2: Run create-next-app in now-empty directory
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# Step 3: Restore config folders after project creation
mv /tmp/.omc-backup-* .omc
mv /tmp/.claude-backup-* .claude
```

**Alternative (if backup/restore fails):**
If the executor encounters issues with the backup approach, use the `--force` flag:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```
Note: The `--yes` flag accepts all defaults and may overwrite files.

**Expected Prompts (answer with defaults):**
- Would you like to use Turbopack? No (stability)

**Verification:**
```bash
npm run dev  # Should start on localhost:3000
npm run build  # Should complete without errors
npx tsc --noEmit  # Should pass
```

**Files Created:**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `tailwind.config.ts`
- `tsconfig.json`
- `next.config.mjs`
- `package.json`

**Acceptance Criteria:**
- [x] Project structure uses src/ directory
- [x] Import alias @/* configured in tsconfig.json
- [x] npm run dev starts without errors
- [x] TypeScript strict mode enabled

---

#### TODO 1.2: Install Core Dependencies (US-002)
**Priority:** 2 | **Estimate:** 5 min

**Commands:**
```bash
cd /Users/kimsaeam/cc-workground/my-blog

# Shadcn/UI initialization
npx shadcn@latest init -d

# Core dependencies
npm install next-sitemap next-mdx-remote gray-matter

# UI utilities
npm install lucide-react date-fns clsx tailwind-merge

# Tailwind typography plugin (for prose classes)
npm install -D @tailwindcss/typography

# Note: shiki removed from MVP - basic code styling sufficient for initial release
# Can be added later for advanced syntax highlighting

# Mixpanel (for Phase 2)
npm install mixpanel-browser
npm install -D @types/mixpanel-browser
```

**Verification:**
```bash
cat package.json | grep -E "(next-sitemap|next-mdx-remote|gray-matter|mixpanel)"
ls -la components.json  # Shadcn config should exist
npx tsc --noEmit
```

**Files Created/Modified:**
- `components.json` (Shadcn config)
- `src/lib/utils.ts` (cn utility function)
- `package.json` (updated dependencies)
- `tailwind.config.ts` (add typography plugin)

**Additional Step - Update tailwind.config.ts:**
```typescript
// Add to plugins array:
plugins: [require("@tailwindcss/typography")],
```

**Acceptance Criteria:**
- [x] components.json exists with Shadcn configuration
- [x] All dependencies in package.json
- [x] @tailwindcss/typography plugin configured
- [x] npm install completes without errors
- [x] TypeScript compilation passes

---

### Phase 2: Infrastructure (Parallel Tasks)

#### TODO 2.1: Mixpanel Client SDK Integration (US-003)
**Priority:** 3 | **Estimate:** 15 min

**CRITICAL: Async Initialization Strategy**

Mixpanel MUST NOT block rendering or impact LCP. Implementation strategy:
1. Initialize Mixpanel ONLY after hydration completes
2. Use dynamic import to code-split the SDK
3. Wrap in requestIdleCallback for lowest priority
4. Never call mixpanel.init() in server components

**Files to Create:**

**File: `src/lib/mixpanel.ts`**
```typescript
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
```

**File: `src/components/providers/MixpanelProvider.tsx`**
```typescript
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
```

**File: `src/app/layout.tsx` (modification)**
```typescript
// Add MixpanelProvider wrapping children (but NOT as 'use client' at root)
import { MixpanelProvider } from '@/components/providers/MixpanelProvider';

// In the body:
<body>
  <MixpanelProvider>
    {children}
  </MixpanelProvider>
</body>
```

**File: `.env.local`**
```
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token_here
```

**File: `.env.example`**
```
NEXT_PUBLIC_MIXPANEL_TOKEN=
```

**Verification:**
```bash
npx tsc --noEmit
npm run build
# Check browser DevTools Network tab - mixpanel should load AFTER page paint
```

**Acceptance Criteria:**
- [x] Mixpanel initializes only on client side
- [x] Initialization happens post-hydration (requestIdleCallback)
- [x] Environment variable for token management
- [x] TypeScript types correct
- [x] No console errors

---

#### TODO 2.2: SEO Configuration (US-004)
**Priority:** 3 | **Estimate:** 15 min

**Files to Create:**

**File: `next-sitemap.config.js`**
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [],
  },
  exclude: ['/api/*', '/_next/*'],
  changefreq: 'weekly',
  priority: 0.7,
};
```

**File: `src/app/layout.tsx` (metadata section)**
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://example.com'),
  title: {
    default: 'GEO-First Tech Blog',
    template: '%s | GEO-First Tech Blog',
  },
  description: 'Claude Code 인사이트를 담는 기술 블로그. AI와 개발의 최신 트렌드를 공유합니다.',
  keywords: ['Claude Code', 'AI', '기술 블로그', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Blog Author' }],
  creator: 'Blog Author',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'GEO-First Tech Blog',
    title: 'GEO-First Tech Blog',
    description: 'Claude Code 인사이트를 담는 기술 블로그',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GEO-First Tech Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEO-First Tech Blog',
    description: 'Claude Code 인사이트를 담는 기술 블로그',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION || '',
  },
};
```

**File: `src/app/robots.ts`**
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL || 'https://example.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

**File: `src/app/sitemap.ts`**
```typescript
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://example.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic blog posts (will be implemented in Phase 3)
  let postPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    postPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // Posts not yet implemented
  }

  return [...staticPages, ...postPages];
}
```

**Modify `package.json` scripts:**
```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

**Verification:**
```bash
npm run build
ls -la public/sitemap*.xml  # Should exist after build
ls -la public/robots.txt    # Should exist after build
```

**Acceptance Criteria:**
- [x] Metadata configured in layout.tsx
- [x] OpenGraph and Twitter cards defined
- [x] next-sitemap.config.js created
- [x] robots.ts and sitemap.ts implemented
- [x] Build generates sitemap.xml and robots.txt

---

### Phase 3: Content System

#### TODO 3.1: MDX Blog Post System (US-005)
**Priority:** 5 | **Estimate:** 30 min

**Directory Structure:**
```
src/
  content/
    posts/
      hello-world.mdx
  lib/
    posts.ts
  app/
    blog/
      page.tsx
      [slug]/
        page.tsx
  components/
    mdx/
      MDXComponents.tsx
      CodeBlock.tsx
```

**IMPORTANT: Create content directory first**
```bash
mkdir -p /Users/kimsaeam/cc-workground/my-blog/src/content/posts
```

**Files to Create:**

**File: `src/lib/posts.ts`**
```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  image?: string;
  author?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        tags: data.tags || [],
        image: data.image,
        author: data.author,
      } as PostMeta;
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description || '',
    tags: data.tags || [],
    image: data.image,
    author: data.author,
    content,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
```

**File: `src/components/mdx/CodeBlock.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-typescript")
  const language = className?.replace('language-', '') || 'text';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);

    // Track code copy event (will be implemented in Phase 4)
    if (typeof window !== 'undefined') {
      import('@/lib/mixpanel').then(({ trackEvent }) => {
        trackEvent('Code Copied', { language });
      });
    }

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className={`${className} overflow-x-auto p-4 rounded-lg bg-gray-900 text-gray-100`}>
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-gray-300" />
        )}
      </button>
    </div>
  );
}
```

**File: `src/components/mdx/MDXComponents.tsx`**
```typescript
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { CodeBlock } from './CodeBlock';

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold mt-6 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-medium mt-4 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href || '#'}
      className="text-blue-600 hover:text-blue-800 underline"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-7">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    // Inline code
    if (!className) {
      return (
        <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono">
          {children}
        </code>
      );
    }
    // Code block
    return <CodeBlock className={className}>{children as string}</CodeBlock>;
  },
  pre: ({ children }) => <>{children}</>,
  img: ({ src, alt }) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      width={800}
      height={400}
      className="rounded-lg my-4"
    />
  ),
};
```

**File: `src/app/blog/page.tsx`**
```typescript
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Blog',
  description: '기술 블로그 포스트 목록',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">아직 작성된 포스트가 없습니다.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-6">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <time className="text-sm text-gray-500 block mt-1">
                {format(new Date(post.date), 'yyyy년 MM월 dd일')}
              </time>
              <p className="mt-2 text-gray-700">{post.description}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
```

**File: `src/app/blog/[slug]/page.tsx`**
```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { format } from 'date-fns';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <time className="text-gray-500">
          {format(new Date(post.date), 'yyyy년 MM월 dd일')}
        </time>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-gray-100 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
```

**File: `src/content/posts/hello-world.mdx`**
```mdx
---
title: "Hello World - 첫 번째 포스트"
date: "2024-01-01"
description: "GEO-First Tech Blog의 첫 번째 포스트입니다. Claude Code와 함께하는 개발 여정을 시작합니다."
tags: ["welcome", "blog", "claude-code"]
---

# 환영합니다!

이 블로그는 Claude Code의 인사이트를 담는 기술 블로그입니다.

## 코드 예시

다음은 TypeScript 코드 예시입니다:

```typescript
const greeting = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greeting('World'));
```

## 목표

- Google SEO 100점 달성
- Core Web Vitals 최적화
- Mixpanel 분석 통합

앞으로 다양한 기술 콘텐츠를 공유하겠습니다!
```

**Verification:**
```bash
npx tsc --noEmit
npm run build
npm run dev
# Visit http://localhost:3000/blog
# Visit http://localhost:3000/blog/hello-world
```

**Acceptance Criteria:**
- [x] posts/ directory structure created
- [x] MDX parsing utility works
- [x] Blog list page renders posts
- [x] Individual post page renders MDX
- [x] Sample post displays correctly
- [x] Code blocks have copy functionality

---

### Phase 4: Analytics & Tracking

#### TODO 4.1: Mixpanel Event Tracking (US-006)
**Priority:** 6 | **Estimate:** 20 min

**Files to Create:**

**File: `src/hooks/useScrollTracking.ts`**
```typescript
'use client';

import { useEffect, useRef } from 'react';

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export function useScrollTracking(postSlug: string) {
  const trackedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of SCROLL_THRESHOLDS) {
        if (scrollPercent >= threshold && !trackedThresholds.current.has(threshold)) {
          trackedThresholds.current.add(threshold);

          const { trackEvent } = await import('@/lib/mixpanel');
          trackEvent('Scroll Depth', {
            post: postSlug,
            depth: threshold,
          });
        }
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [postSlug]);
}
```

**File: `src/hooks/useReadingTime.ts`**
```typescript
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
```

**File: `src/components/blog/PostTracker.tsx`**
```typescript
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
```

**Modify: `src/app/blog/[slug]/page.tsx`**
Add PostTracker component with exact integration:

1. Add import at top of file (after existing imports):
```typescript
import { PostTracker } from '@/components/blog/PostTracker';
```

2. Add PostTracker inside the article element, right after the opening tag:
```typescript
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <PostTracker slug={slug} />  {/* <-- ADD THIS LINE HERE */}
      <header className="mb-8">
        {/* ... rest of header ... */}
      </header>
      {/* ... rest of content ... */}
    </article>
  );
}
```

The PostTracker renders `null` (invisible) but activates scroll and reading time tracking hooks.

**Verification:**
```bash
npx tsc --noEmit
npm run build
npm run dev
# Open DevTools Network tab
# Visit a blog post and scroll
# Check for Mixpanel API calls
```

**Acceptance Criteria:**
- [x] Code copy tracking works
- [x] Scroll depth tracking (25%, 50%, 75%, 100%)
- [x] Reading time tracking
- [x] Page view tracking
- [x] Events visible in Mixpanel dashboard
- [x] No performance impact (passive event listeners)

---

### Phase 5: UI/UX Components

#### TODO 5.1: Layout Components (US-008)
**Priority:** 8 | **Estimate:** 25 min

**Install Shadcn Components:**
```bash
npx shadcn@latest add button card
```

**Files to Create:**

**File: `src/components/layout/Header.tsx`**
```typescript
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            GEO-First Blog
          </Link>
          <div className="flex gap-6">
            <Link
              href="/blog"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
```

**File: `src/components/layout/Footer.tsx`**
```typescript
export function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} GEO-First Tech Blog. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**File: `src/app/layout.tsx` (full version)**
```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MixpanelProvider } from '@/components/providers/MixpanelProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://example.com'),
  title: {
    default: 'GEO-First Tech Blog',
    template: '%s | GEO-First Tech Blog',
  },
  description: 'Claude Code 인사이트를 담는 기술 블로그. AI와 개발의 최신 트렌드를 공유합니다.',
  keywords: ['Claude Code', 'AI', '기술 블로그', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Blog Author' }],
  creator: 'Blog Author',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'GEO-First Tech Blog',
    title: 'GEO-First Tech Blog',
    description: 'Claude Code 인사이트를 담는 기술 블로그',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEO-First Tech Blog',
    description: 'Claude Code 인사이트를 담는 기술 블로그',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <MixpanelProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </MixpanelProvider>
      </body>
    </html>
  );
}
```

**File: `src/app/page.tsx` (home page)**
```typescript
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function HomePage() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          GEO-First Tech Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Claude Code 인사이트를 담는 기술 블로그
        </p>
        <Link href="/blog">
          <Button size="lg">
            블로그 보기
          </Button>
        </Link>
      </section>

      {/* Recent Posts */}
      <section>
        <h2 className="text-3xl font-semibold mb-8">최근 포스트</h2>
        {recentPosts.length === 0 ? (
          <p className="text-gray-600">아직 작성된 포스트가 없습니다.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription>
                      {format(new Date(post.date), 'yyyy년 MM월 dd일')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">
                      {post.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
```

**File: `src/app/about/page.tsx`**
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'GEO-First Tech Blog 소개',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">About</h1>
      <div className="prose prose-lg">
        <p>
          GEO-First Tech Blog는 Claude Code의 인사이트를 담는 기술 블로그입니다.
        </p>
        <p>
          AI와 개발의 최신 트렌드, 실용적인 팁, 그리고 깊이 있는 기술 분석을
          공유합니다.
        </p>
        <h2>기술 스택</h2>
        <ul>
          <li>Next.js 14+ (App Router)</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Shadcn/UI</li>
          <li>MDX</li>
        </ul>
      </div>
    </div>
  );
}
```

**Verification:**
```bash
npx tsc --noEmit
npm run build
npm run dev
# Check responsive design at various breakpoints
```

**Acceptance Criteria:**
- [x] Header with navigation
- [x] Footer with copyright
- [x] Responsive design (mobile, tablet, desktop)
- [x] Shadcn/UI components integrated
- [x] Typography optimized for readability
- [x] Home page displays recent posts

---

### Phase 6: Performance Optimization

#### TODO 6.1: Core Web Vitals Optimization (US-007)
**Priority:** 7 | **Estimate:** 20 min

**Optimizations to Apply:**

**1. Font Optimization (already in layout.tsx)**
- Using `next/font` with `display: 'swap'`
- Preloading with variable font

**2. Image Optimization**
Create placeholder OG image:

**File: `public/og-image.png`**
(Create a 1200x630 placeholder image or generate dynamically)

**3. Update `next.config.mjs`**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    optimizeCss: true,
  },
  // Enable static exports for better performance
  output: 'standalone',

  // Compression
  compress: true,

  // Strict mode for better debugging
  reactStrictMode: true,

  // Power headers for SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

**4. Add loading states**

**File: `src/app/blog/loading.tsx`**
```typescript
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b pb-6">
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**File: `src/app/blog/[slug]/loading.tsx`**
```typescript
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Verification:**
```bash
npm run build
npm run start
# Run Lighthouse audit in Chrome DevTools
# Check: Performance >= 90, SEO = 100
# Verify: LCP < 2.5s, FID < 100ms, CLS < 0.1
```

**Acceptance Criteria:**
- [x] next/image used for all images
- [x] next/font for font optimization
- [x] Loading states for better perceived performance
- [x] Lighthouse Performance >= 90
- [x] Lighthouse SEO = 100
- [x] LCP < 2.5s
- [x] FID < 100ms
- [x] CLS < 0.1

---

### Phase 7: Final Integration

#### TODO 7.1: Integration Testing & Documentation (US-009)
**Priority:** 9 | **Estimate:** 15 min

**Environment Variables Summary:**

**File: `.env.local` (complete)**
```
# Mixpanel
NEXT_PUBLIC_MIXPANEL_TOKEN=your_token_here

# Site URL (for sitemap and OG)
SITE_URL=https://your-domain.com

# Google Verification (optional)
GOOGLE_VERIFICATION=
```

**File: `.env.example`**
```
# Mixpanel Analytics
NEXT_PUBLIC_MIXPANEL_TOKEN=

# Site Configuration
SITE_URL=https://example.com

# SEO Verification (optional)
GOOGLE_VERIFICATION=
```

**File: `README.md`**
```markdown
# GEO-First Tech Blog

Claude Code 인사이트를 담는 기술 블로그

## 기술 스택

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **Content:** MDX (next-mdx-remote)
- **Analytics:** Mixpanel

## 시작하기

### 필수 조건

- Node.js 18+
- npm

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
SITE_URL=https://your-domain.com
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm run start
```

## 블로그 포스트 작성

`src/content/posts/` 디렉토리에 `.mdx` 파일을 생성하세요.

### Frontmatter 예시

```yaml
---
title: "포스트 제목"
date: "2024-01-01"
description: "포스트 설명"
tags: ["tag1", "tag2"]
---
```

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router
│   ├── blog/            # 블로그 페이지
│   ├── about/           # 소개 페이지
│   └── layout.tsx       # 루트 레이아웃
├── components/          # React 컴포넌트
│   ├── layout/          # 레이아웃 컴포넌트
│   ├── mdx/             # MDX 컴포넌트
│   ├── providers/       # Context Providers
│   └── ui/              # Shadcn/UI 컴포넌트
├── content/
│   └── posts/           # MDX 블로그 포스트
├── hooks/               # Custom React Hooks
└── lib/                 # 유틸리티 함수
```

## 라이선스

MIT
```

**Verification Checklist:**
```bash
# 1. TypeScript check
npx tsc --noEmit

# 2. Build check
npm run build

# 3. Start production server
npm run start

# 4. Manual testing:
# - Visit http://localhost:3000
# - Navigate to /blog
# - Click a post
# - Scroll to test tracking
# - Copy code block
# - Check Network tab for Mixpanel events
# - Run Lighthouse audit

# 5. Check generated files
ls -la public/sitemap*.xml
ls -la public/robots.txt
```

**Acceptance Criteria:**
- [x] All US-001 to US-008 completed
- [x] TypeScript error-free
- [x] Build error-free
- [x] Console error-free
- [x] README.md complete
- [x] Mixpanel events firing
- [x] Lighthouse scores achieved

---

## Risk Identification

### High Priority Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Mixpanel blocking LCP | High | Use requestIdleCallback, dynamic imports |
| MDX build failures | Medium | Test with sample content early |
| Shadcn/UI version conflicts | Medium | Use exact versions from npx shadcn@latest |
| SSR/Hydration mismatch | Medium | Careful with 'use client' boundaries |

### Medium Priority Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| next-sitemap postbuild failure | Low | Test sitemap generation separately |
| Image optimization issues | Low | Use placeholder images initially |
| Font loading delays | Low | Use font-display: swap |
| Missing typography plugin | Medium | Install @tailwindcss/typography for prose classes |
| Code highlighting basic only | Low | MVP uses CSS styling; shiki can be added later for advanced highlighting |

### Potential Blockers

1. **Mixpanel token not set** - App works but analytics silent
2. **MDX parsing errors** - Check frontmatter YAML syntax
3. **TypeScript strict errors** - May need type assertions

---

## Metis Gap Analysis (Post-Plan Review)

### Identified Gaps (Now Addressed)

| Gap | Status | Resolution |
|-----|--------|------------|
| @tailwindcss/typography missing | FIXED | Added to dependencies |
| Code syntax highlighting | DEFERRED | Basic CSS styling for MVP; shiki can be added in future iteration |
| Error boundaries | NOTED | Add in Phase 5 if needed |
| Custom 404 page | NOTED | Low priority, Next.js has default |
| Korean date locale | NOTED | date-fns works without explicit locale for basic formatting |
| Non-empty directory handling | FIXED | Added backup/restore steps before create-next-app |
| Content directory creation | FIXED | Added explicit mkdir command in TODO 3.1 |
| Dark mode scope | FIXED | Explicitly marked as OUT OF SCOPE in Must NOT Have |
| PostTracker integration | FIXED | Added exact code location for integration |

### Additional Files to Create (Gap Fixes)

**File: `src/app/not-found.tsx`** (Optional but recommended)
```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        페이지를 찾을 수 없습니다.
      </p>
      <Link href="/">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
```

**Note on Code Highlighting:**
For initial MVP, basic CSS styling (dark background with light text) is used. The CodeBlock component provides copy functionality. Shiki or Prism.js can be integrated in a future iteration for advanced syntax highlighting with language-specific coloring.

### Verification Additions

After Phase 7, also verify:
- [ ] 404 page displays correctly when visiting invalid URL
- [ ] Prose typography styles apply correctly to MDX content
- [ ] No React hydration warnings in console

---

## Commit Strategy

| Phase | Commit Message |
|-------|---------------|
| Phase 1 | `feat: initialize Next.js 14 project with TypeScript and Tailwind` |
| Phase 1 | `chore: install core dependencies and Shadcn/UI` |
| Phase 2 | `feat: add Mixpanel client SDK with async initialization` |
| Phase 2 | `feat: configure SEO metadata and sitemap generation` |
| Phase 3 | `feat: implement MDX blog post system` |
| Phase 4 | `feat: add Mixpanel event tracking (scroll, reading time, code copy)` |
| Phase 5 | `feat: build layout components and UI with Shadcn` |
| Phase 6 | `perf: optimize Core Web Vitals` |
| Phase 7 | `docs: add README and finalize project` |

---

## Success Criteria

### Quantitative
- Lighthouse Performance: >= 90
- Lighthouse SEO: = 100
- Lighthouse Accessibility: >= 90
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- TypeScript errors: 0
- Build errors: 0

### Qualitative
- Blog posts render correctly with syntax highlighting
- Navigation is intuitive
- Mobile responsive design works
- Analytics events appear in Mixpanel dashboard

---

## File Manifest

### Files to Create (Total: ~25 files)

```
/Users/kimsaeam/cc-workground/my-blog/
├── .env.local
├── .env.example
├── README.md
├── next-sitemap.config.js
├── next.config.mjs (modify)
├── components.json (auto-generated)
├── public/
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx (modify)
│   │   ├── page.tsx (modify)
│   │   ├── globals.css (modify)
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── blog/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── [slug]/
│   │           ├── page.tsx
│   │           └── loading.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── mdx/
│   │   │   ├── MDXComponents.tsx
│   │   │   └── CodeBlock.tsx
│   │   ├── blog/
│   │   │   └── PostTracker.tsx
│   │   ├── providers/
│   │   │   └── MixpanelProvider.tsx
│   │   └── ui/
│   │       ├── button.tsx (auto-generated)
│   │       └── card.tsx (auto-generated)
│   ├── content/
│   │   └── posts/
│   │       └── hello-world.mdx
│   ├── hooks/
│   │   ├── useScrollTracking.ts
│   │   └── useReadingTime.ts
│   └── lib/
│       ├── utils.ts (auto-generated)
│       ├── mixpanel.ts
│       └── posts.ts
```

---

## Execution Notes

1. **Execute phases sequentially** - Each phase depends on the previous
2. **Run verification after each phase** - Catch issues early
3. **Use exact file paths** - All paths are absolute from project root
4. **Test locally before committing** - npm run dev after each change
5. **Check TypeScript continuously** - npx tsc --noEmit frequently

---

*Plan generated by Prometheus (Planner Agent)*
*Ready for Critic review*
