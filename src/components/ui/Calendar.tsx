'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/utils/style';
import { buttonVariants } from '@/components/ui/Button';
import { Icon } from './Icon';
import { StatusButton } from '../Status';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type CalendarPropsp = CalendarProps&{
  handleCancel:()=>void;
  handleConfirm:()=>void;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  handleCancel,
  handleConfirm,
  ...props
}: CalendarPropsp) {
  return (
    <div style={{ zoom: 0.7, transformOrigin: 'top left' }}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn('bg-[#FFF8ED] p-3 transition-all', className)}
        classNames={{
          month: 'space-y-4',
          caption: 'flex justify-center pt-1 pb-2 relative items-center',
          caption_label: 'text-sm font-semibold',
          nav: 'space-x-1 flex items-center',
          nav_button: cn(
            buttonVariants({ variant: 'ghost' }),
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 stroke-[#F29E26]'
          ),
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex justify-between items-center',
          head_cell: 'text-[#F29E26] rounded-md w-8 font-bold text-[0.8rem]',
          row: 'grid grid-cols-7 w-full mt-2',
          cell: cn(
            'flex justify-center items-center h-8 relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md'
          ),
          day: cn(
            buttonVariants({ variant: 'ghost' }),
            'h-6 w-full p-0 rounded-none font-bold aria-selected:opacity-100'
          ),
          day_range_start: 'day-range-start rounded-l-full',
          day_range_end: 'day-range-end rounded-r-full',
          day_selected:
            'bg-[#F29E26] text-white font-normal hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          day_today: 'bg-accent text-accent-foreground',
          day_outside:
            'day-outside text-[#808080] aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
          day_disabled: 'text-muted-foreground opacity-50',
          day_range_middle:
            'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
          ...classNames,
        }}
        components={{
          IconLeft: ({ className, ...props }) => (
            <Icon
              name="chevron-left"
              className={cn('h-4 w-4', className)}
              {...props}
            />
          ),
          IconRight: ({ className, ...props }) => (
            <Icon
              name="chevron-right"
              className={cn('h-4 w-4', className)}
              {...props}
            />
          ),
        }}
        {...props}
      />
       <div className="mt-4 flex justify-end gap-2">
        <StatusButton
          variant='cancel'
          onClick={handleCancel}
        >
          取消
        </StatusButton>
        <StatusButton
         variant='complete'
         onClick={handleConfirm}
        >
          确认
        </StatusButton>
      </div>
    </div>
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
