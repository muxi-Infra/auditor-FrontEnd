import * as React from 'react';
import { cn } from '@/utils/style';

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'shrink-0 border',
          orientation === 'horizontal' ? 'h-[2px] w-1/3' : 'h-1/3 w-[2px]',
          className
        )}
        {...props}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
      />
    );
  }
);
Separator.displayName = 'Separator';

export { Separator };
