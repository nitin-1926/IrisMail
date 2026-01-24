"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";
import { cn } from "../../utils/constants";

// ─────────────────────────────────────────────────────────────────────────────
// InputOTP (Root) - Low-level component for composition pattern
// ─────────────────────────────────────────────────────────────────────────────

type InputOTPContextValue = {
  error?: boolean;
};

const InputOTPStyleContext = React.createContext<InputOTPContextValue>({});

type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput> & {
  /** Show error styling */
  error?: boolean;
};

/**
 * Low-level OTP input wrapper for the composition pattern.
 * Use this when you need custom slot arrangements.
 *
 * @example
 * ```tsx
 * <InputOTP maxLength={6} value={code} onChange={setCode}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 */
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ className, containerClassName, error, ...props }, ref) => (
  <InputOTPStyleContext.Provider value={{ error }}>
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  </InputOTPStyleContext.Provider>
));
InputOTP.displayName = "InputOTP";

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPGroup - Groups slots together
// ─────────────────────────────────────────────────────────────────────────────

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPSlot - Individual digit slot
// ─────────────────────────────────────────────────────────────────────────────

type InputOTPSlotProps = React.ComponentPropsWithoutRef<"div"> & {
  index: number;
};

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  InputOTPSlotProps
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { error } = React.useContext(InputOTPStyleContext);
  const slot = inputOTPContext.slots[index];
  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        "relative flex h-12 w-10 items-center justify-center",
        "border-2 rounded-lg",
        "font-mono text-lg font-medium",
        "transition-all duration-150",
        // Default state
        "border-zinc-700 bg-zinc-900 text-white",
        // Filled state
        char && "border-zinc-500",
        // Active/focus state
        isActive && "ring-2 ring-offset-2 ring-offset-zinc-950 ring-indigo-500 border-indigo-500",
        // Error state
        error && "border-red-500/70 bg-red-500/10",
        error && isActive && "ring-red-500",
        className
      )}
      data-active={isActive}
      data-filled={Boolean(char)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-0.5 animate-caret-blink rounded-full bg-indigo-400" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPSeparator - Visual separator between groups
// ─────────────────────────────────────────────────────────────────────────────

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("flex items-center justify-center text-zinc-500", className)}
    {...props}
  >
    <span className="w-3 h-0.5 bg-zinc-600 rounded-full" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

// ─────────────────────────────────────────────────────────────────────────────
// OTP - Simplified, easy-to-use component
// ─────────────────────────────────────────────────────────────────────────────

type OTPProps = {
  /** Number of OTP digits (default: 6) */
  length?: number;
  /** Controlled input value */
  value?: string;
  /** Called when value changes */
  onChange?: (value: string) => void;
  /** Called when all digits are entered */
  onComplete?: (value: string) => void;
  /** Disable the input */
  disabled?: boolean;
  /** Show error styling */
  error?: boolean;
  /** Auto focus the first input on mount */
  autoFocus?: boolean;
  /** Name attribute for form integration */
  name?: string;
  /** Additional className for the container */
  className?: string;
  /** Pattern to match input against (default: digits only) */
  pattern?: string;
};

/**
 * Simple, easy-to-use OTP input component.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <OTP value={code} onChange={setCode} />
 *
 * // With completion callback
 * <OTP
 *   value={code}
 *   onChange={setCode}
 *   onComplete={(value) => verify(value)}
 * />
 *
 * // With error state
 * <OTP value={code} onChange={setCode} error={isInvalid} />
 *
 * // Custom length
 * <OTP length={4} value={code} onChange={setCode} />
 * ```
 */
const OTP = React.forwardRef<React.ElementRef<typeof OTPInput>, OTPProps>(
  (
    {
      length = 6,
      value,
      onChange,
      onComplete,
      disabled,
      error,
      autoFocus,
      name,
      className,
      pattern = "^[0-9]*$",
    },
    ref
  ) => {
    // Generate slot indices
    const slotIndices = Array.from({ length }, (_, i) => i);

    return (
      <InputOTP
        ref={ref}
        maxLength={length}
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        disabled={disabled}
        error={error}
        autoFocus={autoFocus}
        name={name}
        pattern={pattern}
        containerClassName={className}
      >
        <InputOTPGroup>
          {slotIndices.map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    );
  }
);
OTP.displayName = "OTP";

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  OTP,
};

export type { InputOTPProps, OTPProps };
