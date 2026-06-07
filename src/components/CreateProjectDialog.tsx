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
import { createProject, getProjectList } from '@/apis';
import useProjectStore from '@/stores/project';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/stores/user';

interface CreateProjectDialogProps {
  addRight: boolean;
}
export function CreateProjectDialog({ addRight }: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setProjects } = useProjectStore();
  const { user } = useUserStore();
  const [name, setName] = useState('');
  const [rule, setRule] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const canCreate = user?.role === 2
  const handleSubmit = async () => {
    
    if (submitting) {
      return;
    }
    if (!canCreate) {
      setErrorMessage('只有超级管理员且项目权限为超级管理员才可创建项目');
      return;
    }
    if (!name.trim() || !rule.trim()) {
      setErrorMessage('请填写项目名称并补全审核规则');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);
    try {
      const id = await createProject(name.trim(), rule.trim(), '', []);
      const projects = await getProjectList();
      setProjects(projects);
      setOpen(false);
      setName('');
      setRule('');
      navigate(`/${id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
      setErrorMessage('创建项目失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
       console.log(user?.role, user?.project_role)
        if (submitting) return;
        if (nextOpen === open) return;
        setOpen(nextOpen);
        if (!nextOpen) {
          setErrorMessage(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-md h-12 w-48 font-semibold text-gray-400 hover:bg-[#FFE1B1] active:bg-[#FFD596]"
        >
          <Icon name="plus"></Icon>
          新建项目
        </Button>
      </DialogTrigger>
      {canCreate ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建项目</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <div className="w-full">
              <Label>项目名称</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
            </div>
          </div>
          <Label>审核规则</Label>
          <Textarea
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          ></Textarea>
          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          <DialogFooter className='mb-4 flex flex-row items-center justify-center gap-8'>
            <DialogClose className='w-auto' asChild>
              <Button variant="outline" disabled={submitting}>
                取消
              </Button>
            </DialogClose>
            <Button variant="outline" className='w-auto' onClick={handleSubmit} disabled={submitting}>
              {submitting ? '提交中...' : '提交'}
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
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
      )}
    </Dialog>
  );
}
