import { ReactNode } from 'react';

type CalloutVariant = 'info' | 'warning' | 'success' | 'error';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

const variants: Record<
  CalloutVariant,
  { border: string; bg: string; icon: string; title: string }
> = {
  info: {
    border: 'border-zinc-700',
    bg: 'bg-zinc-800/30',
    icon: 'text-zinc-400',
    title: 'text-zinc-200',
  },
  warning: {
    border: 'border-amber-900/50',
    bg: 'bg-amber-950/20',
    icon: 'text-amber-500',
    title: 'text-amber-200',
  },
  success: {
    border: 'border-emerald-900/50',
    bg: 'bg-emerald-950/20',
    icon: 'text-emerald-500',
    title: 'text-emerald-200',
  },
  error: {
    border: 'border-red-900/50',
    bg: 'bg-red-950/20',
    icon: 'text-red-500',
    title: 'text-red-200',
  },
};

const icons: Record<CalloutVariant, ReactNode> = {
  info: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  warning: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  success: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  const styles = variants[variant];

  return (
    <div className={`rounded-lg border ${styles.border} ${styles.bg} px-4 py-3`}>
      <div className="flex gap-3">
        <span className={`mt-0.5 shrink-0 ${styles.icon}`}>
          {icons[variant]}
        </span>
        <div className="min-w-0">
          {title && (
            <p className={`mb-1 text-sm font-medium ${styles.title}`}>{title}</p>
          )}
          <div className="text-sm text-zinc-400">{children}</div>
        </div>
      </div>
    </div>
  );
}
