import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { cn } from '../../utils/constants';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type InputOTPSlotSize = 'sm' | 'md' | 'lg';
type InputOTPSlotVariant = 'outline' | 'filled' | 'underline';
type InputOTPStatus = 'default' | 'error' | 'success';
type InputOTPAccent = 'iris' | 'blush' | 'emerald' | 'slate';

// ─────────────────────────────────────────────────────────────────────────────
// Style Maps
// ─────────────────────────────────────────────────────────────────────────────

const SLOT_SIZE_STYLES: Record<InputOTPSlotSize, { container: string; caret: string }> = {
	sm: { container: 'h-10 w-10 text-lg', caret: 'h-5' },
	md: { container: 'h-12 w-12 text-xl', caret: 'h-6' },
	lg: { container: 'h-14 w-14 text-2xl', caret: 'h-7' },
};

const SLOT_VARIANT_STYLES: Record<InputOTPSlotVariant, string> = {
	outline: 'border-2 border-white/30 bg-white/5 rounded-lg shadow-sm',
	filled: 'border-2 border-transparent bg-white/20 rounded-lg shadow-inner',
	underline: 'border-0 border-b-2 border-b-white/60 rounded-none bg-transparent pb-1',
};

const SLOT_STATUS_STYLES: Record<InputOTPStatus, string> = {
	default: '',
	error: '!border-red-500/70 !bg-red-500/10',
	success: '!border-emerald-500/70 !bg-emerald-500/10',
};

const ACCENT_COLORS: Record<InputOTPAccent, { ring: string; caret: string; border: string }> = {
	iris: {
		ring: 'ring-indigo-500/50',
		caret: 'bg-indigo-400',
		border: 'border-indigo-500/70',
	},
	blush: {
		ring: 'ring-pink-500/50',
		caret: 'bg-pink-400',
		border: 'border-pink-500/70',
	},
	emerald: {
		ring: 'ring-emerald-500/50',
		caret: 'bg-emerald-400',
		border: 'border-emerald-500/70',
	},
	slate: {
		ring: 'ring-slate-400/50',
		caret: 'bg-slate-400',
		border: 'border-slate-400/70',
	},
};

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

type OTPStyleContextValue = {
	size: InputOTPSlotSize;
	variant: InputOTPSlotVariant;
	status: InputOTPStatus;
	accent: InputOTPAccent;
	disabled?: boolean;
	showCursor?: boolean;
	cursorMode?: 'blink' | 'static';
};

const OTPStyleContext = React.createContext<OTPStyleContextValue>({
	size: 'md',
	variant: 'outline',
	status: 'default',
	accent: 'iris',
	disabled: false,
	showCursor: true,
	cursorMode: 'blink',
});

const useOTPStyle = () => React.useContext(OTPStyleContext);

// ─────────────────────────────────────────────────────────────────────────────
// InputOTP (Root)
// ─────────────────────────────────────────────────────────────────────────────

type InputOTPProps = {
	value?: string;
	onChange?: (newValue: string) => unknown;
	maxLength: number;
	textAlign?: 'left' | 'center' | 'right';
	onComplete?: (...args: unknown[]) => unknown;
	disabled?: boolean;
	className?: string;
	containerClassName?: string;
	children: React.ReactNode;
	size?: InputOTPSlotSize;
	variant?: InputOTPSlotVariant;
	status?: InputOTPStatus;
	accent?: InputOTPAccent;
	/** Input pattern regex for validation */
	pattern?: string;
	/** Show cursor/caret (default: true) */
	showCursor?: boolean;
	/** Cursor animation mode (default: 'blink') */
	cursorMode?: 'blink' | 'static';
};

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
	(
		{
			className,
			containerClassName,
			size = 'md',
			variant = 'outline',
			status = 'default',
			accent = 'iris',
			disabled,
			pattern,
			showCursor = true,
			cursorMode = 'blink',
			...props
		},
		ref,
	) => (
		<OTPStyleContext.Provider value={{ size, variant, status, accent, disabled, showCursor, cursorMode }}>
			<OTPInput
				ref={ref}
				disabled={disabled}
				pattern={pattern}
				containerClassName={cn(
					'flex items-center gap-3 has-[:disabled]:opacity-50',
					containerClassName,
				)}
				className={cn('disabled:cursor-not-allowed', className)}
				{...props}
			/>
		</OTPStyleContext.Provider>
	),
);
InputOTP.displayName = 'InputOTP';

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPGroup
// ─────────────────────────────────────────────────────────────────────────────

