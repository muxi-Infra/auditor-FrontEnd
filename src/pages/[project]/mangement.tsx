import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { deleteProject } from '@/apis';
import useProjectStore from '@/stores/project';
import { useNavigateToProject } from '@/hooks/navigate';
import { StatusButton } from '@/components/Status';
import { getProjectDetail } from '@/apis';
import { ProjectDetail, UpdateProject, Member, ProjectRole } from '@/types';
import {
  updateProject,
  getAllMembers,
  giveProjectRole,
  deleteUsers,
} from '@/apis';
import UserCard from '@/components/Usercard';
import { Separator } from '@/components/ui/Separator';
import { Checkbox } from '@/components/ui/Checkbox';
import { AddDialog } from '../_components/AddDialog';
import { DeleteDialog } from '../_components/DeleteDialog';
import useUserStore from '@/stores/user';

export default function Mangement() {
  const project_id = +location.pathname.split('/')[1];
  const { removeProject, projects } = useProjectStore();
  const { toProject } = useNavigateToProject();

  const { user } = useUserStore();
  const [projectDetail, setProjectDetail] = React.useState<ProjectDetail>({
    project_name: '',
    description: '',
    total_number: 0,
    current_number: 0,
    api_key: '',
    audit_rule: '',
  });
  const [projectStatus, setProjectStatus] = React.useState<string>('');
  const [updatedProject, setUpdateProject] = useState<UpdateProject>({
    audit_rule: '',
    description: '',
    logo: '',
    project_name: '',
  });
  const [memberStatus, setMemberStatus] = useState<string>('view');
  const [members, setMembers] = useState<Member[]>([]);
  const [projectRole, setProjectRole] = useState<ProjectRole[]>([]);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  React.useEffect(() => {
    const fetchProject = async () => {
      if (!project_id) return;
      const detail = await getProjectDetail(Number(project_id));
      setProjectDetail(detail);
    };
    const fetchMembers = async () => {
      if (!project_id) return;

      const member = await getAllMembers(Number(project_id));
      console.log(member);
      if (member === null) {
        setMembers([]);
      }
      if (member) {
        setMembers(member);
      } else {
        setMembers([]);
      }
    };
    fetchProject();
    fetchMembers();
  }, [project_id]);
  const handleDeleteProject = (project_id: number) => {
    deleteProject(project_id).then((_response) => {
      console.log('删除成功');
      removeProject(project_id);
      if (projects.length > 0) {
        toProject(projects[0].id);
      }
    });
  };

  const handleEditProject = () => {
    setUpdateProject({
      project_name: projectDetail.project_name,
      description: projectDetail.description,
      audit_rule: projectDetail.audit_rule,
      logo: '',
    });
    setProjectStatus('edit');
  };

  const handleEditMember = () => {
    setMemberStatus('edit');
    console.log(members);
  };
  const handleSaveProject = () => {
    updateProject(project_id, updatedProject).then((_response) => {
      console.log('保存成功');
      setProjectStatus('view');
      setProjectDetail({
        ...projectDetail,
        project_name: updatedProject.project_name,
        description: updatedProject.description,
        audit_rule: updatedProject.audit_rule,
      });
    });
  };
  const handleMemberBoxChange = (role: ProjectRole) => {
    setProjectRole((prev) => {
      const currentIndex = prev.findIndex(
        (item) => item.user_id === role.user_id
      );
      if (currentIndex > -1) {
        return prev.filter((i) => i.user_id !== role.user_id);
      } else {
        return [
          ...prev,
          { project_role: role.project_role, user_id: role.user_id },
        ];
      }
    });
  };
  const handleChangeRole = (project_role: number) => {
    console.log(projectRole);

    setProjectRole((prev) => {
      const safePrev = prev ?? []; // 如果为null则用空数组
      return safePrev.map((member) => ({
        ...member,
        project_role: project_role,
      }));
    });

    setMembers((prev) => {
      const safePrev = prev ?? []; // 防止prev为null
      const safeProjectRole = projectRole ?? [];

      return safePrev.map((member) => {
        const matchedRole = safeProjectRole.some(
          (role) => role.user_id === member.id
        );
        return matchedRole ? { ...member, project_role: project_role } : member;
      });
    });
  };

  const handleDeleteMember = () => {
    const deletedIds = members
      .filter((member) => {
        const matchedRole = projectRole.some(
          (role) => role.user_id === member.id
        );
        return matchedRole; //
      })
      .map((member) => member.id);
    setDeleteIds(deletedIds);
    setMembers((prev) =>
      prev.filter((member) => {
        const matchedRole = projectRole.some(
          (role) => role.user_id === member.id
        );
        return !matchedRole;
      })
    );
    setProjectRole([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setProjectRole([]);
    } else {
      const roles = members.map((i) => {
        return { project_role: i.project_role, user_id: i.id };
      });
      setProjectRole(roles as unknown as ProjectRole[]);
    }
  };
  const handleSaveProjectRole = () => {
    console.log(deleteIds);
    giveProjectRole(projectRole, projectDetail?.api_key);
    deleteUsers(deleteIds, projectDetail?.api_key);
    setMemberStatus('view');
  };
  const handleSecondgetMembers = () => {
    const fetchMembers = async () => {
      if (!project_id) return;
      const member = await getAllMembers(Number(project_id));
      setMembers(member);
    };
    fetchMembers();
  };

  return (
    <div className="grid w-full grid-rows-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-3xl">项目管理</CardTitle>
          {projectStatus === 'edit' ? (
            <div>
              <StatusButton variant="save" onClick={() => handleSaveProject()}>
                保存
              </StatusButton>
            </div>
          ) : (
            <div>
              <StatusButton variant="edit" onClick={() => handleEditProject()}>
                编辑
              </StatusButton>
            </div>
          )}
        </CardHeader>
        <CardContent className="grid w-full grid-rows-2 gap-4">
          <div>
            <Label>项目名称</Label>
            <div className="grid h-10 w-full grid-cols-[98%_2%] rounded-md border border-gray-300 px-4 py-2">
              {projectStatus === 'edit' ? (
                <>
                  <input
                    placeholder={projectDetail?.project_name}
                    onChange={(e) =>
                      setUpdateProject({
                        ...updatedProject,
                        project_name: e.target.value,
                      })
                    }
                    value={updatedProject.project_name}
                    type="text"
                    className="focus:border-gray-300 focus:outline-none focus:ring-0"
                  />
                  <img className="py-1" src="/editpencil.png" />
                </>
              ) : (
                <p className="text-md">{projectDetail?.project_name}</p>
              )}
            </div>
          </div>
          <div>
            <Label>项目描述</Label>
            <div className="grid h-10 w-full grid-cols-[98%_2%] rounded-md border border-gray-300 px-4 py-2">
              {projectStatus === 'edit' ? (
                <>
                  <input
                    placeholder={projectDetail?.description}
                    onChange={(e) =>
                      setUpdateProject({
                        ...updatedProject,
                        description: e.target.value,
                      })
                    }
                    value={updatedProject.description}
                    type="text"
                    className="mb-2 focus:border-gray-300 focus:outline-none focus:ring-0"
                  />
                  <img className="pb-1" src="/editpencil.png" />
                </>
              ) : (
                <p className="text-md">{projectDetail?.description}</p>
              )}
            </div>
          </div>
          <div>
            <Label>审核规则</Label>
            <div className="grid h-32 w-full grid-cols-[98%_2%] rounded-md border border-gray-300 px-4 py-2">
              {projectStatus === 'edit' ? (
                <>
                  <textarea
                    rows={5}
                    onChange={(e) =>
                      setUpdateProject({
                        ...updatedProject,
                        audit_rule: e.target.value,
                      })
                    }
                    value={updatedProject?.audit_rule}
                    className="focus:border-gray resize-none focus:outline-none focus:ring-0"
                    placeholder={projectDetail?.audit_rule}
                  ></textarea>
                  <img src="/editpencil.png" />
                </>
              ) : (
                <p className="text-md">{projectDetail?.audit_rule}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-3xl">成员管理</CardTitle>
          {memberStatus === 'edit' ? (
            <div className="flex gap-2">
              <AddDialog
                setOutMembers={handleSecondgetMembers}
                projectId={project_id}
                projectMembers={members}
                api_key={projectDetail?.api_key}
              ></AddDialog>
              <StatusButton
                variant="save"
                className="mb-1"
                onClick={handleSaveProjectRole}
              >
                保存
              </StatusButton>
            </div>
          ) : (
            <div>
              <StatusButton variant="edit" onClick={() => handleEditMember()}>
                编辑
              </StatusButton>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {memberStatus === 'view' ? (
            <div className="grid grid-cols-[48%_2%_48%]">
              <div className="grid grid-rows-4 gap-1">
                {(members ?? []).slice(0, 4).map((member) => (
                  <UserCard
                    key={member.id}
                    name={member.name}
                    avatar={member.avatar}
                    role={member.project_role}
                    description={member.email}
                    className="h-18 w-full"
                  />
                ))}
              </div>
              <div>
                <Separator orientation="vertical" className="h-72"></Separator>
              </div>
              <div className="grid grid-rows-4">
                {(members ?? []).slice(4, members?.length).map((member) => {
                  return (
                    <UserCard
                      key={member.id}
                      name={member.name}
                      avatar={member.avatar}
                      role={member.project_role}
                      description={member.email}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-rows-1">
              <div className="mb-5 flex flex-row gap-6">
                <div className="ml-5 mt-2 flex flex-row gap-1">
                  <Checkbox
                    checked={projectRole.length === members?.length}
                    onClick={() =>
                      handleSelectAll(projectRole.length === members?.length)
                    }
                  ></Checkbox>
                  <p className="font-bold">全选</p>
                </div>
                <div className="ml-5 mt-1 flex flex-row gap-3">
                  <StatusButton
                    variant="toaudit"
                    className="h-8"
                    onClick={() => handleChangeRole(1)}
                  >
                    设为审核员
                  </StatusButton>
                  <StatusButton
                    variant="tomange"
                    className="h-8"
                    onClick={() => handleChangeRole(2)}
                  >
                    设为管理员
                  </StatusButton>
                  <StatusButton
                    variant="delete"
                    className="h-8"
                    onClick={() => handleDeleteMember()}
                  >
                    删除
                  </StatusButton>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {members !== null &&
                  (members || []).map((member) => {
                    return (
                      <div className="flex w-full flex-row items-center justify-center">
                        <Checkbox
                          checked={projectRole.some(
                            (i) => i.user_id === member.id
                          )}
                          onClick={() =>
                            handleMemberBoxChange({
                              user_id: member.id,
                              project_role: member.project_role,
                            })
                          }
                        ></Checkbox>
                        <UserCard
                          key={member.id}
                          className="w-[94%] grid-cols-[15%_75%_10%]"
                          avatar={member.avatar}
                          name={member.name}
                          role={member.project_role}
                          description={member.email}
                        ></UserCard>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {user?.role === 2 ? (
        <DeleteDialog
          deleteRight={true}
          handleDelete={() => handleDeleteProject(project_id)}
        ></DeleteDialog>
      ) : (
        <DeleteDialog
          deleteRight={false}
          handleDelete={() => handleDeleteProject(project_id)}
        ></DeleteDialog>
      )}
    </div>
  );
}
