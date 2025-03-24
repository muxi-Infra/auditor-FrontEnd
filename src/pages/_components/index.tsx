// import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { StatusButton, StatusCheckbox } from '@/components/Status';
import { Tag, TagCheckbox } from '@/components/Tag';
import { Toggle } from '@/components/ui/Toggle';
import { ImageButton } from '@/components/ImageButton';
import { LargeToggle, SmallToggle } from '@/components/CrazyToggle';

import { TestPagination } from './TestPagination';
import { TestCalendar } from './TestCalendar';
import { Input } from '@/components/ui/Input';
import { SearchInput } from '@/components/SearchInput';
import { TestDialog } from './TestDialog';
import { Progress } from '@/components/ui/Progress';

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
      </div>
      <TestPagination></TestPagination>
      <TestCalendar></TestCalendar>
      <TestDialog></TestDialog>
    </>
  );
}
