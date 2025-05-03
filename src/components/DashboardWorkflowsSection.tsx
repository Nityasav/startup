import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GitBranch, Clock, CheckCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardWorkflowsSection() {
  const [hasWorkflows, setHasWorkflows] = useState(true);
  const navigate = useNavigate();
  
  const demoWorkflows = [
    {
      id: 'wf1',
      name: 'Customer Onboarding',
      description: 'Automates new user welcome, setup, and personalization',
      status: 'active',
      lastRun: '10 minutes ago',
      success: '98%',
      agents: 4,
      steps: 8
    },
    {
      id: 'wf2',
      name: 'Support Ticket Resolution',
      description: 'Analyzes and routes customer support tickets to appropriate agents',
      status: 'active',
      lastRun: '3 hours ago',
      success: '92%',
      agents: 3,
      steps: 6
    },
    {
      id: 'wf3',
      name: 'Content Generation Pipeline',
      description: 'Automates content creation, editing, and publishing workflow',
      status: 'active',
      lastRun: '1 day ago',
      success: '95%',
      agents: 5,
      steps: 10
    }
  ];

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
                    <p className="text-3xl font-bold mt-1">3</p>
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
                    <p className="text-3xl font-bold mt-1">1.5m</p>
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
                    <p className="text-3xl font-bold mt-1">95%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Actions */}
          <div className="flex justify-between items-center">
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate('/workflow/new')}
            >
              <Plus className="h-4 w-4 mr-1" /> Create Workflow
            </Button>
            
            <Badge 
              className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 cursor-pointer"
              onClick={() => setHasWorkflows(!hasWorkflows)}
            >
              {hasWorkflows ? 'Clear Demo Data' : 'Load Demo Data'}
            </Badge>
          </div>
          
          {/* Workflow List */}
          {hasWorkflows ? (
            <Card className="bg-[#131318] border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Workflows</CardTitle>
                <CardDescription>View and manage your current workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoWorkflows.map((workflow) => (
                    <div 
                      key={workflow.id} 
                      className="border border-blue-900/20 rounded-lg p-4 bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-pointer"
                      onClick={() => navigate(`/workflow/${workflow.id}`)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-lg">{workflow.name}</h3>
                            <Badge className="bg-green-500/10 text-green-400 h-5">Active</Badge>
                          </div>
                          <p className="text-muted-foreground mt-1">{workflow.description}</p>
                        </div>
                        <Badge className="bg-blue-500/10 text-blue-400">Success: {workflow.success}</Badge>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Last Run</p>
                          <p className="text-white">{workflow.lastRun}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Agents</p>
                          <p className="text-white">{workflow.agents}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Steps</p>
                          <p className="text-white">{workflow.steps}</p>
                        </div>
                        <div className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/workflow/${workflow.id}`);
                            }}
                          >
                            Edit Workflow
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                      onClick={() => setHasWorkflows(false)}
                    >
                      Clear Demo Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-[#131318] border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Workflows</CardTitle>
                <CardDescription>View and manage your current workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <GitBranch className="h-16 w-16 text-blue-500 opacity-20 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Workflows Found</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Create your first workflow to automate tasks and connect your AI agents together.
                  </p>
                  <div className="space-y-3 w-full max-w-md">
                    <Card className="border border-blue-900/20 bg-blue-900/5">
                      <CardContent className="p-4 flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium mb-1">How to create a workflow</h4>
                          <ol className="text-xs text-muted-foreground space-y-1 list-decimal pl-4">
                            <li>Click the "Create Workflow" button above</li>
                            <li>Start from scratch or use a template</li>
                            <li>Add steps and connect your agents</li>
                            <li>Set triggers and conditions</li>
                            <li>Save and activate your workflow</li>
                          </ol>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Button 
                    className="mt-6 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setHasWorkflows(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Create Your First Workflow
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="templates" className="mt-4">
          <Card className="bg-[#131318] border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Workflow Templates</CardTitle>
              <CardDescription>Pre-built workflows to help you get started quickly</CardDescription>
      </CardHeader>
      <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <GitBranch className="h-16 w-16 text-blue-500 opacity-20 mb-4" />
                <h3 className="text-lg font-medium mb-2">Workflow Templates Coming Soon</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We're working on pre-built templates to help you automate common tasks quickly.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drafts" className="mt-4">
          <Card className="bg-[#131318] border-0">
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">You have no draft workflows</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="archived" className="mt-4">
          <Card className="bg-[#131318] border-0">
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground">You have no archived workflows</p>
              </div>
      </CardContent>
    </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
