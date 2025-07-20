'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/utils/style';
import { buttonVariants } from '@/components/ui/Button';
import { Icon } from './Icon';

// 定义基础的 Calendar props，排除 selected 和 onSelect
type BaseCalendarProps = Omit<React.ComponentProps<typeof DayPicker>, 'selected' | 'onSelect'> & {
  onSave?: (selectedDate: any) => void;
  onCancel?: () => void;
  showActions?: boolean;
  saveButtonText?: string;
  cancelButtonText?: string;
  saveButtonClassName?: string;
  cancelButtonClassName?: string;
};

// 为了避免类型冲突，我们创建一个更灵活的类型
export type CalendarProps = BaseCalendarProps & {
  selected?: any;
  onSelect?: (date: any) => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onSave,
  onCancel,
  showActions = true,
  saveButtonText = '保存',
  cancelButtonText = '取消',
  saveButtonClassName,
  cancelButtonClassName,
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  // 内部状态管理临时选择的日期
  const [tempSelected, setTempSelected] = React.useState<any>(selected);

  // 当外部 selected 变化时，更新内部状态
  React.useEffect(() => {
    setTempSelected(selected);
  }, [selected]);

  // 处理日期选择（临时保存）
  const handleDateSelect = (date: any) => {
    setTempSelected(date);
  };

  // 处理保存操作
  const handleSave = () => {
    if (onSave) {
      onSave(tempSelected);
    }
    if (onSelect) {
      onSelect(tempSelected);
    }
  };

  // 处理取消操作
  const handleCancel = () => {
    setTempSelected(selected); // 恢复到之前的选择
    if (onCancel) {
      onCancel();
    }
  };

  // 构建传递给 DayPicker 的 props
  const dayPickerProps = {
    showOutsideDays,
    className: cn('p-3 transition-all', className),
    selected: tempSelected,
    onSelect: handleDateSelect,
    classNames: {
      // TODO: sort all the classes and improve animation
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
    },
    components: {
      IconLeft: ({ className, ...props }: any) => (
        <Icon
          name="chevron-left"
          className={cn('h-4 w-4', className)}
          {...props}
        />
      ),
      IconRight: ({ className, ...props }: any) => (
        <Icon
          name="chevron-right"
          className={cn('h-4 w-4', className)}
          {...props}
        />
      ),
    },
    ...props,
  };

  return (
    <div className="bg-[#FFF8ED] rounded-lg shadow-sm border">
      <DayPicker {...(dayPickerProps as any)} />
      
      {showActions && (
        <div className="flex justify-end gap-2 p-3 border-gray-200">
          <button
            onClick={handleCancel}
            className={cn(
              'inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F29E26] focus:ring-offset-2 transition-colors',
              cancelButtonClassName
            )}
          >
            {cancelButtonText}
          </button>
          <button
            onClick={handleSave}
            className={cn(
              'inline-flex items-center justify-center rounded-md border border-transparent bg-[#F29E26] px-4 py-2 text-sm font-medium text-white hover:bg-[#E5891F] focus:outline-none focus:ring-2 focus:ring-[#F29E26] focus:ring-offset-2 transition-colors',
              saveButtonClassName
            )}
          >
            {saveButtonText}
          </button>
        </div>
      )}
    </div>
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };