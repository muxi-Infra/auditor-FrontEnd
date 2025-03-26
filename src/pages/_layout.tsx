import { SearchInput } from '@/components/SearchInput';
import { LargeToggle } from '@/components/CrazyToggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/style';
import useProjectStore from '@/stores/project';
import useUserStore from '@/stores/user';
import { ComponentProps, ElementRef, ReactNode, forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { Separator } from '@/components/ui/Separator';

// ProjectItem 组件
const ProjectItem = forwardRef<
  ElementRef<typeof SidebarMenuItem>,
  ComponentProps<typeof SidebarMenuItem> & {
    path: string;
  }
>(({ className, path = '/', ...props }, ref) => {
  const pwd = useLocation().pathname;
  const isActive = pwd.startsWith(path);
  return (
    <SidebarMenuItem
      ref={ref}
      className={cn(
        'text-md h-12 w-48 font-semibold hover:bg-[#FFE1B1] active:bg-[#FFD596]',
        isActive && 'bg-[#FFD596]',
        className
      )}
      {...props}
    />
  );
});
ProjectItem.displayName = 'ProjectItem';

// Header 组件
function Header({ menu }: { menu: ReactNode }) {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const location = useLocation();
  const projectId = location.pathname.split('/')[1];

  return (
    <div className="grid h-16 w-full grid-cols-[4rem,20rem,auto,6rem,12rem] place-items-center bg-[#FFFFFF]">
      {menu}
      <SearchInput className="w-72" />
      <div></div>
      <div className="flex h-full w-full items-center justify-center gap-2">
        {user?.role === 2 && (
          <>
            <Icon name="member" /> <Separator orientation="vertical" />
          </>
        )}
        <Icon
          name="settings"
          className="cursor-pointer"
          onClick={() => navigate(`/${projectId}/settings`)}
        />
      </div>
      <div className="grid h-full w-full grid-cols-[1fr,3fr] place-items-center">
        <Avatar className="size-10">
          {/* <AvatarImage src="https://www.booling.cn/assets/avatar-bf4f5557.webp" /> */}
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>瑜伽</AvatarFallback>
        </Avatar>
        <div className="flex h-full w-full flex-col items-start justify-center p-2">
          <div className="text-md font-bold">{user?.name}</div>
          <div className="text-muted-foreground text-[0.8rem]">
            非常擅长瑜伽
          </div>
        </div>
      </div>
    </div>
  );
}

function AppSidebar() {
  const navigate = useNavigate();
  const { projects } = useProjectStore();
  return (
    <Sidebar className="bg-[#ffffff]">
      <SidebarHeader className="h-16">
        <Link to="/" className="flex flex-row items-center justify-center">
          <img src="/favicon.png" alt="logo" className="h-8 w-8" />
          <span className="text-lg font-bold">MUXI AUDITOR</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              path={`/${project.id}`}
              onClick={() => navigate(`/${project.id}`)}
            >
              {project.name}
            </ProjectItem>
          ))}
          <CreateProjectDialog></CreateProjectDialog>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex h-16 flex-row items-center justify-start px-6">
        <LargeToggle></LargeToggle>
      </SidebarFooter>
    </Sidebar>
  );
}

// RootLayout 组件
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider className="bg-[#FAF9F8]">
      <AppSidebar />
      <main className="grid w-full grid-rows-[4rem,auto]">
        <Header menu={<SidebarTrigger className="size-10" />} />
        <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-center p-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
