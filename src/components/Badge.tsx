import type { ReactNode } from 'react';
import clsx from 'clsx';

type BadgeTone = 'success' | 'neutral' | 'danger' | 'warning';

const toneClasses: Record<BadgeTone, string> = {
  success: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  neutral: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  danger: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
};

export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
