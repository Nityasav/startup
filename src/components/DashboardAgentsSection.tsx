
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Monitor, Users } from "lucide-react";

export default function DashboardAgentsSection() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>AI Agents Overview</CardTitle>
        <CardDescription>Manage integrated agents across the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="flex items-center gap-3 bg-card rounded-lg p-4 shadow border">
            <Monitor className="w-6 h-6 text-primary" />
            <div>
              <div className="font-semibold">Data Sync Bot</div>
              <div className="text-xs text-muted-foreground">Last Active: 09:30 AM</div>
            </div>
          </li>
          <li className="flex items-center gap-3 bg-card rounded-lg p-4 shadow border">
            <Users className="w-6 h-6 text-accent" />
            <div>
              <div className="font-semibold">Support Bot</div>
              <div className="text-xs text-muted-foreground">Last Active: 08:56 AM</div>
            </div>
          </li>
          <li className="flex items-center gap-3 bg-card rounded-lg p-4 shadow border">
            <Monitor className="w-6 h-6 text-secondary" />
            <div>
              <div className="font-semibold">Email Assistant</div>
              <div className="text-xs text-muted-foreground">Last Active: 09:10 AM</div>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
