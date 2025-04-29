import { Activity, Braces, Users, Shield, BoxSelect, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Features = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  
  const features = [
    {
      icon: <BoxSelect className="h-8 w-8 text-blue-400" />,
      title: "Visual Workflow Designer",
      description:
        "Intuitive drag-and-drop interface for designing complex multi-agent workflows with conditional logic and decision branching."
    },
    {
      icon: <Braces className="h-8 w-8 text-blue-500" />,
      title: "Agent Connector Framework",
      description:
        "Pre-built integrations with popular AI agents and LLMs, with a standardized communication protocol between agents."
    },
    {
      icon: <Activity className="h-8 w-8 text-blue-300" />,
      title: "Orchestration Engine",
      description:
        "Intelligent routing of tasks between agents with context preservation across handoffs and automated error handling."
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-400" />,
      title: "Monitoring Dashboard",
      description:
        "Real-time visibility into workflow execution with performance analytics, cost tracking, and audit trails."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Human-in-the-Loop Controls",
      description:
        "Configurable approval workflows and exception handling with human intervention when needed."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "Enterprise-Grade Security",
      description:
        "SOC 2 and GDPR compliant with role-based access controls and secure credential management."
    }
  ];

  const handleFeatureClick = (title: string, index: number) => {
    setActiveFeature(index);
    navigate('/dashboard-demo', { state: { featureHighlight: title } });
  };

  return (
    <section id="features" className="py-20 bg-black">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
            Powerful Features for AI Orchestration
          </h2>
          <p className="text-xl text-slate-300">
            Everything you need to connect, orchestrate, and monitor AI agent workflows across your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer 
                ${activeFeature === idx 
                  ? 'bg-blue-900/30 border-blue-500' 
                  : 'bg-black/30 border-blue-900/20 hover:border-blue-500/50'}`}
              onClick={() => handleFeatureClick(feature.title, idx)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-900/20 p-3 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-white">{feature.title}</h3>
              </div>
              <p className="text-slate-300">
                  {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
            onClick={() => navigate('/dashboard-demo')}
          >
            Try Dashboard Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
