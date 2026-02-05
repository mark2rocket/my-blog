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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'GEO-First Tech Blog',
              url: process.env.SITE_URL || 'https://example.com',
              logo: `${process.env.SITE_URL || 'https://example.com'}/og-image.svg`,
              description: 'Claude Code 인사이트를 담는 기술 블로그',
              sameAs: [
                // 소셜 프로필 링크 (실제 사용 시 추가)
                // 'https://twitter.com/yourhandle',
                // 'https://github.com/yourorg',
                // 'https://linkedin.com/company/yourcompany'
              ],
            }),
          }}
        />
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
