import { cn } from '@/utils/style';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Checkbox } from '@radix-ui/react-checkbox';

const DEFAULT_AVATAR = '/user.png';

interface CardProps {
  avatar?: string;
  name?: string;

  description?: string;
  className?: string;
  checked?: boolean;
  onToogle?: () => void;
}

export default function UserCard({
  className,
  avatar,
  description = '此乃邮箱',
  name = '未命名',
  checked,
  onToogle,
}: CardProps) {
  return (
    <>
      <Checkbox
        checked={checked}
        onClick={onToogle}
        className={cn(
          'm-0 grid h-16 w-full cursor-pointer grid-cols-[1fr,15fr] place-items-center rounded-xl p-0 pl-2 text-black shadow-none transition-colors',
          checked
            ? 'bg-[#FFF3DF] ring-1 ring-amber-300'
            : 'bg-white hover:bg-[#FFF3DF]/70',
          className
        )}
      >
        <Avatar className="size-10 rounded-full">
          <AvatarImage src={avatar} className="rounded-full" />
          <AvatarFallback>
            <img src={DEFAULT_AVATAR} />
          </AvatarFallback>
        </Avatar>
        <div className="flex h-full w-full flex-col items-start justify-center p-2">
          <div className="text-[0,8rem] font-bold">{name}</div>
          <div className="text-[0.8rem] text-[#667085]">{description}</div>
        </div>
      </Checkbox>
    </>
  );
}
