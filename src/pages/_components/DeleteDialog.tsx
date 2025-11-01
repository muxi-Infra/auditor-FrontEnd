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
    deleteRight:boolean;
}
export function DeleteDialog({handleDelete,deleteRight}:DeleteDialogProps) {
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
        {deleteRight ? 
         <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除项目？</DialogTitle>
            <DialogDescription>
              此操作无法撤销。删除项目将会永久移除项目的所有数据。
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
        </DialogContent>:
        
         <DialogContent>
          <DialogHeader>
            <DialogTitle>权限不够啦！</DialogTitle>
            <DialogDescription>
              只有超级管理员才有这个权限奥！
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">确认</Button>
            </DialogClose>
         
          </DialogFooter>
        </DialogContent>}
       
      </Dialog>
  
  );
}
