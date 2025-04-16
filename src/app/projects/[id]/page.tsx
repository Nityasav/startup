import { Suspense } from 'react';
import DashboardContent from './DashboardContent';
import { getProject } from '@/lib/projects';

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function ProjectDashboard({ params, searchParams }: Props) {
  const projectId = params.id;
  const project = await getProject(projectId);
  const projectName = project?.name || 'Project Dashboard';
  
  return (
    <Suspense fallback={<div>Loading project...</div>}>
      <DashboardContent projectId={projectId} projectName={projectName} />
    </Suspense>
  );
} 