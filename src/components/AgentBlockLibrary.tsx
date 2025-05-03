import { Bot, Brain, MessageSquare, BarChart, FileText, Code, Search, Settings } from "lucide-react";

interface AgentBlockProps {
  type: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  onDragStart: (type: string, name: string) => void;
}

const AgentBlock = ({ type, name, description, icon, onDragStart }: AgentBlockProps) => {
  return (
    <div
      className="border border-blue-900/20 rounded-lg p-3 bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-grab"
      draggable
      onDragStart={(e) => {
        // Create a custom drag image for smoother dragging
        const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
        dragImage.style.opacity = '0.7';
        dragImage.style.position = 'absolute';
        dragImage.style.top = '-1000px';
        document.body.appendChild(dragImage);
        
        // Set the drag image and offset
        e.dataTransfer.setDragImage(dragImage, 20, 20);
        
        // Set the data for the drop
        e.dataTransfer.setData('application/json', JSON.stringify({ type, name }));
        e.dataTransfer.effectAllowed = 'copy';
        
        // Call the parent's onDragStart handler
        onDragStart(type, name);
        
        // Clean up the drag image after a short delay
        setTimeout(() => {
          document.body.removeChild(dragImage);
        }, 100);
      }}
    >
      <div className="flex items-start gap-3">
        <div className="bg-blue-500/20 p-2 rounded-lg flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-sm">{name}</h3>
          <p className="text-muted-foreground text-xs mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface AgentBlockLibraryProps {
  onDragStart: (type: string, name: string) => void;
}

const AgentBlockLibrary = ({ onDragStart }: AgentBlockLibraryProps) => {
  const agentBlocks = [
    {
      type: 'agent',
      name: 'Support Assistant',
      description: 'Handles customer inquiries and support requests',
      icon: <MessageSquare className="h-4 w-4 text-blue-400" />
    },
    {
      type: 'agent',
      name: 'Data Analyzer',
      description: 'Processes and analyzes data for insights',
      icon: <BarChart className="h-4 w-4 text-blue-400" />
    },
    {
      type: 'agent',
      name: 'Content Creator',
      description: 'Generates various types of content',
      icon: <FileText className="h-4 w-4 text-blue-400" />
    },
    {
      type: 'agent',
      name: 'Code Assistant',
      description: 'Helps with coding tasks and debugging',
      icon: <Code className="h-4 w-4 text-blue-400" />
    },
    {
      type: 'agent',
      name: 'Research Agent',
      description: 'Searches and compiles information',
      icon: <Search className="h-4 w-4 text-blue-400" />
    },
    {
      type: 'agent',
      name: 'Decision Engine',
      description: 'Makes decisions based on predefined criteria',
      icon: <Brain className="h-4 w-4 text-blue-400" />
    }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium mb-3">Agent Library</h3>
      <p className="text-xs text-muted-foreground mb-3">Drag agents onto the canvas to build your workflow</p>
      
      <div className="space-y-2">
        {agentBlocks.map((block, index) => (
          <AgentBlock
            key={index}
            type={block.type}
            name={block.name}
            description={block.description}
            icon={block.icon}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentBlockLibrary; 