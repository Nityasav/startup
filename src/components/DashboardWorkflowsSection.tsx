import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GitBranch, MoreHorizontal, Clock, ArrowRight, PlayCircle, PauseCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardWorkflowsSection() {
  const workflows = [
    {
      id: 1,
      name: "Customer Onboarding",
      description: "Automates the customer onboarding process from signup to account setup",
      status: "active",
      progress: 100,
      lastRun: "2 hours ago",
      avgDuration: "2m 12s",
      totalRuns: 128,
      agents: ["Customer Support", "Document Analyzer", "Data Processor"],
      successRate: 98
    },
    {
      id: 2,
      name: "Content Approval",
      description: "Reviews and approves content before publishing",
      status: "active",
      progress: 100,
      lastRun: "30 mins ago",
      avgDuration: "45s",
      totalRuns: 347,
      agents: ["Content Generator", "Document Analyzer"],
      successRate: 100
    },
    {
      id: 3,
      name: "Lead Qualification",
      description: "Analyzes and qualifies incoming sales leads",
      status: "paused",
      progress: 0,
      lastRun: "1 day ago",
      avgDuration: "1m 30s",
      totalRuns: 89,
      agents: ["Data Processor", "Forecasting Agent"],
      successRate: 92
    },
    {
      id: 4,
      name: "Invoice Processing",
      description: "Extracts data from invoices and updates accounting systems",
      status: "active",
      progress: 35,
      lastRun: "Running now",
      avgDuration: "3m 10s",
      totalRuns: 56,
      agents: ["Document Analyzer", "Data Processor"],
      successRate: 96
    },
    {
      id: 5,
      name: "Market Analysis",
      description: "Analyzes market trends and generates reports",
      status: "error",
      progress: 68,
      lastRun: "Failed 1 hour ago",
      avgDuration: "8m 45s",
      totalRuns: 42,
      agents: ["Data Processor", "Forecasting Agent", "Content Generator"],
      successRate: 85
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "paused":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <PlayCircle className="h-4 w-4 text-green-500" />;
      case "paused":
        return <PauseCircle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-3">Workflows</h1>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid grid-cols-4 w-[400px]">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-4">
          {/* Workflow Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#131318] border-0">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Workflows</p>
                    <p className="text-3xl font-bold mt-1">24</p>
                  </div>
                  <GitBranch className="h-8 w-8 text-blue-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#131318] border-0">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground text-sm">Avg. Duration</p>
                    <p className="text-3xl font-bold mt-1">2m 45s</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#131318] border-0">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-muted-foreground text-sm">Success Rate</p>
                    <p className="text-3xl font-bold mt-1">94.8%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Actions */}
          <div className="flex justify-between items-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" /> Create Workflow
            </Button>
            
            <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 cursor-pointer">
              View Workflow Templates
            </Badge>
          </div>
          
          {/* Workflow List */}
          <Card className="bg-[#131318] border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Active Workflows</CardTitle>
              <CardDescription>View and manage your current workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="border border-blue-900/20 rounded-md p-4 bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <div className="mr-2">
                            <GitBranch className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{workflow.name}</h3>
                              <Badge className={`text-xs ${getStatusColor(workflow.status)}`} variant="outline">
                                <span className="flex items-center">
                                  {getStatusIcon(workflow.status)}
                                  <span className="ml-1 capitalize">{workflow.status}</span>
                                </span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{workflow.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 text-xs">
                          <Badge variant="secondary" className="bg-blue-950/40">
                            {workflow.totalRuns} runs
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-950/40">
                            {workflow.successRate}% success
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-950/40">
                            {workflow.avgDuration} avg time
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-muted-foreground">Agents:</span>
                          {workflow.agents.map((agent, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 bg-blue-500/10 rounded-full text-blue-400">
                              {agent}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {workflow.status === "active" && workflow.progress < 100 && (
                          <div className="w-32">
                            <div className="flex justify-between mb-1 text-xs">
                              <span>Progress</span>
                              <span>{workflow.progress}%</span>
                            </div>
                            <Progress value={workflow.progress} className="h-1.5" />
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
                            <Clock className="h-3.5 w-3.5 mr-1" /> {workflow.lastRun}
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
                            View <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button variant="outline" className="text-xs border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
                  Load More Workflows
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="pt-4">
          <Card className="bg-[#131318] border-0 p-6">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <GitBranch className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Workflow Templates</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start with pre-built workflow templates designed for common business processes.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Browse Templates
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="drafts" className="pt-4">
          <Card className="bg-[#131318] border-0 p-6">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <GitBranch className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Draft Workflows</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                You don't have any draft workflows yet. Start creating a new workflow to save as draft.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-1" /> Create Workflow
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="archived" className="pt-4">
          <Card className="bg-[#131318] border-0 p-6">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <GitBranch className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Archived Workflows</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                View your archived workflows that are no longer active but preserved for reference.
              </p>
              <Button variant="outline" className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
                View Archives
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
