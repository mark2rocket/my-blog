import { site } from '@/lib/site';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const navigation = [
  {
    title: 'Explore',
    label: '푸터 사이트 메뉴',
    links: [
      { href: '/#services', label: '서비스' },
      { href: '/#how-it-works', label: '작동 방식' },
      { href: '/about', label: '사업 소개' },
    ],
  },
  {
    title: 'Legal',
    label: '법적 안내',
    links: [
      { href: '/privacy-policy', label: '개인정보처리방침' },
      { href: '/data-deletion', label: '데이터 삭제 요청' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const businessDetails = [
    ['상호', site.legalName],
    ['대표', site.operator],
    ['소재지', site.location],
  ];

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 text-zinc-600">
      <div className="mx-auto max-w-[1248px] px-6 md:px-8">
        <div className="grid gap-x-12 gap-y-10 py-12 md:grid-cols-[2fr_1fr_1fr] md:py-16">
          <div>
            <Link href="/" className="brand-link" aria-label="CPF 홈">
              <span className="brand-mark" aria-hidden="true" />
              {site.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-7 [word-break:keep-all]">
              미디어믹스와 마케팅 전략을 돕는<br />
              서비스를 고객 환경에서 만듭니다.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
              {site.email}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-2 md:gap-x-12">
            {navigation.map((group) => (
              <nav key={group.title} aria-label={group.label}>
                <h2 lang="en" className="mb-3 text-sm font-semibold text-zinc-900">
                  {group.title}
                </h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center py-2 text-sm leading-6 hover:text-primary hover:underline hover:underline-offset-4 [word-break:keep-all]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="border-t border-zinc-200 py-6 md:py-7">
          <dl className="flex flex-wrap gap-x-6 gap-y-2 text-xs leading-6">
            {businessDetails.map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <dt className="text-zinc-500">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p lang="en" className="mt-3 text-xs leading-6 text-zinc-500">
            &copy; {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
