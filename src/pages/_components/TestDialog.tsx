import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,

  DialogTrigger,
} from '@/components/ui/Dialog';
import { useState } from 'react'
import { Icon } from '@/components/ui/Icon';
import { StatusButton } from '@/components/Status';
import { AvatarChange } from '@/components/AvatarChange';
import { uploadImage,updateMyInfo } from '@/apis';
import useUserStore from '@/stores/user';

const DEFAULT_AVATAR = '../../src/assets/icons/user.png';

interface TestDialogProps {
  placeholderName: string;
  avatarUrl?: string;  // 可选

}
export function TestDialog({
  placeholderName,
  avatarUrl = DEFAULT_AVATAR,
 
}: TestDialogProps) {
  const [open, setOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userAvatar , setUserAvatar] = useState(avatarUrl)
  const [userName, setUserName] = useState<string>(placeholderName)
    const {user, updateUser} = useUserStore();
  const handleSubmit = () => {
    if (avatarFile) {
  uploadImage(avatarFile)
    .then((res) => {
      setUserAvatar(res); 
      console.log(userAvatar)
       updateUser({
        ...user,
        name: userName,
        avatar: res,})// 更新本地状态
      return updateMyInfo(res, userName); // 用上传结果直接调用接口
    })
    .catch((error) => {
      console.log("更新个人信息失败", error);
    });
    setOpen(false);
}

  }

  return (
    <>
    <div className="flex  items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Icon name="member" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className='flex justify-center items-center mb-4'>
                <AvatarChange onAvatarChange={file => setAvatarFile(file)} avatarUrl={avatarUrl}  ></AvatarChange>
            </DialogDescription>
            <DialogDescription className='flex justify-center items-center '>
                <div className="w-[40%] h-10 rounded-md border-2 grid grid-cols-[90%_10%]">
                     <div className='flex items-center'><input type="text" className='w-full h-[90%] pl-2 focus:border-gray-300 focus:outline-none focus:ring-0' placeholder={placeholderName} onChange={(e)=>setUserName(e.target.value)} /></div>
                     <div className='flex items-center justify-center'> <img src="..\..\src\assets\icons\editpencil.png" className='w-3 h-3'/></div>
                  </div>   
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex flex-row  justify-center items-center gap-8 mb-4'>
            <DialogClose asChild>
              <StatusButton variant="cancel" className='shadow-none w-24 h-10'>取消</StatusButton>
            </DialogClose>
            <StatusButton
              variant="complete"
              className='w-24 h-10'
              onClick={()=>handleSubmit()}
            >
                完成
            </StatusButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div></>
    
  );
}
