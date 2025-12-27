# Pigeon Testing Example

This is a Next.js application for testing the `pigeon` package locally.

## Setup

1. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   - `GMAIL_USER`: Your Gmail address
   - `GMAIL_PASS`: Your Gmail app password ([how to create](https://support.google.com/accounts/answer/185833))
   - `OTP_SECRET_KEY`: A 32-character secret key for encryption

3. Install dependencies (already done if you followed the main setup):
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## What You Can Test

- **Email Sending**: Enter an email and click "Send OTP" to test email delivery
- **OTP Input**: See the Shadcn UI component in action
- **Timer Management**: Watch the countdown timers for OTP expiry and resend cooldown
- **Rate Limiting**: Try sending multiple OTPs to see rate limiting kick in
- **OTP Verification**: Enter the code you received via email to test validation

## Pages

- `/` - Main demo page with interactive testing
- `/docs` - Documentation with usage examples and API reference

## API Routes

- `POST /api/send-otp` - Sends an OTP via email
- `POST /api/verify-otp` - Verifies an OTP

## Tips

- Use your own email address for testing
- Make sure to use a Gmail app password, not your regular password
- The OTP expires in 5 minutes by default
- You can resend after 2 minutes
- Maximum 5 attempts per hour