type InputOTPGroupProps = React.ComponentPropsWithoutRef<'div'> & {
	gap?: 'none' | 'tight' | 'normal' | 'relaxed';
};

const GAP_MAP: Record<Required<InputOTPGroupProps>['gap'], string> = {
	none: 'gap-0',
	tight: 'gap-1',
	normal: 'gap-2',
	relaxed: 'gap-3',
};

const InputOTPGroup = React.forwardRef<React.ElementRef<'div'>, InputOTPGroupProps>(
	({ className, gap = 'normal', ...props }, ref) => (
		<div
			ref={ref}
			className={cn('flex items-center', GAP_MAP[gap], className)}
			{...props}
		/>
	),
);
InputOTPGroup.displayName = 'InputOTPGroup';

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPSlot
// ─────────────────────────────────────────────────────────────────────────────

type InputOTPSlotProps = React.ComponentPropsWithoutRef<'div'> & {
	index: number;
};

const InputOTPSlot = React.forwardRef<React.ElementRef<'div'>, InputOTPSlotProps>(
	({ index, className, ...props }, ref) => {
		const inputOTPContext = React.useContext(OTPInputContext);
		const { size, variant, status, accent, disabled, showCursor, cursorMode } = useOTPStyle();
		const slot = inputOTPContext.slots[index];
		const { char, hasFakeCaret, isActive } = slot;

		const accentStyles = ACCENT_COLORS[accent];
		const sizeStyles = SLOT_SIZE_STYLES[size];

		// Build active state styles based on variant
		const getActiveStyles = () => {
			if (!isActive) return '';
			if (variant === 'underline') {
				return cn('ring-0', accentStyles.border.replace('border-', 'border-b-'));
			}
			return cn(
				'ring-2 ring-offset-2 ring-offset-transparent',
				accentStyles.ring,
				accentStyles.border,
			);
		};

		// Build filled state styles with accent color
		const getFilledStyles = () => {
			if (!char) return '';
			if (variant === 'outline') {
				return cn(accentStyles.border, 'border-opacity-60');
			}
			if (variant === 'filled') {
				return cn('bg-white/25', accentStyles.border, 'border-opacity-40');
			}
			if (variant === 'underline') {
				return cn(accentStyles.border.replace('border-', 'border-b-'), 'border-b-opacity-80');
			}
			return '';
		};

		return (
			<div
				ref={ref}
				className={cn(
					// Base styles
					'relative flex items-center justify-center',
					'font-mono font-semibold text-white',
					'transition-all duration-200 ease-out',
					// Size
					sizeStyles.container,
					// Variant
					SLOT_VARIANT_STYLES[variant],
					// Filled state with accent color
					getFilledStyles(),
					// Status overrides (with ! important to override other styles)
					status !== 'default' && SLOT_STATUS_STYLES[status],
					// Active state
					getActiveStyles(),
					// Disabled state
					disabled && 'opacity-50 cursor-not-allowed',
					className,
				)}
				data-active={isActive}
				data-filled={Boolean(char)}
				{...props}
			>
				{char}
				{showCursor && hasFakeCaret && (
					<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
						<div
							className={cn(
								'w-0.5 rounded-full',
								cursorMode === 'blink' && 'animate-caret-blink',
								sizeStyles.caret,
								accentStyles.caret,
							)}
						/>
					</div>
				)}
			</div>
		);
	},
);
InputOTPSlot.displayName = 'InputOTPSlot';

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPSeparator
// ─────────────────────────────────────────────────────────────────────────────

type InputOTPSeparatorProps = React.ComponentPropsWithoutRef<'div'> & {
	variant?: 'dash' | 'dot' | 'slash';
};

const InputOTPSeparator = React.forwardRef<React.ElementRef<'div'>, InputOTPSeparatorProps>(
	({ className, variant = 'dash', ...props }, ref) => (
		<div
			ref={ref}
			role="separator"
			className={cn('flex items-center justify-center text-white/50 px-2', className)}
			{...props}
		>
			{variant === 'dash' && <span className="w-4 h-0.5 bg-white/50 rounded-full" />}
			{variant === 'dot' && <span className="w-2 h-2 bg-white/50 rounded-full" />}
			{variant === 'slash' && <span className="text-xl font-light text-white/50">/</span>}
		</div>
	),
);
InputOTPSeparator.displayName = 'InputOTPSeparator';

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPLabel
// ─────────────────────────────────────────────────────────────────────────────

