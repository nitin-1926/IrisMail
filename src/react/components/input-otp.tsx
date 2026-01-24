"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";
import { cn } from "../../utils/constants";

// ─────────────────────────────────────────────────────────────────────────────
// Types & Configuration
// ─────────────────────────────────────────────────────────────────────────────

type OTPTheme = "dark" | "light";
type OTPSize = "sm" | "md" | "lg";

/** ClassNames API for fine-grained style customization */
type OTPClassNames = {
  /** Root container */
  root?: string;
  /** Group wrapper containing slots */
  group?: string;
  /** Individual digit slot */
  slot?: string;
  /** Slot when it contains a character */
  slotFilled?: string;
  /** Slot when focused/active */
  slotActive?: string;
  /** Slot in error state */
  slotError?: string;
  /** Separator between groups */
  separator?: string;
  /** Separator dash/line element */
  separatorLine?: string;
  /** Blinking caret */
  caret?: string;
};

const slotSizeClasses: Record<OTPSize, string> = {
  sm: "h-9 w-7 text-sm",
  md: "h-11 w-9 text-base",
  lg: "h-14 w-11 text-lg",
};

const caretSizeClasses: Record<OTPSize, string> = {
  sm: "h-3 w-0.5",
  md: "h-4 w-0.5",
  lg: "h-5 w-0.5",
};

const themeClasses = {
  dark: {
    slot: {
      base: "border-zinc-700 bg-zinc-800/50 text-white",
      filled: "border-zinc-600 bg-zinc-800",
      active: "border-zinc-500 bg-zinc-800",
      error: "border-red-500/50 bg-red-500/5",
      errorActive: "border-red-500/70",
    },
    caret: "bg-zinc-400",
    separator: "bg-zinc-600",
  },
  light: {
    slot: {
      base: "border-zinc-300 bg-white text-zinc-900",
      filled: "border-zinc-400 bg-zinc-50",
      active: "border-zinc-500 bg-white",
      error: "border-red-500/50 bg-red-50",
      errorActive: "border-red-500/70",
    },
    caret: "bg-zinc-600",
    separator: "bg-zinc-300",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// InputOTP (Root) - Low-level component for composition pattern
// ─────────────────────────────────────────────────────────────────────────────

type InputOTPContextValue = {
  error?: boolean;
  theme: OTPTheme;
  slotSize: OTPSize;
  classNames?: OTPClassNames;
};

const InputOTPStyleContext = React.createContext<InputOTPContextValue>({
  theme: "dark",
  slotSize: "md",
});

type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput> & {
  /** Show error styling */
  error?: boolean;
  /** Color theme (default: "dark") */
  theme?: OTPTheme;
  /** Size of the slots (default: "md") */
  slotSize?: OTPSize;
  /** ClassNames API for style customization */
  classNames?: OTPClassNames;
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
>(({ className, containerClassName, error, theme, slotSize, classNames, ...props }, ref) => {
  const resolvedTheme: OTPTheme = theme ?? "dark";
  const resolvedSlotSize: OTPSize = slotSize ?? "md";
  
  return (
    <InputOTPStyleContext.Provider value={{ error, theme: resolvedTheme, slotSize: resolvedSlotSize, classNames }}>
      <OTPInput
        ref={ref}
        containerClassName={cn(
          "flex items-center gap-2 has-[:disabled]:opacity-50",
          containerClassName,
          classNames?.root
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    </InputOTPStyleContext.Provider>
  );
});
InputOTP.displayName = "InputOTP";

// ─────────────────────────────────────────────────────────────────────────────
// InputOTPGroup - Groups slots together
// ─────────────────────────────────────────────────────────────────────────────

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  const { classNames } = React.useContext(InputOTPStyleContext);
  
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className, classNames?.group)}
      {...props}
    />
  );
});
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
  const { error, theme, slotSize, classNames } = React.useContext(InputOTPStyleContext);
  const slot = inputOTPContext.slots[index];
  const { char, hasFakeCaret, isActive } = slot;

  const colors = themeClasses[theme];

  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        "relative flex items-center justify-center",
        "border rounded-md",
        "font-mono font-medium",
        "transition-colors duration-150",
        // Size
        slotSizeClasses[slotSize],
        // Default state (theme-aware)
        colors.slot.base,
        // Custom base slot class
        classNames?.slot,
        // Filled state
        char && colors.slot.filled,
        char && classNames?.slotFilled,
        // Active/focus state
        isActive && colors.slot.active,
        isActive && classNames?.slotActive,
        // Error state
        error && colors.slot.error,
        error && isActive && colors.slot.errorActive,
        error && classNames?.slotError,
        className
      )}
      data-active={isActive}
      data-filled={Boolean(char)}
      data-error={error}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className={cn(
            "animate-caret-blink rounded-full",
            caretSizeClasses[slotSize],
            colors.caret,
            classNames?.caret
          )} />
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
>(({ className, ...props }, ref) => {
  const { theme, classNames } = React.useContext(InputOTPStyleContext);
  const colors = themeClasses[theme];

  return (
    <div
      ref={ref}
      role="separator"
      className={cn("flex items-center justify-center", className, classNames?.separator)}
      {...props}
    >
      <span className={cn("w-3 h-0.5 rounded-full", colors.separator, classNames?.separatorLine)} />
    </div>
  );
});
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
  /** Color theme (default: "dark") */
  theme?: OTPTheme;
  /** Size of the slots (default: "md") */
  slotSize?: OTPSize;
  /** Show separator between groups */
  separator?: boolean;
  /** Number of slots per group (default: half of length) */
  groupSize?: number;
  /** ClassNames API for style customization */
  classNames?: OTPClassNames;
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
 *
 * // With separator and custom group size
 * <OTP length={6} groupSize={3} separator value={code} onChange={setCode} />
 *
 * // Light theme
 * <OTP theme="light" value={code} onChange={setCode} />
 *
 * // Custom styling with classNames API
 * <OTP
 *   value={code}
 *   onChange={setCode}
 *   classNames={{
 *     slot: "rounded-none first:rounded-l-md",
 *     slotActive: "ring-2 ring-blue-500",
 *     separator: "mx-4",
 *     separatorLine: "bg-blue-500 w-4",
 *   }}
 * />
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
      theme,
      slotSize,
      separator = false,
      groupSize,
      classNames,
    },
    ref
  ) => {
    const resolvedTheme: OTPTheme = theme ?? "dark";
    const resolvedSlotSize: OTPSize = slotSize ?? "md";
    
    // Generate slot indices
    const slotIndices = Array.from({ length }, (_, i) => i);
    
    // Calculate effective group size (default: half of length, or full length if no separator)
    const effectiveGroupSize = groupSize ?? (separator ? Math.ceil(length / 2) : length);
    
    // Split indices into groups
    const groups: number[][] = [];
    for (let i = 0; i < length; i += effectiveGroupSize) {
      groups.push(slotIndices.slice(i, i + effectiveGroupSize));
    }

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
        theme={resolvedTheme}
        slotSize={resolvedSlotSize}
        classNames={classNames}
      >
        {groups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 && separator && <InputOTPSeparator />}
            <InputOTPGroup>
              {group.map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </React.Fragment>
        ))}
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

export type { InputOTPProps, OTPProps, OTPTheme, OTPSize, OTPClassNames };
