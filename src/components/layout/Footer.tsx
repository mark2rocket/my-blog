import { site } from '@/lib/site';
import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-5 bg-primary rounded-full" />
              <span className="font-semibold tracking-tight text-zinc-900">CPF</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[30ch]">
              미디어믹스와 마케팅 전략,<br />
              그리고 서비스 개발.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-medium text-zinc-900 uppercase tracking-widest mb-3">
                Content
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
                >
                  서비스
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
                >
                  사업 소개
                </Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-900 uppercase tracking-widest mb-3">
                Legal
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
                >
                  개인정보처리방침
                </Link>
                <Link
                  href="/data-deletion"
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
                >
                  데이터 삭제 요청
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-zinc-200">
          <p className="text-sm text-zinc-600 mb-3">{site.legalName} · 대표 {site.operator} · {site.location}</p>
          <p className="text-xs text-zinc-400">&copy; {year} CPF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
