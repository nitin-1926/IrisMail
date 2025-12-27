import { IrisMail } from 'irismail/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Check for required environment variables (Gmail-only config)
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        {
          error: 'Gmail credentials not configured.',
          hint: 'Set GMAIL_USER and GMAIL_APP_PASSWORD environment variables.',
        },
        { status: 500 }
      );
    }

    const { from, to, subject, html } = await req.json();

    // Validate required fields
    if (!from || !to || !subject || !html) {
      return NextResponse.json(
        { error: 'Missing required fields: from, to, subject, html' },
        { status: 400 }
      );
    }

    const mail = new IrisMail({
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const result = await mail.sendMail({ from, to, subject, html });

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send email';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
