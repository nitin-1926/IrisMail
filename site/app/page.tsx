'use client';

import Link from 'next/link';
import { CodeBlock } from './components/docs';

const features = [
  {
    title: 'Gmail Email Service',
    description: 'Send emails with just your Gmail credentials. No SMTP configuration needed.',
    code: `const mail = new IrisMail({
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

await mail.sendMail({
  from: process.env.GMAIL_USER,
  to: 'user@example.com',
  subject: 'Hello!',
  html: '<h1>Welcome</h1>',
});`,
  },
  {
    title: 'OTP Input Components',
    description: 'Beautiful, accessible OTP inputs with copy-paste support and customizable styling.',
    code: `<InputOTP maxLength={6} value={otp} onChange={setOtp}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  },
];

const links = [
  {
    title: 'Email Playground',
    description: 'Test email sending in real-time.',
    href: '/playground',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'OTP Components',
    description: 'Interactive component showcase.',
    href: '/components/otp',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Email Docs',
    description: 'API reference and examples.',
    href: '/docs/email',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'OTP Input Docs',
    description: 'Component props and usage.',
    href: '/docs/otp-input',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="text-lg font-semibold tracking-wide">IrisMail</span>
            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
              v0.1
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
            <Link href="/playground" className="transition hover:text-white">
              Playground
            </Link>
            <Link href="/components/otp" className="transition hover:text-white">
              Components
            </Link>
            <Link href="/docs/email" className="transition hover:text-white">
              Docs
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-10 md:p-14">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-400/80">IrisMail</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Email sending &<br />
            OTP components
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/60">
            A lightweight npm package for sending emails via Gmail and beautiful OTP input components for React.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/playground"
              className="rounded-lg bg-indigo-500 px-6 py-3 font-medium text-white transition hover:bg-indigo-400"
            >
              Try the Playground
            </Link>
            <Link
              href="/components/otp"
              className="rounded-lg border border-white/20 px-6 py-3 font-medium text-white/80 transition hover:border-white/40 hover:text-white"
            >
              View Components
            </Link>
          </div>

          {/* Installation */}
          <div className="mt-12">
            <p className="mb-3 text-sm text-white/40">Install with npm, yarn, or pnpm</p>
            <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-5 py-3">
              <code className="font-mono text-emerald-400">npm install irismail</code>
              <button
                onClick={() => navigator.clipboard.writeText('npm install irismail')}
                className="text-white/40 transition hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20">
          <h2 className="mb-2 text-2xl font-semibold text-white">What&apos;s included</h2>
          <p className="mb-8 text-white/50">Two powerful features in one lightweight package.</p>

          <div className="grid gap-6 lg:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-white/50">{feature.description}</p>
                <div className="mt-5">
                  <CodeBlock code={feature.code} language="typescript" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="mt-20">
          <h2 className="mb-2 text-2xl font-semibold text-white">Explore</h2>
          <p className="mb-8 text-white/50">Jump into the docs or try the interactive demos.</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 transition group-hover:bg-indigo-500/20">
                  {link.icon}
                </span>
                <h3 className="mt-4 font-semibold text-white">{link.title}</h3>
                <p className="mt-1 text-sm text-white/50">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="mt-20">
          <h2 className="mb-2 text-2xl font-semibold text-white">Quick Start</h2>
          <p className="mb-8 text-white/50">Get up and running in minutes.</p>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 font-semibold text-white">Server-side Email</h3>
              <CodeBlock
                filename="app/api/send-email/route.ts"
                code={`import { IrisMail } from 'irismail/server';

const mail = new IrisMail({
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_APP_PASSWORD!,
  },
});

export async function POST(req: Request) {
  const { to, subject, html } = await req.json();

  const result = await mail.sendMail({
    from: process.env.GMAIL_USER!,
    to,
    subject,
    html,
  });

  return Response.json(result);
}`}
                language="typescript"
              />
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-white">React OTP Input</h3>
              <CodeBlock
                filename="components/verify-form.tsx"
                code={`'use client';

import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from 'irismail/react';

export function VerifyForm() {
  const [otp, setOtp] = useState('');

  return (
    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-white/40">
          IrisMail — Simple email sending & beautiful OTP components
        </div>
      </footer>
    </div>
  );
}
