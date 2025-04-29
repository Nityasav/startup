import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Download, Calendar, ArrowUpDown, Filter, Search, PieChart, LineChart, BarChart3, ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardAnalyticsSection() {
  const metrics = [
    {
      title: "Total Workflow Executions",
      value: "12,456",
      change: "+12.5%",
      direction: "up",
      subtitle: "vs. last month"
    },
    {
      title: "Avg. Workflow Duration",
      value: "3m 12s",
      change: "-5.2%",
      direction: "down",
      subtitle: "vs. last month"
    },
    {
      title: "Success Rate",
      value: "94.8%",
      change: "+2.1%",
      direction: "up",
      subtitle: "vs. last month"
    },
    {
      title: "Active Agents",
      value: "58",
      change: "+8.4%",
      direction: "up",
      subtitle: "vs. last month"
    }
  ];

  const topWorkflows = [
    { name: "Customer Onboarding", executions: 856, increase: true, percent: 12 },
    { name: "Data Processing", executions: 743, increase: true, percent: 8 },
    { name: "Content Approval", executions: 652, increase: false, percent: 3 },
    { name: "Invoice Processing", executions: 521, increase: true, percent: 15 },
    { name: "Lead Qualification", executions: 498, increase: false, percent: 5 }
  ];

  const agentPerformance = [
    { name: "Document Analyzer", tasks: 2456, success: 98, time: "0.8s" },
    { name: "Customer Support", tasks: 1892, success: 95, time: "1.2s" },
    { name: "Content Generator", tasks: 1654, success: 92, time: "2.5s" },
    { name: "Data Processor", tasks: 1543, success: 99, time: "0.5s" },
    { name: "Forecasting Agent", tasks: 1245, success: 90, time: "3.2s" }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-3">Analytics</h1>
      
      {/* Analytics Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
            <Calendar className="h-4 w-4 mr-1" /> Last 30 Days
          </Button>
          <Button variant="outline" className="h-9 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
            <Filter className="h-4 w-4 mr-1" /> Filter
          </Button>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="search"
              placeholder="Search metrics..."
              className="pl-8 h-9 w-full sm:w-[200px] bg-blue-900/10 border border-blue-900/30 rounded-md text-sm"
            />
          </div>
          <Button variant="outline" className="h-9 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-[#131318] border-0">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-muted-foreground text-sm">{metric.title}</p>
                <Badge 
                  variant="outline" 
                  className={`
                    ${metric.direction === 'up' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}
                  `}
                >
                  {metric.direction === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {metric.change}
                </Badge>
              </div>
              <div className="mt-1">
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Tabs for different analytics views */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-[#131318] border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Workflow Executions</CardTitle>
                <CardDescription>Daily executions over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px] flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center flex-col p-4">
                    <BarChart3 className="h-16 w-16 text-blue-500 opacity-50 mb-4" />
                    <p className="text-sm text-muted-foreground text-center">
                      Bar chart showing daily workflow executions would be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#131318] border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Success Rate Trend</CardTitle>
                <CardDescription>Success rate over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px] flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center flex-col p-4">
                    <LineChart className="h-16 w-16 text-green-500 opacity-50 mb-4" />
                    <p className="text-sm text-muted-foreground text-center">
                      Line chart showing success rate trend would be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Top Workflows and Agent Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-[#131318] border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Top Workflows</CardTitle>
                <CardDescription>Most executed workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topWorkflows.map((workflow, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-blue-900/20 last:border-0 pb-2 last:pb-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{workflow.name}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm">{workflow.executions} runs</div>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${workflow.increase ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}
                          `}
                        >
                          {workflow.increase ? 
                            <ArrowUp className="h-3 w-3 mr-1" /> : 
                            <ArrowDown className="h-3 w-3 mr-1" />
                          }
                          {workflow.percent}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#131318] border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Agent Performance</CardTitle>
                <CardDescription>Performance of top AI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agentPerformance.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-blue-900/20 last:border-0 pb-2 last:pb-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{agent.name}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end">
                          <div className="text-sm">{agent.tasks} tasks</div>
                          <div className="text-xs text-muted-foreground">
                            {agent.success}% / {agent.time}
                          </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          agent.success >= 95 ? 'bg-green-500' : 
                          agent.success >= 90 ? 'bg-amber-500' : 'bg-red-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="workflows" className="mt-4">
          <Card className="bg-[#131318] border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Workflow Analytics</CardTitle>
              <CardDescription>Detailed performance metrics for all workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center flex-col p-4">
                <BarChart className="h-16 w-16 text-blue-500 opacity-50 mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  Detailed workflow analytics would be displayed here with charts and tables
                </p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">View Detailed Workflow Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agents" className="mt-4">
          <Card className="bg-[#131318] border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Agent Analytics</CardTitle>
              <CardDescription>Performance metrics for all AI agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center flex-col p-4">
                <PieChart className="h-16 w-16 text-purple-500 opacity-50 mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  Detailed agent analytics would be displayed here with charts and tables
                </p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">View Detailed Agent Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="mt-4">
          <Card className="bg-[#131318] border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">System Usage</CardTitle>
              <CardDescription>Resource utilization and cost metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center flex-col p-4">
                <BarChart className="h-16 w-16 text-green-500 opacity-50 mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  System usage analytics and cost metrics would be displayed here
                </p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">View Detailed Usage Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 