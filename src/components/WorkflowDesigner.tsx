import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Save, Plus, ArrowRight, Settings, Bot, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from 'sonner';
import AgentBlockLibrary from './AgentBlockLibrary';

// Connection preview component
interface ConnectionPreviewLineProps {
  sourceNodeId: string;
  mousePosition: { x: number; y: number };
  nodes: Node[];
}

const ConnectionPreviewLine = ({ sourceNodeId, mousePosition, nodes }: ConnectionPreviewLineProps) => {
  const sourceNode = nodes.find(node => node.id === sourceNodeId);
  
  if (!sourceNode) return null;
  
  const startX = sourceNode.position.x + 150; // End of node
  const startY = sourceNode.position.y + 40;  // Middle of node
  const endX = mousePosition.x;
  const endY = mousePosition.y;
  
  // Create a curved path
  const path = `M ${startX} ${startY} C ${startX + 50} ${startY}, ${endX - 50} ${endY}, ${endX} ${endY}`;
  
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <path
        d={path}
        stroke="#3b82f6"
        strokeWidth="2"
        strokeDasharray="5,5"
        fill="none"
        className="opacity-70"
      />
      <circle cx={endX} cy={endY} r="4" fill="#3b82f6" />
    </svg>
  );
};

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

interface WorkflowDesignerProps {
  workflowId?: string;
}

