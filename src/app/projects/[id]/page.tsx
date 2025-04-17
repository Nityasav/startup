import { Suspense } from 'react';
import DashboardContent from './DashboardContent';
import { getProject } from '@/lib/projects';

interface PageProps {
  params: Promise<{id: string}>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProjectDashboard({ params }: PageProps) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;
  const project = await getProject(projectId);
  const projectName = project?.name || 'Project Dashboard';
  
  return (
    <Suspense fallback={<div>Loading project...</div>}>
      <DashboardContent projectId={projectId} projectName={projectName} />
    </Suspense>
  );
} 