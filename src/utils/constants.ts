import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const OTP_DEFAULTS = {
	LENGTH: 6,
	EXPIRY_MINUTES: 5,
	RESEND_COOLDOWN_SECONDS: 120, // 2 minutes
	MAX_ATTEMPTS: 5,
	RATE_LIMIT_RESET_HOURS: 1,
};
