import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/Card';
import *as React from 'react';
import { TagCheckbox } from './Tag';
import { StatusButton, StatusCheckbox } from './Status';
import { LargeToggle } from '@/components/CrazyToggle';
import { Label } from './ui/Label';
import useItemStore from '@/stores/items';
import { Separator } from './ui/Separator';
import { getAllTags,getProjectItemsByFilter,getAllMembers } from '@/apis';
import { FilterBody,Member } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from './ui/Calendar';
import { DateRange } from 'react-day-picker';
export default function AdvaceFilter() { 
  const project_id = +location.pathname.split('/')[1];
  const [date, setDate] = React.useState<DateRange | undefined>(
    {} as DateRange
  );
  const [tags,setTags]=React.useState<string[]>([])
   const {setItems}=useItemStore();
  const [filter,setFilter]=React.useState<FilterBody>({
    tags:[],
    auditors:[],
    round_time:[],
    statuses:[]
  })
  const [members,setMembers]=React.useState<Member[]>([])
  const [calenderOpen,setCalenderOpen]=React.useState<boolean>(false);
  React.useEffect(()=>{
    getProjectItemsByFilter({project_id,...filter}).then((response)=>{
      setItems(response);
      
    })
  },[filter])
  React.useEffect(()=>{
      setFilter({
        tags:[],
        auditors:[],
        round_time:[],
        statuses:[]
      })
      setDate({} as DateRange);
  },[project_id])
const toggleTag = (tag: string) => {
  setFilter(prev => {
    // 复制当前标签数组
    const currentTags = [...prev.tags];
    const index = currentTags.indexOf(tag);
    
    if (index === -1) {
      // 标签不存在，添加它
      currentTags.push(tag);
    } else {
      // 标签已存在，移除它
      currentTags.splice(index, 1);
    }
    
    return {
      ...prev,
      tags: currentTags
    };
  });
};
const toggleAuditor=(auditor:string)=>{
   setFilter(prev => {
    // 复制当前标签数组
    const currentAuditors = [...prev.auditors];
    const index = currentAuditors.indexOf(auditor);
    
    if (index === -1) {
      // 标签不存在，添加它
      currentAuditors.push(auditor);
    } else {
      // 标签已存在，移除它
      currentAuditors.splice(index, 1);
    }
    
    return {
      ...prev,
      auditors: currentAuditors
    };
  });
}

  const toggleStatus=(status:number)=>{
   setFilter(prev => {
    // 复制当前标签数组
    const currentStatus = [...prev.statuses];
    const index = currentStatus.indexOf(status);
    
    if (index === -1) {
      // 标签不存在，添加它
      currentStatus.push(status);
    } else {
      // 标签已存在，移除它
      currentStatus.splice(index, 1);
    }
    
    return {
      ...prev,
      statuses:currentStatus
    };
  });
}
   const handleCancel = () => { 
       setCalenderOpen(false);
    
   }; 
   const handleConfirm = () => {
    if(date?.from && date?.to){
      const startUnix = Math.floor(date.from.getTime() / 1000); // 秒级时间戳
      const endUnix = Math.floor(date.to.getTime() / 1000);     // 秒级时间戳

      setFilter(prev => ({
        ...prev,
        round_time: [[startUnix, endUnix]]
      }));
    } else {
      // 如果没选全则清空
      setFilter(prev => ({
        ...prev,
        round_time: [],
      }));
    }

    setCalenderOpen(false); // 关闭日历
  
      
    }
   
   React.useEffect(()=>{
  
       getAllTags(project_id).then(
        (response)=>{
          setTags(response)
        }
       )
      
       
   },[project_id])
   React.useEffect(()=>{
    getAllMembers(project_id).then(
     (response)=>{
       setMembers(response)
     }
    )
   },[project_id])
  
 
   
   
    return (
        <Card className='w-64 max-w-[280px] shadow-none mx-0 h-max-[500px]'>
            <CardHeader className='border-b px-6 py-2 bg-muted/50'>
                <CardTitle className='text-xs text-[#000000] font-yahei font-bold'>高级筛选</CardTitle>
            </CardHeader> 
            <CardContent className='relative grid grid-rows-[6rem,auto,3rem,auto,3rem] items-center gap-2'> 

                 <div className='relative mt-0 flex w-full flex-col'>
                    <Label className=' text-xs font-yahei font-normal'>日期</Label>
                    <StatusButton variant="time" className='ml-1 mt-2 w-30 h-6' onClick={()=>setCalenderOpen(!calenderOpen)}>
                        <p className='text-[8px] font-yahei font-normal'>{date?.from?.toLocaleDateString() ||"起始日期"}</p><img src='/calender.png' className='w-2'></img><Separator className='w-2'/><p className='text-[8px] font-yahei font-normal'>{date?.to?.toLocaleDateString()||"终止日期"}</p><img src='/calender.png' className='w-2'></img>
                        </StatusButton>
                        
                 </div>
                 <AnimatePresence>
                   {calenderOpen && (
                    <motion.div
               className="absolute top-0 left-60 p-2 bg-white  rounded-lg shadow"
                initial={{ opacity: 0, x:-10}}
                 animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -10 }}
               transition={{ duration: 0.3 }}
                    >
                  <Calendar
           mode="range"
            selected={date}
          onSelect={setDate}
           className="w-80 rounded-md p-6"
           handleCancel={handleCancel}
           handleConfirm={handleConfirm}
      />
            </motion.div>
           )}
</AnimatePresence>
                     <div className='flex flex-col gap-2'>
                    <Label className='text-xs font-yahei font-normal'>标签</Label>
                    <div className='grid grid-cols-3 gap-2 '>
                      {tags===null?<TagCheckbox className='w-auto h-5 min-w-12 text-xs p-1 rounded-md'>无</TagCheckbox>:tags.map((tag)=>(
                    <TagCheckbox checked={filter.tags.includes(tag)} onClick={()=>toggleTag(tag)} key={tag} className='w-auto h-5 min-w-12 text-xs p-1 rounded-md'>{tag}</TagCheckbox>))}
                  

                    </div>

                 </div>
                <div className='flex gap-3'>
                    <Label className='text-xs font-yahei font-normal text-nowrap'>状态</Label>
                     <div className="ml-6 flex gap-3">
                    <StatusCheckbox variant="done" className='h-7 w-7 rounded-md' checked={filter.statuses.includes(1)} onClick={()=>toggleStatus(1)}></StatusCheckbox>
                    <StatusCheckbox variant="pending" className='h-7 w-7 rounded-md' checked={filter.statuses.includes(0)} onClick={()=>toggleStatus(0)}></StatusCheckbox>
                    <StatusCheckbox variant="reject" className='h-7 w-7 rounded-md' checked={filter.statuses.includes(2)} onClick={()=>toggleStatus(2)}></StatusCheckbox>
                    
                    </div>
                  
                 </div>
                  <div className='flex flex-col gap-2'>
                    <Label className='text-xs font-yahei font-normal'>审核人</Label>
                  <div className='grid grid-cols-3 gap-2'>
                    {members===null?<TagCheckbox className='w-auto h-5 min-w-12 text-xs p-1 rounded-md'>无</TagCheckbox>:members.map((member)=>(
                    <TagCheckbox checked={filter.auditors.includes(member.name)} onClick={()=>toggleAuditor(member.name)} key={member.name} className='w-auto h-5 min-w-12 text-xs p-1 rounded-md'>{member.name}</TagCheckbox>))}
                    </div>
                 </div>
                  <div className='flex flex-col gap-2 mt-10'>
                    <LargeToggle/>
                </div>
            </CardContent>
        </Card>
    )

}
