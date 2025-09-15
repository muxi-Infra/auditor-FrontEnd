import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Card,CardContent } from '@/components/ui/Card';

interface DeleteDialogProps {
    handleDelete: () => void;
}
export function DeleteDialog({handleDelete}:DeleteDialogProps) {
  const [open, setOpen] = useState(false);

  return (
   
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card>
        <CardContent className="flex w-full items-center justify-center p-2">
          <p className="text-xl text-[#FF0404]">删除项目</p>
        </CardContent>
      </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除账号？</DialogTitle>
            <DialogDescription>
              此操作无法撤销。删除账号将会永久移除您的所有数据。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">取消</Button>
            </DialogClose>
            <Button
              variant="destructive"
               onClick={handleDelete}
            >
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  
  );
}
