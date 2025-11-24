import { useState, useEffect } from 'react';
import { OTP_DEFAULTS } from '../../utils/constants';

interface UseOTPOptions {
	email: string;
	onRateLimit?: (resetTime: number) => void;
}

interface RateLimitData {
	attempts: number;
	firstAttemptTime: number;
	lastAttemptTime: number;
}

export function useOTP({ email, onRateLimit }: UseOTPOptions) {
	const [otpTimeLeft, setOtpTimeLeft] = useState(OTP_DEFAULTS.EXPIRY_MINUTES * 60);
	const [resendTimeLeft, setResendTimeLeft] = useState(0);
	const [attemptsLeft, setAttemptsLeft] = useState(OTP_DEFAULTS.MAX_ATTEMPTS);
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [rateLimitResetTime, setRateLimitResetTime] = useState<number | null>(null);

	// Storage helpers
	const getStorageKey = (prefix: string) => `${prefix}_${email}`;

	const getStoredData = <T>(key: string): T | null => {
		if (typeof window === 'undefined') return null;
		const data = sessionStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	};

	const setStoredData = (key: string, data: any) => {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem(key, JSON.stringify(data));
		}
	};

	const removeStoredData = (key: string) => {
		if (typeof window !== 'undefined') {
			sessionStorage.removeItem(key);
		}
	};

	// Check rate limits
	const checkRateLimit = () => {
		const key = getStorageKey('rate_limit');
		const data = getStoredData<RateLimitData>(key);

		if (!data) {
			setAttemptsLeft(OTP_DEFAULTS.MAX_ATTEMPTS);
			setIsRateLimited(false);
			return { limited: false, attemptsLeft: OTP_DEFAULTS.MAX_ATTEMPTS };
		}

		const currentTime = Date.now();
		const resetTime = OTP_DEFAULTS.RATE_LIMIT_RESET_HOURS * 60 * 60 * 1000;

		if (currentTime - data.firstAttemptTime > resetTime) {
			// Reset expired rate limit
			removeStoredData(key);
			setAttemptsLeft(OTP_DEFAULTS.MAX_ATTEMPTS);
			setIsRateLimited(false);
			return { limited: false, attemptsLeft: OTP_DEFAULTS.MAX_ATTEMPTS };
		}

		const attempts = OTP_DEFAULTS.MAX_ATTEMPTS - data.attempts;
		const limited = data.attempts >= OTP_DEFAULTS.MAX_ATTEMPTS;
		const limitResetTime = data.firstAttemptTime + resetTime;

		setAttemptsLeft(Math.max(0, attempts));
		setIsRateLimited(limited);
		setRateLimitResetTime(limited ? limitResetTime : null);

		if (limited && onRateLimit) {
			onRateLimit(limitResetTime);
		}

		return { limited, attemptsLeft: Math.max(0, attempts), resetTime: limited ? limitResetTime : undefined };
	};

	// Update rate limit
	const updateRateLimit = () => {
		const key = getStorageKey('rate_limit');
		const data = getStoredData<RateLimitData>(key);
		const currentTime = Date.now();

		let newData: RateLimitData;

		if (!data) {
			newData = {
				attempts: 1,
				firstAttemptTime: currentTime,
				lastAttemptTime: currentTime,
			};
		} else {
			const resetTime = OTP_DEFAULTS.RATE_LIMIT_RESET_HOURS * 60 * 60 * 1000;
			if (currentTime - data.firstAttemptTime > resetTime) {
				newData = {
					attempts: 1,
					firstAttemptTime: currentTime,
					lastAttemptTime: currentTime,
				};
			} else {
				newData = {
					...data,
					attempts: data.attempts + 1,
					lastAttemptTime: currentTime,
				};
			}
		}

		setStoredData(key, newData);
		checkRateLimit();
		return newData;
	};

	// Check resend cooldown
	const checkResendCooldown = () => {
		const key = getStorageKey('last_sent');
		const lastSentTime = getStoredData<number>(key);

		if (!lastSentTime) {
			setResendTimeLeft(0);
			return { canResend: true, timeLeft: 0 };
		}

		const currentTime = Date.now();
		const timeSinceLastSent = currentTime - lastSentTime;
		const cooldown = OTP_DEFAULTS.RESEND_COOLDOWN_SECONDS * 1000;

		const canResend = timeSinceLastSent >= cooldown;
		const timeLeft = canResend ? 0 : Math.ceil((cooldown - timeSinceLastSent) / 1000);

		setResendTimeLeft(timeLeft);
		return { canResend, timeLeft };
	};

	// Record sent OTP
	const recordSentOTP = () => {
		const key = getStorageKey('last_sent');
		setStoredData(key, Date.now());
		updateRateLimit();
		setOtpTimeLeft(OTP_DEFAULTS.EXPIRY_MINUTES * 60);
		setResendTimeLeft(OTP_DEFAULTS.RESEND_COOLDOWN_SECONDS);
	};

	// Initialize
	useEffect(() => {
		checkRateLimit();
		checkResendCooldown();

		const timer = setInterval(() => {
			setOtpTimeLeft((prev) => Math.max(0, prev - 1));
			
			const { timeLeft } = checkResendCooldown();
			setResendTimeLeft(timeLeft);
		}, 1000);

		return () => clearInterval(timer);
	}, [email]);

	// Format time helper
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	return {
		otpTimeLeft,
		resendTimeLeft,
		attemptsLeft,
		isRateLimited,
		rateLimitResetTime,
		formatTime,
		recordSentOTP,
		checkRateLimit,
	};
}
