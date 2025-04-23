import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Save, Plus, ArrowRight, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from 'sonner';

type NodeType = 'start' | 'agent' | 'condition' | 'approval' | 'end';

interface Node {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    label: string;
    details?: string;
    agentType?: string;
    connections: string[];
  };
}

const WorkflowDesigner = () => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'start-1',
      type: 'start',
      position: { x: 100, y: 100 },
      data: {
        label: 'Start',
        connections: ['agent-1']
      }
    },
    {
      id: 'agent-1',
      type: 'agent',
      position: { x: 300, y: 100 },
      data: {
        label: 'Customer Service AI',
        agentType: 'support',
        connections: ['agent-2']
      }
    },
    {
      id: 'agent-2',
      type: 'agent',
      position: { x: 500, y: 100 },
      data: {
        label: 'Data Analysis AI',
        agentType: 'analysis',
        connections: ['approval-1']
      }
    },
    {
      id: 'approval-1',
      type: 'approval',
      position: { x: 700, y: 100 },
      data: {
        label: 'Manager Approval',
        connections: ['end-1']
      }
    },
    {
      id: 'end-1',
      type: 'end',
      position: { x: 900, y: 100 },
      data: {
        label: 'End',
        connections: []
      }
    }
  ]);
  
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [draggedNode, setDraggedNode] = useState<Node | null>(null);
  const [isDraggingNode, setIsDraggingNode] = useState(false);
  const [isDrawingConnection, setIsDrawingConnection] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState('design');
  const [workflowName, setWorkflowName] = useState('Customer Onboarding');
  const designerRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const nodeColors: Record<NodeType, string> = {
    'start': 'bg-green-100 border-green-400 text-green-700',
    'agent': 'bg-blue-100 border-blue-400 text-blue-700',
    'condition': 'bg-yellow-100 border-yellow-400 text-yellow-700',
    'approval': 'bg-purple-100 border-purple-400 text-purple-700',
    'end': 'bg-red-100 border-red-400 text-red-700'
  };
  
  const handleNodeMouseDown = (e: React.MouseEvent, node: Node) => {
    e.stopPropagation();
    if (isDrawingConnection) return;
    
    setSelectedNode(node);
    setDraggedNode(node);
    setIsDraggingNode(true);
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDraggingNode && draggedNode && designerRef.current) {
      const designerRect = designerRef.current.getBoundingClientRect();
      const newX = e.clientX - designerRect.left - dragOffset.x;
      const newY = e.clientY - designerRect.top - dragOffset.y;
      
      setNodes(prev => prev.map(node => {
        if (node.id === draggedNode.id) {
          return {
            ...node,
            position: { x: newX, y: newY }
          };
        }
        return node;
      }));
    }
  }, [isDraggingNode, draggedNode, dragOffset]);
  
  const handleMouseUp = useCallback(() => {
    if (isDraggingNode) {
      setIsDraggingNode(false);
    }
  }, [isDraggingNode]);
  
  const startConnection = (nodeId: string) => {
    setIsDrawingConnection(true);
    setConnectionStart(nodeId);
  };
  
  const completeConnection = (targetId: string) => {
    if (connectionStart && connectionStart !== targetId) {
      setNodes(prev => {
        return prev.map(node => {
          if (node.id === connectionStart) {
            return {
              ...node,
              data: {
                ...node.data,
                connections: [...node.data.connections.filter(id => id !== targetId), targetId]
              }
            };
          }
          return node;
        });
      });
    }
    setIsDrawingConnection(false);
    setConnectionStart(null);
  };
  
  const addNode = (type: NodeType) => {
    const id = `${type}-${nodes.length + 1}`;
    const newNode: Node = {
      id,
      type,
      position: { x: 300, y: 300 },
      data: {
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        connections: []
      }
    };
    
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
  };
  
  const deleteNode = (nodeId: string) => {
    // Remove connections to this node
    const updatedNodes = nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        connections: node.data.connections.filter(id => id !== nodeId)
      }
    }));
    
    // Remove the node itself
    setNodes(updatedNodes.filter(node => node.id !== nodeId));
    
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };
  
  const updateNodeData = (field: string, value: string) => {
    if (!selectedNode) return;
    
    setNodes(prev => prev.map(node => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          data: {
            ...node.data,
            [field]: value
          }
        };
      }
      return node;
    }));
    
    setSelectedNode(prev => {
      if (!prev) return null;
      return {
        ...prev,
        data: {
          ...prev.data,
          [field]: value
        }
      };
    });
  };
  
  const saveWorkflow = () => {
    // In a real app, this would save to backend
    toast.success(`Workflow "${workflowName}" saved successfully!`);
  };
  
  const renderConnections = () => {
    return nodes.flatMap(node => 
      node.data.connections.map(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (!target) return null;
        
        const startX = node.position.x + 75;
        const startY = node.position.y + 40;
        const endX = target.position.x;
        const endY = target.position.y + 40;
        
        const path = `M ${startX} ${startY} C ${startX + 50} ${startY}, ${endX - 50} ${endY}, ${endX} ${endY}`;
        
        return (
          <svg key={`${node.id}-${targetId}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <path
              d={path}
              stroke="#94a3b8"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
        );
      })
    ).filter(Boolean);
  };
  
  return (
    <div className="flex flex-col w-full h-full">
      <Tabs defaultValue="design" value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={saveWorkflow}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        <TabsContent value="design" className="border rounded-md p-0 m-0 flex flex-row">
          <div className="w-64 border-r bg-muted/30 p-4 flex flex-col h-[600px]">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Add Node</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addNode('agent')}
                  className="justify-start"
                >
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  Agent
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addNode('condition')}
                  className="justify-start"
                >
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  Condition
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addNode('approval')}
                  className="justify-start"
                >
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                  Approval
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addNode('end')}
                  className="justify-start"
                >
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  End
                </Button>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto">
              <h3 className="text-sm font-medium mb-2">Properties</h3>
              {selectedNode ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="node-name">Node Name</Label>
                    <Input 
                      id="node-name" 
                      value={selectedNode.data.label} 
                      onChange={(e) => updateNodeData('label', e.target.value)}
                    />
                  </div>
                  
                  {selectedNode.type === 'agent' && (
                    <div>
                      <Label htmlFor="agent-type">Agent Type</Label>
                      <Select 
                        value={selectedNode.data.agentType || 'custom'} 
                        onValueChange={(value) => updateNodeData('agentType', value)}
                      >
                        <SelectTrigger id="agent-type">
                          <SelectValue placeholder="Select agent type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">Support AI</SelectItem>
                          <SelectItem value="analysis">Analysis AI</SelectItem>
                          <SelectItem value="technical">Technical AI</SelectItem>
                          <SelectItem value="content">Content AI</SelectItem>
                          <SelectItem value="custom">Custom Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full"
                      onClick={() => deleteNode(selectedNode.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Select a node to edit its properties
                </div>
              )}
            </div>
          </div>
          
          <div 
            ref={designerRef}
            className="flex-grow h-[600px] relative p-4 bg-slate-50 overflow-auto"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {renderConnections()}
            
            {nodes.map(node => (
              <div
                key={node.id}
                className={`absolute rounded-lg border ${nodeColors[node.type]} p-3 shadow-sm w-[150px] cursor-move`}
                style={{
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                  zIndex: selectedNode?.id === node.id ? 10 : 1
                }}
                onMouseDown={(e) => handleNodeMouseDown(e, node)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isDrawingConnection) {
                    completeConnection(node.id);
                  } else {
                    setSelectedNode(node);
                  }
                }}
              >
                <div className="text-sm font-medium">{node.data.label}</div>
                <div className="text-xs mt-1">{node.data.details}</div>
                
                {node.type !== 'end' && (
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center hover:bg-slate-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      startConnection(node.id);
                    }}
                  >
                    <ArrowRight className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
            
            {isDrawingConnection && connectionStart && (
              <div className="fixed top-0 left-0 w-full h-full cursor-crosshair" />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="workflow-name">Workflow Name</Label>
                <Input 
                  id="workflow-name" 
                  value={workflowName} 
                  onChange={(e) => setWorkflowName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="workflow-desc">Description</Label>
                <textarea 
                  id="workflow-desc"
                  className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe the workflow purpose and operation"
                />
              </div>
              
              <div>
                <Label htmlFor="trigger-type">Workflow Trigger</Label>
                <Select defaultValue="api">
                  <SelectTrigger id="trigger-type">
                    <SelectValue placeholder="Select trigger type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api">API Request</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="event">Event Based</SelectItem>
                    <SelectItem value="manual">Manual Trigger</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="mt-4" onClick={saveWorkflow}>
                <Save className="h-4 w-4 mr-2" />
                Save Workflow
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <img 
                  src="https://via.placeholder.com/800x400?text=Workflow+Preview" 
                  alt="Workflow preview" 
                  className="mx-auto rounded-md border shadow-sm"
                />
                <p className="mt-4 text-muted-foreground">
                  This preview shows how your workflow will be executed.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowDesigner; 