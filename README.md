# IrisMail

A lightweight npm package for sending emails via Gmail and beautiful OTP input components for React.

## Features

- 📧 **Email Service**: Simple Gmail-based email sending with minimal configuration
- 🔢 **OTP Input**: Beautiful, accessible OTP input components with copy-paste support
- ⚡ **Easy to Use**: Minimal API surface - just a few props to get started
- 🛡️ **Type-Safe**: Built with TypeScript
- ⚙️ **Zero Config**: Just add your Gmail credentials - no SMTP configuration needed

## Installation

```bash
npm install irismail
```

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

### Composition Pattern

For custom layouts with separators:

```tsx
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot, 
  InputOTPSeparator 
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

## OTP Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | number | 6 | Number of OTP digits |
| `value` | string | — | Controlled input value |
| `onChange` | (value: string) => void | — | Called when value changes |
| `onComplete` | (value: string) => void | — | Called when all digits entered |
| `disabled` | boolean | false | Disable the input |
| `error` | boolean | false | Show error styling |
| `autoFocus` | boolean | false | Auto focus first slot |
| `name` | string | — | Name attribute for forms |
| `className` | string | — | Container className |

## Documentation

For full documentation and interactive examples, run the docs site:

```bash
npm run site
```

## License

ISC
