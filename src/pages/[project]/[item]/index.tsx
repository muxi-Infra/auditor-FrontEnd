import { TagCheckbox } from '@/components/Tag';
import { StatusButton } from '@/components/Status';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { useParams } from 'react-router-dom';
import { getItemDetail } from '@/apis';
import { Item } from '@/types';
import { useEffect, useState } from 'react';
import { ImageButton } from '@/components/ImageButton';

export default function EntryPage() {
  const { item } = useParams();
  const [itemData, setItemData] = useState<Item>();
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (item) {
      const itemId = parseInt(item);
      getItemDetail(itemId).then(setItemData);
    }
  }, [item]);

  return (
    <div className="flex h-full min-w-[80%] flex-col gap-8">
      {/* 标题区域 */}
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

      {/* 内容卡片 - 使用 flex-1 使其占满剩余空间 */}
      <Card className="flex-1">
        <CardContent className="pt-6">
          <div className="flex h-full gap-6">
            <div className="flex-1">
              <div className="whitespace-pre-wrap">
                {itemData?.content.topic.content}
              </div>
            </div>
            <div className="relative w-64 flex-shrink-0">
              <img
                src={itemData?.content.topic.pictures[imgIndex]}
                alt="图片"
                className="min-h-full"
              />
              <div className="absolute bottom-0 right-0 flex gap-2 p-2">
                <ImageButton
                  direction="prev"
                  onClick={() =>
                    imgIndex > 0 ? setImgIndex(imgIndex - 1) : null
                  }
                ></ImageButton>
                <ImageButton
                  direction="next"
                  onClick={() =>
                    imgIndex <
                    (itemData?.content.topic.pictures?.length ?? 0) - 1
                      ? setImgIndex(imgIndex + 1)
                      : null
                  }
                ></ImageButton>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          {itemData?.tags.map((tag, index) => (
            <TagCheckbox key={index}>{tag}</TagCheckbox>
          ))}
        </CardFooter>
      </Card>

      {/* 底部按钮 */}
      <div className="flex justify-between">
        <StatusButton variant="pagination">◀ PREVIOUS</StatusButton>
        <div className="flex gap-2">
          <StatusButton variant="ai">AI审核</StatusButton>
          <StatusButton variant="reject">REJECT</StatusButton>
          <StatusButton variant="pass">PASS</StatusButton>
        </div>
        <StatusButton variant="pagination">NEXT ▶</StatusButton>
      </div>
    </div>
  );
}
