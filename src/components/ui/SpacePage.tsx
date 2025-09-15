import * as React from 'react';

import { cn } from '@/utils/style';

const SpacePage=React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex min-h-screen flex-col items-center justify-center',
        className
      )}
      {...props}
    />
  )
);
SpacePage.displayName = 'SpacePage';
export { SpacePage };