import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, AlertCircle, CheckCircle, Clock, Filter, RefreshCw, Download, RotateCcw, Bot, GitBranch, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardActivitySection() {
  const activities = [
    {
      id: 1,
      type: "workflow",
      event: "completed",
      name: "Customer Onboarding",
      time: "Today at 10:45 AM",
      status: "success",
      details: "Workflow completed successfully in 2m 12s",
      icon: <GitBranch className="h-5 w-5 text-blue-500" />
    },
    {
      id: 2,
      type: "agent",
      event: "created",
      name: "Data Processor",
      time: "Today at 9:30 AM",
      status: "info",
      details: "New agent added to the system",
      icon: <Bot className="h-5 w-5 text-purple-500" />
    },
    {
      id: 3,
      type: "system",
      event: "warning",
      name: "API Rate Limit",
      time: "Today at 8:15 AM",
      status: "warning",
      details: "Approaching API rate limit (85% utilized)",
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />
    },
    {
      id: 4,
      type: "workflow",
      event: "failed",
      name: "Market Analysis",
      time: "Yesterday at 5:25 PM",
      status: "error",
      details: "Failed at step 3: Data Extraction - Connection timeout",
      icon: <GitBranch className="h-5 w-5 text-red-500" />
    },
    {
      id: 5,
      type: "user",
      event: "action",
      name: "Configuration Change",
      time: "Yesterday at 3:10 PM",
      status: "info",
      details: "System settings updated by admin",
      icon: <User className="h-5 w-5 text-green-500" />
    },
    {
      id: 6,
      type: "agent",
      event: "status",
      name: "Customer Support",
      time: "Yesterday at 2:45 PM",
      status: "success",
      details: "Agent status changed to active",
      icon: <Bot className="h-5 w-5 text-purple-500" />
    },
    {
      id: 7,
      type: "workflow",
      event: "started",
      name: "Content Approval",
      time: "Yesterday at 1:30 PM",
      status: "info",
      details: "Workflow triggered by scheduled event",
      icon: <GitBranch className="h-5 w-5 text-blue-500" />
    },
    {
      id: 8,
      type: "system",
      event: "maintenance",
      name: "System Update",
      time: "2 days ago",
      status: "warning",
      details: "Scheduled maintenance completed",
      icon: <RefreshCw className="h-5 w-5 text-blue-500" />
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20" variant="outline">
            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Success
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20" variant="outline">
            <AlertCircle className="h-3.5 w-3.5 mr-1" /> Error
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20" variant="outline">
            <AlertCircle className="h-3.5 w-3.5 mr-1" /> Warning
          </Badge>
        );
      case "info":
      default:
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20" variant="outline">
            <Activity className="h-3.5 w-3.5 mr-1" /> Info
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-3">Activity</h1>
      
      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#131318] border-0">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Today's Events</p>
                <p className="text-3xl font-bold mt-1">23</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#131318] border-0">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Success Rate</p>
                <p className="text-3xl font-bold mt-1">94%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#131318] border-0">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Issues</p>
                <p className="text-3xl font-bold mt-1">2</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="grid grid-cols-5 w-[450px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
              <Filter className="h-3.5 w-3.5 mr-1" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="h-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
              <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="m-0">
          <Card className="bg-[#131318] border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Activity Log</CardTitle>
              <CardDescription>Recent system activities and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="border border-blue-900/20 rounded-md p-4 bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h3 className="font-medium">{activity.name}</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">{activity.details}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            {getStatusBadge(activity.status)}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" /> {activity.time}
                          </span>
                          <Badge variant="secondary" className="text-xs bg-blue-950/40 hover:bg-blue-950/60">
                            {activity.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-blue-950/40 hover:bg-blue-950/60">
                            {activity.event}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" className="text-xs border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
                  <RotateCcw className="h-3.5 w-3.5 mr-1" /> Load More
                </Button>
                <Button variant="outline" className="text-xs border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
                  <Download className="h-3.5 w-3.5 mr-1" /> Export Log
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workflows" className="m-0">
          <Card className="bg-[#131318] border-0 p-6">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <GitBranch className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Workflow Activity</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                View detailed logs of all workflow executions, triggers, completions, and errors.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View Workflow Logs
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="agents" className="m-0">
          <Card className="bg-[#131318] border-0 p-6">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <Bot className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Agent Activity</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Monitor agent status changes, task completions, and performance metrics.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View Agent Logs
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="m-0">
          <Card className="bg-[#131318] border-0 p-6">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <Activity className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">System Events</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                View system-level events, maintenance updates, and service status changes.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View System Logs
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="m-0">
          <Card className="bg-[#131318] border-0 p-6">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <User className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">User Activity</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Track user interactions, configuration changes, and administrative actions.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View User Logs
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
