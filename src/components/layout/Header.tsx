import Link from 'next/link';
import { NavLinks } from './NavLinks';

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-1.5 h-5 bg-primary rounded-full transition-all duration-200 group-hover:h-6" />
            <span className="text-lg font-semibold tracking-tight text-zinc-900">CPF</span>
          </Link>
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
