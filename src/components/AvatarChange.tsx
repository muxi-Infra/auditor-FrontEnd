import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { StatusButton } from './Status';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

interface AvatarChangeProps {
  avatarUrl?: string;
  onAvatarChange: (file: File) => void;
}

const DEFAULT_AVATAR = '../src/assets/icons/user.png';

export function AvatarChange({
  avatarUrl = DEFAULT_AVATAR,
  onAvatarChange,
}: AvatarChangeProps) {
  const [image, setImage] = useState<File>();
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [draftAvatar, setDraftAvatar] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor>(null);
  const [scale, setScale] = useState(1);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file) {
        setImage(file);
        setEditorOpen(true);
      }
    }
    // 🔥 关键：无论是否选择文件，都清空 input 值
    fileInput.value = '';
  };

  const handleCropDone = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL('image/png');
      setDraftAvatar(dataUrl);
      setEditorOpen(false);
      fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'avatar.png', { type: 'image/png' });
          onAvatarChange(file);
        });
    }
  };

  return (
    <div>
      {/* 头像展示区 */}
      <div className="relative flex h-[140px] w-[140px] flex-row justify-end rounded-lg">
        <img
          src={draftAvatar || avatarUrl}
          alt=""
          className="h-full w-full rounded-full"
        />
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

      {/* Dialog 替代原裁剪层 */}
      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-w-[16em] rounded-md">
          {image && (
            <div className="flex flex-col items-center justify-start space-y-4">
              {/* 裁剪区域 */}
              <div className="h-[150px] w-[150px] overflow-hidden rounded-full">
                <AvatarEditor
                  ref={editorRef}
                  image={image}
                  width={150}
                  height={150}
                  border={0}
                  borderRadius={0}
                  scale={scale}
                />
              </div>

              {/* 缩放控制条 */}
              <div className="flex w-full items-center justify-center gap-2">
                <button
                  className="mb-1 px-2 font-bold text-[#A0A0A0]"
                  onClick={() => setScale((prev) => Math.max(prev - 0.1, 1))}
                >
                  -
                </button>

                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="custom-slider h-2 w-40 appearance-none rounded-full border border-[#D9D9D9]"
                />
                <style>{`
                  .custom-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background: #FFFFFF;
                    border: 2px solid #A0A0A0;
                    cursor: pointer;
                  }
                  .custom-slider::-moz-range-thumb {
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background: #FFFFFF;
                    border: 2px solid #A0A0A0;
                    cursor: pointer;
                  }
                `}</style>

                <button
                  className="mb-1 px-2 font-bold text-[#A0A0A0]"
                  onClick={() => setScale((prev) => Math.min(prev + 0.1, 3))}
                >
                  +
                </button>
              </div>

              {/* 按钮区 */}
              <div className="mt-4 flex flex-row items-center justify-center gap-4">
                <StatusButton
                  className="h-6 w-16 rounded-sm text-[12px]"
                  variant="cancel"
                  onClick={() => setEditorOpen(false)}
                >
                  取消
                </StatusButton>
                <StatusButton
                  className="h-6 w-16 rounded-sm text-[12px]"
                  variant="complete"
                  onClick={handleCropDone}
                >
                  完成
                </StatusButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
