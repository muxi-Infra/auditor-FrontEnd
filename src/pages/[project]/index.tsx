import { getProjectItems } from '@/apis';
import { Status, StatusProps } from '@/components/Status';
import { Tag } from '@/components/Tag';
import { Checkbox } from '@/components/ui/Checkbox';
import { Item } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import useRouteStore from '@/stores/route';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const mapStatusToVariant = (status: number): StatusProps['variant'] => {
  switch (status) {
    case 0:
      return 'pending';
    case 1:
      return 'pass';
    case 2:
      return 'reject';
    default:
      return 'pending';
  }
};

const EntryList = () => {
  const { project_id } = useRouteStore();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!project_id) {
      setError('No project selected');
      return;
    }

    setLoading(true);
    setError(null);
    getProjectItems(project_id)
      .then((response) => {
        if (!response) {
          setItems([]);
          return;
        }
        setItems(response);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [project_id]);

  if (loading) {
    return <div className="py-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  if (items.length === 0 && !loading && !error) {
    return <div className="py-4 text-center">No items found</div>;
  }

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
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-center">
              <Checkbox></Checkbox>
            </TableCell>
            <TableCell className="text-center">
              <div className="flex flex-col gap-1">
                <div className="font-medium">{item.content.topic.title}</div>
                <div className="text-muted-foreground text-sm">
                  {item.content.topic.content}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">
              {new Date(item.public_time).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-center">{item.auditor}</TableCell>
            <TableCell className="text-center">
              <div className="flex flex-wrap items-center justify-center gap-1">
                {item.tags.map((tag: string, index: number) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-center">
              <Status variant={mapStatusToVariant(item.status)}>状态</Status>
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
      setProject(Number(project));
    }
  }, [project, setProject]);

  return (
    <>
      <EntryList />
    </>
  );
}
