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
import { StatusButton } from '@/components/Status';
import { useState,useEffect } from 'react';
import { SearchInput } from '@/components/SearchInput';
import UserCard from '@/components/Usercardp';
import { User,ProjectRole } from '@/types';
import { getAllUsers,addUsers,getProjectItemsBySearch,selectUser } from '@/apis';


interface AddDialogProps {
  api_key:string;
  projectMembers?: User[];
 
  projectId:number;
  setOutMembers?: () => void;
}
export function AddDialog({api_key,projectMembers,projectId,setOutMembers}:AddDialogProps) {
  const [open, setOpen] = useState(false);
  const [members,setMembers] = useState<User[]>([])
  const [addMembers,setAddMembers] = useState<ProjectRole[]>([])
  const projectMembersIds = projectMembers?.map((member) => member.id)
  useEffect(() => {
  if (!open && setOutMembers) {
    // 弹窗关闭时触发
   setOutMembers()
  }
}, [open]);  
  const handleGetMembers = () => {

     getAllUsers().then((res)=>{

        setMembers(res.filter(user => !projectMembersIds?.includes(user.id as number)))
     }).catch((err)=>{
        console.log(err)
     })
     console.log('获取成员列表');
  }
//这里的成员搜索用的是一个分页的接口，默认数值可在apis.ts中修改,现在pageSize是100

const handleAdd = (member_id:number) =>{
      setAddMembers((prev)=>{
        if(prev.some((item)=>item.user_id === member_id)){
          return prev.filter((item)=>item.user_id !== member_id)
        }else{
          return [...prev,{user_id:member_id,project_role:1}]
        }
      })
}
const handleAddMembers = () =>{
       addUsers(addMembers,api_key).then(()=>{

        setOpen(false);
       })
}
const handleSearch=(value:string)=>{
        
        
         selectUser(value,api_key).then(
          (response)=>{
            if(!response){
              setMembers([])
              return;
            }
           
          setMembers(response.filter(user => !projectMembersIds?.includes(user.id as number)))
          }
         ).catch(
          (err)=>console.log(err.message)
         )
  }
  return (
    <div className="flex items-center justify-center ">
      <Dialog  open={open}  onOpenChange={setOpen}>
        <DialogTrigger>
          <StatusButton variant="add" className="flex gap-0" onClick={()=>handleGetMembers()}>
                          <p className="bg-red mb-1 text-3xl">+</p>
                          <p>新增</p>
                        </StatusButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <SearchInput action={(value)=>handleSearch(value)} placeholder='search' className='h-12 border-none rounded-md text-[#E6864E]  placeholder-[#E6864E]'></SearchInput>
            </DialogTitle>
            <DialogDescription className='h-[360px] overflow-auto'>
              <div className='flex flex-col gap-2 mt-4 ml-6'>
                {members.map((member)=>{
                    return <UserCard  checked={addMembers.some((i)=>{
                        return i.user_id===member.id
                    })} onToogle={()=>handleAdd(member.id as number)} key={member.id} avatar={member.avatar} name={member.name} description={member.email}></UserCard>
                }
                     
                )}
              </div>
              
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex flex-row gap-10 justify-end'>
            <DialogClose asChild>
               <StatusButton variant="cancel" className='shadow-none'>取消</StatusButton> 
            </DialogClose>
                <StatusButton variant="complete" className='shadow-none' onClick={()=>handleAddMembers()}>完成</StatusButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
