import { LayoutDashboard, Users, BarChart, FileText, Settings, Workflow, Code, Database, Server, SlidersHorizontal, BookOpen, Monitor, Activity } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const items = [
  { section: "overview", icon: LayoutDashboard, label: "Overview" },
  { section: "workflows", icon: FileText, label: "Workflows" },
  { section: "workflow_designer", icon: Workflow, label: "Workflow Designer" },
  { section: "activity", icon: Activity, label: "Activity" },
  { section: "agents", icon: Users, label: "AI Agents" },
  { section: "analytics", icon: BarChart, label: "Analytics" },
  { section: "templates", icon: BookOpen, label: "Templates" },
  { section: "marketplace", icon: Server, label: "AI Marketplace" },
  { section: "integrations", icon: Code, label: "Integrations" },
  { section: "monitoring", icon: Monitor, label: "Monitoring" },
  { section: "settings", icon: Settings, label: "Settings" },
];

export default function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  return (
    <Sidebar className="border-r border-blue-900/30">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6 fade-slide-up">
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 w-8 h-8 rounded-md flex items-center justify-center text-white font-bold glow-effect">
              V
            </div>
            <span className="text-xl font-bold">Venturly</span>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="staggered-fade-in">
              {items.map((item, index) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton
                    isActive={activeSection === item.section}
                    onClick={() => onSectionChange(item.section)}
                    className={`transition-all duration-200 hover:bg-blue-900/20 ${activeSection === item.section ? 'bg-blue-900/30 border-l-2 border-blue-500' : ''}`}
                  >
                    <item.icon className={`transition-transform duration-200 ${activeSection === item.section ? 'text-blue-400 scale-110' : ''}`} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="mt-auto p-4">
          <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800/30 fade-slide-up">
            <h3 className="text-sm font-medium text-blue-400 mb-2">Pro Tip</h3>
            <p className="text-xs text-slate-300">Use keyboard shortcuts to navigate faster. Press "?" to view all shortcuts.</p>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
