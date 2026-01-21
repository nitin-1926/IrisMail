'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Header, Footer } from './components/layout';
import { CodeBlock } from './components/docs';
import { GITHUB_URL } from './lib/constants';
import { OTP } from 'irismail/react';

const installCommands = {
  npm: 'npm install irismail',
  pnpm: 'pnpm add irismail',
  yarn: 'yarn add irismail',
  bun: 'bun add irismail',
};

// Hero OTP Demo with typing animation
function HeroOTPDemo() {
  const [demoValue, setDemoValue] = useState('');
  const demoDigits = '847291';
  
  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;
    
    const typeNextDigit = () => {
      if (currentIndex < demoDigits.length) {
        setDemoValue(demoDigits.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextDigit, 150 + Math.random() * 100);
      } else {
        // Wait then reset and repeat
        timeoutId = setTimeout(() => {
          setDemoValue('');
          currentIndex = 0;
          timeoutId = setTimeout(typeNextDigit, 800);
        }, 2500);
      }
    };
    
    // Start after initial delay
    timeoutId = setTimeout(typeNextDigit, 1200);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  return (
    <div className="flex items-center justify-center">
      <OTP
        length={6}
        value={demoValue}
        onChange={setDemoValue}
        separator
        groupSize={3}
        slotSize="lg"
      />
    </div>
  );
}

export default function Home() {
  const [packageManager, setPackageManager] = useState<keyof typeof installCommands>('npm');
  const [copiedInstall, setCopiedInstall] = useState(false);

  const handleCopyInstall = async () => {
    await navigator.clipboard.writeText(installCommands[packageManager]);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-800/50">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-50" />
          
          <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Left: Text content */}
              <div className="animate-slide-up">
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Open Source
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  Email & OTP
                  <br />
                  <span className="text-zinc-500">for modern apps</span>
                </h1>

                <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
                  Send emails through Gmail with zero configuration. Drop in beautiful OTP inputs that just work.
                </p>

                {/* Install command */}
                <div className="mt-8 max-w-md">
                  <div className="flex items-center gap-1 mb-2">
                    {(Object.keys(installCommands) as Array<keyof typeof installCommands>).map((pm) => (
                      <button
                        key={pm}
                        onClick={() => setPackageManager(pm)}
                        className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                          packageManager === pm
                            ? 'bg-zinc-800 text-white'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
                    <span className="text-zinc-600">$</span>
                    <code className="flex-1 font-mono text-sm text-zinc-300">
                      {installCommands[packageManager]}
                    </code>
                    <button
                      onClick={handleCopyInstall}
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      {copiedInstall ? (
                        <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/docs/email"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
                  >
                    Get Started
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/components/otp"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                  >
                    View Components
                  </Link>
                </div>
              </div>

              {/* Right: Visual demo */}
              <div className="animate-slide-up-delay-1">
                <div className="relative">
                  {/* Code preview card */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-1">
                    <CodeBlock
                      filename="app/api/send/route.ts"
                      code={`import { IrisMail } from 'irismail/server';

const mail = new IrisMail({
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

await mail.sendMail({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: '<h1>Hello</h1>',
});`}
                      language="typescript"
                    />
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 shadow-xl animate-float">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-zinc-300">Email sent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-2xl font-semibold text-white">Two tools, one package</h2>
            <p className="mt-2 text-zinc-500">Everything you need to handle emails and verification flows.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Email Feature */}
            <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50 animate-slide-up-delay-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                    <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-white">Email Service</h3>
                  <p className="mt-2 text-sm text-zinc-500">Send transactional emails through Gmail. No SMTP headaches, no complex configuration.</p>
                </div>
                <Link href="/docs/email" className="shrink-0 text-zinc-600 transition-colors group-hover:text-zinc-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>
              <div className="mt-5">
                <CodeBlock
                  code={`const result = await mail.sendMail({
  to: 'user@example.com',
  subject: 'Reset your password',
  html: emailTemplate,
});`}
                  language="typescript"
                />
              </div>
            </div>

            {/* OTP Feature */}
            <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50 animate-slide-up-delay-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                    <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-white">OTP Input</h3>
                  <p className="mt-2 text-sm text-zinc-500">Beautiful OTP inputs with copy-paste, keyboard nav, and all accessibility built in.</p>
                </div>
                <Link href="/components/otp" className="shrink-0 text-zinc-600 transition-colors group-hover:text-zinc-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>
              {/* Animated OTP Demo */}
              <div className="mt-6 flex justify-center rounded-lg bg-zinc-950 p-6">
                <HeroOTPDemo />
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="border-y border-zinc-800/50 bg-zinc-900/20">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Bundle Size', value: '< 5kb', desc: 'gzipped' },
                { label: 'Dependencies', value: '2', desc: 'minimal' },
                { label: 'TypeScript', value: '100%', desc: 'typed' },
                { label: 'License', value: 'MIT', desc: 'open source' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
                  <div className="text-xs text-zinc-600">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white">Quick Start</h2>
            <p className="mt-2 text-zinc-500">Get running in under a minute.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Server */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400">1</span>
                <span className="text-sm font-medium text-white">Server — Send emails</span>
              </div>
              <CodeBlock
                filename="app/api/send/route.ts"
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
import { OTP } from 'irismail/react';

export function VerifyForm() {
  const [code, setCode] = useState('');

  const handleComplete = async (value: string) => {
    // Verify the OTP code
    const res = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify({ code: value }),
    });
  };

  return (
    <OTP
      value={code}
      onChange={setCode}
      onComplete={handleComplete}
    />
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
