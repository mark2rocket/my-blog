import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-4 bg-primary rounded-full" />
              <span className="font-semibold tracking-tight text-zinc-900">CPF</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[30ch]">
              비즈니스 인사이트와 컨설팅 노하우를<br />
              기록하는 공간.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-medium text-zinc-900 uppercase tracking-widest mb-3">
                Content
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/blog"
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-zinc-200">
          <p className="text-xs text-zinc-400">&copy; {year} CPF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
