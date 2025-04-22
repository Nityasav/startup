
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const activity = [
  { time: "10:22 AM", desc: "Workflow 'Support Escalation' executed" },
  { time: "10:10 AM", desc: "Customer Onboarding paused by Grace Hopper" },
  { time: "9:45 AM", desc: "Agent 'Data Sync Bot' added" },
  { time: "9:32 AM", desc: "Loan Approval Process started by Ada Lovelace" },
];

export default function DashboardActivitySection() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Workflow updates, agent actions, and system events.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activity.map((act, i) => (
            <li key={i} className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="font-mono text-xs min-w-[72px]">{act.time}</span>
              <span>{act.desc}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
