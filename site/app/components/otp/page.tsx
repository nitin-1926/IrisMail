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

              {/* Slot Size */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-zinc-500">Slot Size</p>
                <div className="flex rounded-md border border-zinc-800 p-0.5">
                  {(['sm', 'md', 'lg'] as OTPSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setPlaygroundSlotSize(size)}
                      className={`flex-1 rounded py-1.5 text-xs font-medium transition-colors ${
                        playgroundSlotSize === size
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Size (only show when separator is enabled) */}
              {playgroundSeparator && availableGroupSizes.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-medium text-zinc-500">Group Size</p>
                  <div className="flex rounded-md border border-zinc-800 p-0.5">
                    <button
                      onClick={() => setPlaygroundGroupSize(undefined)}
                      className={`flex-1 rounded py-1.5 text-xs font-medium transition-colors ${
                        playgroundGroupSize === undefined
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      Auto
                    </button>
                    {availableGroupSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setPlaygroundGroupSize(size)}
                        className={`flex-1 rounded py-1.5 text-xs font-medium transition-colors ${
                          playgroundGroupSize === size
                            ? 'bg-zinc-800 text-white'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Separator Toggle */}
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-zinc-500">Separator</span>
                <button
                  onClick={() => setPlaygroundSeparator(!playgroundSeparator)}
                  className={`relative h-4 w-7 rounded-full transition-colors ${
                    playgroundSeparator ? 'bg-indigo-600' : 'bg-zinc-800'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${
                      playgroundSeparator ? 'left-3.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Disabled Toggle */}
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-zinc-500">Disabled</span>
                <button
                  onClick={() => setPlaygroundDisabled(!playgroundDisabled)}
                  className={`relative h-4 w-7 rounded-full transition-colors ${
                    playgroundDisabled ? 'bg-zinc-600' : 'bg-zinc-800'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${
                      playgroundDisabled ? 'left-3.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Error Toggle */}
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-zinc-500">Error</span>
                <button
                  onClick={() => setPlaygroundError(!playgroundError)}
                  className={`relative h-4 w-7 rounded-full transition-colors ${
                    playgroundError ? 'bg-red-600' : 'bg-zinc-800'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${
                      playgroundError ? 'left-3.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="border-t border-zinc-800 bg-zinc-900/30 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-zinc-500">Code</p>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
              >
                {copied ? (
                  <>
                    <svg className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <CodeBlock code={generateCode()} language="tsx" />
          </div>
        </section>

        {/* Examples */}
        <section className="mt-14">
          <h2 className="mb-1 text-lg font-medium text-white">Examples</h2>
          <p className="mb-6 text-sm text-zinc-500">Common patterns.</p>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Basic */}
            <div className="rounded-lg border border-zinc-800 overflow-hidden">
              <div className="border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
                <h3 className="text-sm font-medium text-white">Basic</h3>
              </div>
              <div className="flex items-center justify-center bg-zinc-950 p-8">
                <OTP value="384729" onChange={() => {}} />
              </div>
            </div>

            {/* With Separator */}
            <div className="rounded-lg border border-zinc-800 overflow-hidden">
              <div className="border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
                <h3 className="text-sm font-medium text-white">With Separator</h3>
              </div>
              <div className="flex items-center justify-center bg-zinc-950 p-8">
                <OTP value="749281" onChange={() => {}} separator groupSize={3} />
              </div>
            </div>

            {/* Light Theme */}
            <div className="rounded-lg border border-zinc-800 overflow-hidden">
              <div className="border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
                <h3 className="text-sm font-medium text-white">Light Theme</h3>
              </div>
              <div className="flex items-center justify-center bg-white p-8">
                <OTP value="528146" onChange={() => {}} theme="light" />
              </div>
            </div>

            {/* Error State */}
            <div className="rounded-lg border border-zinc-800 overflow-hidden">
              <div className="border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
                <h3 className="text-sm font-medium text-white">Error State</h3>
              </div>
              <div className="flex items-center justify-center bg-zinc-950 p-8">
                <OTP value="192847" onChange={() => {}} error />
              </div>
            </div>
          </div>
        </section>

        {/* Props Table */}
        <section className="mt-14">
          <h2 className="mb-1 text-lg font-medium text-white">API</h2>
          <p className="mb-5 text-sm text-zinc-500">Props for the OTP component.</p>

          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Prop</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Type</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Default</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  { prop: 'length', type: 'number', default: '6' },
                  { prop: 'value', type: 'string', default: '—' },
                  { prop: 'onChange', type: '(value: string) => void', default: '—' },
                  { prop: 'onComplete', type: '(value: string) => void', default: '—' },
                  { prop: 'theme', type: '"dark" | "light"', default: '"dark"' },
                  { prop: 'slotSize', type: '"sm" | "md" | "lg"', default: '"md"' },
                  { prop: 'separator', type: 'boolean', default: 'false' },
                  { prop: 'groupSize', type: 'number', default: 'length / 2' },
                  { prop: 'disabled', type: 'boolean', default: 'false' },
                  { prop: 'error', type: 'boolean', default: 'false' },
                  { prop: 'autoFocus', type: 'boolean', default: 'false' },
                  { prop: 'classNames', type: 'OTPClassNames', default: '—' },
                ].map((row) => (
                  <tr key={row.prop}>
                    <td className="px-4 py-2">
                      <code className="text-xs text-zinc-300">{row.prop}</code>
                    </td>
                    <td className="px-4 py-2">
                      <code className="text-xs text-zinc-500">{row.type}</code>
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-600">{row.default}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ClassNames API */}
        <section className="mt-14">
          <h2 className="mb-1 text-lg font-medium text-white">Styles API</h2>
          <p className="mb-5 text-sm text-zinc-500">Customize individual parts with the <code>classNames</code> prop.</p>

          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Key</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  { key: 'root', desc: 'Root container element' },
                  { key: 'group', desc: 'Group wrapper containing slots' },
                  { key: 'slot', desc: 'Individual digit slot (base state)' },
                  { key: 'slotFilled', desc: 'Slot when it contains a digit' },
                  { key: 'slotActive', desc: 'Slot when focused/active' },
                  { key: 'slotError', desc: 'Slot in error state' },
                  { key: 'separator', desc: 'Separator container' },
                  { key: 'separatorLine', desc: 'The separator dash/line' },
                  { key: 'caret', desc: 'Blinking caret cursor' },
                ].map((row) => (
                  <tr key={row.key}>
                    <td className="px-4 py-2">
                      <code className="text-xs text-zinc-300">{row.key}</code>
                    </td>
                    <td className="px-4 py-2 text-xs text-zinc-500">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <CodeBlock
              language="tsx"
              code={`<OTP
  value={code}
  onChange={setCode}
  separator
  classNames={{
    slot: "rounded-none first:rounded-l-md",
    slotActive: "ring-2 ring-blue-500",
    separator: "mx-4",
    separatorLine: "bg-blue-500 w-4",
  }}
/>`}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 text-center">
          <h2 className="text-base font-medium text-white">Like what you see?</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Check out the docs or star us on GitHub.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              href="/docs/otp-input"
              className="inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              Read Docs
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 px-3.5 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
              Star
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
