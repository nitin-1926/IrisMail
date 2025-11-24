import nodemailer from 'nodemailer';

export interface EmailConfig {
	transport: {
		host: string;
		port: number;
		secure?: boolean;
		auth: {
			user: string;
			pass: string;
		};
	};
	defaults?: {
		from?: {
			name: string;
			address: string;
		};
	};
}

export interface SendEmailOptions {
	to: string;
	subject: string;
	html: string;
	text?: string;
	from?: {
		name: string;
		address: string;
	};
}

export class EmailService {
	private transporter: nodemailer.Transporter;
	private config: EmailConfig;

	constructor(config: EmailConfig) {
		this.config = config;
		this.transporter = nodemailer.createTransport(config.transport);
	}

	/**
	 * Verify SMTP connection configuration
	 */
	async verifyConnection(): Promise<boolean> {
		try {
			await this.transporter.verify();
			return true;
		} catch (error) {
			console.error('SMTP connection verification failed:', error);
			return false;
		}
	}

	/**
	 * Send an email
	 * @param options - Email options (to, subject, html, text, from)
	 * @returns - Result of the send operation
	 */
	async sendEmail(options: SendEmailOptions) {
		const from = options.from || this.config.defaults?.from;

		if (!from) {
			throw new Error('From address is required either in options or config defaults');
		}

		const mailOptions = {
			from: {
				name: from.name,
				address: from.address,
			},
			to: options.to,
			subject: options.subject,
			html: options.html,
			text: options.text || options.html.replace(/<[^>]*>/g, ''), // Simple HTML to text fallback
		};

		try {
			const info = await this.transporter.sendMail(mailOptions);
			return {
				success: true,
				messageId: info.messageId,
			};
		} catch (error: any) {
			console.error('Error sending email:', error);
			throw error;
		}
	}
}
