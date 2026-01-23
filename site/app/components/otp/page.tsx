'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OTP } from 'irismail/react';
import type { OTPTheme } from 'irismail/react';

type OTPSize = 'sm' | 'md' | 'lg';
import { Header, Footer } from '../layout';
import { CodeBlock } from '../docs';
import { GITHUB_URL } from '../../lib/constants';

export default function OTPShowcasePage() {
  // Playground state
  const [playgroundOtp, setPlaygroundOtp] = useState('');
  const [playgroundLength, setPlaygroundLength] = useState(6);
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundError, setPlaygroundError] = useState(false);
  const [playgroundTheme, setPlaygroundTheme] = useState<OTPTheme>('dark');
  const [playgroundSlotSize, setPlaygroundSlotSize] = useState<OTPSize>('md');
  const [playgroundSeparator, setPlaygroundSeparator] = useState(false);
  const [playgroundGroupSize, setPlaygroundGroupSize] = useState<number | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  // Generate code based on playground settings
  const generateCode = () => {
    const props: string[] = [];
    
    if (playgroundLength !== 6) props.push(`length={${playgroundLength}}`);
    if (playgroundTheme !== 'dark') props.push(`theme="${playgroundTheme}"`);
    if (playgroundSlotSize !== 'md') props.push(`slotSize="${playgroundSlotSize}"`);
    if (playgroundSeparator) props.push('separator');
    if (playgroundGroupSize !== undefined) props.push(`groupSize={${playgroundGroupSize}}`);
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
    // Reset groupSize if it doesn't make sense for new length
    if (playgroundGroupSize && playgroundGroupSize > newLength) {
      setPlaygroundGroupSize(undefined);
    }
  };

  // Calculate available group sizes based on length
  const availableGroupSizes = [2, 3, 4].filter(size => size < playgroundLength);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <span>Components</span>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-400">OTP Input</span>
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-white">OTP Input</h1>
          <p className="mt-2 text-zinc-500">
            Accessible one-time password input with copy-paste support and keyboard navigation.
          </p>
        </div>

        {/* Interactive Playground */}
        <section className="rounded-lg border border-zinc-800 overflow-hidden">
          {/* Playground Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
            <h2 className="text-sm font-medium text-white">Playground</h2>
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <div className="flex items-center rounded-md border border-zinc-800 p-0.5">
                <button
                  onClick={() => setPlaygroundTheme('dark')}
                  className={`flex items-center justify-center rounded px-2 py-1 text-xs transition-colors ${
                    playgroundTheme === 'dark' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                </button>
                <button
                  onClick={() => setPlaygroundTheme('light')}
                  className={`flex items-center justify-center rounded px-2 py-1 text-xs transition-colors ${
                    playgroundTheme === 'light' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => setPlaygroundOtp('')}
                className="rounded-md px-2 py-1 text-xs text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* OTP Preview */}
            <div 
              className={`flex flex-1 items-center justify-center p-10 ${
                playgroundTheme === 'dark' ? 'bg-zinc-950' : 'bg-white'
              }`}
            >
              <OTP
                length={playgroundLength}
                value={playgroundOtp}
                onChange={setPlaygroundOtp}
                disabled={playgroundDisabled}
                error={playgroundError}
                theme={playgroundTheme}
                slotSize={playgroundSlotSize}
                separator={playgroundSeparator}
                groupSize={playgroundGroupSize}
              />
            </div>

            {/* Controls */}
            <div className="w-full border-t border-zinc-800 bg-zinc-900/30 p-4 lg:w-56 lg:border-l lg:border-t-0">
              {/* Length */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-zinc-500">Length</p>
                <div className="flex rounded-md border border-zinc-800 p-0.5">
                  {[4, 6, 8].map((len) => (
                    <button
                      key={len}
                      onClick={() => handleLengthChange(len)}
                      className={`flex-1 rounded py-1.5 text-xs font-medium transition-colors ${
                        playgroundLength === len
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-500 hover:text-zinc-300'
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
