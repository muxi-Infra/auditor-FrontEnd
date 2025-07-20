import React from "react";
import { cn } from "@/utils/style";
import { StatusProps,StatusButtonProps } from "./Status";
import { Status } from "./Status";


interface CardProps {
  avatar?: string;
  name?: string;
  role?: number;
  description?: string;
  className?: string;
 
}

const mapRoletoVariant=(role:number):StatusProps["variant"]=>{ 


    switch(role){
        case 0:return 'audit';
        case 1:return 'mange'
    }
   }
export default function UserCard(
     { role=0,className,avatar,description = "此乃邮箱",name = "未命名"}: CardProps
) {
   
   
   
   
    return (
        <>
           <div className={cn(" w-80 h-16 grid grid-cols-[50%_25%_25%]",className)}>
                <div className=" grid grid-cols-[40%_60%] gap-0">
                    <div className="flex justify-center items-center">
                        <img className="rounded-full  w-10 h-10"  src={avatar} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-md font-bold">{name}</div>
                        <div className="text-xs">{description}</div>
                    </div>
                </div>
                <div></div>
                <div className=" flex justify-center items-center"><Status variant={mapRoletoVariant(role as number)}>{role === 0 ? "审核员" :"管理员"}</Status></div>
           </div>
        
        </>
    )
  
}

