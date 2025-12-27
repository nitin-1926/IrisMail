'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CodeBlock, Callout } from '../components/docs';

export default function PlaygroundPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('<h1>Hello!</h1>\n<p>This is a test email from IrisMail.</p>');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, subject, html }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: `Email sent! Message ID: ${data.messageId}` });
      } else {
        setResult({ success: false, message: data.error || 'Failed to send email' });
      }
    } catch {
      setResult({ success: false, message: 'Network error. Check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="text-lg font-semibold tracking-wide">IrisMail</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
            <Link href="/playground" className="text-white">
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

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-400/80">Playground</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Email Testing</h1>
          <p className="mt-4 text-lg text-white/60">
            Test the IrisMail email service with your Gmail credentials.
          </p>
        </div>

        {/* Setup Info */}
        <div className="mb-8">
          <Callout variant="warning" title="Setup Required">
            <p>
              Add these environment variables to your{' '}
              <code className="rounded bg-black/30 px-1.5 py-0.5">.env.local</code> file:
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <code className="rounded bg-black/30 px-1.5 py-0.5">GMAIL_USER</code> — Your Gmail address
              </li>
              <li>
                <code className="rounded bg-black/30 px-1.5 py-0.5">GMAIL_APP_PASSWORD</code> — Your{' '}
                <a
                  href="https://support.google.com/accounts/answer/185833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  Gmail App Password
                </a>
              </li>
            </ul>
          </Callout>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <div className="space-y-6">
            {/* From */}
            <div>
              <label htmlFor="from" className="mb-2 block text-sm font-medium text-white/80">
                From Email
              </label>
              <input
                id="from"
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="your-email@gmail.com"
                required
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* To */}
            <div>
              <label htmlFor="to" className="mb-2 block text-sm font-medium text-white/80">
                To Email
              </label>
              <input
                id="to"
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com"
                required
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-white/80">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
                required
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* HTML Content */}
            <div>
              <label htmlFor="html" className="mb-2 block text-sm font-medium text-white/80">
                HTML Content
              </label>
              <textarea
                id="html"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="<h1>Hello World</h1>"
                required
                rows={6}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-white placeholder-white/30 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-500 px-6 py-3 font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Email'
              )}
            </button>
          </div>
        </form>

        {/* Result */}
        {result && (
          <div
            className={`mt-6 rounded-xl border p-4 ${
              result.success
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border-red-500/30 bg-red-500/10 text-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {result.success ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span className="text-sm">{result.message}</span>
            </div>
          </div>
        )}

        {/* Code Example */}
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-white">How it works</h2>
          <CodeBlock
            filename="app/api/send-email/route.ts"
            language="typescript"
            code={`import { IrisMail } from 'irismail/server';

const mail = new IrisMail({
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_APP_PASSWORD!,
  },
});

export async function POST(req: Request) {
  const { from, to, subject, html } = await req.json();

  const result = await mail.sendMail({ from, to, subject, html });

  return Response.json(result);
}`}
          />
        </div>
      </main>
    </div>
  );
}
