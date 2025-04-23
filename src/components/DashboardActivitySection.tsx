import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  X, 
  Filter, 
  UserRound, 
  Bot, 
  PlayCircle,
  PauseCircle,
  Calendar
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActivityItem {
  id: string;
  time: string;
  desc: string;
  type: "workflow" | "agent" | "user" | "system";
  status?: "success" | "warning" | "error"; 
  timestamp: Date;
}

export default function DashboardActivitySection() {
  const defaultItems: ActivityItem[] = [
    {
      id: "act-1",
      time: "10:22 AM",
      desc: "Workflow 'Support Escalation' executed successfully",
      type: "workflow",
      status: "success",
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 15)),
    },
    {
      id: "act-2",
      time: "10:10 AM",
      desc: "Customer Onboarding workflow paused by Grace Hopper",
      type: "user",
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 27)),
    },
    {
      id: "act-3",
      time: "9:45 AM",
      desc: "Agent 'Data Sync Bot' added to system",
      type: "agent",
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 52)),
    },
    {
      id: "act-4",
      time: "9:32 AM",
      desc: "Loan Approval Process started by Ada Lovelace",
      type: "workflow",
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 65)),
    },
    {
      id: "act-5",
      time: "9:15 AM",
      desc: "API rate limit warning for OpenAI integration",
      type: "system",
      status: "warning",
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 82)),
    },
    {
      id: "act-6",
      time: "8:50 AM",
      desc: "Invoice Processing workflow completed with 3 exceptions",
      type: "workflow",
      status: "warning",
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 107)),
    },
    {
      id: "act-7",
      time: "8:30 AM",
      desc: "Agent 'Technical AI' connection failed",
      type: "agent",
      status: "error",
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 127)),
    },
    {
      id: "act-8",
      time: "8:25 AM",
      desc: "System backup completed successfully",
      type: "system",
      status: "success",
      timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 132)),
    },
    {
      id: "act-9",
      time: "Yesterday",
      desc: "Monthly workflow usage report generated",
      type: "system",
      timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      id: "act-10",
      time: "Yesterday",
      desc: "New workflow template 'Customer Journey' created by Alan Turing",
      type: "user",
      timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
  ];
  
  const [activityItems, setActivityItems] = useState<ActivityItem[]>(defaultItems);
  const [activeFilters, setActiveFilters] = useState<string[]>(["workflow", "agent", "user", "system"]);
  const [activeStatusFilters, setActiveStatusFilters] = useState<string[]>(["success", "warning", "error", "none"]);
  
  const clearActivity = () => {
    setActivityItems([]);
    toast.success("Activity log cleared");
  };
  
  const resetActivity = () => {
    setActivityItems(defaultItems);
    toast.success("Activity log reset to default");
  };
  
  const toggleTypeFilter = (type: string) => {
    if (activeFilters.includes(type)) {
      setActiveFilters(activeFilters.filter(t => t !== type));
    } else {
      setActiveFilters([...activeFilters, type]);
    }
  };
  
  const toggleStatusFilter = (status: string) => {
    if (activeStatusFilters.includes(status)) {
      setActiveStatusFilters(activeStatusFilters.filter(s => s !== status));
    } else {
      setActiveStatusFilters([...activeStatusFilters, status]);
    }
  };
  
  const getFilteredItems = () => {
    return activityItems.filter(item => {
      const typeMatch = activeFilters.includes(item.type);
      
      // If no status, consider it as "none" for filtering
      const itemStatus = item.status || "none";
      const statusMatch = activeStatusFilters.includes(itemStatus);
      
      return typeMatch && statusMatch;
    });
  };
  
  const getActivityIcon = (item: ActivityItem) => {
    switch (item.type) {
      case "workflow":
        if (item.desc.includes("paused")) return <PauseCircle className="h-5 w-5 text-yellow-500" />;
        if (item.desc.includes("started")) return <PlayCircle className="h-5 w-5 text-green-500" />;
        return <Activity className="h-5 w-5 text-blue-500" />;
      case "agent":
        return <Bot className="h-5 w-5 text-purple-500" />;
      case "user":
        return <UserRound className="h-5 w-5 text-indigo-500" />;
      case "system":
        return <Clock className="h-5 w-5 text-gray-500" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };
  
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Activity Log</h2>
          <p className="text-muted-foreground">Real-time monitoring of system activities</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem disabled className="font-medium">
                Filter by type
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem 
                checked={activeFilters.includes("workflow")}
                onCheckedChange={() => toggleTypeFilter("workflow")}
              >
                Workflow events
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={activeFilters.includes("agent")}
                onCheckedChange={() => toggleTypeFilter("agent")}
              >
                Agent events
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={activeFilters.includes("user")}
                onCheckedChange={() => toggleTypeFilter("user")}
              >
                User actions
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={activeFilters.includes("system")}
                onCheckedChange={() => toggleTypeFilter("system")}
              >
                System events
              </DropdownMenuCheckboxItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className="font-medium">
                Filter by status
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem 
                checked={activeStatusFilters.includes("success")}
                onCheckedChange={() => toggleStatusFilter("success")}
              >
                Success
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={activeStatusFilters.includes("warning")}
                onCheckedChange={() => toggleStatusFilter("warning")}
              >
                Warning
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={activeStatusFilters.includes("error")}
                onCheckedChange={() => toggleStatusFilter("error")}
              >
                Error
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={activeStatusFilters.includes("none")}
                onCheckedChange={() => toggleStatusFilter("none")}
              >
                No status
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="sm" onClick={clearActivity}>
            Clear
          </Button>
          
          <Button variant="ghost" size="sm" onClick={resetActivity}>
            Reset
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Showing {getFilteredItems().length} events from the activity log
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {getFilteredItems().length > 0 ? (
              getFilteredItems().map(item => (
                <div 
                  key={item.id} 
                  className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-md transition-colors"
                >
                  <div className="mt-0.5">
                    {getActivityIcon(item)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm">{item.desc}</p>
                      {getStatusIcon(item.status) && (
                        <div className="flex-shrink-0 mt-0.5">
                          {getStatusIcon(item.status)}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No activity found matching the current filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
