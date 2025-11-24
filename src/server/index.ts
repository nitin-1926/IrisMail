import { EmailService, EmailConfig, SendEmailOptions } from './email';
import { OTPService, OTPData } from './otp';
import { encrypt, decrypt } from './crypto';

export class IrisMailService {
	public email: EmailService;
	public otp: OTPService;

	constructor(config: { email: EmailConfig; secretKey: string }) {
		this.email = new EmailService(config.email);
		this.otp = new OTPService(config.secretKey);
	}
}

export { EmailService, OTPService, encrypt, decrypt };
export type { EmailConfig, SendEmailOptions, OTPData };
