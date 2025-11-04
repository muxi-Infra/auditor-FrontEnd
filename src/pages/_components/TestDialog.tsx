import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { StatusButton } from '@/components/Status';
import { AvatarChange } from '@/components/AvatarChange';
import { uploadImage, updateMyInfo } from '@/apis';
import useUserStore from '@/stores/user';

const DEFAULT_AVATAR = '/user.png';

interface TestDialogProps {
  placeholderName: string;
  avatarUrl?: string; // 可选
}
export function TestDialog({
  placeholderName,
  avatarUrl = DEFAULT_AVATAR,
}: TestDialogProps) {
  const [open, setOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userAvatar, setUserAvatar] = useState(avatarUrl);
  const [userName, setUserName] = useState<string>(placeholderName);
  const { user, updateUser } = useUserStore();
  const handleSubmit = () => {
    if (avatarFile) {
      uploadImage(avatarFile)
        .then((res) => {
          setUserAvatar(res);
          console.log(userAvatar);
          updateUser({
            ...user,
            name: userName,
            avatar: res,
          }); // 更新本地状态
          return updateMyInfo(res, userName); // 用上传结果直接调用接口
        })
        .catch((error) => {
          console.log('更新个人信息失败', error);
        });
      setOpen(false);
    } else {
      updateUser({
        ...user,
        name: userName,
        avatar: userAvatar,
      });
      updateMyInfo(userAvatar, userName);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Icon name="member" />
          </DialogTrigger>
          <DialogContent className="w-[45%]">
            <DialogHeader>
              <DialogDescription className="mb-4 flex items-center justify-center">
                <AvatarChange
                  onAvatarChange={(file) => setAvatarFile(file)}
                  avatarUrl={avatarUrl}
                ></AvatarChange>
              </DialogDescription>
              <DialogDescription className="flex items-center justify-center">
                <div className="grid h-10 w-[30%] grid-cols-[90%_10%] rounded-md border-2">
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="h-[90%] w-full pl-2 focus:border-gray-300 focus:outline-none focus:ring-0"
                      placeholder={placeholderName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    {' '}
                    <img src="/editpencil.png" className="h-3 w-3" />
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mb-4 flex flex-row items-center justify-center gap-8">
              <DialogClose asChild>
                <StatusButton
                  variant="cancel"
                  className="h-10 w-24 shadow-none"
                >
                  取消
                </StatusButton>
              </DialogClose>
              <StatusButton
                variant="complete"
                className="h-10 w-24"
                onClick={() => handleSubmit()}
              >
                完成
              </StatusButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
