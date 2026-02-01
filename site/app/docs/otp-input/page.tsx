import Link from 'next/link';
import { DocsLayout } from '../../components/layout';
import { CodeBlock, PropTable, Callout } from '../../components/docs';
import { GITHUB_URL, INPUT_OTP_URL } from '../../lib/constants';

const otpProps = [
  { name: 'length', type: 'number', default: '6', description: 'Number of OTP digits' },
  { name: 'value', type: 'string', description: 'Controlled input value' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when value changes' },
  { name: 'onComplete', type: '(value: string) => void', description: 'Called when all digits are entered' },
  { name: 'theme', type: '"dark" | "light"', default: '"dark"', description: 'Color theme' },
  { name: 'slotSize', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size of the input slots' },
  { name: 'separator', type: 'boolean', default: 'false', description: 'Show separator between groups' },
  { name: 'groupSize', type: 'number', default: 'length / 2', description: 'Number of slots per group when separator is enabled' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Show error styling' },
  { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Auto focus first slot on mount' },
  { name: 'name', type: 'string', description: 'Name attribute for form integration' },
  { name: 'className', type: 'string', description: 'Additional className for the container' },
  { name: 'classNames', type: 'OTPClassNames', description: 'Styles API for fine-grained customization' },
  { name: 'pattern', type: 'string', default: '^[0-9]*$', description: 'Regex pattern to match input against' },
];

const classNamesKeys = [
  { name: 'root', type: 'string', description: 'Root container element' },
  { name: 'group', type: 'string', description: 'Group wrapper containing slots' },
  { name: 'slot', type: 'string', description: 'Individual digit slot (base state)' },
  { name: 'slotFilled', type: 'string', description: 'Slot when it contains a digit' },
  { name: 'slotActive', type: 'string', description: 'Slot when focused/active' },
  { name: 'slotError', type: 'string', description: 'Slot in error state' },
  { name: 'separator', type: 'string', description: 'Separator container' },
  { name: 'separatorLine', type: 'string', description: 'The separator dash/line element' },
  { name: 'caret', type: 'string', description: 'Blinking caret cursor' },
];

export default function OTPInputDocsPage() {
  return (
    <DocsLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span>Docs</span>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-400">OTP Input</span>
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-white">OTP Input Component</h1>
        <p className="mt-2 text-zinc-500">
          Accessible OTP input with copy-paste support and keyboard navigation.
        </p>
      </div>

      {/* Quick Links */}
      <div className="mb-8 flex gap-2">
        <Link
          href="/docs/email"
          className="rounded-md px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300"
        >
          Email
        </Link>
        <Link
          href="/docs/otp-input"
          className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium text-white"
        >
          OTP Input
        </Link>
      </div>

      <div className="space-y-10">
        {/* Installation */}
        <section>
          <h2 className="mb-3 text-lg font-medium text-white">Installation</h2>
          <CodeBlock code="npm install irismail" language="bash" />
          <div className="mt-4">
            <Callout variant="info" title="Peer Dependencies">
              The OTP components require React 18+ and work best with Tailwind CSS.
            </Callout>
          </div>
        </section>

        {/* Basic Usage */}
        <section>
          <h2 className="mb-3 text-lg font-medium text-white">Basic Usage</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Import <code>OTP</code> from <code>irismail/react</code> and use it with controlled state.
          </p>
          <CodeBlock
            filename="components/verify-form.tsx"
            language="tsx"
            code={`'use client';

import { useState } from 'react';
import { OTP } from 'irismail/react';

export function VerifyForm() {
  const [code, setCode] = useState('');

  return (
    <OTP
      value={code}
      onChange={setCode}
      onComplete={(value) => console.log('Submitted:', value)}
    />
  );
}`}
          />
        </section>

        {/* Themes */}
        <section>
          <h2 className="mb-3 text-lg font-medium text-white">Themes</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Use the <code>theme</code> prop to switch between dark and light color schemes.
          </p>
          <CodeBlock
            language="tsx"
            code={`// Dark theme (default)
<OTP theme="dark" value={code} onChange={setCode} />

// Light theme - for light backgrounds
<OTP theme="light" value={code} onChange={setCode} />`}
          />
        </section>

        {/* Sizes */}
        <section>
          <h2 className="mb-3 text-lg font-medium text-white">Sizes</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Use the <code>slotSize</code> prop to change the slot dimensions.
          </p>
          <CodeBlock
            language="tsx"
            code={`// Small
<OTP slotSize="sm" value={code} onChange={setCode} />

// Medium (default)
<OTP slotSize="md" value={code} onChange={setCode} />

// Large
<OTP slotSize="lg" value={code} onChange={setCode} />`}
          />
        </section>

        {/* Separator & Grouping */}
        <section>
          <h2 className="mb-3 text-lg font-medium text-white">Separator & Grouping</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Use <code>separator</code> to add visual separators and <code>groupSize</code> to control grouping.
          </p>
          <CodeBlock
            language="tsx"
            code={`// With separator (auto groups: 3-3 for 6 digits)
<OTP separator value={code} onChange={setCode} />

// Custom group size (2-2-2 for 6 digits)
<OTP separator groupSize={2} value={code} onChange={setCode} />

// Stripe-style (3-3 for 6 digits)
<OTP length={6} separator groupSize={3} value={code} onChange={setCode} />`}
          />
        </section>

        {/* With Error State */}
        <section>
          <h2 className="mb-3 text-lg font-medium text-white">Error State</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Use the <code>error</code> prop to show validation errors.
          </p>
          <CodeBlock
            filename="components/validated-otp.tsx"
            language="tsx"
            code={`const [code, setCode] = useState('');
const [isInvalid, setIsInvalid] = useState(false);

const handleComplete = async (value: string) => {
  const isValid = await verifyCode(value);
  setIsInvalid(!isValid);
};

<OTP
  value={code}
  onChange={setCode}
  onComplete={handleComplete}
  error={isInvalid}
/>`}
          />
        </section>

        {/* Custom Length */}
        <section>
          <h2 className="mb-3 text-lg font-medium text-white">Custom Length</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Use the <code>length</code> prop to change the number of digits.
          </p>
          <CodeBlock
            language="tsx"
            code={`// 4-digit OTP
<OTP length={4} value={code} onChange={setCode} />

// 8-digit OTP
<OTP length={8} value={code} onChange={setCode} />`}
          />
        </section>

        {/* OTP Props */}
        <section>
          <h2 className="mb-4 text-lg font-medium text-white">Props</h2>
          <PropTable props={otpProps} />
        </section>

        {/* Styles API */}
        <section>
          <h2 className="mb-3 text-lg font-medium text-white">Styles API</h2>
          <p className="mb-4 text-sm text-zinc-500">
            Use the <code>classNames</code> prop to customize individual parts of the component. 
            This gives you full control over styling without having to rebuild the component from scratch.
          </p>
          <PropTable props={classNamesKeys} />
          <div className="mt-4">
            <CodeBlock
              language="tsx"
              code={`// Custom styling example
<OTP
  value={code}
  onChange={setCode}
  separator
  groupSize={3}
  classNames={{
    // Remove rounding except first/last slots
    slot: "rounded-none first:rounded-l-md last:rounded-r-md",
    // Custom focus ring
    slotActive: "ring-2 ring-indigo-500 ring-offset-1 ring-offset-zinc-900",
    // Custom separator styling
    separator: "mx-4",
    separatorLine: "bg-indigo-500 w-4 h-0.5",
    // Custom caret color
    caret: "bg-indigo-400",
  }}
/>`}
            />
          </div>
        </section>

        {/* Attribution */}
        <section className="rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-4">
          <p className="text-sm text-zinc-500">
            The OTP component is built on top of{' '}
            <a
              href={INPUT_OTP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-300"
            >
              input-otp
            </a>{' '}
            by{' '}
            <a
              href="https://twitter.com/guillocodz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-300"
            >
              @guilhermerodz
            </a>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5">
          <h2 className="text-base font-medium text-white">Try it out</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Check out the interactive playground or star us on GitHub.
          </p>
          <div className="mt-3 flex gap-3">
            <Link
              href="/components/otp"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-300 transition-colors hover:text-white"
            >
              Open Playground
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
