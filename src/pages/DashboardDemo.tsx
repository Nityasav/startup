import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Activity, LayoutDashboard, Clock, Monitor, TrendingUp, TrendingDown, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardOverviewSection from "@/components/DashboardOverviewSection";
import DashboardWorkflowsSection from "@/components/DashboardWorkflowsSection";
import DashboardActivitySection from "@/components/DashboardActivitySection";
import DashboardAgentsSection from "@/components/DashboardAgentsSection";
import DashboardSettingsSection from "@/components/DashboardSettingsSection";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

const cards = [
  {
    title: "Active Workflows",
    value: 24,
    icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
    trend: "+17%",
    trendDir: "up" as const,
  },
  {
    title: "Total AI Agents",
    value: 58,
    icon: <Monitor className="w-6 h-6 text-secondary" />,
    trend: "+2%",
    trendDir: "up" as const,
  },
  {
    title: "Avg. Workflow Duration",
    value: "2m 45s",
    icon: <Clock className="w-6 h-6 text-tertiary" />,
    trend: "-8%",
    trendDir: "down" as const,
  },
  {
    title: "Human Approvals",
    value: 4,
    icon: <Users className="w-6 h-6 text-accent" />,
    trend: "Stable",
    trendDir: "none" as const,
  },
];

const workflows = [
  {
    name: "Loan Approval Process",
    status: "Running",
    started: "9:32 AM",
    runtime: "1m 30s",
    owner: "Ada Lovelace",
  },
  {
    name: "Customer Onboarding",
    status: "Paused",
    started: "8:45 AM",
    runtime: "4m 05s",
    owner: "Grace Hopper",
  },
  {
    name: "Invoice Processing",
    status: "Completed",
    started: "7:20 AM",
    runtime: "2m 10s",
    owner: "Alan Turing",
  },
];

const activity = [
  { time: "10:22 AM", desc: "Workflow 'Support Escalation' executed" },
  { time: "10:10 AM", desc: "Customer Onboarding paused by Grace Hopper" },
  { time: "9:45 AM", desc: "Agent 'Data Sync Bot' added" },
  { time: "9:32 AM", desc: "Loan Approval Process started by Ada Lovelace" },
];

const sectionLabels: Record<string, string> = {
  overview: "Overview",
  workflows: "Workflows",
  activity: "Activity",
  agents: "AI Agents",
  settings: "Settings",
};

export default function DashboardDemo() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  function renderSection() {
    switch (activeSection) {
      case "overview":
        return <DashboardOverviewSection />;
      case "workflows":
        return <DashboardWorkflowsSection />;
      case "activity":
        return <DashboardActivitySection />;
      case "agents":
        return <DashboardAgentsSection />;
      case "settings":
        return <DashboardSettingsSection />;
      default:
        return <DashboardOverviewSection />;
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/50 animate-fade-in">
        <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 px-4 sm:px-10 py-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
              {sectionLabels[activeSection]}
            </h1>
            <SidebarTrigger className="md:hidden" />
          </div>
          <div>
            {renderSection()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
