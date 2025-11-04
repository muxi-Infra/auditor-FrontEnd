// import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Status, StatusButton, StatusCheckbox } from '@/components/Status';
import { Tag, TagCheckbox } from '@/components/Tag';
import { Toggle } from '@/components/ui/Toggle';
import { ImageButton } from '@/components/ImageButton';
import { LargeToggle, SmallToggle } from '@/components/CrazyToggle';

import { TestPagination } from './TestPagination';
import { TestCalendar } from './TestCalendar';
import { Input } from '@/components/ui/Input';
import { SearchInput } from '@/components/SearchInput';

import { Progress } from '@/components/ui/Progress';
import AdvaceFilter from '@/components/AdvanceFilter';
import UserCard from '@/components/Usercard';
export default function Page() {
  return (
    <>
      <div className="m-4 flex flex-wrap gap-4">
        <StatusButton variant="pass">PASS</StatusButton>
        <StatusButton variant="pending">PENDING</StatusButton>
        <StatusButton variant="reject">REJECT</StatusButton>
        <StatusButton variant="confirm">CONFIRM</StatusButton>
        <StatusButton variant="complete">COMPLETE</StatusButton>
        <StatusButton variant="cancel">CANCEL</StatusButton>
        <StatusButton variant="pagination">◀ PREV</StatusButton>
        <StatusButton variant="pagination">NEXT ▶</StatusButton>
        <StatusButton variant="ai">AI终审</StatusButton>
        <StatusCheckbox variant="done"></StatusCheckbox>
        <StatusCheckbox variant="pending"></StatusCheckbox>
        <StatusCheckbox variant="reject"></StatusCheckbox>
        <StatusButton variant="time">Time</StatusButton>
        <StatusButton variant="edit">编辑</StatusButton>
        <StatusButton variant="save">保存</StatusButton>
        <StatusButton variant="add">+新增</StatusButton>
        <StatusButton variant="toaudit">设为审核员</StatusButton>
        <StatusButton variant="delete">删除</StatusButton>
        <StatusButton variant="tomange">设为管理员</StatusButton>
        <Status variant="mange">管理员</Status>
        <Status variant="audit">审核员</Status>
        <Toggle></Toggle>
        <Tag>Tag</Tag>
        <TagCheckbox>Tag</TagCheckbox>

        <Checkbox></Checkbox>
        <ImageButton direction="prev"></ImageButton>
        <ImageButton direction="next"></ImageButton>
        <LargeToggle></LargeToggle>
        <SmallToggle></SmallToggle>
        <Input className="w-32"></Input>
        <SearchInput
          placeholder="Search..."
          containerClassName="w-64"
          action={(value) => alert(value)}
        />
        <Progress value={80}></Progress>
        <TestPagination></TestPagination>
        <TestCalendar></TestCalendar>
      </div>

      <AdvaceFilter></AdvaceFilter>
      <div>
        <UserCard></UserCard>
      </div>
    </>
  );
}