const InputOTPLabel = React.forwardRef<
	React.ElementRef<'label'>,
	React.ComponentPropsWithoutRef<'label'> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
	<label
		ref={ref}
		className={cn('block text-sm font-medium text-white/90 mb-2', className)}
		{...props}
	>
		{children}
		{required && <span className="ml-1 text-red-400">*</span>}
	</label>
));
InputOTPLabel.displayName = 'InputOTPLabel';

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPDescription
// ─────────────────────────────────────────────────────────────────────────────

const InputOTPDescription = React.forwardRef<React.ElementRef<'p'>, React.ComponentPropsWithoutRef<'p'>>(
	({ className, ...props }, ref) => (
		<p ref={ref} className={cn('text-sm text-white/50 mb-3', className)} {...props} />
	),
);
InputOTPDescription.displayName = 'InputOTPDescription';

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPMessage
// ─────────────────────────────────────────────────────────────────────────────

type InputOTPMessageProps = React.ComponentPropsWithoutRef<'p'> & {
	status?: InputOTPStatus;
};

const STATUS_MESSAGE_STYLES: Record<InputOTPStatus, string> = {
	default: 'text-white/50',
	error: 'text-red-400',
	success: 'text-emerald-400',
};

const InputOTPMessage = React.forwardRef<React.ElementRef<'p'>, InputOTPMessageProps>(
	({ className, status = 'default', children, ...props }, ref) => {
		if (!children) return null;

		return (
			<p
				ref={ref}
				className={cn('flex items-center gap-2 text-sm mt-3', STATUS_MESSAGE_STYLES[status], className)}
				{...props}
			>
				{status === 'error' && (
					<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				)}
				{status === 'success' && (
					<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				)}
				<span>{children}</span>
			</p>
		);
	},
);
InputOTPMessage.displayName = 'InputOTPMessage';

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPField (Compound component with label, description, message)
// ─────────────────────────────────────────────────────────────────────────────

type InputOTPFieldProps = InputOTPProps & {
	label?: React.ReactNode;
	description?: React.ReactNode;
	helperText?: React.ReactNode;
	errorText?: React.ReactNode;
	successText?: React.ReactNode;
	required?: boolean;
};

const InputOTPField = React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPFieldProps>(
	(
		{
			label,
			description,
			helperText,
			errorText,
			successText,
			status = 'default',
			required,
			className,
			...props
		},
		ref,
	) => {
		const message =
			status === 'error'
				? errorText ?? helperText
				: status === 'success'
					? successText ?? helperText
					: helperText;

		return (
			<div className={cn('w-fit', className)}>
				{label && <InputOTPLabel required={required}>{label}</InputOTPLabel>}
				{description && <InputOTPDescription>{description}</InputOTPDescription>}
				<InputOTP ref={ref} status={status} {...props} />
				{message && <InputOTPMessage status={status}>{message}</InputOTPMessage>}
			</div>
		);
	},
);
InputOTPField.displayName = 'InputOTPField';

// ─────────────────────────────────────────────────────────────────────────────
// OTP (Simplified Component)
// ─────────────────────────────────────────────────────────────────────────────

type OTPInputType = 'numeric' | 'alphanumeric' | 'alphabetic';
type OTPSeparatorType = 'dash' | 'dot' | 'slash' | 'none';

type OTPProps = {
	/** Number of OTP digits (default: 6) */
	digits?: number;
	/** Input type: numeric, alphanumeric, or alphabetic (default: numeric) */
	type?: OTPInputType;
	/** Group size for visual grouping with separators (default: no grouping) */
	groupSize?: number;
	/** Separator style between groups (default: dash) */
	separator?: OTPSeparatorType;
	/** Size of input slots */
	size?: InputOTPSlotSize;
	/** Visual style variant */
	variant?: InputOTPSlotVariant;
	/** Accent color for focus states */
	accent?: InputOTPAccent;
	/** Validation status */
	status?: InputOTPStatus;
	/** Controlled input value */
	value?: string;
	/** Called when value changes */
	onChange?: (value: string) => void;
	/** Called when all digits are entered */
	onComplete?: (...args: unknown[]) => unknown;
	/** Disable the input */
	disabled?: boolean;
	/** Label text above the input */
	label?: React.ReactNode;
	/** Description text below the label */
	description?: React.ReactNode;
	/** Helper text below the input */
	helperText?: React.ReactNode;
	/** Error message (shown when status='error') */
	errorText?: React.ReactNode;
	/** Success message (shown when status='success') */
	successText?: React.ReactNode;
	/** Show required indicator on label */
	required?: boolean;
	/** Additional class name */
	className?: string;
	/** Show cursor/caret (default: true) */
	showCursor?: boolean;
	/** Cursor animation mode (default: 'blink') */
	cursorMode?: 'blink' | 'static';
};

