import { getProjectItems, auditMany, getItemsAmount } from '@/apis';
import { Status, StatusProps, StatusButton } from '@/components/Status';
import { Tag } from '@/components/Tag';
import { Checkbox } from '@/components/ui/Checkbox';
import { itemToAudit } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRoute } from '@/hooks/route';
import useItemStore from '@/stores/items';
import { TestPagination } from '../_components/TestPagination';

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
  const { projectId } = useRoute();
  const { items, setItems, setOriginalItems, setCurrentPage, pageSize } =
    useItemStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [auditManyBody, setAuditMany] = useState<itemToAudit[]>([]);
  const [totalPage, setTotalPage] = useState<number>(100);
  const handleChangeboxChange = (item: itemToAudit) => {
    setAuditMany((prev) => {
      const currentIndex = prev.findIndex((i) => i.item_id === item.item_id);

      if (currentIndex > -1) {
        return prev.filter((i) => i.item_id !== item.item_id);
      } else {
        return [...prev, { item_id: item.item_id, status: item.status }];
      }
    });
  };
  const handleAuditManyPass = (items: itemToAudit[]) => {
    setAuditMany(
      items.map((item) => {
        return {
          item_id: item.item_id,
          status: 1,
        };
      })
    );
    auditMany(
      items.map((item) => ({
        item_id: item.item_id,
        status: 1, // 或 2
      }))
    )
      .then(() => {
        setAuditMany([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAuditManyReject = (items: itemToAudit[]) => {
    setAuditMany(
      items.map((item) => {
        return {
          item_id: item.item_id,
          status: 2,
        };
      })
    );
    auditMany(
      items.map((item) => ({
        item_id: item.item_id,
        status: 2, // 或 2
      }))
    )
      .then(() => {
        setAuditMany([]);
        console.log('成功批量审核');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!projectId) {
      setError('No project selected');
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentPage(1);
    getProjectItems(projectId)
      .then((response) => {
        if (response === null) {
          setItems([]);
          setOriginalItems([]);
          return;
        } else {
          setItems(response);
          setOriginalItems(response);
          console.log(response);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    getItemsAmount(projectId)
      .then((response) => {
        const pages = Math.ceil(response / pageSize);
        setTotalPage(pages);
      })
      .catch((e) => {
        console.log(e);
      });
    setAuditMany([]);
  }, [projectId, setItems]);

  if (loading) {
    return <div className="py-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  if (items === null && !loading && !error) {
    return <div className="py-4 text-center">No items found</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold text-foreground">
              <span>全选</span>
            </TableHead>
            <TableHead className="text-center font-bold text-foreground">
              <span className="flex justify-center gap-2">
                <StatusButton
                  variant="pass"
                  onClick={() => handleAuditManyPass(auditManyBody)}
                >
                  全部通过
                </StatusButton>
                <StatusButton
                  variant="reject"
                  onClick={() => handleAuditManyReject(auditManyBody)}
                >
                  全部拒绝
                </StatusButton>
              </span>
            </TableHead>
            <TableHead className="text-center font-bold text-foreground">
              <span>时间</span>
            </TableHead>
            <TableHead className="text-center font-bold text-foreground">
              <span>创建人</span>
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
                <Checkbox
                  checked={auditManyBody.some((i) => item.id === i.item_id)}
                  onClick={() =>
                    handleChangeboxChange({
                      item_id: item.id,
                      status: item.status,
                    })
                  }
                ></Checkbox>
              </TableCell>
              <TableCell className="text-center">
                <Link to={`${item.id}`} className="flex flex-col gap-1">
                  <div className="font-medium">{item.content.topic.title}</div>
                  <div className="text-muted-foreground text-sm">
                    {item.content.topic.content}
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-center">
                {new Date(item.public_time).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">{item.author}</TableCell>
              <TableCell className="text-center">
                <div className="flex flex-wrap items-center justify-center gap-1">
                  {(item?.tags ?? []).map((tag: string, index: number) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Status variant={mapStatusToVariant(item.status)}>
                  {mapStatusToVariant(item.status)?.toUpperCase()}
                </Status>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {items.length !== 0 ? (
        <TestPagination
          project_id={projectId ? projectId : 0}
          totalPage={totalPage}
        ></TestPagination>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default function ProjectPage() {
  return (
    <>
      <EntryList />
    </>
  );
}
