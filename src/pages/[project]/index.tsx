import { Status, StatusProps } from '@/components/Status';
import { Tag } from '@/components/Tag';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import useRouteStore from '@/stores/route';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const data = [
  {
    selected: false,
    title: 'test',
    description: '这是一个测试项目的描述',
    time: '2024-01-01',
    reviewer: '张三',
    tag: 'bug反馈',
    status: 'pending',
  },
  {
    selected: false,
    title: 'test2',
    description: '这是第二个测试项目的描述',
    time: '2024-01-02',
    reviewer: '李四',
    tag: '功能反馈',
    status: 'pending',
  },
  {
    selected: false,
    title: 'test3',
    time: '2024-01-03',
    reviewer: '王五',
    tag: 'bug反馈',
    status: 'pass',
  },
  {
    selected: false,
    title: 'test4',
    time: '2024-01-04',
    reviewer: '赵六',
    tag: '功能反馈',
    status: 'reject',
  },
  {
    selected: false,
    title: 'test5',
    time: '2024-01-05',
    reviewer: '孙七',
    tag: '功能反馈',
    status: 'pending',
  },
  {
    selected: false,
    title: 'test6',
    time: '2024-01-06',
    reviewer: '周八',
    tag: '功能反馈',
    status: 'pass',
  },
  {
    selected: false,
    title: 'test7',
    time: '2024-01-07',
    reviewer: '吴九',
    tag: 'bug反馈',
    status: 'reject',
  },
  {
    selected: false,
    title: 'test8',
    time: '2024-01-08',
    reviewer: '郑十',
    tag: '功能反馈',
    status: 'pending',
  },
  {
    selected: false,
    title: 'test9',
    time: '2024-01-09',
    reviewer: '钱十一',
    tag: '功能反馈',
    status: 'pass',
  },
  {
    selected: false,
    title: 'test10',
    time: '2024-01-10',
    reviewer: '陈十二',
    tag: '功能反馈',
    status: 'reject',
  },
];

const EntryList = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold text-foreground">
            <span>全选</span>
          </TableHead>
          <TableHead className="text-center font-bold text-foreground">
            <span>详情</span>
          </TableHead>
          <TableHead className="text-center font-bold text-foreground">
            <span>时间</span>
          </TableHead>
          <TableHead className="text-center font-bold text-foreground">
            <span>审核人</span>
          </TableHead>
          <TableHead className="text-center font-bold text-foreground">
            <span>标签</span>
          </TableHead>
          <TableHead className="text-center font-bold text-foreground">
            <span>状态</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.title}>
            <TableCell className="text-center">
              <Checkbox></Checkbox>
            </TableCell>
            <TableCell className="text-center">
              <div className="flex flex-col gap-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-muted-foreground text-sm">
                  {item.description}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">{item.time}</TableCell>
            <TableCell className="text-center">{item.reviewer}</TableCell>
            <TableCell className="text-center">
              <div className="flex items-center justify-center">
                <Tag>{item.tag}</Tag>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <Status variant={item.status as StatusProps['variant']}>
                状态
              </Status>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function ProjectPage() {
  const { project } = useParams();
  const { setProject } = useRouteStore();

  useEffect(() => {
    if (project !== undefined) {
      setProject(project);
    }
  }, [project, setProject]);

  return (
    <>
      <EntryList />
    </>
  );
}
