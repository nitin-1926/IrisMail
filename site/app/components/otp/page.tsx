'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OTP } from 'irismail/react';

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const digitOptions = [
  { label: '4', value: 4 },
  { label: '6', value: 6 },
  { label: '8', value: 8 },
];

const typeOptions = [
  { label: 'Numeric', value: 'numeric' as const },
  { label: 'Alphanumeric', value: 'alphanumeric' as const },
  { label: 'Alphabetic', value: 'alphabetic' as const },
];

const groupSizeOptions = [
  { label: 'None', value: 0 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
];

const sizes = [
  { label: 'Small', value: 'sm' as const },
  { label: 'Medium', value: 'md' as const },
  { label: 'Large', value: 'lg' as const },
];

const variants = [
  { label: 'Outline', value: 'outline' as const },
  { label: 'Filled', value: 'filled' as const },
  { label: 'Underline', value: 'underline' as const },
];

const accents = [
  { label: 'Iris', value: 'iris' as const, color: '#6366f1' },
  { label: 'Blush', value: 'blush' as const, color: '#ec4899' },
  { label: 'Emerald', value: 'emerald' as const, color: '#10b981' },
  { label: 'Slate', value: 'slate' as const, color: '#64748b' },
];

const separatorVariants = [
  { label: 'None', value: 'none' as const },
  { label: 'Dash', value: 'dash' as const },
  { label: 'Dot', value: 'dot' as const },
  { label: 'Slash', value: 'slash' as const },
];

const statusOptions = [
  { label: 'Default', value: 'default' as const },
  { label: 'Error', value: 'error' as const },
  { label: 'Success', value: 'success' as const },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function OTPShowcasePage() {
  // Playground state
  const [playgroundValue, setPlaygroundValue] = useState('');
  const [digits, setDigits] = useState(6);
  const [inputType, setInputType] = useState<'numeric' | 'alphanumeric' | 'alphabetic'>('numeric');
  const [groupSize, setGroupSize] = useState(3);
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [selectedVariant, setSelectedVariant] = useState<'outline' | 'filled' | 'underline'>('outline');
  const [selectedAccent, setSelectedAccent] = useState<'iris' | 'blush' | 'emerald' | 'slate'>('iris');
  const [selectedSeparator, setSelectedSeparator] = useState<'none' | 'dash' | 'dot' | 'slash'>('dash');
  const [selectedStatus, setSelectedStatus] = useState<'default' | 'error' | 'success'>('default');
  const [disabled, setDisabled] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorMode, setCursorMode] = useState<'blink' | 'static'>('blink');
  const [copied, setCopied] = useState(false);

  // Individual demo states
  const [outlineDemo, setOutlineDemo] = useState('');
  const [filledDemo, setFilledDemo] = useState('');
  const [underlineDemo, setUnderlineDemo] = useState('');

  // Generate code based on current settings
  const generateCode = () => {
    const props: string[] = [];

    if (digits !== 6) props.push(`digits={${digits}}`);
    if (inputType !== 'numeric') props.push(`type="${inputType}"`);
    if (groupSize > 0) props.push(`groupSize={${groupSize}}`);
    if (groupSize > 0 && selectedSeparator !== 'dash') props.push(`separator="${selectedSeparator}"`);
    if (selectedSize !== 'md') props.push(`size="${selectedSize}"`);
    if (selectedVariant !== 'outline') props.push(`variant="${selectedVariant}"`);
    if (selectedAccent !== 'iris') props.push(`accent="${selectedAccent}"`);
    if (selectedStatus !== 'default') props.push(`status="${selectedStatus}"`);
    if (disabled) props.push('disabled');
    if (showLabel) props.push('label="Verification Code"');
    if (!showCursor) props.push('showCursor={false}');
    if (cursorMode !== 'blink') props.push(`cursorMode="${cursorMode}"`);

    props.push('value={otp}');
    props.push('onChange={setOtp}');

    const propsString = props.length > 0 ? `\n  ${props.join('\n  ')}\n` : '';

    return `import { useState } from 'react';
import { OTP } from 'irismail/react';

export function VerifyForm() {
  const [otp, setOtp] = useState('');

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

  // Reset value when digits change
  const handleDigitsChange = (newDigits: number) => {
    setDigits(newDigits);
    setPlaygroundValue('');
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
            <Link href="/playground" className="transition hover:text-white">
              Playground
            </Link>
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
            Accessible one-time password input with copy-paste support, customizable styling, and full keyboard
            navigation.
          </p>
        </div>

        {/* Interactive Playground */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Interactive Playground</h2>
            <button
              onClick={() => setPlaygroundValue('')}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:border-white/20 hover:text-white"
            >
              Reset
            </button>
          </div>

          <div className="flex flex-col gap-8 xl:flex-row">
            {/* OTP Preview */}
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-white/5 bg-black/20 p-10">
              <OTP
                digits={digits}
                type={inputType}
                groupSize={groupSize > 0 ? groupSize : undefined}
                separator={selectedSeparator}
                size={selectedSize}
                variant={selectedVariant}
                accent={selectedAccent}
                status={selectedStatus}
                disabled={disabled}
                label={showLabel ? 'Verification Code' : undefined}
                value={playgroundValue}
                onChange={setPlaygroundValue}
                showCursor={showCursor}
                cursorMode={cursorMode}
                helperText={selectedStatus === 'default' ? 'Enter your verification code' : undefined}
                errorText={selectedStatus === 'error' ? 'Invalid code. Please try again.' : undefined}
                successText={selectedStatus === 'success' ? 'Code verified successfully!' : undefined}
              />
            </div>

            {/* Controls */}
            <div className="w-full space-y-5 xl:w-80">
              {/* Digits */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Digits</p>
                <div className="flex gap-2">
                  {digitOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleDigitsChange(opt.value)}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        digits === opt.value
                          ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Type */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Input Type</p>
                <div className="flex gap-2">
                  {typeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setInputType(opt.value)}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        inputType === opt.value
                          ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Size */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Group Size</p>
                <div className="flex gap-2">
                  {groupSizeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setGroupSize(opt.value)}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        groupSize === opt.value
                          ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Size</p>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        selectedSize === size.value
                          ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variant */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Variant</p>
                <div className="flex gap-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.value}
                      onClick={() => setSelectedVariant(variant.value)}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        selectedVariant === variant.value
                          ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Accent Color</p>
                <div className="flex gap-3">
                  {accents.map((accent) => (
                    <button
                      key={accent.value}
                      onClick={() => setSelectedAccent(accent.value)}
                      className={`h-9 w-9 rounded-full transition-transform ${
                        selectedAccent === accent.value
                          ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0f]'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: accent.color }}
                      title={accent.label}
                    />
                  ))}
                </div>
              </div>

              {/* Separator */}
              {groupSize > 0 && (
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Separator</p>
                  <div className="flex gap-2">
                    {separatorVariants.map((sep) => (
                      <button
                        key={sep.value}
                        onClick={() => setSelectedSeparator(sep.value)}
                        className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                          selectedSeparator === sep.value
                            ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {sep.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Status</p>
                <div className="flex gap-2">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedStatus(opt.value)}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        selectedStatus === opt.value
                          ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-4">
                {/* Disabled Toggle */}
                <div className="flex flex-1 items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                  <span className="text-sm text-white/60">Disabled</span>
                  <button
                    onClick={() => setDisabled(!disabled)}
                    className={`relative h-5 w-9 rounded-full transition ${disabled ? 'bg-indigo-500' : 'bg-white/20'}`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                        disabled ? 'left-[18px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Label Toggle */}
                <div className="flex flex-1 items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                  <span className="text-sm text-white/60">Label</span>
                  <button
                    onClick={() => setShowLabel(!showLabel)}
                    className={`relative h-5 w-9 rounded-full transition ${showLabel ? 'bg-indigo-500' : 'bg-white/20'}`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                        showLabel ? 'left-[18px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Cursor Toggle */}
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                <span className="text-sm text-white/60">Show Cursor</span>
                <button
                  onClick={() => setShowCursor(!showCursor)}
                  className={`relative h-5 w-9 rounded-full transition ${showCursor ? 'bg-indigo-500' : 'bg-white/20'}`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      showCursor ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Cursor Mode */}
              {showCursor && (
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/40">Cursor Mode</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCursorMode('blink')}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        cursorMode === 'blink'
                          ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      Blink
                    </button>
                    <button
                      onClick={() => setCursorMode('static')}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        cursorMode === 'static'
                          ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      Static
                    </button>
                  </div>
                </div>
              )}
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

        {/* Variants Showcase */}
        <section className="mt-16">
          <h2 className="mb-2 text-2xl font-semibold text-white">Variants</h2>
          <p className="mb-8 text-white/50">Three built-in styles to match your design system.</p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Outline */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white">Outline</h3>
                <code className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/60">variant=&quot;outline&quot;</code>
              </div>
              <div className="flex justify-center py-6">
                <OTP digits={4} variant="outline" accent="iris" value={outlineDemo} onChange={setOutlineDemo} />
              </div>
              <p className="text-sm text-white/50">Clean bordered style with subtle shadows. Perfect for forms.</p>
            </div>

            {/* Filled */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white">Filled</h3>
                <code className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/60">variant=&quot;filled&quot;</code>
              </div>
              <div className="flex justify-center py-6">
                <OTP digits={4} variant="filled" accent="blush" value={filledDemo} onChange={setFilledDemo} />
              </div>
              <p className="text-sm text-white/50">Solid background with inner shadow. Great for dark UIs.</p>
            </div>

            {/* Underline */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white">Underline</h3>
                <code className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/60">variant=&quot;underline&quot;</code>
              </div>
              <div className="flex justify-center py-6">
                <OTP digits={4} variant="underline" accent="emerald" value={underlineDemo} onChange={setUnderlineDemo} />
              </div>
              <p className="text-sm text-white/50">Minimal bottom-border style for modern landing pages.</p>
            </div>
          </div>
        </section>

        {/* Props Table */}
        <section className="mt-16">
          <h2 className="mb-2 text-2xl font-semibold text-white">Props</h2>
          <p className="mb-6 text-white/50">Full API reference for the OTP component.</p>

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
                  <td className="px-6 py-4 font-mono text-indigo-300">digits</td>
                  <td className="px-6 py-4 text-white/60">number</td>
                  <td className="px-6 py-4 text-white/40">6</td>
                  <td className="px-6 py-4 text-white/60">Number of OTP digits</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">type</td>
                  <td className="px-6 py-4 text-white/60">&apos;numeric&apos; | &apos;alphanumeric&apos; | &apos;alphabetic&apos;</td>
                  <td className="px-6 py-4 text-white/40">&apos;numeric&apos;</td>
                  <td className="px-6 py-4 text-white/60">Input validation type</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">groupSize</td>
                  <td className="px-6 py-4 text-white/60">number</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Group size for visual grouping with separators</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">separator</td>
                  <td className="px-6 py-4 text-white/60">&apos;none&apos; | &apos;dash&apos; | &apos;dot&apos; | &apos;slash&apos;</td>
                  <td className="px-6 py-4 text-white/40">&apos;dash&apos;</td>
                  <td className="px-6 py-4 text-white/60">Separator style between groups</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">size</td>
                  <td className="px-6 py-4 text-white/60">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</td>
                  <td className="px-6 py-4 text-white/40">&apos;md&apos;</td>
                  <td className="px-6 py-4 text-white/60">Size of input slots</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">variant</td>
                  <td className="px-6 py-4 text-white/60">&apos;outline&apos; | &apos;filled&apos; | &apos;underline&apos;</td>
                  <td className="px-6 py-4 text-white/40">&apos;outline&apos;</td>
                  <td className="px-6 py-4 text-white/60">Visual style variant</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">accent</td>
                  <td className="px-6 py-4 text-white/60">&apos;iris&apos; | &apos;blush&apos; | &apos;emerald&apos; | &apos;slate&apos;</td>
                  <td className="px-6 py-4 text-white/40">&apos;iris&apos;</td>
                  <td className="px-6 py-4 text-white/60">Accent color for focus states</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">status</td>
                  <td className="px-6 py-4 text-white/60">&apos;default&apos; | &apos;error&apos; | &apos;success&apos;</td>
                  <td className="px-6 py-4 text-white/40">&apos;default&apos;</td>
                  <td className="px-6 py-4 text-white/60">Validation status</td>
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
                  <td className="px-6 py-4 font-mono text-indigo-300">label</td>
                  <td className="px-6 py-4 text-white/60">ReactNode</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Label text above the input</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">description</td>
                  <td className="px-6 py-4 text-white/60">ReactNode</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Description text below the label</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">helperText</td>
                  <td className="px-6 py-4 text-white/60">ReactNode</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Helper text below the input</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">errorText</td>
                  <td className="px-6 py-4 text-white/60">ReactNode</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Error message (shown when status=&apos;error&apos;)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">successText</td>
                  <td className="px-6 py-4 text-white/60">ReactNode</td>
                  <td className="px-6 py-4 text-white/40">—</td>
                  <td className="px-6 py-4 text-white/60">Success message (shown when status=&apos;success&apos;)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-indigo-300">required</td>
                  <td className="px-6 py-4 text-white/60">boolean</td>
                  <td className="px-6 py-4 text-white/40">false</td>
                  <td className="px-6 py-4 text-white/60">Show required indicator on label</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">Ready to use?</h2>
          <p className="mt-2 text-white/60">
            Check out the full documentation for more examples and integration guides.
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