const WorkflowDesigner = ({ workflowId }: WorkflowDesignerProps) => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'start-1',
      type: 'start',
      position: { x: 100, y: 100 },
      data: {
        label: 'Trigger: New Customer',
        details: 'Activates when a new customer sign-up is detected',
        connections: ['agent-1']
      }
    },
    {
      id: 'agent-1',
      type: 'agent',
      position: { x: 300, y: 100 },
      data: {
        label: 'Onboarding Assistant',
        agentType: 'support',
        details: 'Sends personalized welcome messages with setup instructions',
        connections: ['condition-1']
      }
    },
    {
      id: 'condition-1',
      type: 'condition',
      position: { x: 500, y: 100 },
      data: {
        label: 'Check Account Type',
        details: 'Routes based on account tier (Free vs Premium)',
        connections: ['agent-2', 'agent-3']
      }
    },
    {
      id: 'agent-2',
      type: 'agent',
      position: { x: 700, y: 50 },
      data: {
        label: 'Basic Account Setup',
        agentType: 'assistant',
        details: 'Configures standard features and limitations',
        connections: ['agent-4']
      }
    },
    {
      id: 'agent-3',
      type: 'agent',
      position: { x: 700, y: 170 },
      data: {
        label: 'Premium Concierge',
        agentType: 'specialist',
        details: 'Provides white-glove setup and premium feature activation',
        connections: ['agent-4']
      }
    },
    {
      id: 'agent-4',
      type: 'agent',
      position: { x: 900, y: 100 },
      data: {
        label: 'Data Analyzer',
        agentType: 'analysis',
        details: 'Analyzes user preferences to personalize experience',
        connections: ['approval-1']
      }
    },
    {
      id: 'approval-1',
      type: 'approval',
      position: { x: 1100, y: 100 },
      data: {
        label: 'Compliance Check',
        details: 'Ensures all setup complies with user permissions and regulations',
        connections: ['end-1']
      }
    },
    {
      id: 'end-1',
      type: 'end',
      position: { x: 1300, y: 100 },
      data: {
        label: 'Customer Fully Onboarded',
        details: 'Onboarding workflow completed successfully',
        connections: []
      }
    }
  ]);
  
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [draggedNode, setDraggedNode] = useState<Node | null>(null);
  const [isDraggingNode, setIsDraggingNode] = useState(false);
  const [isDrawingConnection, setIsDrawingConnection] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTab, setCurrentTab] = useState('design');
  const [workflowName, setWorkflowName] = useState(workflowId ? `Workflow #${workflowId}` : 'New Workflow');
  
  // Load workflow data based on workflowId (simulated)
  useEffect(() => {
    if (workflowId) {
      // In a real app, this would fetch from API
      const sampleWorkflows = {
        'wf1': {
          name: 'Customer Onboarding',
          description: 'Automates new user welcome, setup, and personalization'
        },
        'wf2': {
          name: 'Support Ticket Resolution',
          description: 'Analyzes and routes customer support tickets to appropriate agents'
        },
        'wf3': {
          name: 'Content Generation Pipeline',
          description: 'Automates content creation, editing, and publishing workflow'
        }
      };
      
      const workflowData = sampleWorkflows[workflowId as keyof typeof sampleWorkflows];
      if (workflowData) {
        setWorkflowName(workflowData.name);
        toast.success(`Loaded workflow: ${workflowData.name}`);
      }
    }
  }, [workflowId]);
  const designerRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDraggingNewNode, setIsDraggingNewNode] = useState(false);
  const [newNodeType, setNewNodeType] = useState<string>('');
  const [newNodeName, setNewNodeName] = useState<string>('');
  
  const nodeColors: Record<NodeType, string> = {
    'start': 'bg-green-950/50 border-green-600 text-green-400',
    'agent': 'bg-blue-950/50 border-blue-600 text-blue-400',
    'condition': 'bg-yellow-950/50 border-yellow-600 text-yellow-400',
    'approval': 'bg-purple-950/50 border-purple-600 text-purple-400',
    'end': 'bg-red-950/50 border-red-600 text-red-400'
  };
  
  const handleNodeMouseDown = (e: React.MouseEvent, node: Node) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent text selection
    if (isDrawingConnection) return;
    
    // Get the node element (the parent div)
    const nodeElement = (e.currentTarget as HTMLElement);
    const nodeRect = nodeElement.getBoundingClientRect();
    
    // Calculate the precise offset from the mouse position to the node's top-left corner
    const offsetX = e.clientX - nodeRect.left;
    const offsetY = e.clientY - nodeRect.top;
    
    setSelectedNode(node);
    setDraggedNode(node);
    setIsDraggingNode(true);
    setDragOffset({ x: offsetX, y: offsetY });
    
    // Add a class to the body to prevent text selection during dragging
    document.body.classList.add('cursor-grabbing');
  };
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (designerRef.current) {
      const designerRect = designerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - designerRect.left;
      const mouseY = e.clientY - designerRect.top;
      
      // Update mouse position for connection line drawing
      setMousePosition({ x: mouseX, y: mouseY });
      
      if (isDraggingNode && draggedNode) {
        e.preventDefault(); // Prevent text selection while moving
        
        // Calculate new position with the precise drag offset
        const newX = Math.max(0, mouseX - dragOffset.x);
        const newY = Math.max(0, mouseY - dragOffset.y);
        
        // Update the node position with animation frame for smoother movement
        requestAnimationFrame(() => {
          setNodes(prev => prev.map(node => {
            if (node.id === draggedNode.id) {
              return {
                ...node,
                position: { x: newX, y: newY }
              };
            }
            return node;
          }));
        });
      }
    }
  }, [isDraggingNode, draggedNode, dragOffset]);
  
  const handleMouseUp = useCallback(() => {
    if (isDraggingNode) {
      setIsDraggingNode(false);
      setDraggedNode(null);
      
      // Remove the class that prevents text selection
      document.body.classList.remove('cursor-grabbing');
    }
  }, [isDraggingNode]);
  
  const startConnection = (nodeId: string) => {
    setIsDrawingConnection(true);
    setConnectionStart(nodeId);
    
    // Change cursor style for the entire document during connection drawing
    document.body.classList.add('cursor-crosshair');
    document.body.style.cursor = 'crosshair';
  };
  
  const completeConnection = (targetId: string) => {
    if (connectionStart && connectionStart !== targetId) {
      // Animate the connection with a ripple effect
      const sourceNode = nodes.find(node => node.id === connectionStart);
      const targetNode = nodes.find(node => node.id === targetId);
      
      if (sourceNode && targetNode && designerRef.current) {
        const lineEffect = document.createElement('div');
        lineEffect.className = 'connection-effect';
        lineEffect.style.position = 'absolute';
        lineEffect.style.backgroundColor = 'rgba(59, 130, 246, 0.4)';
        lineEffect.style.height = '4px';
        lineEffect.style.borderRadius = '4px';
        lineEffect.style.transformOrigin = 'left';
        lineEffect.style.zIndex = '100';
        lineEffect.style.transition = 'all 0.3s ease-out';
        
        // Position at source
        const sourceX = sourceNode.position.x + 150; // End of the node
        const sourceY = sourceNode.position.y + 40; // Middle of the node
        const targetX = targetNode.position.x;
        const targetY = targetNode.position.y + 40;
        
        const length = Math.sqrt(Math.pow(targetX - sourceX, 2) + Math.pow(targetY - sourceY, 2));
        const angle = Math.atan2(targetY - sourceY, targetX - sourceX) * 180 / Math.PI;
        
        lineEffect.style.width = '0';
        lineEffect.style.left = `${sourceX}px`;
        lineEffect.style.top = `${sourceY}px`;
        lineEffect.style.transform = `rotate(${angle}deg)`;
        
        designerRef.current.appendChild(lineEffect);
        
        // Animate
        setTimeout(() => {
          lineEffect.style.width = `${length}px`;
          
          // Update the node connections
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
          
          // Remove the animation element
          setTimeout(() => {
            designerRef.current?.removeChild(lineEffect);
          }, 300);
        }, 10);
      } else {
        // Fallback if nodes not found
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
    }
    
    // Reset connection state
    setIsDrawingConnection(false);
    setConnectionStart(null);
    document.body.classList.remove('cursor-crosshair');
    document.body.style.cursor = '';
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
  
  const handleAgentDragStart = (type: string, name: string) => {
    setIsDraggingNewNode(true);
    setNewNodeType(type);
    setNewNodeName(name);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!designerRef.current) return;
    
    // Calculate the drop position with a small offset for better visual placement
    const designerRect = designerRef.current.getBoundingClientRect();
    const x = e.clientX - designerRect.left - 90; // Center the node horizontally (half of the width)
    const y = e.clientY - designerRect.top - 30;  // Offset from the cursor
    
    try {
      const data = e.dataTransfer.getData('application/json');
      if (data) {
        const { type, name } = JSON.parse(data);
        
        // Add a small visual effect on drop
        const dropEffect = document.createElement('div');
        dropEffect.className = 'drop-effect';
        dropEffect.style.position = 'absolute';
        dropEffect.style.left = `${e.clientX - designerRect.left}px`;
        dropEffect.style.top = `${e.clientY - designerRect.top}px`;
        dropEffect.style.width = '10px';
        dropEffect.style.height = '10px';
        dropEffect.style.borderRadius = '50%';
        dropEffect.style.backgroundColor = 'rgba(59, 130, 246, 0.6)';
        dropEffect.style.transform = 'scale(0)';
        dropEffect.style.transition = 'all 0.3s ease-out';
        dropEffect.style.zIndex = '100';
        
        designerRef.current.appendChild(dropEffect);
        
        // Animate the effect
        setTimeout(() => {
          dropEffect.style.transform = 'scale(20)';
          dropEffect.style.opacity = '0';
          
          // Add the node
          addAgentNode(type, name, x, y);
          
          // Clean up
          setTimeout(() => {
            designerRef.current?.removeChild(dropEffect);
          }, 300);
        }, 10);
      }
    } catch (err) {
      console.error("Error handling drop:", err);
      addAgentNode('agent', 'Fallback Agent', x, y);
    }
    
    setIsDraggingNewNode(false);
  };
  
  const addAgentNode = (type: string, name: string, x: number, y: number) => {
    if (type === 'agent') {
      const id = `${type}-${nodes.length + 1}`;
      const newNode: Node = {
        id,
        type: 'agent',
        position: { x, y },
        data: {
          label: name,
          details: `AI agent for ${name.toLowerCase()} tasks`,
          agentType: 'custom',
          connections: []
        }
      };
      
      setNodes([...nodes, newNode]);
      setSelectedNode(newNode);
      toast.success(`Added ${name} to workflow`);
    }
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
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
              strokeDasharray={node.type === 'condition' ? "5 5" : "none"}
              className="opacity-70"
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
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
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
            <Tabs defaultValue="blocks" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="blocks">Blocks</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>
              
              <TabsContent value="blocks" className="mt-4 space-y-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Flow Controls</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => addNode('start')}
                      className="justify-start"
                    >
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      Trigger
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
                
                <div className="flex-grow overflow-y-auto pr-1">
                  <AgentBlockLibrary onDragStart={handleAgentDragStart} />
                </div>
              </TabsContent>
              
              <TabsContent value="properties" className="mt-4">
                <div className="flex-grow overflow-y-auto">
                  <h3 className="text-sm font-medium mb-2">Node Properties</h3>
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
                      
                      <div>
                        <Label htmlFor="node-details">Description</Label>
                        <Input 
                          id="node-details" 
                          value={selectedNode.data.details || ''} 
                          onChange={(e) => updateNodeData('details', e.target.value)}
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
              </TabsContent>
            </Tabs>
          </div>
          
          <div 
            ref={designerRef}
            className={`flex-grow h-[600px] relative p-4 bg-slate-950 overflow-auto transition-colors duration-300
              ${isDraggingNewNode ? 'bg-slate-900 bg-opacity-80' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnter={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add('border-blue-500', 'border-opacity-50');
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('border-blue-500', 'border-opacity-50');
            }}
          >
            {renderConnections()}
            
            {nodes.map(node => (
              <div
                key={node.id}
                className={`absolute rounded-lg border ${nodeColors[node.type]} p-3 shadow-md w-[180px] node-draggable 
                  ${draggedNode?.id === node.id ? 'node-dragging' : ''}
                  ${selectedNode?.id === node.id ? 'ring-2 ring-blue-500/70' : ''}`}
                style={{
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                  zIndex: draggedNode?.id === node.id ? 50 : selectedNode?.id === node.id ? 10 : 1
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
                <div className="flex items-start gap-2 mb-2">
                  {node.type === 'start' && (
                    <div className="bg-green-600/30 rounded p-1">
                      <ArrowRight className="h-4 w-4 text-green-400" />
                    </div>
                  )}
                  {node.type === 'agent' && (
                    <div className="bg-blue-600/30 rounded p-1">
                      <Bot className="h-4 w-4 text-blue-400" />
                    </div>
                  )}
                  {node.type === 'condition' && (
                    <div className="bg-yellow-600/30 rounded p-1">
                      <Settings className="h-4 w-4 text-yellow-400" />
                    </div>
                  )}
                  {node.type === 'approval' && (
                    <div className="bg-purple-600/30 rounded p-1">
                      <User className="h-4 w-4 text-purple-400" />
                    </div>
                  )}
                  {node.type === 'end' && (
                    <div className="bg-red-600/30 rounded p-1">
                      <ArrowRight className="h-4 w-4 text-red-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium truncate">{node.data.label}</div>
                    <div className="text-xs text-gray-400">{node.type}</div>
                  </div>
                </div>
                {node.data.details && (
                  <div className="text-xs mt-1 text-gray-300 line-clamp-2">{node.data.details}</div>
                )}
                
                {node.type !== 'end' && (
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-blue-800 border border-blue-600 flex items-center justify-center hover:bg-blue-700 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      startConnection(node.id);
                    }}
                  >
                    <ArrowRight className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
            ))}
            
            {isDrawingConnection && connectionStart && (
              <>
                <div className="fixed top-0 left-0 w-full h-full cursor-crosshair" />
                <ConnectionPreviewLine 
                  sourceNodeId={connectionStart} 
                  mousePosition={mousePosition}
                  nodes={nodes}
                />
              </>
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