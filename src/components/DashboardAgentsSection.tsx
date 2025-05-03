import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Filter, Search, RefreshCw, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function DashboardAgentsSection() {
  const [hasAgents, setHasAgents] = useState(true);
  
  const demoAgents = [
    {
      id: 'agent1',
      name: 'Onboarding Assistant',
      description: 'Handles customer welcome and initial setup',
      type: 'support',
      status: 'active',
      lastActive: '2 minutes ago',
      accuracyRate: '98%',
      model: 'gpt-4',
      creator: 'System'
    },
    {
      id: 'agent2',
      name: 'Data Analyzer',
      description: 'Processes customer data to extract insights',
      type: 'analysis',
      status: 'active',
      lastActive: '15 minutes ago',
      accuracyRate: '96%',
      model: 'gpt-4',
      creator: 'System'
    },
    {
      id: 'agent3',
      name: 'Content Creator',
      description: 'Generates marketing and documentation content',
      type: 'creative',
      status: 'active',
      lastActive: '1 hour ago',
      accuracyRate: '92%',
      model: 'claude-3',
      creator: 'System'
    },
    {
      id: 'agent4',
      name: 'Product Specialist',
      description: 'Answers detailed questions about products',
      type: 'specialist',
      status: 'active',
      lastActive: '30 minutes ago',
      accuracyRate: '97%',
      model: 'gpt-4',
      creator: 'System'
    }
  ];
  
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
                <p className="text-3xl font-bold mt-1">4</p>
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
                <p className="text-3xl font-bold mt-1">4</p>
              </div>
              <Bot className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#131318] border-0">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Agent Success Rate</p>
                <p className="text-3xl font-bold mt-1">96%</p>
              </div>
              <div className="h-8 w-8 rounded-full border border-blue-500/40 flex items-center justify-center text-xs font-medium text-blue-500">
                A+
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Agent Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="h-9 bg-blue-600 hover:bg-blue-700"
            onClick={() => setHasAgents(!hasAgents)}
          >
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
      {hasAgents ? (
        <Card className="bg-[#131318] border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Agent Directory</CardTitle>
            <CardDescription>View and manage your AI agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {demoAgents.map((agent) => (
                  <div key={agent.id} className="border border-blue-900/20 rounded-lg p-4 bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                          <Bot className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{agent.name}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{agent.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-green-500/10 text-green-400 h-5">Active</Badge>
                            <Badge className="bg-blue-500/10 text-blue-400 h-5">{agent.type}</Badge>
                            <span className="text-xs text-muted-foreground">Last active: {agent.lastActive}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <div className="space-x-4">
                        <span className="text-muted-foreground">Accuracy: <span className="text-white">{agent.accuracyRate}</span></span>
                        <span className="text-muted-foreground">Model: <span className="text-white">{agent.model}</span></span>
                      </div>
                      <Button variant="outline" size="sm" className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                  onClick={() => setHasAgents(false)}
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
            <CardTitle className="text-base">Agent Directory</CardTitle>
            <CardDescription>View and manage your AI agents</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center justify-center py-12">
              <Bot className="h-16 w-16 text-blue-500 opacity-20 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Agents Found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Create your first AI agent to help with tasks like customer support, data analysis, or content generation.
              </p>
              <div className="space-y-3 w-full max-w-md">
                <Card className="border border-blue-900/20 bg-blue-900/5">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium mb-1">How to add an agent</h4>
                      <ol className="text-xs text-muted-foreground space-y-1 list-decimal pl-4">
                        <li>Click the "Add Agent" button above</li>
                        <li>Choose an agent type or create a custom one</li>
                        <li>Configure agent settings and capabilities</li>
                        <li>Save your new agent to make it available for workflows</li>
                      </ol>
            </div>
                  </CardContent>
                </Card>
            </div>
              <Button 
                className="mt-6 bg-blue-600 hover:bg-blue-700"
                onClick={() => setHasAgents(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Your First Agent
              </Button>
          </div>
        </CardContent>
      </Card>
      )}
    </div>
  );
}
