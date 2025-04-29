import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Bot, 
  GitBranch, 
  Activity, 
  Settings, 
  Users, 
  BarChart, 
  Calendar, 
  MessageSquare,
  Bell,
  HelpCircle,
  LogOut,
  CreditCard,
  BarChart3,
  Zap
} from "lucide-react";
import { Link } from "@/components/ui/link";
import { Card, CardContent } from "@/components/ui/card";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function DashboardSidebar({
  className,
  isCollapsed = false,
  activeSection = "overview",
  onSectionChange,
  ...props
}: SidebarProps) {
  
  const handleSectionClick = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <div className={cn("pb-12 border-r min-h-screen bg-[#0e0e11] relative flex flex-col", className)} {...props}>
      <div className="space-y-4 py-4 flex-grow">
        <div className="px-4 py-2">
          <div className="flex items-center">
            {!isCollapsed && (
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold tracking-tight text-blue-500">Dashboard</span>
              </Link>
            )}
            {isCollapsed && (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20">
                <LayoutDashboard className="h-5 w-5 text-blue-500" />
              </div>
            )}
          </div>
        </div>

        <div className="px-2">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start",
                isCollapsed ? "h-9 w-9" : "",
                activeSection === "overview" ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-blue-500/10 text-foreground"
              )}
              onClick={() => handleSectionClick("overview")}
            >
              <LayoutDashboard className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && <span>Overview</span>}
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start",
                isCollapsed ? "h-9 w-9" : "",
                activeSection === "workflows" ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-blue-500/10 text-foreground"
              )}
              onClick={() => handleSectionClick("workflows")}
            >
              <GitBranch className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && <span>Workflows</span>}
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start",
                isCollapsed ? "h-9 w-9" : "",
                activeSection === "agents" ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-blue-500/10 text-foreground"
              )}
              onClick={() => handleSectionClick("agents")}
            >
              <Bot className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && <span>Agents</span>}
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start",
                isCollapsed ? "h-9 w-9" : "",
                activeSection === "activity" ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-blue-500/10 text-foreground"
              )}
              onClick={() => handleSectionClick("activity")}
            >
              <Activity className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && <span>Activity</span>}
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start",
                isCollapsed ? "h-9 w-9" : "",
                activeSection === "analytics" ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-blue-500/10 text-foreground"
              )}
              onClick={() => handleSectionClick("analytics")}
            >
              <BarChart className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && <span>Analytics</span>}
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start",
                isCollapsed ? "h-9 w-9" : "",
                activeSection === "calendar" ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-blue-500/10 text-foreground"
              )}
              onClick={() => handleSectionClick("calendar")}
            >
              <Calendar className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && <span>Calendar</span>}
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start",
                isCollapsed ? "h-9 w-9" : "",
                activeSection === "chat" ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-blue-500/10 text-foreground"
              )}
              onClick={() => handleSectionClick("chat")}
            >
              <MessageSquare className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>Chat</span>
                  <span className="bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">3</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        <div className="px-2 py-2">
          <h2 className={cn("mb-2 px-2 text-xs uppercase text-muted-foreground tracking-wider", isCollapsed && "sr-only")}>
            Management
          </h2>
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start",
                isCollapsed ? "h-9 w-9" : "",
                activeSection === "team" ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-blue-500/10 text-foreground"
              )}
              onClick={() => handleSectionClick("team")}
            >
              <Users className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && <span>Team</span>}
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start",
                isCollapsed ? "h-9 w-9" : "",
                activeSection === "settings" ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-blue-500/10 text-foreground"
              )}
              onClick={() => handleSectionClick("settings")}
            >
              <Settings className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
              {!isCollapsed && <span>Settings</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Upgrade Plan section - fixed at bottom of sidebar */}
      <div className="mt-auto p-3 border-t w-full border-gray-800">
        <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border-primary/10 overflow-hidden">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/20 p-1 flex-shrink-0">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium truncate">Free Plan</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Upgrade to Pro for unlimited access.
              </div>
              <Button size="sm" className="w-full text-xs" variant="default">
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
