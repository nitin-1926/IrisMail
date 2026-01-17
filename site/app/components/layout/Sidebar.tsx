'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  title: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/email' },
    ],
  },
  {
    title: 'Server',
    items: [
      { title: 'Email Service', href: '/docs/email' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'OTP Input', href: '/docs/otp-input' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto pb-10 lg:block">
      <nav className="space-y-6 pr-4 pt-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
              {section.title}
            </h4>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                        isActive
                          ? 'bg-zinc-800/50 text-white'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
