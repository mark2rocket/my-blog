'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-8">
      {navItems.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'text-sm transition-colors duration-150 relative',
              'after:absolute after:bottom-[-2px] after:left-0 after:h-px after:bg-primary after:transition-all after:duration-200',
              isActive
                ? 'text-zinc-900 after:w-full'
                : 'text-zinc-500 hover:text-zinc-900 after:w-0 hover:after:w-full'
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
