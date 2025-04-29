import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Plus, MoreHorizontal, AlertCircle, CheckCircle, Filter, Search, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function DashboardAgentsSection() {
  const agents = [
    {
      id: 1,
      name: "Data Processor",
      description: "Specializes in ETL operations and data transformation",
      status: "active",
      type: "Processing",
      lastActive: "2 mins ago",
      performance: 94,
      tasks: 432
    },
    {
      id: 2,
      name: "Customer Support",
      description: "Handles customer inquiries and support tickets",
      status: "active",
      type: "Communication",
      lastActive: "Just now",
      performance: 88,
      tasks: 1205
    },
    {
      id: 3,
      name: "Content Generator",
      description: "Creates marketing copy and content based on guidelines",
      status: "maintenance",
      type: "Creative",
      lastActive: "3 hours ago",
      performance: 92,
      tasks: 876
    },
    {
      id: 4,
      name: "Document Analyzer",
      description: "Extracts and categorizes information from documents",
      status: "active",
      type: "Analysis",
      lastActive: "45 mins ago",
      performance: 96,
      tasks: 723
    },
    {
      id: 5,
      name: "Forecasting Agent",
      description: "Predicts business metrics and trends",
      status: "inactive",
      type: "Analysis",
      lastActive: "2 days ago",
      performance: 90,
      tasks: 245
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "maintenance":
        return <RefreshCw className="h-4 w-4 text-amber-500" />;
      case "inactive":
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "maintenance":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold mb-3">AI Agents</h1>
      
      {/* Agent Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#131318] border-0">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Total Agents</p>
                <p className="text-3xl font-bold mt-1">58</p>
              </div>
              <Bot className="h-8 w-8 text-purple-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#131318] border-0">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Active Agents</p>
                <p className="text-3xl font-bold mt-1">42</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#131318] border-0">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Agent Success Rate</p>
                <p className="text-3xl font-bold mt-1">94.2%</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-medium">94%</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Agent Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex gap-2">
          <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-1" /> Add Agent
          </Button>
          <Button size="sm" variant="outline" className="h-9 border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
            <Filter className="h-4 w-4 mr-1" /> Filter
          </Button>
        </div>
        <div className="w-full sm:w-auto flex gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search agents..."
              className="pl-8 h-9 w-full sm:w-[200px] border-blue-900/30 bg-blue-900/10"
            />
          </div>
        </div>
      </div>
      
      {/* Agent List */}
      <Card className="bg-[#131318] border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Agent Directory</CardTitle>
          <CardDescription>View and manage your AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex flex-col sm:flex-row justify-between border border-blue-900/20 rounded-md p-4 bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="rounded-md bg-blue-500/20 p-2 h-10 w-10 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{agent.name}</h3>
                      <Badge className={`ml-2.5 text-xs ${getStatusColor(agent.status)}`} variant="outline">
                        <span className="flex items-center">
                          {getStatusIcon(agent.status)}
                          <span className="ml-1 capitalize">{agent.status}</span>
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{agent.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs bg-blue-950/40">{agent.type}</Badge>
                      <span className="text-xs text-muted-foreground">Last active: {agent.lastActive}</span>
                      <span className="text-xs text-muted-foreground">{agent.tasks} tasks completed</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="w-32">
                    <div className="flex justify-between mb-1 text-xs">
                      <span>Performance</span>
                      <span>{agent.performance}%</span>
                    </div>
                    <Progress value={agent.performance} className="h-1.5" />
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="text-xs border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
              Load More Agents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
