import { ReactElement } from 'react';
import Check from '@/assets/icons/check.svg?react';
import Circle from '@/assets/icons/circle.svg?react';
import Cross from '@/assets/icons/cross.svg?react';
import More from '@/assets/icons/more.svg?react';
import Menu from '@/assets/icons/menu.svg?react';
import Plus from '@/assets/icons/plus.svg?react';
import Search from '@/assets/icons/search.svg?react';
import Member from '@/assets/icons/member.svg?react';
import Settings from '@/assets/icons/settings.svg?react';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import ChevronRight from '@/assets/icons/chevron-right.svg?react'; //?react语法，表示引入的是一个React组件
import * as React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name:
    | 'check'
    | 'circle'
    | 'cross'
    | 'more'
    | 'menu'
    | 'plus'
    | 'chevron-left'
    | 'chevron-right'
    | 'search'
    | 'member'
    | 'settings'
    | string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...svgProps }, ref) => {
    const icons: Record<IconProps['name'], ReactElement> = {
      check: <Check {...svgProps} ref={ref}></Check>,
      circle: <Circle {...svgProps} ref={ref}></Circle>,
      cross: <Cross {...svgProps} ref={ref}></Cross>,
      more: <More {...svgProps} ref={ref}></More>,
      menu: <Menu {...svgProps} ref={ref}></Menu>,
      plus: <Plus {...svgProps} ref={ref}></Plus>,
      search: <Search {...svgProps} ref={ref}></Search>,
      member: <Member {...svgProps} ref={ref} height={24} width={24}></Member>,
      settings: (
        <Settings {...svgProps} ref={ref} height={24} width={24}></Settings>
      ),
      'chevron-left': <ChevronLeft {...svgProps} ref={ref}></ChevronLeft>,
      'chevron-right': <ChevronRight {...svgProps} ref={ref}></ChevronRight>,
    };
    return icons[name];
  }
);

export { Icon };
