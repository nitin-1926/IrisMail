import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';

/**
 * Encrypts a string using AES-256-CBC
 * @param text - The text to encrypt
 * @param secretKey - The 32-character secret key
 * @returns - The encrypted value with IV and encrypted data, base64 encoded
 */
export function encrypt(text: string, secretKey: string): string {
	try {
		// Ensure key is 32 bytes
		const key = Buffer.from(secretKey.padEnd(32).slice(0, 32));
		
		// Generate a random initialization vector
		const iv = crypto.randomBytes(16);

		// Create cipher
		const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

		// Encrypt the text
		let encrypted = cipher.update(text, 'utf8', 'base64');
		encrypted += cipher.final('base64');

		// Return IV and encrypted data together
		// We prefix with the IV so we can extract it for decryption
		return iv.toString('hex') + ':' + encrypted;
	} catch (error) {
		console.error('Encryption error:', error);
		throw new Error('Failed to encrypt data');
	}
}

/**
 * Decrypts a string that was encrypted using the encrypt function
 * @param encryptedText - The encrypted text (IV:EncryptedData format)
 * @param secretKey - The 32-character secret key
 * @returns - The decrypted string
 */
export function decrypt(encryptedText: string, secretKey: string): string {
	try {
		// Ensure key is 32 bytes
		const key = Buffer.from(secretKey.padEnd(32).slice(0, 32));

		// Extract the IV and the encrypted data
		const parts = encryptedText.split(':');
		if (parts.length !== 2) {
			throw new Error('Invalid encrypted text format');
		}

		const iv = Buffer.from(parts[0], 'hex');
		const encrypted = parts[1];

		// Create decipher
		const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

		// Decrypt the data
		let decrypted = decipher.update(encrypted, 'base64', 'utf8');
		decrypted += decipher.final('utf8');

		return decrypted;
	} catch (error) {
		console.error('Decryption error:', error);
		throw new Error('Failed to decrypt data');
	}
}
