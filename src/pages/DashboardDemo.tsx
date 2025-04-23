import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Activity, LayoutDashboard, Clock, Monitor, TrendingUp, TrendingDown, 
  Calendar, Settings, FileText, BarChart, PlusCircle, Bot, Zap, RefreshCw, 
  Sliders, ArrowRightCircle, Bookmark, Search, Database, HelpCircle, Download,
  Upload, BellRing, Cpu, Gauge, Microscope, Brain, GitBranch, Network, Sun, Moon
} from "lucide-react";
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
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WorkflowDesigner from "@/components/WorkflowDesigner";
import { toast } from "sonner";

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
    icon: <Bot className="w-6 h-6 text-secondary" />,
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
  new_workflow: "New Workflow",
  workflow_designer: "Workflow Designer",
  activity: "Activity",
  agents: "AI Agents",
  settings: "Settings",
  analytics: "Analytics",
  templates: "Templates",
  marketplace: "AI Marketplace",
  integrations: "Integrations",
  knowledge_base: "Knowledge Base",
  monitoring: "Monitoring",
};

const quickActions = [
  { label: "New Agent", icon: <PlusCircle size={16} />, color: "bg-blue-500" },
  { label: "Run Workflow", icon: <Zap size={16} />, color: "bg-green-500" },
  { label: "Import Data", icon: <Upload size={16} />, color: "bg-purple-500" },
  { label: "Export Results", icon: <Download size={16} />, color: "bg-orange-500" },
];

export default function DashboardDemo() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [dashboardTheme, setDashboardTheme] = useState<string>("dark");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a feature to highlight
    if (location.state?.featureHighlight) {
      // Map feature names to sections
      const featureToSection: Record<string, string> = {
        "Visual Workflow Designer": "workflow_designer",
        "Agent Connector Framework": "agents",
        "Orchestration Engine": "workflows",
        "Monitoring Dashboard": "overview",
        "Human-in-the-Loop Controls": "settings",
        "Enterprise-Grade Security": "settings",
      };
      
      const section = featureToSection[location.state.featureHighlight];
      if (section) {
        setActiveSection(section);
        // Clear the state to prevent reapplying on refresh
        window.history.replaceState({}, document.title);
        
        // Show a toast notification
        toast.success(`Now viewing: ${location.state.featureHighlight}`);
      }
    }
  }, [location]);

  function handleCreateWorkflow() {
    setActiveSection("workflow_designer");
  }

  function toggleTheme() {
    setDashboardTheme(prev => prev === "dark" ? "light" : "dark");
    toast.success(`Theme changed to ${dashboardTheme === "dark" ? "light" : "dark"} mode`);
  }

  function toggleSidebar() {
    setSidebarCollapsed(prev => !prev);
  }

  function renderSection() {
    switch (activeSection) {
      case "overview":
        return <DashboardOverviewSection />;
      case "workflows":
        return (
          <div className="space-y-8 fade-slide-up">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Workflow Management</h2>
                <p className="text-muted-foreground">Manage and monitor your AI workflows</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleCreateWorkflow} className="button-glow">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Workflow
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </div>
            </div>
            
            <Card className="shadow-lg border border-border/30 glow-effect">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Workflow Templates</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <CardDescription>Start with pre-built workflow templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 staggered-fade-in">
                  {["Data Processing", "Customer Support", "Document Analysis"].map(template => (
                    <Card key={template} className="cursor-pointer hover:bg-muted/50 transition-all duration-200">
                      <CardContent className="p-4 flex gap-3 items-center">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <GitBranch className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{template}</h4>
                          <p className="text-xs text-muted-foreground">Pre-configured workflow</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <DashboardWorkflowsSection />
          </div>
        );
      case "workflow_designer":
        return (
          <div className="fade-slide-up">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Workflow Designer</h2>
              <p className="text-muted-foreground">Create and edit your AI agent workflows</p>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Cpu className="h-4 w-4" /> Add Agent
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <ArrowRightCircle className="h-4 w-4" /> Add Connection
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Database className="h-4 w-4" /> Data Source
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Sliders className="h-4 w-4" /> Settings
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Users className="h-4 w-4" /> Human Review
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Search className="h-4 w-4" /> LLM
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" /> Save
              </Button>
            </div>
            <WorkflowDesigner />
          </div>
        );
      case "activity":
        return <DashboardActivitySection />;
      case "agents":
        return (
          <div className="space-y-6 fade-slide-up">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">AI Agents Management</h2>
                <p className="text-muted-foreground">Configure and monitor your AI agents</p>
              </div>
              <div className="flex gap-2">
                <Button className="button-glow">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Agent
                </Button>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Status
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 staggered-fade-in">
              {["Data Analysis", "Customer Support", "Content Creation", "Code Assistant"].map((agentType, i) => (
                <Card key={agentType} className="shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className={`inline-block w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                      {agentType}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium">{i % 2 === 0 ? 'Active' : 'Idle'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tasks:</span>
                        <span className="font-medium">{(i + 1) * 5}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Model:</span>
                        <span className="font-medium">GPT-4</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex justify-end gap-2">
                        <Button size="sm" variant="ghost">Configure</Button>
                        <Button size="sm" variant="outline">Deploy</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <DashboardAgentsSection />
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6 fade-slide-up">
            <div>
              <h2 className="text-2xl font-bold">Analytics & Insights</h2>
              <p className="text-muted-foreground">Performance metrics and usage analytics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart className="h-16 w-16 mx-auto mb-2 opacity-50" />
                    <p>Performance metrics visualization</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Efficiency</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="h-16 w-16 mx-auto mb-2 opacity-50" />
                    <p>Efficiency metrics visualization</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "settings":
        return <DashboardSettingsSection />;
      default:
        return <DashboardOverviewSection />;
    }
  }

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full bg-muted/50 animate-fade-in ${dashboardTheme === "light" ? "light" : ""}`}>
        <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 px-4 sm:px-10 py-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
              {sectionLabels[activeSection]}
            </h1>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <BellRing className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
              >
                {dashboardTheme === "dark" ? 
                  <Sun className="h-4 w-4" /> : 
                  <Moon className="h-4 w-4" />
                }
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
              <SidebarTrigger className="md:hidden" />
            </div>
          </div>
          
          {activeSection === "overview" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 staggered-fade-in">
              {cards.map((card, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    {card.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className={cn(
                      "flex items-center text-xs",
                      card.trendDir === "up" && "text-green-500",
                      card.trendDir === "down" && "text-red-500",
                      card.trendDir === "none" && "text-muted-foreground"
                    )}>
                      {card.trendDir === "up" && <TrendingUp className="mr-1 h-3 w-3" />}
                      {card.trendDir === "down" && <TrendingDown className="mr-1 h-3 w-3" />}
                      {card.trend}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {activeSection === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 staggered-fade-in">
              {quickActions.map((action, i) => (
                <div 
                  key={action.label} 
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/30 cursor-pointer hover:bg-muted/50 transition-all duration-200"
                >
                  <div className={`${action.color} p-2 rounded-full`}>
                    {action.icon}
                  </div>
                  <span className="font-medium">{action.label}</span>
                </div>
              ))}
            </div>
          )}
          
          <div>
            {renderSection()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
