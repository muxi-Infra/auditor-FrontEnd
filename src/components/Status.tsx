'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Icon } from './ui/Icon';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/style';

const statusIcons: Record<string, 'check' | 'circle' | 'cross'> = {
  done: 'check',
  pending: 'circle',
  reject: 'cross',
};

const statusCheckboxVariants = cva(
  'peer h-10 w-10 shrink-0 rounded-lg shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center text-current bg-[#EAE8E5] hover:bg-[#DBD9D4] active:bg-[#D9D9D9] stroke-[#808080]',
  {
    variants: {
      variant: {
        done: 'data-[state=checked]:bg-[#3A9D18] data-[state=checked]:hover:bg-[#389A18] data-[state=checked]:active:bg-[#369118] data-[state=checked]:stroke-[#CFFFBE]',
        pending:
          'data-[state=checked]:bg-[#F7CF8E] data-[state=checked]:hover:bg-[#F3C67D] data-[state=checked]:active:bg-[#EFBD6E] data-[state=checked]:stroke-black',
        reject:
          'data-[state=checked]:bg-[#E75E1A] data-[state=checked]:hover:bg-[#E45F1C] data-[state=checked]:active:bg-[#D4581A] data-[state=checked]:stroke-[#FBF5E2]',
      },
    },
    defaultVariants: {
      variant: 'done',
    },
  }
);

export interface StatusCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof statusCheckboxVariants> {}

const StatusCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  StatusCheckboxProps
>(({ className, variant = 'done', ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(statusCheckboxVariants({ variant, className }))}
    {...props}
  >
    <Icon className="h-5 w-5" name={statusIcons[variant || 'done']}></Icon>
  </CheckboxPrimitive.Root>
));
StatusCheckbox.displayName = CheckboxPrimitive.Root.displayName;

const statusButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        pass: 'bg-[#3A9D18] hover:bg-[#389A18] active:bg-[#369118] text-[#CFFFBE] shadow h-8 px-4 py-2 w-32 rounded-xl',
        pending:
          'bg-[#D9D9D9] hover:bg-[#CCCCCC] active:bg-[#BFBFBF] text-foreground shadow h-8 px-4 py-2 w-32 rounded-xl',
        reject:
          'bg-[#E75E1A] hover:bg-[#E45F1C] active:bg-[#D4581A] text-[#FBF5E2] shadow h-8 px-4 py-2 w-32 rounded-xl',
        confirm:
          'bg-[#FFEECF] hover:bg-[#FFE1B1] active:bg-[#FFD596] text-foreground shadow h-8 px-4 py-2 w-32 rounded-xl',
        complete:
          'bg-[#F29E26] text-[#FFF8ED] shadow h-10 px-4 py-2 w-28 rounded-md text-md font-semibold',
        cancel:
          'bg-[#FFEECF] text-foreground shadow h-10 px-4 py-2 w-28 rounded-md text-md font-semibold',
        pagination:
          'bg-[#FFEECF] hover:bg-[#FFE1B1] active:bg-[#FFD596] text-[#AF6600] shadow h-8 px-4 py-2 w-32 rounded-xl',
        ai: 'bg-[#F9C640] hover:bg-[#F8BD20] active:bg-[#F7B508] text-white shadow h-8 px-4 py-2 w-32 rounded-xl',
        time: ' rounded-md text-black h-10 w-28 border-2 w-40 h-8',
        edit: 'rounded-xl border-2 border-[#FFC886] text-[#FFC886] w-14 shadow-none',
        save: 'rounded-xl border-2 border-[#F33636] text-[#F33636] w-14 shadow-none',
        add: 'rounded-md w-20 bg-[#F29E26] h-7 text-white',
        toaudit: 'rounded-md  bg-[#ccf0eb] text-[#00B69B] w-24 text-[14px]',
        tomange: 'rounded-md bg-[#e0d4fc] w-24 text-[#6226EF] text-[14px]',
        delete: 'rounded-md bg-[#fccfcf] w-24 text-[#F20E0E] text-[14px]',
      },
    },
    defaultVariants: {
      variant: 'pass',
    },
  }
);

export interface StatusButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof statusButtonVariants> {
  asChild?: boolean;
}

const StatusButton = React.forwardRef<HTMLButtonElement, StatusButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(statusButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
StatusButton.displayName = 'StatusButton';

const statusVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-bold shadow h-8 px-4 py-2 w-32 rounded-xl',
  {
    variants: {
      variant: {
        space: 'bg-white text-black',
        pass: 'bg-[#3A9D18] text-[#CFFFBE]',
        pending: 'bg-[#D9D9D9] text-foreground',
        reject: 'bg-[#E75E1A] text-[#FBF5E2]',
        confirm: 'bg-[#FFEECF] text-foreground',
        complete:
          'bg-[#F29E26] text-[#FFF8ED] h-10 w-28 rounded-md text-md font-semibold',
        cancel:
          'bg-[#FFEECF] text-foreground h-10 w-28 rounded-md text-md font-semibold',
        pagination: 'bg-[#FFEECF] text-[#AF6600]',
        ai: 'bg-[#F9C640] text-white',
        audit: 'rounded-md  bg-[#ccf0eb] text-[#00B69B] w-24 text-[14px]',
        mange: 'rounded-md bg-[#e0d4fc] w-24 text-[#6226EF] text-[14px]',
      },
    },
    defaultVariants: {
      variant: 'space',
    },
  }
);

export interface StatusProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof statusVariants> {}

const Status = React.forwardRef<HTMLDivElement, StatusProps>(
  ({ className, variant, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(statusVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  )
);
Status.displayName = 'Status';

export { Status, StatusButton, StatusCheckbox };
