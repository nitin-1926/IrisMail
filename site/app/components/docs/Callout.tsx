import { ReactNode } from 'react';

type CalloutVariant = 'info' | 'warning' | 'success' | 'error';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

const variants: Record<
  CalloutVariant,
  { bg: string; border: string; icon: string; iconBg: string; title: string }
> = {
  info: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    icon: 'ℹ',
    iconBg: 'bg-indigo-500/20 text-indigo-300',
    title: 'text-indigo-200',
  },
  warning: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: '⚠',
    iconBg: 'bg-amber-500/20 text-amber-300',
    title: 'text-amber-200',
  },
  success: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: '✓',
    iconBg: 'bg-emerald-500/20 text-emerald-300',
    title: 'text-emerald-200',
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: '✕',
    iconBg: 'bg-red-500/20 text-red-300',
    title: 'text-red-200',
  },
};

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  const styles = variants[variant];

  return (
    <div className={`rounded-xl border ${styles.border} ${styles.bg} p-4`}>
      <div className="flex gap-3">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm ${styles.iconBg}`}
        >
          {styles.icon}
        </span>
        <div className="min-w-0">
          {title && (
            <p className={`mb-1 font-medium ${styles.title}`}>{title}</p>
          )}
          <div className="text-sm text-white/70">{children}</div>
        </div>
      </div>
    </div>
  );
}






