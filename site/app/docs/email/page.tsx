import Link from 'next/link';
import { DocsLayout } from '../../components/layout';
import { CodeBlock, PropTable, Callout } from '../../components/docs';
import { GITHUB_URL } from '../../lib/constants';

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
    <DocsLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span>Docs</span>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-400">Email</span>
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-white">Email Service</h1>
        <p className="mt-2 text-zinc-500">
          Send emails with Gmail in just a few lines of code.
        </p>
      </div>

      {/* Quick Links */}
      <div className="mb-8 flex gap-2">
        <Link
          href="/docs/email"
          className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium text-white"
        >
          Email
        </Link>
        <Link
          href="/docs/otp-input"
          className="rounded-md px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300"
        >
          OTP Input
        </Link>
      </div>

      <div className="space-y-10">
        {/* Installation */}
        <section>
          <h2 className="mb-3 text-lg font-medium text-white">Installation</h2>
          <CodeBlock code="npm install irismail" language="bash" />
        </section>

        {/* Quick Start */}
        <section>
          <h2 className="mb-3 text-lg font-medium text-white">Quick Start</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Import <code>IrisMail</code> from <code>irismail/server</code> and create an instance with your Gmail credentials.
          </p>

          <Callout variant="warning" title="Gmail App Password Required">
            You need to generate a{' '}
            <a
              href="https://support.google.com/accounts/answer/185833"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-zinc-300"
            >
              Gmail App Password
            </a>{' '}
            for authentication. Your regular Gmail password won&apos;t work.
          </Callout>

          <div className="mt-5">
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
          <h2 className="mb-5 text-lg font-medium text-white">API Reference</h2>

          {/* Constructor */}
          <div className="mb-8">
            <h3 className="mb-2 text-base font-medium text-white">
              <code className="text-zinc-300">new IrisMail(config)</code>
            </h3>
            <p className="mb-4 text-sm text-zinc-500">
              Creates a new IrisMail instance configured for Gmail SMTP.
            </p>
            <PropTable props={configProps} />
          </div>

          {/* sendMail */}
          <div>
            <h3 className="mb-2 text-base font-medium text-white">
              <code className="text-zinc-300">mail.sendMail(options)</code>
            </h3>
            <p className="mb-4 text-sm text-zinc-500">
              Sends an email and returns a promise with the result.
            </p>
            <PropTable props={sendMailProps} />

            <div className="mt-5">
              <p className="mb-2 text-sm text-zinc-500">Returns:</p>
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
          <h2 className="mb-3 text-lg font-medium text-white">Next.js API Route</h2>
          <p className="mb-4 text-sm text-zinc-500">
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
          <h2 className="mb-3 text-lg font-medium text-white">Environment Variables</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Add these to your <code>.env.local</code> file:
          </p>
          <CodeBlock
            filename=".env.local"
            language="bash"
            code={`GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password`}
          />
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5">
          <h2 className="text-base font-medium text-white">Need OTP Components?</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Check out our OTP input components or star us on GitHub.
          </p>
          <div className="mt-3 flex gap-3">
            <Link
              href="/components/otp"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-300 transition-colors hover:text-white"
            >
              View OTP Components
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
