'use client';

import * as React from 'react';
import { cn } from '@/utils/style';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  /**
   * The color of the progress indicator
   * @default "primary"
   */
  color?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = value && max ? (value / max) * 100 : 0;

    return (
      <div
        ref={ref}
        className={cn(
          'relative h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full bg-[#f29e26] transition-all duration-300 ease-in-out'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
