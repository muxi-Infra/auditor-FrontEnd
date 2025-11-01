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
import { Card,CardContent } from './Card';


export function AllDialog() {
  const [open, setOpen] = useState(false);

  return (
    
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Card>
            <CardContent className='p-4 flex justify-between items-center'>
               <div className='bg-white'>项目管理入口</div>
              <img width={15}  src="/enter.png"/>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>权限不够啦！</DialogTitle>
            <DialogDescription>
              请联系管理员
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">确认</Button>
            </DialogClose>
           
          </DialogFooter>
        </DialogContent>
      </Dialog>
   
  );
}