// Pattern regex for input types
const INPUT_PATTERNS: Record<OTPInputType, string> = {
	numeric: '^[0-9]*$',
	alphanumeric: '^[a-zA-Z0-9]*$',
	alphabetic: '^[a-zA-Z]*$',
};

/**
 * Simplified OTP input component with automatic slot generation.
 *
 * @example
 * // Basic 6-digit numeric OTP
 * <OTP digits={6} value={otp} onChange={setOtp} />
 *
 * @example
 * // Grouped with separator
 * <OTP digits={6} groupSize={3} separator="dash" />
 *
 * @example
 * // With label and validation
 * <OTP
 *   digits={6}
 *   label="Enter verification code"
 *   status="error"
 *   errorText="Invalid code"
 * />
 */
const OTP = React.forwardRef<React.ElementRef<typeof OTPInput>, OTPProps>(
	(
		{
			digits = 6,
			type = 'numeric',
			groupSize,
			separator = 'dash',
			size = 'md',
			variant = 'outline',
			accent = 'iris',
			status = 'default',
			value,
			onChange,
			onComplete,
			disabled,
			label,
			description,
			helperText,
			errorText,
			successText,
			required,
			className,
			showCursor = true,
			cursorMode = 'blink',
		},
		ref,
	) => {
		// Generate slot indices
		const slotIndices = Array.from({ length: digits }, (_, i) => i);

		// Group slots if groupSize is specified
		const renderSlots = () => {
			if (!groupSize || groupSize <= 0 || groupSize >= digits) {
				// No grouping - render all slots in one group
				return (
					<InputOTPGroup>
						{slotIndices.map((index) => (
							<InputOTPSlot key={index} index={index} />
						))}
					</InputOTPGroup>
				);
			}

			// Group slots with separators
			const groups: number[][] = [];
			for (let i = 0; i < digits; i += groupSize) {
				groups.push(slotIndices.slice(i, Math.min(i + groupSize, digits)));
			}

			return groups.map((group, groupIndex) => (
				<React.Fragment key={groupIndex}>
					<InputOTPGroup>
						{group.map((index) => (
							<InputOTPSlot key={index} index={index} />
						))}
					</InputOTPGroup>
					{separator !== 'none' && groupIndex < groups.length - 1 && (
						<InputOTPSeparator variant={separator} />
					)}
				</React.Fragment>
			));
		};

		// Determine message to show
		const message =
			status === 'error'
				? errorText ?? helperText
				: status === 'success'
					? successText ?? helperText
					: helperText;

		return (
			<div className={cn('w-fit', className)}>
				{label && <InputOTPLabel required={required}>{label}</InputOTPLabel>}
				{description && <InputOTPDescription>{description}</InputOTPDescription>}
				<InputOTP
					ref={ref}
					maxLength={digits}
					value={value}
					onChange={onChange}
					onComplete={onComplete}
					disabled={disabled}
					size={size}
					variant={variant}
					accent={accent}
					status={status}
					pattern={INPUT_PATTERNS[type]}
					showCursor={showCursor}
					cursorMode={cursorMode}
				>
					{renderSlots()}
				</InputOTP>
				{message && <InputOTPMessage status={status}>{message}</InputOTPMessage>}
			</div>
		);
	},
);
OTP.displayName = 'OTP';

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────

export {
	InputOTP,
	InputOTPDescription,
	InputOTPField,
	InputOTPGroup,
	InputOTPLabel,
	InputOTPMessage,
	InputOTPSeparator,
	InputOTPSlot,
	OTP,
};

export type {
	InputOTPSlotSize,
	InputOTPSlotVariant,
	InputOTPStatus,
	InputOTPAccent,
	InputOTPProps,
	InputOTPFieldProps,
	OTPInputType,
	OTPSeparatorType,
	OTPProps,
};
