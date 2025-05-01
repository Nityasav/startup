import { Sparkles, GitBranch, Bot, Network, MessagesSquare, Brain } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <GitBranch className="h-8 w-8 text-blue-400" />,
      title: "Define Your Needs",
      description: "Identify the business processes you want to enhance with AI capabilities",
    },
    {
      icon: <Network className="h-8 w-8 text-blue-400" />,
      title: "Design AI Solutions",
      description: "Create custom AI solutions tailored to your specific business requirements",
    },
    {
      icon: <MessagesSquare className="h-8 w-8 text-blue-400" />,
      title: "Implement & Integrate",
      description: "Seamlessly integrate AI solutions with your existing business systems",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-blue-400" />,
      title: "Set Business Rules",
      description: "Define how your AI should operate with custom rules and conditions",
    },
    {
      icon: <Brain className="h-8 w-8 text-blue-400" />,
      title: "Measure Results",
      description: "Track outcomes and optimize your AI solutions for better performance",
    },
    {
      icon: <Bot className="h-8 w-8 text-blue-400" />,
      title: "Scale & Grow",
      description: "Expand your AI capabilities across your organization as needed",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-black text-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
            How Venturly Works
          </h2>
          <p className="text-xl text-slate-300">
            Six simple steps to transform your business with powerful AI solutions
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
