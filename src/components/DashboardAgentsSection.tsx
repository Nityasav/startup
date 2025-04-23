import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit2, Trash2, MoreHorizontal, Bot } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

interface Agent {
  id: string;
  name: string;
  type: string;
  provider: string;
  status: "active" | "inactive";
  lastUsed: string;
}

export default function DashboardAgentsSection() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "agent-1",
      name: "Customer Support Assistant",
      type: "support",
      provider: "OpenAI",
      status: "active",
      lastUsed: "10 mins ago"
    },
    {
      id: "agent-2",
      name: "Data Analysis Engine",
      type: "analysis",
      provider: "Anthropic",
      status: "active",
      lastUsed: "35 mins ago"
    },
    {
      id: "agent-3",
      name: "Content Generator",
      type: "content",
      provider: "Mistral AI",
      status: "active",
      lastUsed: "2 hours ago"
    },
    {
      id: "agent-4",
      name: "Technical Support Bot",
      type: "technical",
      provider: "OpenAI",
      status: "inactive",
      lastUsed: "1 day ago"
    }
  ]);
  
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    name: "",
    type: "custom",
    provider: "OpenAI",
    status: "active"
  });
  
  const addAgent = () => {
    if (!newAgent.name) {
      toast.error("Agent name is required");
      return;
    }
    
    const agent: Agent = {
      id: `agent-${agents.length + 1}`,
      name: newAgent.name || "",
      type: newAgent.type || "custom",
      provider: newAgent.provider || "OpenAI",
      status: newAgent.status || "active",
      lastUsed: "Just now"
    };
    
    setAgents([...agents, agent]);
    setNewAgent({
      name: "",
      type: "custom",
      provider: "OpenAI",
      status: "active"
    });
    setIsAddAgentOpen(false);
    toast.success("AI Agent added successfully");
  };
  
  const deleteAgent = (id: string) => {
    setAgents(agents.filter(agent => agent.id !== id));
    toast.success("AI Agent deleted successfully");
  };
  
  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(agent => {
      if (agent.id === id) {
        const newStatus = agent.status === "active" ? "inactive" : "active";
        return { ...agent, status: newStatus };
      }
      return agent;
    }));
    
    const agent = agents.find(a => a.id === id);
    const newStatus = agent?.status === "active" ? "inactive" : "active";
    toast.success(`AI Agent ${newStatus === "active" ? "activated" : "deactivated"}`);
  };
  
  const agentTypes = [
    { value: "support", label: "Support AI" },
    { value: "analysis", label: "Analysis AI" },
    { value: "technical", label: "Technical AI" },
    { value: "content", label: "Content AI" },
    { value: "custom", label: "Custom Agent" }
  ];
  
  const providers = [
    { value: "OpenAI", label: "OpenAI" },
    { value: "Anthropic", label: "Anthropic" },
    { value: "Mistral AI", label: "Mistral AI" },
    { value: "Google", label: "Google Gemini" },
    { value: "Custom", label: "Custom Provider" }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Agent Management</h2>
          <p className="text-muted-foreground">Connect and manage AI agents</p>
        </div>
        <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add AI Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add AI Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">Agent Name</Label>
                <Input 
                  id="agent-name" 
                  placeholder="Enter agent name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="agent-type">Agent Type</Label>
                <Select 
                  value={newAgent.type} 
                  onValueChange={(value) => setNewAgent({ ...newAgent, type: value })}
                >
                  <SelectTrigger id="agent-type">
                    <SelectValue placeholder="Select agent type" />
                  </SelectTrigger>
                  <SelectContent>
                    {agentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="provider">AI Provider</Label>
                <Select 
                  value={newAgent.provider} 
                  onValueChange={(value) => setNewAgent({ ...newAgent, provider: value })}
                >
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map(provider => (
                      <SelectItem key={provider.value} value={provider.value}>
                        {provider.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAgentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addAgent}>
                Add Agent
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Connected AI Agents</CardTitle>
          <CardDescription>
            Manage your AI agent integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map(agent => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                      {agent.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="capitalize">{agent.type}</div>
                  </TableCell>
                  <TableCell>{agent.provider}</TableCell>
                  <TableCell>
                    <span className={
                      agent.status === "active"
                        ? "bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold"
                        : "bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold"
                    }>
                      {agent.status}
                    </span>
                  </TableCell>
                  <TableCell>{agent.lastUsed}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleAgentStatus(agent.id)}>
                          {agent.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteAgent(agent.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Agent Statistics</CardTitle>
          <CardDescription>
            Performance metrics for your AI agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Total API Calls</div>
              <div className="text-2xl font-bold mt-1">1,342</div>
              <div className="text-xs text-green-600 mt-1">+12% from last week</div>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Avg. Response Time</div>
              <div className="text-2xl font-bold mt-1">850ms</div>
              <div className="text-xs text-green-600 mt-1">-50ms improvement</div>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Success Rate</div>
              <div className="text-2xl font-bold mt-1">98.7%</div>
              <div className="text-xs text-green-600 mt-1">+0.5% from last week</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
