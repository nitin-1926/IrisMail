import Link from 'next/link';
import { CodeBlock, PropTable, Callout } from '../../components/docs';

const otpProps = [
  {
    name: 'length',
    type: 'number',
    default: '6',
    description: 'Number of OTP digits',
  },
  {
    name: 'value',
    type: 'string',
    description: 'Controlled input value',
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Called when value changes',
  },
  {
    name: 'onComplete',
    type: '(value: string) => void',
    description: 'Called when all digits are entered',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disable the input',
  },
  {
    name: 'error',
    type: 'boolean',
    default: 'false',
    description: 'Show error styling',
  },
  {
    name: 'autoFocus',
    type: 'boolean',
    default: 'false',
    description: 'Auto focus first slot on mount',
  },
  {
    name: 'name',
    type: 'string',
    description: 'Name attribute for form integration',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional className for the container',
  },
  {
    name: 'pattern',
    type: 'string',
    default: '^[0-9]*$',
    description: 'Regex pattern to match input against',
  },
];

const advancedComponents = [
  { name: 'InputOTP', desc: 'Root component that manages OTP state' },
  { name: 'InputOTPGroup', desc: 'Groups slots together visually' },
  { name: 'InputOTPSlot', desc: 'Individual digit input slot' },
  { name: 'InputOTPSeparator', desc: 'Visual separator between groups' },
];

export default function OTPInputDocsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="text-lg font-semibold tracking-wide">IrisMail</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
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
          <h1 className="mt-3 text-4xl font-bold text-white">OTP Input Component</h1>
          <p className="mt-4 text-lg text-white/60">
            Beautiful, accessible OTP input with copy-paste support and full keyboard navigation.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-10 flex gap-3">
          <Link
            href="/docs/email"
            className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            Email
          </Link>
          <Link
            href="/docs/otp-input"
            className="rounded-lg bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-300 ring-1 ring-indigo-500/40"
          >
            OTP Input
          </Link>
        </div>

        <div className="space-y-12">
          {/* Installation */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Installation</h2>
            <CodeBlock code="npm install irismail" language="bash" />
            <Callout variant="info" title="Peer Dependencies">
              The OTP components require React 18+ and work best with Tailwind CSS.
            </Callout>
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Basic Usage</h2>
            <p className="mb-4 text-white/60">
              Import <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">OTP</code> from{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">irismail/react</code> and use it with controlled state.
            </p>
            <CodeBlock
              filename="components/verify-form.tsx"
              language="typescript"
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

          {/* With Error State */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Error State</h2>
            <p className="mb-4 text-white/60">
              Use the <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">error</code> prop to show validation errors.
            </p>
            <CodeBlock
              filename="components/validated-otp.tsx"
              language="typescript"
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
            <h2 className="mb-4 text-2xl font-semibold text-white">Custom Length</h2>
            <p className="mb-4 text-white/60">
              Use the <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">length</code> prop to change the number of digits.
            </p>
            <CodeBlock
              language="typescript"
              code={`// 4-digit OTP
<OTP length={4} value={code} onChange={setCode} />

// 8-digit OTP  
<OTP length={8} value={code} onChange={setCode} />`}
            />
          </section>

          {/* OTP Props */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">OTP Props</h2>
            <PropTable props={otpProps} />
          </section>

          {/* Advanced Usage */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Composition Pattern</h2>
            <p className="mb-4 text-white/60">
              For custom layouts with separators, use the low-level components.
            </p>

            {/* Components Overview */}
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              {advancedComponents.map((comp) => (
                <div key={comp.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <code className="font-mono text-indigo-300">{comp.name}</code>
                  <p className="mt-1 text-sm text-white/50">{comp.desc}</p>
                </div>
              ))}
            </div>

            <CodeBlock
              filename="components/custom-otp.tsx"
              language="typescript"
              code={`import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from 'irismail/react';

// Custom layout with 3-3 grouping
<InputOTP maxLength={6} value={code} onChange={setCode}>
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
</InputOTP>`}
            />
            <Callout variant="info" title="When to use Composition">
              Use the composition pattern when you need custom slot arrangements, separators, or non-uniform groupings.
            </Callout>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6">
            <h2 className="text-xl font-semibold text-white">Try it out!</h2>
            <p className="mt-2 text-white/60">
              Check out the interactive playground to test the component.
            </p>
            <Link
              href="/components/otp"
              className="mt-4 inline-flex rounded-lg bg-indigo-500 px-5 py-2 font-medium text-white transition hover:bg-indigo-400"
            >
              Open Playground
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
