import Link from 'next/link';
import { GITHUB_URL, NPM_URL, INPUT_OTP_URL } from '../../lib/constants';

const footerLinks = {
  product: [
    { label: 'Components', href: '/components/otp' },
    { label: 'Email Service', href: '/docs/email' },
    { label: 'OTP Input', href: '/docs/otp-input' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs/email' },
    { label: 'GitHub', href: GITHUB_URL, external: true },
    { label: 'npm', href: NPM_URL, external: true },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-sm font-medium text-white">
              IrisMail
            </Link>
            <p className="mt-2 max-w-xs text-sm text-zinc-600">
              Email sending and OTP components for modern apps. Open source under ISC license.
            </p>
            <p className="mt-3 text-xs text-zinc-700">
              OTP component built on{' '}
              <a
                href={INPUT_OTP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 underline underline-offset-2 transition-colors hover:text-zinc-400"
              >
                input-otp
              </a>
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Product</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Resources</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
