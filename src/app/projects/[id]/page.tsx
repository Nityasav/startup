import { use } from 'react';
import DashboardContent from './DashboardContent';

export default function ProjectDashboard({ params }: { params: { id: string } }) {
  const projectId = use(Promise.resolve(params.id));
  
  return <DashboardContent projectId={projectId} />;
} 