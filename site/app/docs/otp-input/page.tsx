import Link from 'next/link';
import { CodeBlock, PropTable, Callout } from '../../components/docs';

const otpProps = [
  {
    name: 'digits',
    type: 'number',
    default: '6',
    description: 'Number of OTP digits',
  },
  {
    name: 'type',
    type: "'numeric' | 'alphanumeric' | 'alphabetic'",
    default: "'numeric'",
    description: 'Input validation type',
  },
  {
    name: 'groupSize',
    type: 'number',
    description: 'Group size for visual grouping with separators',
  },
  {
    name: 'separator',
    type: "'none' | 'dash' | 'dot' | 'slash'",
    default: "'dash'",
    description: 'Separator style between groups',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Size of input slots',
  },
  {
    name: 'variant',
    type: "'outline' | 'filled' | 'underline'",
    default: "'outline'",
    description: 'Visual style variant',
  },
  {
    name: 'accent',
    type: "'iris' | 'blush' | 'emerald' | 'slate'",
    default: "'iris'",
    description: 'Accent color for focus states',
  },
  {
    name: 'status',
    type: "'default' | 'error' | 'success'",
    default: "'default'",
    description: 'Validation status',
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
    name: 'label',
    type: 'ReactNode',
    description: 'Label text above the input',
  },
  {
    name: 'description',
    type: 'ReactNode',
    description: 'Description text below the label',
  },
  {
    name: 'helperText',
    type: 'ReactNode',
    description: 'Helper text below the input',
  },
  {
    name: 'errorText',
    type: 'ReactNode',
    description: "Error message (shown when status='error')",
  },
  {
    name: 'successText',
    type: 'ReactNode',
    description: "Success message (shown when status='success')",
  },
  {
    name: 'required',
    type: 'boolean',
    description: 'Show required indicator on label',
  },
];

const advancedComponents = [
  { name: 'InputOTP', desc: 'Root component that manages OTP state' },
  { name: 'InputOTPGroup', desc: 'Groups slots together visually' },
  { name: 'InputOTPSlot', desc: 'Individual digit input slot' },
  { name: 'InputOTPSeparator', desc: 'Visual separator between groups' },
  { name: 'InputOTPField', desc: 'Wrapper with label and messages' },
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
              The simplest way to use the OTP input. Just import{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">OTP</code> and pass the required props.
            </p>
            <CodeBlock
              filename="components/verify-form.tsx"
              language="typescript"
              code={`'use client';

import { useState } from 'react';
import { OTP } from 'irismail/react';

export function VerifyForm() {
  const [otp, setOtp] = useState('');

  return (
    <OTP
      digits={6}
      value={otp}
      onChange={setOtp}
      onComplete={(code) => console.log('Submitted:', code)}
    />
  );
}`}
            />
          </section>

          {/* With Grouping */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">With Grouping</h2>
            <p className="mb-4 text-white/60">
              Use <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">groupSize</code> to visually group
              digits with separators.
            </p>
            <CodeBlock
              filename="components/grouped-otp.tsx"
              language="typescript"
              code={`<OTP
  digits={6}
  groupSize={3}
  separator="dash"
  value={otp}
  onChange={setOtp}
/>`}
            />
          </section>

          {/* With Label and Validation */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">With Label and Validation</h2>
            <p className="mb-4 text-white/60">
              Add labels, descriptions, and validation messages with simple props.
            </p>
            <CodeBlock
              filename="components/validated-otp.tsx"
              language="typescript"
              code={`<OTP
  digits={6}
  groupSize={3}
  label="Verification Code"
  description="Enter the code sent to your email"
  status={isValid ? 'success' : isError ? 'error' : 'default'}
  errorText="Invalid code, please try again"
  successText="Code verified!"
  required
  value={otp}
  onChange={setOtp}
/>`}
            />
          </section>

          {/* Variants */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Variants</h2>
            <p className="mb-4 text-white/60">
              Three built-in visual styles to match your design system.
            </p>
            <CodeBlock
              language="typescript"
              code={`// Outline (default) - bordered style with subtle shadows
<OTP variant="outline" ... />

// Filled - solid background with inner shadow
<OTP variant="filled" ... />

// Underline - minimal bottom-border style
<OTP variant="underline" ... />`}
            />
          </section>

          {/* Input Types */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Input Types</h2>
            <p className="mb-4 text-white/60">
              Control what characters users can enter with the{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-indigo-300">type</code> prop.
            </p>
            <CodeBlock
              language="typescript"
              code={`// Only numbers (default)
<OTP type="numeric" ... />

// Letters and numbers
<OTP type="alphanumeric" ... />

// Only letters
<OTP type="alphabetic" ... />`}
            />
          </section>

          {/* Accent Colors */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Accent Colors</h2>
            <p className="mb-4 text-white/60">
              Choose from four accent colors for focus states and the caret.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'iris', color: '#6366f1' },
                { name: 'blush', color: '#ec4899' },
                { name: 'emerald', color: '#10b981' },
                { name: 'slate', color: '#64748b' },
              ].map((accent) => (
                <div key={accent.name} className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full" style={{ backgroundColor: accent.color }} />
                  <code className="text-sm text-white/60">{accent.name}</code>
                </div>
              ))}
            </div>
          </section>

          {/* OTP Props */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">OTP Props</h2>
            <PropTable props={otpProps} />
          </section>

          {/* Advanced Usage */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Advanced Usage (Composition Pattern)</h2>
            <p className="mb-4 text-white/60">
              For complete control over the OTP layout, use the composition pattern with individual components.
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

// Custom layout with fine-grained control
<InputOTP
  maxLength={6}
  value={otp}
  onChange={setOtp}
  size="lg"
  variant="outline"
  accent="iris"
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator variant="dash" />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
            />
            <Callout variant="info" title="When to use Composition">
              Use the composition pattern when you need custom slot arrangements, multiple separators at different positions, or non-uniform groupings that the simplified OTP component doesn&apos;t support.
            </Callout>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6">
            <h2 className="text-xl font-semibold text-white">Try it out!</h2>
            <p className="mt-2 text-white/60">
              Check out the interactive playground to try all variants and customization options.
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
