
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Benefits = () => {
  const benefits = [
    "Eliminate AI agent silos and fragmented workflows",
    "Maintain full visibility and control across AI processes",
    "Reduce manual handoffs between specialized AI systems",
    "Scale AI operations across departments without complexity",
    "Implement consistent governance and error handling",
    "Preserve context across entire business processes"
  ];

  const businessOutcomes = [
    {
      title: "75% Faster Time-to-Value",
      description: "Implement complex AI workflows in days, not months"
    },
    {
      title: "60% Reduction in Operational Costs",
      description: "Automate manual AI agent coordination and handoffs"
    },
    {
      title: "99.9% Process Reliability",
      description: "With robust error handling and monitoring"
    },
    {
      title: "3x Improved Customer Experience",
      description: "Through seamless, consistent agent interactions"
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-orchestrai-50 rounded-bl-full"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Turn AI Investments into Business Impact
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              OrchestrAI helps enterprises maximize their AI investments by connecting specialized 
              AI agents into seamless business processes.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-orchestrai-600 mr-3 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-orchestrai-600 to-accent-purple hover:from-orchestrai-700 hover:to-violet-700 text-white shadow-lg button-glow"
            >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {businessOutcomes.map((outcome, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-orchestrai-800 mb-3">
                  {outcome.title}
                </h3>
                <p className="text-slate-600">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
