import { Sparkles, Workflow, Bot, Network, MessagesSquare, Brain } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Workflow className="h-8 w-8 text-blue-400" />,
      title: "Design Workflow",
      description: "Create a visual workflow defining the sequence and logic for multiple AI agents",
    },
    {
      icon: <Network className="h-8 w-8 text-blue-400" />,
      title: "Connect Agents",
      description: "Select from pre-built integrations or connect custom AI agents via API",
    },
    {
      icon: <MessagesSquare className="h-8 w-8 text-blue-400" />,
      title: "Configure Communication",
      description: "Define how agents share context and outputs between workflow steps",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-blue-400" />,
      title: "Set Automation Rules",
      description: "Create triggers and conditions for when workflows should execute",
    },
    {
      icon: <Brain className="h-8 w-8 text-blue-400" />,
      title: "Monitor Performance",
      description: "Track metrics and review outputs to optimize your automation",
    },
    {
      icon: <Bot className="h-8 w-8 text-blue-400" />,
      title: "Scale Deployment",
      description: "Deploy workflows across your organization with governance controls",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-black text-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
            How OrchestrAI Works
          </h2>
          <p className="text-xl text-slate-300">
            Six simple steps to transform your AI agents into powerful automation workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-black/30 border border-blue-900/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-900/20 p-3 rounded-lg">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-lg text-white">{step.title}</h3>
              </div>
              <p className="text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
