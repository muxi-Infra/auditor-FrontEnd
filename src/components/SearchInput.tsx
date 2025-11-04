import { cn } from '@/utils/style';
import { Icon } from '@/components/ui/Icon';
import { forwardRef, ComponentProps, useState, useCallback } from 'react';

const SearchInput = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'> & {
    containerClassName?: string;
    action?: (value: string) => void;
  }
>(({ className, containerClassName, action, ...props }, ref) => {
  const [value, setValue] = useState('');
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        action?.(value);
      }
    },
    [action, value]
  );

  return (
    <div className={cn('relative ml-20 flex items-center', containerClassName)}>
      <Icon
        name="search"
        className="absolute left-3 h-4 w-4 text-[#8F8D88]"
        onClick={() => action?.(value)}
      />
      <input
        ref={ref}
        type="text"
        className={cn(
          'placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-full rounded-full border border-[#FFD596] bg-[#FFF8ED] pl-10 pr-3 text-sm text-[#8F8D88] ring-offset-background focus-visible:outline-none focus-visible:ring-2',
          className
        )}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export { SearchInput };
