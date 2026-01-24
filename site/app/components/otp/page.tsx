'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OTP, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from 'irismail/react';

export default function OTPShowcasePage() {
  // Simple OTP demo
  const [simpleOtp, setSimpleOtp] = useState('');
  
  // Error state demo
  const [errorOtp, setErrorOtp] = useState('');
  const [showError, setShowError] = useState(false);
  
  // Composition demo
  const [compositionOtp, setCompositionOtp] = useState('');
  
  // Playground state
  const [playgroundOtp, setPlaygroundOtp] = useState('');
  const [playgroundLength, setPlaygroundLength] = useState(6);
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundError, setPlaygroundError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate code based on playground settings
  const generateCode = () => {
    const props: string[] = [];
    
    if (playgroundLength !== 6) props.push(`length={${playgroundLength}}`);
    if (playgroundDisabled) props.push('disabled');
    if (playgroundError) props.push('error');
    props.push('value={code}');
    props.push('onChange={setCode}');
    
    const propsString = props.length > 0 ? `\n      ${props.join('\n      ')}\n    ` : '';
    
    return `import { useState } from 'react';
import { OTP } from 'irismail/react';

function VerifyForm() {
  const [code, setCode] = useState('');

  return (
    <OTP${propsString}/>
  );
}`;
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLengthChange = (newLength: number) => {
    setPlaygroundLength(newLength);
    setPlaygroundOtp('');
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
            <Link href="/components/otp" className="text-white">
              Components
            </Link>
            <Link href="/docs/email" className="transition hover:text-white">
              Docs
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-400/80">Components</p>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">OTP Input</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/60">
            Accessible one-time password input with copy-paste support and full keyboard navigation.
          </p>
        </div>

        {/* Interactive Playground */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Playground</h2>
            <button
              onClick={() => setPlaygroundOtp('')}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:border-white/20 hover:text-white"
            >
              Reset
            </button>
          </div>

          <div className="flex flex-col gap-8 xl:flex-row">
            {/* OTP Preview */}
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-white/5 bg-black/20 p-10">
              <OTP
                length={playgroundLength}
                value={playgroundOtp}
                onChange={setPlaygroundOtp}
                disabled={playgroundDisabled}
                error={playgroundError}
              />
              {/* {playgroundOtp && (
                <p className="mt-4 text-sm text-white/50">
                  Value: <span className="font-mono text-white">{playgroundOtp}</span>
                </p>
              )} */}
            </div>

            {/* Controls */}
            <div className="w-full space-y-5 xl:w-72">
              {/* Length */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Length</p>
                <div className="flex gap-2">
                  {[4, 6, 8].map((len) => (
                    <button
                      key={len}
                      onClick={() => handleLengthChange(len)}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        playgroundLength === len
                          ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>

              {/* Disabled Toggle */}
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                <span className="text-sm text-white/60">Disabled</span>
                <button
                  onClick={() => setPlaygroundDisabled(!playgroundDisabled)}
                  className={`relative h-5 w-9 rounded-full transition ${playgroundDisabled ? 'bg-indigo-500' : 'bg-white/20'}`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      playgroundDisabled ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Error Toggle */}
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                <span className="text-sm text-white/60">Error State</span>
                <button
                  onClick={() => setPlaygroundError(!playgroundError)}
                  className={`relative h-5 w-9 rounded-full transition ${playgroundError ? 'bg-red-500' : 'bg-white/20'}`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      playgroundError ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">Generated Code</p>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/60 transition hover:border-white/20 hover:text-white"
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d12]">
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                <code className="text-white/80">{generateCode()}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="mt-16">
          <h2 className="mb-2 text-2xl font-semibold text-white">Examples</h2>
          <p className="mb-8 text-white/50">Common use cases and patterns.</p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="mb-2 font-semibold text-white">Basic Usage</h3>
              <p className="mb-4 text-sm text-white/50">Simple 6-digit OTP input with controlled value.</p>
              <div className="flex justify-center py-6">
                <OTP value={simpleOtp} onChange={setSimpleOtp} />
              </div>
            </div>

            {/* With Error */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="mb-2 font-semibold text-white">Error State</h3>
              <p className="mb-4 text-sm text-white/50">Toggle error styling for invalid codes.</p>
              <div className="flex flex-col items-center gap-4 py-6">
                <OTP value={errorOtp} onChange={setErrorOtp} error={showError} />
                <button
                  onClick={() => setShowError(!showError)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    showError
                      ? 'bg-red-500/20 text-red-300 ring-1 ring-red-500/40'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {showError ? 'Hide Error' : 'Show Error'}
                </button>
              </div>
            </div>

            {/* Composition Pattern */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:col-span-2">
              <h3 className="mb-2 font-semibold text-white">Composition Pattern</h3>
              <p className="mb-4 text-sm text-white/50">
                Use low-level components for custom layouts. Great for 3-3 groupings with separators.
              </p>
              <div className="flex justify-center py-6">
                <InputOTP maxLength={6} value={compositionOtp} onChange={setCompositionOtp}>
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
              </div>
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d12]">
                <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                  <code className="text-white/80">{`import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from 'irismail/react';

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
</InputOTP>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Props Table */}
        <section className="mt-16">
          <h2 className="mb-2 text-2xl font-semibold text-white">API Reference</h2>
          <p className="mb-6 text-white/50">Props for the OTP component.</p>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-left font-medium text-white/70">Prop</th>
                  <th className="px-6 py-4 text-left font-medium text-white/70">Type</th>
                  <th className="px-6 py-4 text-left font-medium text-white/70">Default</th>
                  <th className="px-6 py-4 text-left font-medium text-white/70">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">length</td>
                  <td className="px-6 py-4 text-white/60">number</td>
                  <td className="px-6 py-4 text-white/40">6</td>
                  <td className="px-6 py-4 text-white/60">Number of OTP digits</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">value</td>
                  <td className="px-6 py-4 text-white/60">string</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Controlled input value</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">onChange</td>
                  <td className="px-6 py-4 text-white/60">(value: string) =&gt; void</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Called when value changes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">onComplete</td>
                  <td className="px-6 py-4 text-white/60">(value: string) =&gt; void</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Called when all digits are entered</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">disabled</td>
                  <td className="px-6 py-4 text-white/60">boolean</td>
                  <td className="px-6 py-4 text-white/40">false</td>
                  <td className="px-6 py-4 text-white/60">Disable the input</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">error</td>
                  <td className="px-6 py-4 text-white/60">boolean</td>
                  <td className="px-6 py-4 text-white/40">false</td>
                  <td className="px-6 py-4 text-white/60">Show error styling</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">autoFocus</td>
                  <td className="px-6 py-4 text-white/60">boolean</td>
                  <td className="px-6 py-4 text-white/40">false</td>
                  <td className="px-6 py-4 text-white/60">Auto focus first slot</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">name</td>
                  <td className="px-6 py-4 text-white/60">string</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Name attribute for forms</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">className</td>
                  <td className="px-6 py-4 text-white/60">string</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Container className</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">Ready to use?</h2>
          <p className="mt-2 text-white/60">
            Check out the documentation for more examples and integration guides.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/docs/otp-input"
              className="rounded-lg bg-indigo-500 px-6 py-2.5 font-medium text-white transition hover:bg-indigo-400"
            >
              Read the Docs
            </Link>
            <Link
              href="/docs/email"
              className="rounded-lg border border-white/20 px-6 py-2.5 font-medium text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Email Service
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
