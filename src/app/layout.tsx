import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MixpanelProvider } from '@/components/providers/MixpanelProvider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://example.com'),
  title: {
    default: 'CPF — Consulting & Insights',
    template: '%s | CPF',
  },
  description: '비즈니스 컨설팅과 깊이 있는 인사이트를 전달하는 CPF의 블로그입니다.',
  keywords: ['컨설팅', '인사이트', 'CPF', '비즈니스', '전략'],
  authors: [{ name: 'CPF' }],
  creator: 'CPF',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'CPF',
    title: 'CPF — Consulting & Insights',
    description: '비즈니스 컨설팅과 깊이 있는 인사이트를 전달하는 CPF의 블로그입니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CPF — Consulting & Insights',
    description: '비즈니스 컨설팅과 깊이 있는 인사이트를 전달합니다.',
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
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CPF',
              url: process.env.SITE_URL || 'https://example.com',
              description: '비즈니스 컨설팅과 깊이 있는 인사이트를 전달하는 CPF',
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
