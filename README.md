# IrisMail

A modular, secure, and easy-to-use Gmail-based Email and OTP service for Next.js applications, with built-in Shadcn UI support.

## Features

- 📧 **Email Service**: Simple Gmail-based email sending with minimal configuration.
- 🔐 **Secure OTP**: Server-side OTP generation, encryption, and validation.
- 🎨 **OTP UI Kit**: `InputOTPField`, slots, separators, and variants inspired by modern UI libraries.
- ⚡ **React Hook**: `useOTP` hook for managing timers, rate limiting, and resend cooldowns.
- 🛡️ **Type-Safe**: Built with TypeScript.
- ⚙️ **Zero Config**: Just add your Gmail credentials - no SMTP configuration needed!

## Documentation & playground

Spin up the Astro-powered docs site (installation instructions, OTP playground, API guides):

```bash
npm run docs
# or open docs locally
cd docs && npm install && npm run dev
```

Production builds live under `docs/dist` via `npm run docs:build`.

## Installation

```bash
npm install irismail
# or
yarn add irismail
# or
pnpm add irismail
```

## Usage

### 1. Server-Side Setup (API Routes)

Initialize the service with your Gmail credentials only - SMTP settings are auto-configured.

> **Note:** You'll need to generate a [Gmail App Password](https://support.google.com/accounts/answer/185833) for the `GMAIL_PASSWORD` environment variable.

```typescript
// app/api/send-otp/route.ts
import { IrisMailService } from 'irismail/server';
import { NextResponse } from 'next/server';

const irismail = new IrisMailService({
  email: {
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
    defaults: {
      from: {
        name: 'My App',
        address: process.env.GMAIL_USERNAME,
      },
    },
  },
  secretKey: process.env.OTP_SECRET_KEY, // Must be 32 chars
});

export async function POST(req: Request) {
  const { email } = await req.json();
  
  // Generate and encrypt OTP
  const otp = irismail.otp.generateOTP();
  const encryptedOtp = irismail.otp.encryptOTP(otp);
  
  // Send email
  await irismail.email.sendEmail({
    to: email,
    subject: 'Your Verification Code',
    html: `<p>Your code is: <b>${otp}</b></p>`,
  });
  
  return NextResponse.json({ encryptedOtp });
}
```

### 2. Client-Side Setup (React Component)

Use the `InputOTP` component and `useOTP` hook in your verification form.

```tsx
// components/verify-form.tsx
'use client';

import { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot, useOTP } from 'irismail/react';

export function VerifyForm({ email }) {
  const [otp, setOtp] = useState('');
  const { otpTimeLeft, resendTimeLeft, formatTime } = useOTP({ email });

  return (
    <div className="space-y-4">
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={setOtp}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      
      <div className="text-sm">
        Time remaining: {formatTime(otpTimeLeft)}
      </div>
    </div>
  );
}
```

## Local Testing

Want to test the package locally before publishing? We've included a complete example app!

1. **Navigate to the example directory**:
   ```bash
   cd example
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Gmail credentials:
   # GMAIL_USERNAME=your-email@gmail.com
   # GMAIL_PASSWORD=your-app-password
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** to see:
   - Interactive OTP demo with email sending
   - Live documentation with code examples
   - All features working together

See `example/README.md` for more details.

## Publishing to NPM

1.  **Login to NPM**:
    ```bash
    npm login
    ```

2.  **Build the package**:
    ```bash
    npm run build
    ```

3.  **Publish**:
    ```bash
    npm publish --access public
    ```

## License

ISC
