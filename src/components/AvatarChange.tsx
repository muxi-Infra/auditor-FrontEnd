import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { StatusButton } from './Status';

interface AvatarChangeProps {
  avatarUrl?: string;
  onAvatarChange: (file: File) => void;
}
const DEFAULT_AVATAR = '../src/assets/icons/user.png';
export function AvatarChange(
{ avatarUrl = DEFAULT_AVATAR, onAvatarChange }: AvatarChangeProps
) {
  const [image, setImage] = useState<File>();
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [draftAvatar, setDraftAvatar] = useState<string |null>(null);
  const editorRef = useRef<AvatarEditor>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        setEditorOpen(true);
      }
    }
  };
  const handleCropDone = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL('image/png'); // base64 图片
      setDraftAvatar(dataUrl);
      setEditorOpen(false);
       fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'avatar.png', { type: 'image/png' });
          onAvatarChange(file);
        });
    
  };

  }
  return (
    <div>
      <div className="relative flex h-[140px] w-[140px] flex-row justify-end rounded-lg">
        <img src={draftAvatar || avatarUrl} alt="" className="h-full w-full rounded-full" />
        <label
          htmlFor="avatar"
          className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F3]"
        >
          <img src="../src/assets/icons/plus.png" width={20} alt="+" />
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChangeFile}
        />
      </div>
      {editorOpen && image && (
        <div className='absolute top-2 left-16 bg-white rounded-md border w-60 h-72'>
            <div className='flex justify-center items-center mt-2'>
               <AvatarEditor
              className=''
            ref={editorRef}
            image={image}
            width={120}
            height={120}
            border={50}
            borderRadius={100}
            scale={1.2}
          ></AvatarEditor>
              </div>          
          <div className='flex flex-row justify-center items-center gap-4 mt-4'>
             <StatusButton className='w-24 h-8' variant='complete' onClick={handleCropDone}>完成裁剪</StatusButton>
          <StatusButton className='w-24 h-8' variant='cancel' onClick={() => setEditorOpen(false)}>取消</StatusButton>
          </div>
         
        </div>
      )}
    </div>
  );
}

