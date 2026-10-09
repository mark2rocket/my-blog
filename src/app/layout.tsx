import { site } from '@/lib/site';
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MixpanelProvider } from '@/components/providers/MixpanelProvider';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: '%s | CPF',
  },
  description: site.description,
  keywords: ['미디어믹스', '마케팅 전략', 'CPF', '서비스 개발'],
  authors: [{ name: 'CPF' }],
  creator: 'CPF',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'CPF',
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
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
              name: site.name,
              legalName: site.legalName,
              foundingDate: site.founded,
              email: site.email,
              url: site.url,
              description: site.description,
            }),
          }}
        />
        <MixpanelProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:p-4">본문으로 건너뛰기</a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MixpanelProvider>
      </body>
    </html>
  );
}
