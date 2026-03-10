import { TagCheckbox } from '@/components/Tag';
import { StatusButton } from '@/components/Status';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import {
  auditItem,
  getItemDetail,
  getProjectItemsByPagination,
  aiAudit,
} from '@/apis';
import { Item } from '@/types';
import { useEffect, useState } from 'react';
import { ImageButton } from '@/components/ImageButton';
import { Textarea } from '@/components/ui/Textarea';
import { useRoute } from '@/hooks/route';
import { useNavigateToProject } from '@/hooks/navigate';
import { useMemo } from 'react';
import useItemStore from '@/stores/items';

export default function EntryPage() {
  const [open, setOpen] = useState(false);
  const comments = [1, 2, 3];
  const { projectId, itemId } = useRoute();
  const [itemData, setItemData] = useState<Item>();
  const [imgIndex, setImgIndex] = useState(0);
  const [reason, setReason] = useState('');
  const [allItems, setAllItems] = useState<Item[]>([]);
  const { toProjectItem } = useNavigateToProject();
  const {
    items,
    pageSize,
    currentPage,
    setItems,
    setOriginalItems,
    setCurrentPage,
  } = useItemStore();

  useEffect(() => {
    if (items.length > 0) {
      setAllItems(items);
      return;
    }
    if (projectId) {
      getProjectItemsByPagination(
        projectId as unknown as number,
        currentPage,
        pageSize
      ).then((response) => {
        setAllItems(response);
        setItems(response);
        setOriginalItems(response);
      });
    }
  }, [
    items,
    projectId,
    currentPage,
    pageSize,
    setItems,
    setOriginalItems,
  ]);

  const index = useMemo(() => {
    return allItems.findIndex((item) => item.id === itemId);
  }, [allItems, itemId]);

  const nextIndex = useMemo(() => {
    if (allItems.length === 0 || index === -1) return -1;
    if (index + 1 >= allItems.length) return -1;
    return index + 1;
  }, [index, allItems.length]);
  useEffect(() => {
    if (itemId) {
      getItemDetail(itemId).then(setItemData);
    }
  }, [itemId]);
  const previousIndex = useMemo(() => {
    if (allItems.length === 0 || index === -1) return -1;
    if (index - 1 < 0) return -1;
    return index - 1;
  }, [index, allItems.length]);
  const handleAudit = (status: 0 | 1 | 2) => {
    if (!itemData) return;
    auditItem(itemData.id, status, reason)
      .then(() => {
        alert('审核成功');
        handleNextItem();
      })
      .catch(() => alert('审核失败'));
  };
  const handleAiAudit = () => {
    if (!itemData) return;
    aiAudit([{
      ...itemData,
      projectID: projectId as unknown as number,
    }])
      .then(() => {
        alert('AI审核请求已发送');
        handleNextItem();
      })
      .catch(() => alert('AI审核请求发送失败'));
  };

  const handleNextItem = () => {
    if (nextIndex !== -1) {
      toProjectItem(
        projectId as unknown as number,
        allItems[nextIndex]?.id as number
      );
      return;
    }
    if (!projectId) return;
    if (index === allItems.length - 1) {
      alert('已经是最后一条了');
      return;
    }
    if (!projectId) return;
    const nextPage = currentPage + 1;
    getProjectItemsByPagination(
      projectId as unknown as number,
      nextPage,
      pageSize
    )
      .then((response) => {
        if (response.length === 0) {
          alert('已经是最后一页了');
          return;
        }
        setItems(response);
        setOriginalItems(response);
        setAllItems(response);
        setCurrentPage(nextPage);
        toProjectItem(projectId as unknown as number, response[0].id);
      })
      .catch(() => {});
  };
  const handlePreviousItem = () => {
    if (previousIndex !== -1) {
      toProjectItem(
        projectId as unknown as number,
        allItems[previousIndex]?.id as number
      );
      return;
    }
    if (!projectId || currentPage <= 1) return;
    const prevPage = currentPage - 1;
    getProjectItemsByPagination(
      projectId as unknown as number,
      prevPage,
      pageSize
    )
      .then((response) => {
        if (response.length === 0) return;
        setItems(response);
        setOriginalItems(response);
        setAllItems(response);
        setCurrentPage(prevPage);
        toProjectItem(
          projectId as unknown as number,
          response[response.length - 1].id
        );
      })
      .catch(() => {});
  };
  const displayImage = itemData?.content.topic.pictures?itemData?.content.topic.pictures:[];
  return (
    <div className="flex h-full min-w-[80%] flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{itemData?.content.topic.title}</h1>
        <div className="text-muted-foreground flex gap-2 text-sm">
          <span>{itemData?.author}</span>
          <span>
            {itemData?.public_time &&
              new Date(itemData?.public_time).toLocaleDateString()}
          </span>
        </div>
      </div>

      <Card className="relative flex-1">
        <CardContent className="grid h-full grid-cols-[3fr,1fr] pt-6">
          <div className="">
            <div className="whitespace-pre-wrap">
              {itemData?.content.topic.content}
            </div>
          </div>
          <div className="relative flex w-64 items-start justify-center">
            <img src={displayImage[imgIndex]} alt="图片" />
            <div className=" absolute bottom-8 right-0 flex gap-2 p-2">
              <ImageButton
                direction="prev"
                onClick={() =>
                  imgIndex > 0 ? setImgIndex(imgIndex - 1) : null
                }
              ></ImageButton>
              <ImageButton
                direction="next"
                onClick={() =>
                  imgIndex < (itemData?.content.topic.pictures?.length ?? 0) - 1
                    ? setImgIndex(imgIndex + 1)
                    : null
                }
              ></ImageButton>
            </div>
            <div className='bg-white w-full absolute mt-7 bottom-0 left-0 flex justify-end items-center'>
              

      {/* 评论气泡 */}
      <div
        onClick={() => setOpen(true)}
        className="
        w-10
        h-10
        cursor-pointer
        bg-[rgb(255,248,237)]
        border
        border-[rgb(217,217,217)]
        px-0
        py-0
        rounded-tl-full
        rounded-tr-full
        rounded-bl-full
        rounded-br-none
        hover:shadow
        transition
        "
      >
      </div>

      {/* 评论面板 */}
      {open && (
        <div
          className="
          absolute
          bottom-0
          right-0
          w-[400px]
          max-h-[300px]
          overflow-y-auto
          bg-[rgb(255,248,237)]
          border
          border-[rgb(217,217,217)]
          rounded-xl
          shadow-lg
          animate-[scaleIn_0.2s_ease]
          "
        >

          {/* header */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-[rgb(217,217,217)] font-semibold">
            <span>评论详情</span>

            <button
              onClick={() => setOpen(false)}
              className="text-xl hover:text-gray-500"
            >
              ×
            </button>
          </div>

          {/* 评论列表 */}
          <div className="p-4 space-y-4">

            {comments.map((item) => (
              <div key={item} className="flex gap-3">

                {/* 头像 */}
                <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0" />

                {/* 内容 */}
                <div className="flex-1">

                  <div className="flex items-center gap-2 text-sm font-medium">
                    用户名称
                    <span className="text-xs text-gray-400">
                      2026年3月3日
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 leading-relaxed mt-1">
                    评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容！
                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>
      )}
   
              </div>
          </div>
        </CardContent>
        <CardFooter className="absolute bottom-0 flex gap-2">
          {(itemData?.tags??[]).map((tag, index) => (
            <TagCheckbox key={index}>{tag}</TagCheckbox>
          ))}
        </CardFooter>
      </Card>

      <Card className="h-48 rounded-lg border">
        <CardContent className="h-full p-4">
          <Textarea
            placeholder="添加理由"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="h-full resize-none border-0 p-2 shadow-none focus-visible:ring-0"
          />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <StatusButton variant="pagination" onClick={() => handlePreviousItem()}>
          ◀ PREVIOUS
        </StatusButton>
        <div className="flex gap-2">
          <StatusButton variant="ai" onClick={() => handleAiAudit()}>
            AI审核
          </StatusButton>
          <StatusButton variant="reject" onClick={() => handleAudit(2)}>
            REJECT
          </StatusButton>
          <StatusButton variant="pass" onClick={() => handleAudit(1)}>
            PASS
          </StatusButton>
        </div>
        <StatusButton variant="pagination" onClick={() => handleNextItem()}>
          NEXT ▶
        </StatusButton>
      </div>
    </div>
  );
}
