import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Icon } from './ui/Icon';
import { Label } from './ui/Label';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { createProject, uploadImage } from '@/apis';
import { useNavigateToProject } from '@/hooks/navigate';

interface CreateProjectDialogProps {
   addRight:boolean; 
}
export function CreateProjectDialog({addRight}:CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const { toProject } = useNavigateToProject();
  const [name, setName] = useState('');
  const [logo, setLogo] = useState<File>();
  const [rule, setRule] = useState('');

  const handleSubmit = async () => {
    if (!name || !logo || !rule) {
      return;
    }
    const img_url = await uploadImage(logo);
    const id = await createProject(name, img_url, rule, []);
    toProject(id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-md h-12 w-48 font-semibold text-gray-400 hover:bg-[#FFE1B1] active:bg-[#FFD596]"
        >
          <Icon name="plus"></Icon>
          新建项目
        </Button>
      </DialogTrigger>
      {addRight?
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新建项目</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <div className="w-1/2">
            <Label>项目名称</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </div>
          <div className="w-1/2">
            <Label>项目 Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    setLogo(file);
                    const logoUrl = await uploadImage(file);
                    console.log('Logo uploaded successfully:', logoUrl);
                  } catch (error) {
                    console.error('Failed to upload logo:', error);
                  }
                }
              }}
            />
            {logo && (
              <div className="mt-2 text-sm text-gray-500">
                已选择文件: {logo.name}
              </div>
            )}
          </div>
        </div>
        <Label>审核规则</Label>
        <Textarea
          value={rule}
          onChange={(e) => setRule(e.target.value)}
        ></Textarea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
          <Button
            variant="outline"
            onClick={() => {
              handleSubmit();
              setOpen(false);
            }}
          >
            提交
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
              </DialogContent>
      }
      
    </Dialog>
  );
}
