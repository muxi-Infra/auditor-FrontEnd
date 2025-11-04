import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Progress } from '@/components/ui/Progress';
import { getProjectDetail, getProjectRole } from '@/apis';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProjectDetail } from '@/types';
import { useNavigateToProject } from '@/hooks/navigate';
import { AllDialog } from '@/components/ui/AllDialog';
import useUserStore from '@/stores/user';

export default function Settings() {
  const { project: projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<ProjectDetail>();
  const { toProjectMangement } = useNavigateToProject();
  const [projectRole, setProjectRole] = useState<number>(0);
  const { user } = useUserStore();
  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      const detail = await getProjectDetail(Number(projectId));
      setProjectDetail(detail);
    };
    getProjectRole(Number(projectId)).then((res) => {
      setProjectRole(res);
    });
    fetchProject();
  }, [projectId]);

  return (
    <div className="flex w-full flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">设置</CardTitle>
        </CardHeader>
        <CardContent className="grid w-full grid-cols-2 gap-4">
          <div>
            <Label>项目信息</Label>
            <Card className="py-4">
              <CardContent className="flex flex-col gap-2 py-0">
                <Label>API Key:</Label>
                <div className="w-full text-wrap break-words rounded-md bg-gray-100 p-2">
                  <code>{projectDetail?.api_key || 'Loading...'}</code>
                </div>
                <Label>审核进度:</Label>
                <div className="flex items-center gap-4">
                  <Progress
                    value={
                      projectDetail
                        ? (1 -
                            projectDetail.current_number /
                              projectDetail.total_number) *
                          100
                        : 0
                    }
                  />
                  {projectDetail?.total_number &&
                    projectDetail.total_number - projectDetail?.current_number}
                  /{projectDetail?.total_number}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Label>成员信息</Label>
            <Card className="py-4">
              <CardContent>
                <div>
                  <Label>成员</Label>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            {user?.role === 1 && projectRole === 1 ? (
              <AllDialog></AllDialog>
            ) : (
              <Card
                onClick={() =>
                  toProjectMangement(projectId as unknown as number)
                }
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="bg-white">项目管理入口</div>
                  <img width={15} src="/enter.png" />
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">审核标准</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{projectDetail?.audit_rule || 'Loading...'}</p>
        </CardContent>
      </Card>
    </div>
  );
}
