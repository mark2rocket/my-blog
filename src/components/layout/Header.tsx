import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-1.5 h-5 bg-primary rounded-full transition-transform duration-200 group-hover:scale-y-110" />
            <span className="text-lg font-semibold tracking-tight text-zinc-900">CPF</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/blog"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
