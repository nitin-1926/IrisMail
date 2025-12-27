import Link from 'next/link';
import { CodeBlock, PropTable, Callout } from '../../components/docs';

const configProps = [
  {
    name: 'auth.user',
    type: 'string',
    description: 'Your Gmail email address',
    required: true,
  },
  {
    name: 'auth.pass',
    type: 'string',
    description: 'Gmail App Password (not your regular password)',
    required: true,
  },
];

const sendMailProps = [
  {
    name: 'from',
    type: 'string',
    description: 'Sender email address',
    required: true,
  },
  {
    name: 'to',
    type: 'string',
    description: 'Recipient email address',
    required: true,
  },
  {
    name: 'subject',
    type: 'string',
    description: 'Email subject line',
    required: true,
  },
  {
    name: 'html',
    type: 'string',
    description: 'HTML email body (plain text is auto-generated)',
    required: true,
  },
];

export default function EmailDocsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="text-lg font-semibold tracking-wide">IrisMail</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
            <Link href="/playground" className="transition hover:text-white">
              Playground
            </Link>
            <Link href="/components/otp" className="transition hover:text-white">
              Components
            </Link>
            <Link href="/docs/email" className="text-white">
              Docs
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-400/80">Documentation</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Email Service</h1>
          <p className="mt-4 text-lg text-white/60">
            Send emails with Gmail in just a few lines of code. No SMTP configuration needed.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-10 flex gap-3">
          <Link
            href="/docs/email"
            className="rounded-lg bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-300 ring-1 ring-indigo-500/40"
          >
            Email
          </Link>
          <Link
            href="/docs/otp-input"
            className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            OTP Input
          </Link>
        </div>

        <div className="space-y-12">
          {/* Installation */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Installation</h2>
            <CodeBlock code="npm install irismail" language="bash" />
          </section>

          {/* Quick Start */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Quick Start</h2>
            <p className="mb-4 text-white/60">
              Import <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">IrisMail</code> from{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">irismail/server</code> and
              create an instance with your Gmail credentials.
            </p>

            <Callout variant="warning" title="Gmail App Password Required">
              You need to generate a{' '}
              <a
                href="https://support.google.com/accounts/answer/185833"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Gmail App Password
              </a>{' '}
              for authentication. Your regular Gmail password won&apos;t work.
            </Callout>

            <div className="mt-6">
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

// Send an email
const result = await mail.sendMail({
  from: process.env.GMAIL_USER!,
  to: 'user@example.com',
  subject: 'Welcome to our app!',
  html: '<h1>Hello!</h1><p>Thanks for signing up.</p>',
});

console.log(result);
// { success: true, messageId: '<unique-id@smtp.gmail.com>' }`}
              />
            </div>
          </section>

          {/* API Reference */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">API Reference</h2>

            {/* Constructor */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-white">
                <code className="text-indigo-300">new IrisMail(config)</code>
              </h3>
              <p className="mb-4 text-white/60">
                Creates a new IrisMail instance configured for Gmail SMTP.
              </p>
              <PropTable props={configProps} />
            </div>

            {/* sendMail */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                <code className="text-indigo-300">mail.sendMail(options)</code>
              </h3>
              <p className="mb-4 text-white/60">
                Sends an email and returns a promise with the result.
              </p>
              <PropTable props={sendMailProps} />

              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-white/70">Returns:</p>
                <CodeBlock
                  code={`interface SendMailResult {
  success: boolean;
  messageId: string;
}`}
                  language="typescript"
                />
              </div>
            </div>
          </section>

          {/* Next.js Example */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Next.js API Route</h2>
            <p className="mb-4 text-white/60">
              Full example of a Next.js API route that sends emails.
            </p>
            <CodeBlock
              filename="app/api/send-email/route.ts"
              language="typescript"
              code={`import { IrisMail } from 'irismail/server';
import { NextRequest, NextResponse } from 'next/server';

const mail = new IrisMail({
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_APP_PASSWORD!,
  },
});

export async function POST(req: NextRequest) {
  const { to, subject, html } = await req.json();

  try {
    const result = await mail.sendMail({
      from: process.env.GMAIL_USER!,
      to,
      subject,
      html,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}`}
            />
          </section>

          {/* Environment Variables */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Environment Variables</h2>
            <p className="mb-4 text-white/60">
              Add these to your <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">.env.local</code> file:
            </p>
            <CodeBlock
              filename=".env.local"
              language="bash"
              code={`GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password`}
            />
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6">
            <h2 className="text-xl font-semibold text-white">Try it out!</h2>
            <p className="mt-2 text-white/60">
              Head over to the playground to test email sending with your credentials.
            </p>
            <Link
              href="/playground"
              className="mt-4 inline-flex rounded-lg bg-indigo-500 px-5 py-2 font-medium text-white transition hover:bg-indigo-400"
            >
              Go to Playground →
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
