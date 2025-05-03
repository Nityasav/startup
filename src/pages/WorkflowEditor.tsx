import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkflowDesigner from "@/components/WorkflowDesigner";

export default function WorkflowEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-blue-900/30 bg-black">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="border-blue-900/30 bg-blue-900/10 hover:bg-blue-900/20"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold text-white">Workflow Editor</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-1 bg-blue-900/20 rounded-full text-blue-400 text-sm">
                Editing
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container py-8">
        <WorkflowDesigner workflowId={id} />
      </main>
    </div>
  );
} 