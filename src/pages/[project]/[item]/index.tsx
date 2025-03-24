import { TagCheckbox } from '@/components/Tag';
import { StatusButton } from '@/components/Status';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { useParams } from 'react-router-dom';
import { auditItem, getItemDetail } from '@/apis';
import { Item } from '@/types';
import { useEffect, useState } from 'react';
import { ImageButton } from '@/components/ImageButton';
import { Textarea } from '@/components/ui/Textarea';

export default function EntryPage() {
  const { item } = useParams();
  const [itemData, setItemData] = useState<Item>();
  const [imgIndex, setImgIndex] = useState(0);
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (item) {
      const itemId = parseInt(item);
      getItemDetail(itemId).then(setItemData);
    }
  }, [item]);

  const handleAudit = (status: 0 | 1 | 2) => {
    if (!itemData) return;
    auditItem(itemData.id, reason, status);
  };

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
          <div className="relative flex w-64 items-center justify-center">
            <img src={itemData?.content.topic.pictures[imgIndex]} alt="图片" />
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
                  imgIndex < (itemData?.content.topic.pictures?.length ?? 0) - 1
                    ? setImgIndex(imgIndex + 1)
                    : null
                }
              ></ImageButton>
            </div>
          </div>
        </CardContent>
        <CardFooter className="absolute bottom-0 flex gap-2">
          {itemData?.tags.map((tag, index) => (
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
        <StatusButton variant="pagination">◀ PREVIOUS</StatusButton>
        <div className="flex gap-2">
          <StatusButton variant="ai">AI审核</StatusButton>
          <StatusButton variant="reject" onClick={() => handleAudit(2)}>
            REJECT
          </StatusButton>
          <StatusButton variant="pass" onClick={() => handleAudit(1)}>
            PASS
          </StatusButton>
        </div>
        <StatusButton variant="pagination">NEXT ▶</StatusButton>
      </div>
    </div>
  );
}
