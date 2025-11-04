'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { Icon } from './Icon';

import { cn } from '@/utils/style';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'focus-visible:ring-ring peer h-5 w-5 shrink-0 rounded-md border-2 border-[#DBD9D4] hover:border-[#7C7979] focus-visible:outline-none focus-visible:ring-1 active:border-[#4A4A4A] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[#FFA81C] data-[state=checked]:hover:border-[#FF911C] data-[state=checked]:active:border-[#FF7812]',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Icon className="h-4 w-4 stroke-[#FFA81C]" name="check" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
