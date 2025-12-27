import nodemailer from 'nodemailer';

export interface IrisMailConfig {
	auth: {
		user: string;  // Gmail username/email
		pass: string;  // Gmail app password
	};
}

export interface SendMailOptions {
	from: string;
	to: string;
	subject: string;
	html: string;
}

export interface SendMailResult {
	success: boolean;
	messageId: string;
}

/**
 * IrisMail - Simple Gmail email sending service
 * 
 * Automatically configured for Gmail SMTP. Only requires your Gmail credentials.
 *
 * @example
 * ```typescript
 * const mail = new IrisMail({
 *   auth: {
 *     user: process.env.GMAIL_USERNAME,
 *     pass: process.env.GMAIL_PASSWORD
 *   }
 * });
 *
 * await mail.sendMail({
 *   from: process.env.GMAIL_USERNAME,
 *   to: 'friend@example.com',
 *   subject: 'Hello!',
 *   html: '<h1>Welcome</h1><p>Thanks for signing up!</p>'
 * });
 * ```
 */
export class IrisMail {
	private transporter: nodemailer.Transporter;

	constructor(config: IrisMailConfig) {
		// Auto-configure Gmail SMTP settings
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: config.auth,
		});
	}

	/**
	 * Send an email
	 * @param options - Email options (from, to, subject, html)
	 * @returns Promise with success status and messageId
	 */
	async sendMail(options: SendMailOptions): Promise<SendMailResult> {
		const { from, to, subject, html } = options;

		// Generate plain text fallback from HTML
		const text = html.replace(/<[^>]*>/g, '');

		const info = await this.transporter.sendMail({
			from,
			to,
			subject,
			html,
			text,
		});

		return {
			success: true,
			messageId: info.messageId,
		};
	}
}
