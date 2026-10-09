'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/#services', label: '서비스' },
  { href: '/#how-it-works', label: '작동 방식' },
  { href: '/about', label: '사업 소개' },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="header-links">
      {navItems.map(({ href, label }) => (
        <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>
          {label}
        </Link>
      ))}
    </div>
  );
}
