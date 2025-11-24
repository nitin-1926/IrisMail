import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { cn } from '../../utils/constants';

const Dot = () => (
	<svg
		width="15"
		height="15"
		viewBox="0 0 15 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="h-4 w-4"
	>
		<path
			d="M7.5 7.5C7.5 8.32843 6.82843 9 6 9C5.17157 9 4.5 8.32843 4.5 7.5C4.5 6.67157 5.17157 6 6 6C6.82843 6 7.5 6.67157 7.5 7.5Z"
			fill="currentColor"
			fillRule="evenodd"
			clipRule="evenodd"
		/>
	</svg>
);

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
	({ className, containerClassName, ...props }, ref) => (
		<OTPInput
			ref={ref}
			containerClassName={cn('flex items-center gap-2 has-[:disabled]:opacity-50', containerClassName)}
			className={cn('disabled:cursor-not-allowed', className)}
			{...props}
		/>
	),
);
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center', className)} {...props} />,
);
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

	return (
		<div
			ref={ref}
			className={cn(
				'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
				isActive && 'z-10 ring-2 ring-ring ring-offset-background',
				className,
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
				</div>
			)}
		</div>
	);
});
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
	({ ...props }, ref) => (
		<div ref={ref} role="separator" {...props}>
			<Dot />
		</div>
	),
);
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
