import Link from 'next/link';
import { NavLinks } from './NavLinks';
import { site } from '@/lib/site';

export function Header() {
  return (
    <header className="site-header">
      <nav className="header-inner" aria-label="주 메뉴">
        <Link href="/" className="brand-link" aria-label="CPF 홈">
          <span className="brand-mark" aria-hidden="true" />
          CPF
        </Link>
        <NavLinks />
        <a className="header-contact" href={`mailto:${site.email}`}>
          베타 이용 문의 <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
