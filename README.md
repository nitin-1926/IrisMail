# IrisMail

[![npm version](https://img.shields.io/npm/v/irismail.svg)](https://www.npmjs.com/package/irismail)
[![npm downloads](https://img.shields.io/npm/dm/irismail.svg)](https://www.npmjs.com/package/irismail)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)

A lightweight npm package for sending emails via Gmail and beautiful OTP input components for React.

## Features

- **Email Service**: Simple Gmail-based email sending with minimal configuration
- **OTP Input**: Beautiful, accessible OTP input components with copy-paste support
- **Themeable**: Dark and light themes built-in
- **Flexible**: Multiple sizes (sm/md/lg) and customizable styles via classNames API
- **Composable**: Build custom layouts with InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator
- **Easy to Use**: Minimal API surface - just a few props to get started
- **Type-Safe**: Built with TypeScript
- **Zero Config**: Just add your Gmail credentials - no SMTP configuration needed

## Installation

IrisMail works with all major package managers. No additional configuration is required.

```bash
npm install irismail
pnpm add irismail
yarn add irismail
bun add irismail
```

## Package Exports

| Import | Description |
|--------|-------------|
| `irismail/server` | Email service (IrisMail class and types) |
| `irismail/react` | OTP components (OTP, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator) |
| `irismail` | All exports (server + react + utils) |

## Email Service

Send emails with just your Gmail credentials:

```typescript
import { IrisMail } from 'irismail/server';

const mail = new IrisMail({
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_APP_PASSWORD!,
  },
});

await mail.sendMail({
  from: process.env.GMAIL_USER!,
  to: 'user@example.com',
  subject: 'Hello!',
  html: '<h1>Welcome</h1><p>Thanks for signing up!</p>',
});
```

> **Note:** You'll need to generate a [Gmail App Password](https://support.google.com/accounts/answer/185833) for authentication.

## OTP Input Component

### Basic Usage

```tsx
'use client';

import { useState } from 'react';
import { OTP } from 'irismail/react';

export function VerifyForm() {
  const [code, setCode] = useState('');

  return (
    <OTP
      value={code}
      onChange={setCode}
      onComplete={(value) => verify(value)}
    />
  );
}
```

### With Error State

```tsx
<OTP
  value={code}
  onChange={setCode}
  error={isInvalid}
/>
```

### Custom Length

```tsx
<OTP length={4} value={code} onChange={setCode} />
```

### Themes

Use the `theme` prop to switch between dark and light color schemes:

```tsx
// Dark theme (default)
<OTP theme="dark" value={code} onChange={setCode} />

// Light theme - for light backgrounds
<OTP theme="light" value={code} onChange={setCode} />
```

### Sizes

Use the `slotSize` prop to change the slot dimensions:

```tsx
<OTP slotSize="sm" value={code} onChange={setCode} />
<OTP slotSize="md" value={code} onChange={setCode} />  // default
<OTP slotSize="lg" value={code} onChange={setCode} />
```

### Separator & Grouping

Add visual separators and control grouping:

```tsx
// With separator (auto groups: 3-3 for 6 digits)
<OTP separator value={code} onChange={setCode} />

// Custom group size (2-2-2 for 6 digits)
<OTP separator groupSize={2} value={code} onChange={setCode} />

// Stripe-style (3-3 for 6 digits)
<OTP length={6} separator groupSize={3} value={code} onChange={setCode} />
```

### Custom Styling (classNames API)

Use the `classNames` prop to customize individual parts:

```tsx
<OTP
  value={code}
  onChange={setCode}
  separator
  groupSize={3}
  classNames={{
    slot: "rounded-none first:rounded-l-md last:rounded-r-md",
    slotActive: "ring-2 ring-indigo-500 ring-offset-1 ring-offset-zinc-900",
    separator: "mx-4",
    separatorLine: "bg-indigo-500 w-4 h-0.5",
    caret: "bg-indigo-400",
  }}
/>
```

### Composition Pattern

For custom layouts, use the composition components:

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from 'irismail/react';

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
</InputOTP>
```

InputOTP and composition components support the same styling props: `theme`, `slotSize`, `error`, and `classNames`.

## OTP Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | number | 6 | Number of OTP digits |
| `value` | string | — | Controlled input value |
| `onChange` | (value: string) => void | — | Called when value changes |
| `onComplete` | (value: string) => void | — | Called when all digits entered |
| `theme` | "dark" \| "light" | "dark" | Color theme |
| `slotSize` | "sm" \| "md" \| "lg" | "md" | Size of the input slots |
| `separator` | boolean | false | Show separator between groups |
| `groupSize` | number | length / 2 | Number of slots per group when separator is enabled |
| `disabled` | boolean | false | Disable the input |
| `error` | boolean | false | Show error styling |
| `autoFocus` | boolean | false | Auto focus first slot |
| `name` | string | — | Name attribute for forms |
| `className` | string | — | Container className |
| `classNames` | OTPClassNames | — | Styles API for fine-grained customization |
| `pattern` | string | "^[0-9]*$" | Regex pattern to match input against |

## ClassNames API

The `classNames` prop accepts an object with these keys for custom styling:

| Key | Description |
|-----|-------------|
| `root` | Root container element |
| `group` | Group wrapper containing slots |
| `slot` | Individual digit slot (base state) |
| `slotFilled` | Slot when it contains a digit |
| `slotActive` | Slot when focused/active |
| `slotError` | Slot in error state |
| `separator` | Separator container |
| `separatorLine` | The separator dash/line element |
| `caret` | Blinking caret cursor |

Works with both the `OTP` component and the composition components (`InputOTP`, etc.). OTP components work best with Tailwind CSS; use these class names to override or extend the default styles.

## Documentation

For full documentation and interactive examples, run the docs site:

```bash
npm run site
```

## Contributing

Contributions are welcome.

1. **Clone and install**
   ```bash
   git clone https://github.com/nitin-1926/irismail.git
   cd irismail
   npm install
   ```

2. **Build the package**
   ```bash
   npm run build
   ```

3. **Develop with watch mode**
   ```bash
   npm run dev
   ```

4. **Run the documentation site**
   ```bash
   npm run site
   ```
   Then open [http://localhost:3000](http://localhost:3000).

5. **Submit changes**: Open a pull request with a clear description of the change. Ensure the build passes (`npm run build`) and the package works with the docs site.

## License

ISC
