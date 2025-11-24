import { encrypt, decrypt } from './crypto';

export interface OTPData {
	otp: string;
	timestamp: number;
}

export class OTPService {
	private secretKey: string;

	constructor(secretKey: string) {
		if (!secretKey) {
			throw new Error('OTPService: secretKey is required');
		}
		this.secretKey = secretKey;
	}

	/**
	 * Generate a numeric OTP of specified length
	 * @param length - Length of the OTP (default: 6)
	 * @returns - The generated OTP string
	 */
	generateOTP(length: number = 6): string {
		const min = Math.pow(10, length - 1);
		const max = Math.pow(10, length) - 1;
		return Math.floor(min + Math.random() * (max - min + 1)).toString();
	}

	/**
	 * Encrypt OTP data for secure storage/transmission
	 * @param otp - The OTP string
	 * @param timestamp - The timestamp when OTP was generated (default: now)
	 * @returns - Encrypted OTP data string
	 */
	encryptOTP(otp: string, timestamp: number = Date.now()): string {
		const data = JSON.stringify({ otp, timestamp });
		return encrypt(data, this.secretKey);
	}

	/**
	 * Decrypt OTP data
	 * @param encryptedData - The encrypted OTP string
	 * @returns - Decrypted OTP data object or null if failed
	 */
	decryptOTP(encryptedData: string): OTPData | null {
		try {
			const decryptedData = decrypt(encryptedData, this.secretKey);
			return JSON.parse(decryptedData);
		} catch (error) {
			console.error('Error decrypting OTP data:', error);
			return null;
		}
	}

	/**
	 * Verify an OTP against encrypted data
	 * @param inputOtp - The OTP provided by the user
	 * @param encryptedData - The encrypted OTP data
	 * @param expiryMinutes - Expiry time in minutes (default: 5)
	 * @returns - Object containing valid status and message
	 */
	verifyOTP(inputOtp: string, encryptedData: string, expiryMinutes: number = 5): { valid: boolean; message: string } {
		const data = this.decryptOTP(encryptedData);

		if (!data) {
			return { valid: false, message: 'Invalid OTP data' };
		}

		const { otp, timestamp } = data;
		const currentTime = Date.now();
		const otpAge = currentTime - timestamp;
		const expiryTime = expiryMinutes * 60 * 1000;

		if (otpAge > expiryTime) {
			return { valid: false, message: 'OTP has expired' };
		}

		if (otp !== inputOtp) {
			return { valid: false, message: 'Incorrect OTP' };
		}

		return { valid: true, message: 'OTP verified successfully' };
	}
}
